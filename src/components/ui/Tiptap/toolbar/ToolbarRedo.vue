<script setup lang="ts">
import { ToolbarButton } from "reka-ui"

import { storeToRefs } from "pinia"

import { Redo2 } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"
import { useEditorStore } from "@/stores/editor"
const document = useEditorStore()
const { editor } = storeToRefs(document)
const { t } = useI18n()
</script>

<template>
  <Tooltip :name="t('toolbar.redo')" side="bottom">
    <ToolbarButton
      class="flex items-center justify-center border outline-none size-8 focus-visible:border-primary border-secondary"
      @click="editor.chain().focus().redo().run()"
      :disabled="!editor.can().chain().focus().redo().run()"
      :value="t('toolbar.redo')"
    >
      <Redo2 class="size-4" />
      <span class="sr-only">{{ t("toolbar.redo") }}</span>
    </ToolbarButton>
  </Tooltip>
</template>
