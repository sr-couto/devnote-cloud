<script setup>
import { shallowRef, watch } from "vue"
import { storeToRefs } from "pinia"
import SidebarTop from "@/components/SidebarTop.vue"
import SidebarProjects from "@/components/SidebarProjects.vue"
import { useModalStore } from "@/stores/modal"
import { useCounterStore } from "@/stores/counter"
import { useFocusStore } from "@/stores/focus"
import { useEditorStore } from "@/stores/editor"
import { useDropZone, useMagicKeys, whenever } from "@vueuse/core"
import { useI18n } from "vue-i18n"

const counter = useCounterStore()
const modal = useModalStore()
const document = useEditorStore()
const focus = useFocusStore()
const dropZoneRef = shallowRef()
const keys = useMagicKeys()
const { editor } = storeToRefs(document)
const { isOverDropZone } = useDropZone(dropZoneRef)
const { t } = useI18n()

const magicFocusSidebar = keys["ctrl+shift+alt+ArrowLeft"]
whenever(magicFocusSidebar, (n) => {
  if (n) focus.setFocusSidebar()
})

const magicFocusTitle = keys["ctrl+shift+alt+ArrowRight"]
whenever(magicFocusTitle, (n) => {
  if (n) focus.SetFocusTitle()
})

const magicFocusEditor = keys["ctrl+shift+alt+ArrowDown"]
whenever(magicFocusEditor, (n) => {
  if (n) editor.value.commands.focus()
})

const magicEditorToolbar = keys["ctrl+shift+alt+ArrowUp"]
whenever(magicEditorToolbar, (n) => {
  if (n) useEditorStore.showEditorToolbar = !useEditorStore.showEditorToolbar
})

watch(isOverDropZone, (v) => {
  if (v) modal.showImportModal = !modal.showImportModal
})
</script>

<template>
  <div>
    <header
      ref="dropZoneRef"
      class="fixed top-0 print:hidden z-[60] !select-none flex flex-col justify-start h-screen border-r lg:sticky bg-background border-secondary focus-within:ring-1 focus-within:ring-primary/50"
      :class="counter.showSidebarDocuments ? 'min-w-80 max-w-80' : ' '"
    >
      <SidebarTop />
      <SidebarProjects v-show="counter.showSidebarDocuments" />
      <!-- <SidebarBottom  v-show="counter.showSidebarDocuments" /> -->
    </header>
    <button
      v-show="counter.showSidebarDocuments"
      @click="counter.showSidebarDocuments = !counter.showSidebarDocuments"
      class="fixed inset-0 print:hidden !z-[51] bg-background/90 !border-0 !ring-0 !outline-none lg:hidden"
    >
      <span class="sr-only">{{ t("verb.close") }} panel</span>
    </button>
  </div>
</template>
