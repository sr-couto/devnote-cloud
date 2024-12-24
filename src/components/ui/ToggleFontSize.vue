<script setup>
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "reka-ui"
import Tooltip from "@/components/ui/Tooltip.vue"

import { onMounted } from "vue"
import { useDocumentStore } from "@/stores/document"

import { useStorage } from "@vueuse/core"
import { AArrowUp, AArrowDown } from "lucide-vue-next"
import { useI18n } from "vue-i18n"

const document_store = useDocumentStore()
const appFontSize = useStorage("appFontSize", "app-font-size-md")
const { t } = useI18n()

const toggleFontSize = (size) => {
  document.body.classList.remove(appFontSize.value)
  document.body.classList.add(size)
  appFontSize.value = size
}

onMounted(() => {
  toggleFontSize(appFontSize.value)
})
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger class="interactive">
      <Tooltip
        :name="t('settings.fontsize')"
        :side="document_store.show_sidebar_documents ? 'bottom' : 'right'"
        :align="'end'"
      >
        <span
          class="flex items-center justify-center border hover:bg-secondary/80 border-secondary bg-background size-8"
        >
          <AArrowDown class="AArrowDown size-5" />
          <AArrowUp class="AArrowUp size-5" />
          <span class="sr-only"> {{ t("settings.fontsizeDescription") }}</span>
        </span>
      </Tooltip>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      :side="document_store.show_sidebar_documents ? 'bottom' : 'right'"
      :align="document_store.show_sidebar_documents ? 'end' : 'start'"
      class="z-10 grid w-44 text-xs bg-secondary"
    >
      <DropdownMenuGroup>
        <DropdownMenuItem
          @click="toggleFontSize('app-font-size-xs')"
          class="p-2 flex justify-between w-full hover:bg-secondary-foreground/10"
          :class="appFontSize === 'app-font-size-xs' ? 'text-primary' : ''"
        >
          <span>{{ t("settings.fontsizexs") }} </span>
          <span class="opacity-50 scale-90">.75rem</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="toggleFontSize('app-font-size-sm')"
          class="p-2 flex justify-between w-full hover:bg-secondary-foreground/10"
          :class="appFontSize === 'app-font-size-sm' ? 'text-primary' : ''"
        >
          <span>{{ t("settings.fontsizesm") }} </span>
          <span class="opacity-50 scale-90">.875rem</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="toggleFontSize('app-font-size-md')"
          class="p-2 flex justify-between w-full hover:bg-secondary-foreground/10"
          :class="appFontSize === 'app-font-size-md' ? 'text-primary' : ''"
        >
          <span>{{ t("settings.fontsizemd") }} </span>
          <span class="opacity-50 scale-90"> 1rem</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="toggleFontSize('app-font-size-lg')"
          class="p-2 flex justify-between w-full hover:bg-secondary-foreground/10"
          :class="appFontSize === 'app-font-size-lg' ? 'text-primary' : ''"
        >
          <span>{{ t("settings.fontsizelg") }} </span>
          <span class="opacity-50 scale-90">1.125rem</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="toggleFontSize('app-font-size-xl')"
          class="p-2 flex justify-between w-full hover:bg-secondary-foreground/10"
          :class="appFontSize === 'app-font-size-xl' ? 'text-primary' : ''"
        >
          <span>{{ t("settings.fontsizexl") }} </span>
          <span class="opacity-50 scale-90">1.25rem</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>

<style scoped>
.interactive[data-state="open"] {
  @apply text-primary;
}

.interactive[data-state="open"] .AArrowDown {
  @apply !flex;
}

.interactive[data-state="closed"] .AArrowDown {
  @apply !hidden;
}

.interactive[data-state="open"] .AArrowUp {
  @apply !hidden;
}

.interactive[data-state="closed"] .AArrowUp {
  @apply !flex;
}
</style>
