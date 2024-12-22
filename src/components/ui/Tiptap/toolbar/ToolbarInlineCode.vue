<script setup>
import { ToolbarButton } from "reka-ui"

import { useEditorStore } from "@/stores/editor"
import { storeToRefs } from "pinia"

import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"

const document = useEditorStore()
const { editor } = storeToRefs(document)
const { t } = useI18n()
</script>

<template>
  <Tooltip :name="t('toolbar.code')" side="bottom" shortcut="Ctrl E">
    <ToolbarButton
      @click="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('code') }"
      class="font-mono interactive !text-base"
      :value="t('toolbar.code')"
    >
      <span
        class="flex items-center justify-center text-xs rounded size-5 bg-secondary/30 text-inherit"
      >
        M
      </span>
      <span class="sr-only">{{ t("toolbar.code") }}</span>
    </ToolbarButton>
  </Tooltip>
</template>
