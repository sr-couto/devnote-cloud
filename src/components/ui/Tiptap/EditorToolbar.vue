<script setup lang="ts">
import { ToolbarRoot } from "reka-ui"
import { storeToRefs } from "pinia"
import { useEditorStore } from "@/stores/editor"
const editor_store = useEditorStore()
const { editor } = storeToRefs(editor_store)

import ToolbarHeadingSelector from "./toolbar/ToolbarHeadingSelector.vue"
import ToolbarTable from "./toolbar/ToolbarTable.vue"
import ToolbarUndo from "./toolbar/ToolbarUndo.vue"
import ToolbarRedo from "./toolbar/ToolbarRedo.vue"
import ToolbarMedia from "./toolbar/ToolbarMedia.vue"
import ToolbarCharacters from "./toolbar/ToolbarCharacters.vue"
import ToolbarTextAlign from "./toolbar/ToolbarTextAlign.vue"
import ToolbarList from "./toolbar/ToolbarList.vue"
import ToolbarQuote from "./toolbar/ToolbarQuote.vue"
import ToolbarSeparator from "./toolbar/ToolbarSeparator.vue"
import ToolbarInlineCode from "./toolbar/ToolbarInlineCode.vue"
import ToolbarCodeBlock from "./toolbar/ToolbarCodeBlock.vue"
import ToolbarLinks from "./toolbar/ToolbarLinks.vue"
import ToolbarClear from "./toolbar/ToolbarClear.vue"
</script>

<template>
  <div class="pt-1 z-10 relative bg-background print:hidden" v-if="editor">
    <div class="relative grid w-full max-w-full gap-1 mx-auto control-group">
      <ToolbarRoot class="flex justify-start select-none mb-1.5 button-group md:w-auto">
        <ToolbarHeadingSelector />
        <ToolbarUndo />
        <ToolbarRedo />
        <ToolbarMedia />
        <ToolbarCharacters />
        <ToolbarTextAlign />
        <ToolbarList />
        <ToolbarQuote />
        <ToolbarSeparator />
        <ToolbarInlineCode />
        <ToolbarCodeBlock />
        <ToolbarLinks />
        <ToolbarTable />
        <ToolbarClear />
      </ToolbarRoot>
    </div>
  </div>
</template>

<style>
.button-group {
  @apply bg-background flex flex-wrap w-full;
}

.button-group button {
  @apply border border-secondary focus-within:border-primary outline-none h-[2.1rem] min-w-7 max-w-7 xl:max-w-full xl:flex-1 text-sm focus-visible:border-primary hover:!border-primary flex justify-center items-center duration-100;
  /* @apply @sm:bg-blue-600 @xs:bg-purple-600 @md:bg-yellow-600 @lg:bg-pink-600 @3xl:bg-gray-600 @xl:bg-red-600 @2xl:bg-green-600 @4xl:bg-red-600 @5xl:bg-emerald-600 */
  /* flex: 1; */
}

.control-group button {
  @apply disabled:text-foreground/30 disabled:pointer-events-none;
}

.button-group button.is-active {
  @apply bg-primary text-primary-foreground;
}

.button-group button svg {
  @apply size-3.5;
}

body:has(.cursor_pointer) label {
  cursor: pointer;
}
</style>
