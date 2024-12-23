import { ref } from "vue"
import { defineStore } from "pinia"

export const useModalStore = defineStore("modal", () => {
  // const counter = useCounterStore();
  const showImportModal = ref(false)
  const showShareModal = ref(false)
  const showInfoModal = ref(false)
  const showAlertUnsavedChanges = ref(false)
  const showAlertLogout = ref(false)
  const showSettings = ref(false)
  const showCommandBar = ref(false)
  return {
    showImportModal,
    showShareModal,
    showInfoModal,
    showAlertUnsavedChanges,
    showAlertLogout,
    showSettings,
    showCommandBar,
  }
})
