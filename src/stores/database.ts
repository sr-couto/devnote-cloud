import { allItemsTodo } from "@/composables/queries"
import { db } from "@/db"
import { defineStore } from "pinia"
import { ref } from "vue"
import { toast } from "vue-sonner"
import { useDocumentStore } from "@/stores/document"
import { useI18n } from "vue-i18n"
import { useModalStore } from "@/stores/modal"
import { useUnsavedChanges } from "@/composables/useUnsavedChanges"

export const useDatabaseStore = defineStore("database", () => {
  const { t } = useI18n()
  const document_store = useDocumentStore()
  const { hasUnsavedChanges } = useUnsavedChanges()
  const modal = useModalStore()
  const status = ref<"LOADING" | "READY" | "CREATING" | "CHANGING" | "ERROR">("LOADING")
  const select_id = ref("")
  const loaded_id = ref("")
  const project_name = ref("")
  const project_body = ref("")
  const project_checked = ref(false)

  async function create_project() {
    status.value = "CHANGING"
    try {
      const new_project_id = await db.projects.add({
        date: new Date().toISOString(),
        project_data: {
          body: project_body.value,
          name: project_name.value,
          checked: false,
        },
      })
      loaded_id.value = new_project_id

      toast.success("Project created with title: " + project_name.value)
    } catch (error) {
      handleError("Error al crear el proyecto", error)
    }
    status.value = "READY"
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

  async function set_project(id: string) {
    const future_id = id ? id : null
    if (future_id === loaded_id.value) return
    status.value = "CHANGING"
    try {
      const selectedState = await db.projects.get(future_id)
      if (selectedState) {
        project_body.value = selectedState.project_data.body
        project_name.value = selectedState.project_data.name
        project_checked.value = selectedState.project_data.checked
      } else {
        document_store.clear_editor()
        console.error("Selected project not found")
      }
      loaded_id.value = future_id
    } catch (error) {
      handleError("Error al seleccionar el proyecto", error)
    }
    status.value = "READY"
  }

  async function delete_project() {
    try {
      await db.projects.delete(loaded_id.value)
      document_store.clear_editor()
    } catch (error) {
      handleError("Error al eliminar el proyecto", error)
    }
  }

  function auto_save() {
    if (project_name.value === "") return
    if (status.value !== "READY") return
    update_project()
  }

  async function clear_database() {
    await db.projects.clear()
    document_store.clear_editor()
  }

  async function navigate_document(direction: "prev" | "next") {
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
        select_id.value = nextDoc.id
        modal.show_alert_unsaved_changes = true
        return
      }
      set_project(nextDoc.id)
    }
  }

  function handleError(message, error) {
    console.error(message, error)
    status.value = "ERROR"
  }

  return {
    auto_save,
    change_project_checked,
    clear_database,
    create_project,
    delete_project,
    loaded_id,
    navigate_document,
    project_body,
    project_checked,
    project_name,
    select_id,
    set_project,
    status,
    update_project,
  }
})
