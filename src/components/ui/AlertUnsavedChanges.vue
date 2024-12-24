<script setup lang="ts">
import { useI18n } from "vue-i18n"
const { t } = useI18n()

import {
  AlertDialogRoot,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "reka-ui"

import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { useDatabaseStore } from "@/stores/database"
import { useDocumentStore } from "@/stores/document"
import { useFocusStore } from "@/stores/focus"
import { useModalStore } from "@/stores/modal"

const focus = useFocusStore()
const document = useDocumentStore()
const modal = useModalStore()
const db_store = useDatabaseStore()
const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanLg = breakpoints.greater("lg")

function set_document(id) {
  if (largerThanLg.value === false) {
    document.show_sidebar_documents = false
  }
  db_store.set_project(id)
}

function focusOnTitle() {
  if (largerThanLg.value === false) {
    document.show_sidebar_documents = false
  }
  db_store.select_id = ""
  document.content_editable = true
  modal.show_commandbar = false
  modal.show_alert_unsaved_changes = false
  setTimeout(() => {
    focus.SetFocusTitle()
  }, 1)
}
</script>

<template>
  <AlertDialogRoot v-model:open="modal.show_alert_unsaved_changes">
    <AlertDialogPortal>
      <AlertDialogOverlay class="fixed inset-0 z-[999] bg-black/80" />
      <AlertDialogContent
        class="fixed z-[999] w-[95vw] max-w-md rounded-lg p-4 md:w-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-background text-foreground border border-secondary font-mono"
      >
        <AlertDialogTitle class="text-sm font-medium">
          {{ t("message.unsavedChanges") }}
        </AlertDialogTitle>
        <AlertDialogDescription class="mt-2 mb-5 text-xs">
          {{ t("message.unsavedChangesDescription") }}
        </AlertDialogDescription>
        <div class="flex justify-between gap-x-2">
          <AlertDialogAction as-child>
            <button
              @click="set_document(db_store.select_id)"
              class="bg-red-600 text-white hover:bg-red-800 outline-none inline-flex ring-0 hover:ring-2 ring-red-600 h-[35px] items-center justify-center rounded-[4px] px-3 text-xs font-semibold leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {{ t("message.discardChanges") }}
            </button>
          </AlertDialogAction>
          <button
            @click="focusOnTitle()"
            class="bg-secondary ring-1 !ring-secondary text-foreground hover:bg-background hover:ring-2 hover:ring-foreground inline-flex h-[35px] items-center justify-center rounded-[4px] px-3 text-xs font-semibold leading-none focus-visible:ring-2 focus:outline-foreground"
          >
            {{ t("message.continueEditing") }}
          </button>
        </div>
        <!-- <AlertDialogCancel
          class="absolute top-0 size-6 flex justify-center items-center m-3 right-0 z-[999] text-foreground"
        >
          <X class="size-4" />
        </AlertDialogCancel> -->
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
