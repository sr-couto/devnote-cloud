<script setup lang="ts">
import {
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxRoot,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  VisuallyHidden,
} from "reka-ui"

import Tooltip from "./Tooltip.vue"
import { useUnsavedChanges } from "@/composables/useUnsavedChanges"
import { nextTick } from "vue"
import { useCounterStore } from "@/stores/counter"
import { storeToRefs } from "pinia"

import { useMagicKeys, whenever, breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { useIsMobile } from "@/composables/useIsMobile"
import { Search, X } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import { useFocusStore } from "@/stores/focus"
import { useEditorStore } from "@/stores/editor"
import { useModalStore } from "@/stores/modal"
import { allItemsTodo } from "@/composables/queries"

const focus = useFocusStore()
const counter = useCounterStore()
const editor_store = useEditorStore()
const modal = useModalStore()

const { hasUnsavedChanges } = useUnsavedChanges()
const keys = useMagicKeys()
const magicCommandMenu = keys["ctrl+alt+o"]
const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanLg = breakpoints.greater("lg")
// const { allItemsTodo } = storeToRefs(counter);
const { showCommandBar } = storeToRefs(modal)
const { editor } = storeToRefs(editor_store)
const { isMobile } = useIsMobile()
const { t } = useI18n()

whenever(magicCommandMenu, (n) => {
  if (n) showCommandBar.value = true
})

// function handleSelect(id) {
//   showCommandBar.value = false
//   counter.set_project(id);
// }

function handleSelect(id) {
  if (hasUnsavedChanges()) {
    counter.selectedId = id
    modal.showAlertUnsavedChanges = true
    modal.showCommandBar = false
    return
  }
  counter.set_project(id)
  showCommandBar.value = false
}

function close() {
  showCommandBar.value = false
}

function new_document() {
  editor_store.clear_editor()
  counter.content_editable = true
  showCommandBar.value = false
  focusOnTitle()
}

const focusEditor = () => {
  counter.content_editable = true
  close()
  if (largerThanLg.value === false) {
    counter.showSidebarDocuments = false
  }
  nextTick(() => {
    editor.value.commands.focus()
  })
}

function showSettings() {
  close()
  setTimeout(() => {
    modal.showSettings = true
  }, 100)
}

function focusOnTitle() {
  counter.content_editable = true
  close()
  setTimeout(() => {
    focus.SetFocusTitle()
  }, 100)
}

function focusOnSidebar() {
  if (!focus.focusSidebar) return
  close()
  setTimeout(() => {
    focus.setFocusSidebar()
  }, 100)
}
</script>

<template>
  <DialogRoot v-model:open="showCommandBar">
    <Tooltip
      :name="t('commandBar.title')"
      :side="counter.showSidebarDocuments ? 'bottom' : 'right'"
      shortcut="ctrl + alt + o"
      :align="counter.showSidebarDocuments ? 'end' : 'center'"
    >
      <DialogTrigger
        class="flex items-center justify-center border interactive border-secondary hover:bg-secondary/80 bg-background size-8"
      >
        <Search class="size-4" />
        <span class="sr-only">{{ t("commandBar.title") }}</span>
      </DialogTrigger>
    </Tooltip>
    <DialogPortal>
      <DialogOverlay class="bg-background/80 fixed inset-0 z-[90]" />
      <DialogContent
        class="fixed top-4 md:top-[15%] left-[50%] max-h-[64rem] w-[90vw] max-w-2xl translate-x-[-50%] text-sm overflow-hidden border bg-background border-muted-foreground/30 focus:outline-none z-[100]"
      >
        <VisuallyHidden>
          <DialogTitle>{{ t("commandBar.title") }}</DialogTitle>
          <DialogDescription>{{ t("commandBar.description") }}</DialogDescription>
        </VisuallyHidden>

        <ComboboxRoot :open="true">
          <ComboboxInput
            :placeholder="`${t('verb.search')}&hellip;`"
            auto-focus
            class="sticky top-0 right-0 font-mono bg-background border-b border-secondary w-full px-4 py-3 text-foreground outline-none placeholder-muted-foreground !select-all"
            @keydown.enter.prevent
          />
          <ComboboxContent
            class="border-t border-muted-foreground/30 p-2 overflow-y-auto h-96"
            @escape-key-down="showCommandBar = false"
          >
            <ComboboxEmpty class="text-center text-muted-foreground p-4">
              {{ t("sidebar.noResults") }}
            </ComboboxEmpty>
            <ComboboxGroup>
              <ComboboxLabel class="px-4 text-muted-foreground font-semibold mt-3 mb-3 font-mono">
                {{ t("commandBar.documents") }}
              </ComboboxLabel>
              <ComboboxItem
                v-for="item in allItemsTodo"
                :key="item.id"
                @select="handleSelect(item.id)"
                :value="item.project_data.name || item.id"
                class="cursor-default font-mono text-xs px-4 py-2 rounded-md text-foreground data-[highlighted]:bg-muted inline-flex w-full items-center gap-4"
              >
                <span>{{ item.project_data.name || item.id }}</span>
              </ComboboxItem>
            </ComboboxGroup>
            <ComboboxGroup class="mt-6">
              <ComboboxLabel class="px-4 text-muted-foreground font-semibold mt-3 mb-3 font-mono">
                {{ t("commandBar.actions") }}
              </ComboboxLabel>
              <ComboboxItem
                :value="t('sidebar.newDocument')"
                @select="new_document()"
                class="cursor-default font-mono text-xs px-4 py-2 rounded-md text-foreground data-[highlighted]:bg-muted inline-flex w-full items-center gap-4"
              >
                <span>{{ t("sidebar.newDocument") }}</span>
              </ComboboxItem>
              <ComboboxItem
                value="importar db"
                @select="modal.showImportModal = true"
                class="cursor-default justify-between font-mono text-xs px-4 py-2 rounded-md data-[highlighted]:bg-muted inline-flex w-full items-center gap-4"
              >
                <span class="text-foreground">{{ t("settings.import") }}</span>
                <span
                  class="inline-flex bg-primary text-primary-foreground px-1 rounded p-0.5 !text-xs"
                >
                  <kbd>ctrl alt I</kbd>
                </span>
              </ComboboxItem>
              <ComboboxItem
                value="exportar db"
                @select="modal.showShareModal = true"
                class="cursor-default justify-between font-mono text-xs px-4 py-2 rounded-md data-[highlighted]:bg-muted inline-flex w-full items-center gap-4"
              >
                <span class="text-foreground">{{ t("settings.export") }}</span>
                <span
                  class="inline-flex bg-primary text-primary-foreground px-1 rounded p-0.5 !text-xs"
                >
                  <kbd>ctrl alt E</kbd>
                </span>
              </ComboboxItem>
              <ComboboxItem
                :value="`${t('verb.open')} ${t('settings.title')}`"
                @select="showSettings()"
                class="cursor-default font-mono text-xs px-4 py-2 rounded-md data-[highlighted]:bg-muted inline-flex w-full items-center gap-4"
              >
                <span class="text-foreground"> {{ t("verb.open") }} {{ t("settings.title") }}</span>
              </ComboboxItem>
            </ComboboxGroup>
            <ComboboxGroup v-if="!isMobile">
              <ComboboxLabel class="px-4 text-muted-foreground font-semibold mt-3 mb-3 font-mono">
                Focus
              </ComboboxLabel>
              <ComboboxItem
                :value="t('commandBar.focusSidebar')"
                @select="focusOnSidebar()"
                class="cursor-default justify-between font-mono text-xs px-4 py-2 rounded-md data-[highlighted]:bg-muted inline-flex w-full items-center gap-4"
              >
                <span class="text-foreground">{{ t("commandBar.focusSidebar") }}</span>
                <span
                  class="inline-flex bg-primary text-primary-foreground px-1 rounded p-0.5 !text-xs"
                >
                  <kbd>ctrl shift alt &larr;</kbd>
                </span>
              </ComboboxItem>
              <ComboboxItem
                :value="t('commandBar.focusTitle')"
                @select="focusOnTitle()"
                class="cursor-default justify-between font-mono text-xs px-4 py-2 rounded-md data-[highlighted]:bg-muted inline-flex w-full items-center gap-4"
              >
                <span class="text-foreground">{{ t("commandBar.focusTitle") }}</span>
                <span
                  class="inline-flex bg-primary text-primary-foreground px-1 rounded p-0.5 !text-xs"
                >
                  <kbd>ctrl shift alt &rarr;</kbd>
                </span>
              </ComboboxItem>
              <ComboboxItem
                :value="t('commandBar.focusEditor')"
                v-if="!isMobile"
                @select="focusEditor()"
                class="cursor-default justify-between font-mono text-xs px-4 py-2 rounded-md text-foreground data-[highlighted]:bg-muted inline-flex w-full items-center gap-4"
              >
                <span>{{ t("commandBar.focusEditor") }}</span>
                <span
                  class="inline-flex bg-primary text-primary-foreground px-1 rounded p-0.5 !text-xs"
                >
                  <kbd>ctrl shift alt &darr;</kbd>
                </span>
              </ComboboxItem>
            </ComboboxGroup>
          </ComboboxContent>
        </ComboboxRoot>
        <button
          @click="close"
          class="absolute top-0 size-6 flex justify-center items-center m-3 right-0 z-[999] text-foreground"
        >
          <X class="size-4" />
        </button>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
