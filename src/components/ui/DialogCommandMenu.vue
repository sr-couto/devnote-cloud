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

import { allItemsTodo } from "@/composables/queries"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { nextTick } from "vue"
import { Search, X } from "lucide-vue-next"
import { storeToRefs } from "pinia"
import { useDatabaseStore } from "@/stores/database"
import { useDocumentStore } from "@/stores/document"
import { useEditorStore } from "@/stores/editor"
import { useFocusStore } from "@/stores/focus"
import { useI18n } from "vue-i18n"
import { useIsMobile } from "@/composables/useIsMobile"
import { useModalStore } from "@/stores/modal"
import { useUnsavedChanges } from "@/composables/useUnsavedChanges"
import Tooltip from "./Tooltip.vue"

const focus = useFocusStore()
const db_store = useDatabaseStore()
const editor_store = useEditorStore()
const document = useDocumentStore()
const modal = useModalStore()

const { hasUnsavedChanges } = useUnsavedChanges()

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanLg = breakpoints.greater("lg")

const { editor } = storeToRefs(editor_store)
const { isMobile } = useIsMobile()
const { t } = useI18n()

function close() {
  modal.show_commandbar = false
}

function set_document(id) {
  modal.show_commandbar = false
  if (hasUnsavedChanges()) {
    db_store.select_id = id
    modal.show_alert_unsaved_changes = true
  } else {
    db_store.set_project(id)
  }
  return
}

function new_document() {
  document.clear_editor()
  document.content_editable = true
  modal.show_commandbar = false
  focusOnTitle()
}

const focusEditor = () => {
  document.content_editable = true
  close()
  if (largerThanLg.value === false) {
    document.show_sidebar_documents = false
  }
  nextTick(() => {
    editor.value.commands.focus()
  })
}

function show_settings() {
  close()
  setTimeout(() => {
    modal.show_settings = true
  }, 100)
}

function focusOnTitle() {
  document.content_editable = true
  close()
  setTimeout(() => {
    focus.SetFocusTitle()
  }, 100)
}

function focusOnSidebar() {
  if (!focus.focus_sidebar) return
  close()
  setTimeout(() => {
    focus.setFocusSidebar()
  }, 100)
}
</script>

<template>
  <DialogRoot v-model:open="modal.show_commandbar">
    <Tooltip
      :name="t('commandBar.title')"
      :side="document.show_sidebar_documents ? 'bottom' : 'right'"
      shortcut="ctrl + alt + o"
      :align="document.show_sidebar_documents ? 'end' : 'center'"
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
            @escape-key-down="modal.show_commandbar = false"
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
                @select="set_document(item.id)"
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
                :value="`${t('verb.open')} ${t('settings.title')}`"
                @select="show_settings()"
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
                  <kbd>ctrl shift alt e</kbd>
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
