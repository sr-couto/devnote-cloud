<script setup>
import {
  AlertDialogRoot,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "reka-ui"
import { useModalStore } from "@/stores/modal"
import { useCounterStore } from "@/stores/counter"
import { useFocusStore } from "@/stores/focus"
const focus = useFocusStore()
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { X } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
const modal = useModalStore()

const counter = useCounterStore()
const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanLg = breakpoints.greater("lg")
const { t } = useI18n()

function set_document(id) {
  if (largerThanLg.value === true) {
    counter.set_project(id)
  } else {
    counter.set_project(id)
    counter.showSidebarDocuments = false
  }
}

function focusOnTitle() {
  counter.content_editable = true
  if (largerThanLg.value === false) {
    counter.showSidebarDocuments = false
  }
  modal.showCommandBar = false
  modal.showAlertUnsavedChanges = false
  setTimeout(() => {
    focus.SetFocusTitle()
  }, 100)
}
</script>

<template>
  <AlertDialogRoot v-model:open="modal.showAlertUnsavedChanges">
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
              @click="set_document(counter.selectedId)"
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
        <AlertDialogCancel
          class="absolute top-0 size-6 flex justify-center items-center m-3 right-0 z-[999] text-foreground"
        >
          <X class="size-4" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
