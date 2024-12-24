<script setup lang="ts">
import { useI18n } from "vue-i18n"
const { t } = useI18n()

import SettingCursor from "./SettingCursor.vue"
import SettingTour from "./SettingTour.vue"
import SettingTheme from "./SettingTheme.vue"
import SettingAppSize from "./SettingAppSize.vue"
import SettingLanguage from "./SettingLanguage.vue"
import SettingMainTitle from "./SettingMainTitle.vue"
import SettingDeleteDB from "./SettingDeleteDB.vue"

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "reka-ui"

import Tooltip from "@/components/ui/Tooltip.vue"
import { useModalStore } from "@/stores/modal"
import { useDocumentStore } from "@/stores/document"
import { storeToRefs } from "pinia"
import { X, Settings2 } from "lucide-vue-next"
import { useIsMobile } from "@/composables/useIsMobile"

const modal = useModalStore()
const document = useDocumentStore()
const { isMobile } = useIsMobile()
const { show_settings } = storeToRefs(modal)
</script>

<template>
  <DialogRoot v-model:open="show_settings">
    <Tooltip
      :name="t('settings.title')"
      :side="document.show_sidebar_documents ? 'bottom' : 'right'"
    >
      <DialogTrigger
        class="flex items-center justify-center border interactive border-secondary hover:bg-secondary/80 bg-background size-8"
      >
        <Settings2 class="size-4" />
        <span class="sr-only">{{ t("settings.titleDescription") }}</span>
      </DialogTrigger>
    </Tooltip>
    <DialogPortal>
      <DialogOverlay class="bg-background/90 fixed inset-0 z-[60]" />
      <DialogContent
        class="font-mono fixed top-6 md:top-[50%] left-[50%] max-h-[85vh] w-[98vw] max-w-4xl translate-x-[-50%] md:translate-y-[-50%] bg-background rounded py-4 md:p-4 focus:outline-none z-[100]"
      >
        <DialogTitle class="text-foreground px-3 md:px-0 m-0 text-[17px] font-semibold">
          {{ t("settings.title") }}
        </DialogTitle>
        <DialogDescription class="mt-1 text-sm px-3 md:px-0 text-muted-foreground">
          {{ t("settings.titleDescription") }}
          <span>{{ isMobile ? "touch" : t("settings.mouseKeyboard") }}.</span>
        </DialogDescription>
        <ScrollAreaRoot
          class="w-full border h-[85vh] sm:h-[78vh] mt-6 md:h-[70vh] group border-secondary"
          style="--scrollbar-size: 10px"
        >
          <ScrollAreaViewport
            class="w-full h-full group-focus-within:ring-primary/70 group-focus-within:ring-1 focus:!ring-primary focus:!ring-2 outline-none"
          >
            <article class="max-w-full p-3 mx-auto prose dark:prose-invert">
              <div class="grid gap-2">
                <h4 class="mt-2 mb-0 text-xs text-primary">
                  {{ t("settings.perspective") }}
                </h4>
                <SettingLanguage />
                <SettingTour v-if="!isMobile" />
                <SettingCursor v-if="!isMobile" />
                <SettingTheme />
                <SettingAppSize />
                <SettingMainTitle />
                <h4 class="mt-2 mb-0 text-xs text-primary">
                  {{ t("settings.database") }}
                </h4>
                <h4 class="mt-2 mb-0 text-xs text-red-600">
                  {{ t("settings.attention") }}
                </h4>
                <SettingDeleteDB />
              </div>
            </article>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar
            class="flex select-none touch-none p-0.5 bg-secondary transition-colors duration-[160ms] ease-out hover:bg-background data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="vertical"
          >
            <ScrollAreaThumb
              class="flex-1 bg-primary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
            />
          </ScrollAreaScrollbar>
        </ScrollAreaRoot>
        <DialogClose
          class="absolute inline-flex items-center justify-center appearance-none top-4 text-foreground hover:bg-secondary/80 right-3 size-7 focus:shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:text-primary"
          aria-label="Close"
        >
          <X />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
