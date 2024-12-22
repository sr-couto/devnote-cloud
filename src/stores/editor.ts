import { ref } from "vue"
import { defineStore } from "pinia"
import { useCounterStore } from "@/stores/counter"

export const useEditorStore = defineStore("editor_store", () => {
  const counter = useCounterStore()
  const showEditorToolbar = ref(true)
  const editor = ref(null)

  function clear_editor() {
    counter.loaded_id = ""
    counter.project_name = ""
    counter.project_body = ""
  }

  return {
    editor,
    showEditorToolbar,
    clear_editor,
  }
})
