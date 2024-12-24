<script setup>
import { Eye, PencilLine } from "lucide-vue-next"
import { useDocumentStore } from "@/stores/document"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"

const document = useDocumentStore()
const { t } = useI18n()
</script>

<template>
  <Tooltip
    shortcut="ctrl + alt + p"
    :name="`${document.content_editable ? t('sidebar.contentPreview') : t('sidebar.contentEditable')}`"
    :side="document.show_sidebar_documents ? 'bottom' : 'right'"
    :align="document.show_sidebar_documents ? 'end' : 'center'"
  >
    <button
      @click="document.toggle_editable()"
      class="flex items-center justify-center border interactive border-secondary ToggleEditable bg-background hover:bg-secondary/80 size-8"
    >
      <Eye class="size-4" v-show="document.content_editable" />
      <PencilLine class="size-4" v-show="!document.content_editable" />
      <span class="sr-only">{{
        document.content_editable ? t("sidebar.contentPreview") : t("sidebar.contentEditable")
      }}</span>
    </button>
  </Tooltip>
</template>
