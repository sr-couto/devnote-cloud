import { ref } from "vue"
import { defineStore } from "pinia"
import { db } from "@/db"
// import { liveQuery } from "dexie";
// import { useObservable } from "@vueuse/rxjs";
import { exportDB, importInto } from "dexie-export-import"
import { toast } from "vue-sonner"
import { useSettingsStore } from "@/stores/settings"
import { useModalStore } from "@/stores/modal"
import { useEditorStore } from "@/stores/editor"

import { initialProjectData } from "@/stores/initialProjectData"
import { allItemsTodo } from "@/composables/queries"
import { useUnsavedChanges } from "@/composables/useUnsavedChanges"

import { useI18n } from "vue-i18n"

export const useCounterStore = defineStore("counter", () => {
  const status = ref("LOADING")
  const selectedId = ref(0)
  const loaded_id = ref("")
  const file_name = ref("My IndexedDB")
  const project_name = ref("")
  const project_body = ref("")
  const project_checked = ref(null)
  const project_fixed = ref(null)
  const content_editable = ref(true)
  const showSidebarDocuments = ref(true)
  const searchTerm = ref("")

  const settings = useSettingsStore()
  const editor_store = useEditorStore()
  const modal = useModalStore()
  const { hasUnsavedChanges } = useUnsavedChanges()
  const { t } = useI18n()

  function toggleEditable() {
    editor_store.editor.setEditable(!editor_store.editor.options.editable)
    content_editable.value = editor_store.editor.options.editable
  }

  async function create_project() {
    try {
      status.value = "CHANGING"
      const new_project_id = await db.projects.add({
        date: new Date().toISOString(),
        date_created: new Date().toISOString(),
        project_data: {
          body: project_body.value,
          name: project_name.value,
          checked: false,
          fixed: false,
        },
      })
      loaded_id.value = new_project_id
      status.value = "READY"
      toast.success("Project created with title: " + project_name.value)
    } catch (error) {
      handleError("Error al crear el proyecto", error)
    }
  }

  async function update_project() {
    if (!loaded_id.value || status.value !== "READY") return
    try {
      await db.projects.update(loaded_id.value, {
        date: new Date().toISOString(),
        project_data: {
          body: project_body.value,
          name: project_name.value,
          checked: project_checked.value,
          fixed: project_fixed.value,
        },
      })
    } catch (error) {
      handleError("Error al actualizar el proyecto", error)
    }
  }

  async function change_project_checked(item, isChecked) {
    try {
      await db.projects.update(item.id, {
        date: new Date().toISOString(),
        project_data: {
          body: item.project_data.body,
          name: item.project_data.name,
          checked: isChecked,
          fixed: false,
        },
      })
      toast(
        isChecked ?
          `"${item.project_data.name}" ${t("message.completed")}`
        : `"${item.project_data.name}" ${t("message.unmarked")}`,
      )
    } catch (error) {
      handleError("Error al marcar el proyecto", error)
    }
  }

  async function change_project_fixed(item, isFixed) {
    try {
      await db.projects.update(item.id, {
        date: new Date().toISOString(),
        project_data: {
          body: item.project_data.body,
          name: item.project_data.name,
          checked: item.project_data.checked,
          fixed: !isFixed,
        },
      })
    } catch (error) {
      handleError("Error al marcar el proyecto", error)
    }
  }

  async function set_project(id) {
    const selectedId = id ? id : null
    if (selectedId === loaded_id.value) return
    status.value = "CHANGING"
    try {
      const selectedState = await db.projects.get(selectedId)
      if (selectedState) {
        project_body.value = selectedState.project_data.body
        project_name.value = selectedState.project_data.name
        project_fixed.value = selectedState.project_data.fixed
        project_checked.value = selectedState.project_data.checked
      } else {
        useEditorStore.clear_editor()
        console.error("Selected project not found")
      }
      loaded_id.value = selectedId
    } catch (error) {
      handleError("Error al seleccionar el proyecto", error)
    }
    status.value = "READY"
  }

  async function delete_project() {
    try {
      await db.projects.delete(loaded_id.value)
      useEditorStore.clear_editor()
    } catch (error) {
      handleError("Error al eliminar el proyecto", error)
    }
  }

  function auto_save() {
    if (project_name.value === "") return
    if (status.value !== "READY") return
    update_project()
  }

  async function export_database(filename) {
    try {
      await db.open()
      const blob = await exportDB(db)
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${filename || file_name.value}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      // toast.success('Base de datos exportada');
      return blob
    } catch (error) {
      toast.error("Error al exportar la base de datos")
      handleError("Error al exportar la base de datos", error)
    }
  }

  async function import_database(file) {
    const replace_file_name = file.name.replace(".json", "")
    try {
      await clearDatabase()
      await importInto(db, file, {})
      update_database(replace_file_name)
      modal.showImportModal.value = false
      useEditorStore.clear_editor()
      searchTerm.value = ""
      toast.success(t("message.databaseImported"))
    } catch (error) {
      toast.error("Error al importar la base de datos")
      handleError("Error al importar la base de datos", error)
    }
  }

  async function clearDatabase() {
    await db.projects.clear()
    await db.file.clear()
    useEditorStore.clear_editor()
  }

  async function navigateDocument(direction) {
    if (!allItemsTodo.value?.length) return

    const currentIndex = allItemsTodo.value.findIndex((item) => item.id === loaded_id.value)
    let nextIndex

    if (direction === "next") {
      nextIndex = currentIndex + 1
      if (nextIndex >= allItemsTodo.value.length) {
        nextIndex = 0 // Loop back to start
      }
    } else {
      nextIndex = currentIndex - 1
      if (nextIndex < 0) {
        nextIndex = allItemsTodo.value.length - 1 // Loop to end
      }
    }

    const nextDoc = allItemsTodo.value[nextIndex]
    if (nextDoc) {
      if (hasUnsavedChanges()) {
        selectedId.value = nextDoc.id
        modal.showAlertDialog.value = true
        return
      }
      set_project(nextDoc.id)
    }
  }

  async function init_database() {
    try {
      const count = await db.file.count()
      if (count === 0) {
        await db.file.add({
          date: new Date().toISOString(),
          name: file_name.value,
        })

        if (settings.init_db_with_example_doc === true) {
          status.value = "CHANGING"
          const new_project_id = await db.projects.add({
            date: new Date().toISOString(),
            date_created: new Date().toISOString(),
            project_data: initialProjectData,
          })

          const dateStr = new Date().toISOString()
          const date = new Date(dateStr)
          const options = {
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
          const readable = date.toLocaleString("en-US", options)
          project_body.value = initialProjectData.body
          project_name.value = initialProjectData.name + readable
          project_fixed.value = initialProjectData.fixed
          project_checked.value = initialProjectData.checked
          loaded_id.value = new_project_id
          status.value = "READY"
          return
        }
        if (settings.init_db_with_example_doc === false) {
          content_editable.value = true
        }
      }
    } catch (error) {
      handleError("Error al configurar la base de datos", error)
    }
    status.value = "READY"
  }

  async function update_database(name) {
    try {
      file_name.value = name
      await db.file.update(1, {
        date: new Date().toISOString(),
        name,
      })
    } catch (error) {
      handleError("Error al actualizar la base de datos", error)
    }
  }

  function handleError(message, error) {
    console.error(message, error)
    status.value = "ERROR"
  }

  return {
    loaded_id,
    file_name,
    project_body,
    project_name,
    project_checked,
    project_fixed,
    searchTerm,
    status,
    // allItemsTodo,
    // allItemsChecked,
    navigateDocument,
    showSidebarDocuments,
    init_database,
    update_database,
    import_database,
    export_database,
    set_project,
    create_project,
    update_project,
    delete_project,
    auto_save,
    change_project_checked,
    change_project_fixed,
    content_editable,
    toggleEditable,
    clearDatabase,
    selectedId,
  }
})
