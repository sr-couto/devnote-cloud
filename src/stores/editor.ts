import { ref } from "vue"
import { defineStore } from "pinia"

export const useEditorStore = defineStore("editor_tiptap", () => {
  const editor = ref(null)
  return {
    editor,
  }
})
