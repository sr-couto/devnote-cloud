<script setup lang="ts">
import { ArrowRightToLine, ArrowLeftToLine } from "lucide-vue-next"
import { storeToRefs } from "pinia"
import { useDocumentStore } from "@/stores/document"
import { useFocusStore } from "@/stores/focus"
import { useI18n } from "vue-i18n"
import ButtonCreateDocumentCollapse from "@/components/ui/ButtonCreateDocumentCollapse.vue"
import DialogCommandMenu from "@/components/ui/DialogCommandMenu.vue"
import DialogInfo from "@/components/ui/DialogInfo.vue"
import DialogSettings from "@/components/ui/Settings/DialogSettings.vue"
import DropdownLogo from "@/components/ui/DropdownLogo.vue"
import ToggleEditable from "@/components/ui/ToggleEditable.vue"
import ToggleFontSize from "@/components/ui/ToggleFontSize.vue"
import ToggleTheme from "@/components/ui/ToggleTheme.vue"
import Tooltip from "@/components/ui/Tooltip.vue"

const focus = useFocusStore()
const document = useDocumentStore()
const { focus_sidebar } = storeToRefs(focus)
const { t } = useI18n()
</script>

<template>
  <div
    class="flex items-center justify-between mt-0.5 group focus:outline-none focus:outline-primary focus:outline-offset-2"
    :class="document.show_sidebar_documents ? 'ml-1 mr-1.5' : ' flex-col px-1'"
    ref="focus_sidebar"
    tabindex="-1"
  >
    <DropdownLogo />
    <div
      class="grid"
      :class="document.show_sidebar_documents ? 'grid-cols-6 gap-0.5' : ' grid-cols-1 gap-1 mt-1'"
    >
      <DialogInfo />
      <ButtonCreateDocumentCollapse v-if="!document.show_sidebar_documents" />
      <DialogSettings />
      <ToggleTheme />
      <ToggleFontSize />
      <DialogCommandMenu />
      <ToggleEditable />
      <Tooltip
        shortcut="Ctrl M"
        :name="`${t('verb.close')} panel`"
        :align="document.show_sidebar_documents ? 'end' : 'center'"
        :side="document.show_sidebar_documents ? 'bottom' : 'right'"
      >
        <button
          v-show="document.show_sidebar_documents"
          @click="document.show_sidebar_documents = !document.show_sidebar_documents"
          class="flex items-center justify-center border interactive border-secondary bg-background hover:bg-secondary/80 size-8"
        >
          <ArrowLeftToLine class="size-4" />
          <span class="sr-only">{{ t("verb.close") }} panel</span>
        </button>
      </Tooltip>
    </div>
    <Tooltip
      v-if="!document.show_sidebar_documents"
      name="Abrir menú"
      :align="'end'"
      side="right"
      :align-offset="18"
    >
      <button
        @click="document.show_sidebar_documents = !document.show_sidebar_documents"
        class="absolute flex flex-col justify-end items-center z-10 inset-1 py-2 md:py-5 bottom-2 hover:!border-1 top-[16.5rem]"
      >
        <ArrowRightToLine class="mx-auto duration-100 opacity-25 size-4 group-hover:opacity-90" />
        <span class="sr-only">{{ t("verb.close") }} panel</span>
      </button>
    </Tooltip>
  </div>
</template>
