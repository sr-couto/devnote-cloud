import { ref } from "vue"
import { defineStore } from "pinia"
import { useDocumentStore } from "@/stores/document"

export const useFocusStore = defineStore("focus", () => {
  const focus_title_textarea = ref(null)
  const focus_sidebar = ref(null)
  const focus_documents = ref(null)
  const document = useDocumentStore()

  function SetFocusTitle() {
    document.content_editable = true
    if (focus_title_textarea.value) {
      focus_title_textarea?.value.focus()
    }
  }

  function setFocusSidebar() {
    focus_sidebar?.value.focus()
  }

  function setFocusDocuments() {
    focus_documents?.value.focus()
  }

  return {
    SetFocusTitle,
    setFocusSidebar,
    setFocusDocuments,
    focus_title_textarea,
    focus_sidebar,
    focus_documents,
  }
})
