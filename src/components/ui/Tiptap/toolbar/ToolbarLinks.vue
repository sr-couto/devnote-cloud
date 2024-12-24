<script setup lang="ts">
import { ToolbarButton } from "reka-ui"

import { useEditorStore } from "@/stores/editor"
import { storeToRefs } from "pinia"
import { useSetLink } from "@/composables/useSetLink"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"
import { Link2, Unlink2 } from "lucide-vue-next"

const document = useEditorStore()
const { editor } = storeToRefs(document)
const { t } = useI18n()

const { setLink } = useSetLink(editor)
</script>

<template>
  <Tooltip :name="t('toolbar.link')" side="bottom">
    <ToolbarButton
      @click="setLink"
      :class="{ 'is-active': editor.isActive('link') }"
      class="interactive"
      :value="t('toolbar.link')"
    >
      <Link2 class="-rotate-45" />
      <span class="sr-only">{{ t("toolbar.link") }}</span>
    </ToolbarButton>
  </Tooltip>
  <Tooltip :name="t('toolbar.unlink')" side="bottom">
    <ToolbarButton
      @click="editor.chain().focus().unsetLink().run()"
      :disabled="!editor.isActive('link')"
      class="interactive"
      :value="t('toolbar.unlink')"
    >
      <Unlink2 class="-rotate-45" />
      <span class="sr-only">{{ t("toolbar.unlink") }}</span>
    </ToolbarButton>
  </Tooltip>
</template>
