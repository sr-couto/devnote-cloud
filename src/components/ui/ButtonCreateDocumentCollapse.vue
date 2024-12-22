<script setup lang="ts">
import { useCounterStore } from "@/stores/counter"
import { useEditorStore } from "@/stores/editor"
import { storeToRefs } from "pinia"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { Plus } from "lucide-vue-next"
import { useI18n } from "vue-i18n"

const counter = useCounterStore()
const editor_store = useEditorStore()
const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanLg = breakpoints.greater("lg")
const { loaded_id } = storeToRefs(counter)
const { t } = useI18n()

function new_document() {
  if (largerThanLg.value === true) {
    editor_store.clear_editor()
    counter.content_editable = true
  } else {
    editor_store.clear_editor()
    counter.showSidebarDocuments = false
    counter.content_editable = true
  }
  focusOnTitle()
}

function focusOnTitle() {
  setTimeout(() => {
    counter.SetFocusTitle()
  }, 100)
}
</script>

<template>
  <button
    @click="new_document()"
    class="CreateNewButton flex items-center justify-center gap-2 text-xs size-8 w-full text-left bg-primary focus-within:ring-1 ring-primary text-primary-foreground"
    :class="{
      '!bg-secondary !ring-secondary !text-primary-foreground': loaded_id === null,
      '!bg-secondary/30 !text-primary ': loaded_id === '',
    }"
  >
    <Plus class="size-4" />
    <span class="sr-only">{{ t("sidebar.newDocument") }}</span>
  </button>
</template>
