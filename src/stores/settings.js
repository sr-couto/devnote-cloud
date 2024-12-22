import { defineStore } from "pinia"

export const useSettingsStore = defineStore("settings", {
  state: () => {
    return {
      save_on_load: false,
      init_db_with_example_doc: true,
      show_heading_one_preview: false,
      media_base64: false,
    }
  },
  persist: true,
  actions: {
    toggle_save_on_load() {
      this.save_on_load = !this.save_on_load
    },
    toggle_init_db_with_example_doc() {
      this.init_db_with_example_doc = !this.init_db_with_example_doc
    },
    toggle_heading_one_preview() {
      this.show_heading_one_preview = !this.show_heading_one_preview
    },
    toggle_media_base64() {
      this.media_base64 = !this.media_base64
    },
  },
})
