import { ref } from "vue"
import { defineStore } from "pinia"

export const useModalStore = defineStore("modal", () => {
  const show_info = ref(false)
  const show_alert_unsaved_changes = ref(false)
  const show_alert_logout = ref(false)
  const show_settings = ref(false)
  const show_commandbar = ref(false)
  const show_delete_db_modal = ref(false)
  const show_delete_document_modal = ref(false)

  return {
    show_info,
    show_alert_unsaved_changes,
    show_alert_logout,
    show_settings,
    show_commandbar,
    show_delete_db_modal,
    show_delete_document_modal,
  }
})
