<script setup>
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "reka-ui"
import Tooltip from "@/components/ui/Tooltip.vue"

import { shallowRef } from "vue"
import { storeToRefs } from "pinia"
import { useCounterStore } from "@/stores/counter"
import { useModalStore } from "@/stores/modal"

import { useMagicKeys, whenever } from "@vueuse/core"
import { Upload, X } from "lucide-vue-next"
import { useI18n } from "vue-i18n"

const modal = useModalStore()
const counter = useCounterStore()
const { file_name } = storeToRefs(counter)
const { showShareModal } = storeToRefs(modal)
const input = shallowRef(file_name)

const keys = useMagicKeys()
const magicShareDB = keys["ctrl+alt+e"]
const { t } = useI18n()

whenever(magicShareDB, (n) => {
  if (n) modal.showShareModal = true
})
</script>

<template>
  <DialogRoot v-model:open="showShareModal">
    <Tooltip shortcut="ctrl+alt+e" side="top">
      <DialogTrigger
        class="flex items-center justify-center h-12 gap-2 px-2 text-xs border outline-none border-secondary bg-background hover:bg-background/50 focus-visible:border-primary focus-visible:bg-primary/10"
        aria-label="Update dimensions"
      >
        <Upload class="size-4" />
        <span class="">{{ t("settings.export") }}</span>
      </DialogTrigger>
    </Tooltip>
    <DialogPortal>
      <DialogOverlay class="bg-secondary/90 fixed inset-0 z-[200]" />
      <DialogContent
        class="font-mono fixed top-24 md:top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-3 md:p-6 md:pt-4 shadow focus:outline-none z-[99999]"
      >
        <DialogTitle
          class="text-foreground flex items-center justify-start gap-3 m-0 text-[17px] font-semibold"
        >
          <Upload class="size-5" />
          {{ t("settings.export") }}
        </DialogTitle>
        <DialogDescription class="mt-6 mb-2 text-sm text-foreground">
          {{ t("exportDB.description") }}
        </DialogDescription>
        <div class="flex gap-2 mb-2">
          <input
            type="text"
            class="w-full h-9 px-2 border bg-background text-foreground border-border outline-none focus:ring-1 focus:ring-primary"
            v-model="input"
          />
          <button
            class="bg-primary shrink-0 border-secondary border text-primary-foreground hover:bg-backgorund/80 text-xs inline-flex h-9 items-center justify-center rounded px-[15px] font-semibold focus:outline-2 focus:outline-foreground focus:outline-dashed gap-3 focus:outline-offset-2"
            @click="counter.export_database(input.value)"
          >
            {{ t("settings.export") }}
          </button>
        </div>
        <DialogClose
          class="absolute top-0 size-6 flex justify-center items-center m-3 right-0 z-[999] text-foreground"
        >
          <X class="size-4" />
          <span class="sr-only">{{ t("verb.close") }}</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
