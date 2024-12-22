<script setup lang="ts">
import {
  DropdownMenuArrow,
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ToolbarButton,
} from "reka-ui"

import { useSettingsStore } from "@/stores/settings"
import { useEditorStore } from "@/stores/editor"

import { storeToRefs } from "pinia"
import { useAddImage } from "@/composables/useAddImage"
import { useAddImageBase64 } from "@/composables/useAddImageBase64"
import { useAddVideo } from "@/composables/useAddVideo"
import { useSetVideo } from "@/composables/useSetVideo"
import { ImageDown, ImagePlus, Redo2, Video, Youtube } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"

const settings = useSettingsStore()
const document = useEditorStore()
const { editor } = storeToRefs(document)
const { t } = useI18n()

const { addImage } = useAddImage(editor)
const { addImageBase64 } = useAddImageBase64(editor)
const { addVideo } = useAddVideo(editor)
const { setVideo } = useSetVideo(editor)
</script>

<template>
  <DropdownMenuRoot>
    <ToolbarButton as-child>
      <DropdownMenuTrigger
        class="data-[state=open]:!bg-primary data-[state=open]:text-primary-foreground relative"
      >
        <Tooltip :name="`${t('verb.add')} ${t('toolbar.image')}`" :side="'bottom'">
          <span
            class="flex items-center justify-center outline-none interactive size-8 focus-visible:border-primary border-secondary"
          >
            <ImagePlus class="size-4" />
          </span>
          <span class="sr-only">{{ t("verb.add") }} {{ t("toolbar.image") }}</span>
        </Tooltip>
      </DropdownMenuTrigger>
    </ToolbarButton>
    <DropdownMenuContent
      :side="'bottom'"
      :align="'start'"
      :side-offset="2"
      class="z-50 grid w-40 text-xs gap-1 bg-background border border-primary"
    >
      <DropdownMenuItem
        as-child
        v-show="!settings.media_base64"
        class="relative flex items-center justify-start gap-2 p-2 pr-3 bg-background outline-none focus-visible:bg-primary/30 hover:bg-primary/20"
      >
        <label
          class="flex justify-start !pointer-events-none gap-2 p-2 hover:bg-primary"
          for="img-uploader"
          id="uploader"
        >
          <ImagePlus class="size-4" />
          <span>Base64</span>
          <input
            id="img-uploader"
            type="file"
            accept="image/jpeg"
            class="absolute inset-0 opacity-0"
            :aria-label="`${t('verb.add')} Base64 ${t('toolbar.image')}`"
            @change="addImageBase64"
          />
        </label>
      </DropdownMenuItem>
      <DropdownMenuItem
        v-show="settings.media_base64"
        @click="settings.toggle_media_base64"
        @select.prevent
        class="relative flex items-center justify-center text-primary/50 hover:text-primary gap-2 p-2 pr-3 bg-background outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20"
      >
        Habilitar Base64
      </DropdownMenuItem>
      <DropdownMenuItem
        @click="addImage"
        class="flex items-center justify-start gap-2 p-2 bg-background outline-none focus-visible:bg-primary/20 hover:bg-primary/20"
      >
        <ImageDown class="size-4" />
        Url
        <span class="sr-only">{{ t("verb.add") }} {{ t("toolbar.image") }} url</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>

  <Tooltip :name="`${t('verb.add')} Youtube video`" side="bottom">
    <ToolbarButton
      @click="addVideo"
      class="flex items-center justify-center outline-none interactive size-8 focus-visible:border-primary border-secondary"
      :value="`${t('verb.add')} Youtube video`"
    >
      <Youtube class="size-4" />
      <span class="sr-only">{{ t("verb.add") }} Youtube video</span>
    </ToolbarButton>
  </Tooltip>
  <Tooltip name="Video URL" side="bottom">
    <ToolbarButton
      class="flex items-center justify-center border outline-none size-8 focus-visible:border-primary border-secondary"
      @click="setVideo()"
      value="Video URL"
    >
      <Video class="size-4" />
      <span class="sr-only">{{ t("verb.add") }} video URL</span>
    </ToolbarButton>
  </Tooltip>
</template>
