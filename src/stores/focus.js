import { ref } from "vue"
import { defineStore } from "pinia"
import { useCounterStore } from "@/stores/counter"

export const useFocusStore = defineStore("focus", () => {
  const focusTitleTextarea = ref(null)
  const focusSidebar = ref(null)
  const focusDocuments = ref(null)
  const counter = useCounterStore()

  function SetFocusTitle() {
    counter.content_editable = true
    if (focusTitleTextarea.value) {
      focusTitleTextarea?.value.focus()
    }
  }

  function setFocusSidebar() {
    focusSidebar?.value.focus()
  }

  function setFocusDocuments() {
    focusDocuments?.value.focus()
  }

  return {
    SetFocusTitle,
    setFocusSidebar,
    setFocusDocuments,
    focusTitleTextarea,
    focusSidebar,
    focusDocuments,
  }
})
