<script setup lang="ts">
/* Disclaimer. All this folder is based upon work of sereneinserenade tiptap-media-resize
Tiptap Extension for having resizable, alignable, floatable, movable media.
https://github.com/sereneinserenade/tiptap-media-resize

** I have made some changes to the original code. */
import { useDocumentStore } from "@/stores/document"

import { Editor, Node, NodeViewWrapper } from "@tiptap/vue-3"
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from "reka-ui"
import { Node as ProseMirrorNode } from "prosemirror-model"
import { Decoration } from "prosemirror-view"
import { ref, onMounted, computed, watch } from "vue"
import { resizableMediaActions, fullwidthMediaActions } from "./resizableMediaMenuUtil"

import {
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartVertical,
  Maximize2,
  Video,
} from "lucide-vue-next"
import { Trash } from "lucide-vue-next"

const document_store = useDocumentStore()

interface Props {
  editor: Editor
  node: ProseMirrorNode
  decorations: Decoration
  selected: boolean
  extension: Node<any, any>
  getPos: () => number
  updateAttributes: (attributes: Record<string, any>) => void
  deleteNode: () => void
}

const props = defineProps<Props>()
const mediaType = computed<"img" | "video">(() => props.node.attrs["media-type"])
const resizableImg = ref<HTMLImageElement | HTMLVideoElement | null>(null) // template ref
const aspectRatio = ref(0)
const proseMirrorContainerWidth = ref(0)
const mediaActionActiveState = ref<Record<string, boolean>>({})

const setMediaActionActiveStates = () => {
  if (!document_store.content_editable) return
  const activeStates: Record<string, boolean> = {}
  for (const { tooltip, isActive } of resizableMediaActions)
    activeStates[tooltip] = !!isActive?.(props.node.attrs)
  mediaActionActiveState.value = activeStates
}

watch(
  () => props.node.attrs,
  () => setMediaActionActiveStates(),
  { deep: true },
)

const mediaSetupOnLoad = () => {
  // ! TODO: move this to extension storage
  const proseMirrorContainerDiv = document.querySelector(".Document")
  if (proseMirrorContainerDiv)
    proseMirrorContainerWidth.value = proseMirrorContainerDiv?.clientWidth
  // When the media has loaded
  if (!resizableImg.value) return
  if (mediaType.value === "video") {
    // Aspect Ratio from its original size
    setTimeout(() => {
      aspectRatio.value =
        (resizableImg.value as HTMLVideoElement).videoWidth /
        (resizableImg.value as HTMLVideoElement).videoHeight
      // for the first time when video is added with custom width and height
      // and we have to adjust the video height according to it's width
      onHorizontalResize("left", 0)
    }, 200)
  } else {
    resizableImg.value.onload = () => {
      // Aspect Ratio from its original size
      aspectRatio.value =
        (resizableImg.value as HTMLImageElement).naturalWidth /
        (resizableImg.value as HTMLImageElement).naturalHeight

      onHorizontalResize("left", 0)
    }
  }
  setTimeout(() => setMediaActionActiveStates(), 200)
}

onMounted(() => mediaSetupOnLoad())

const isHorizontalResizeActive = ref(false)
const lastCursorX = ref(-1)

interface WidthAndHeight {
  width: number
  height: number
}

const limitWidthOrHeightToFiftyPixels = ({ width, height }: WidthAndHeight) =>
  width < 100 || height < 100

const startHorizontalResize = (e: MouseEvent) => {
  isHorizontalResizeActive.value = true
  lastCursorX.value = e.clientX

  document.addEventListener("mousemove", onHorizontalMouseMove)
  document.addEventListener("mouseup", stopHorizontalResize)
}

const stopHorizontalResize = () => {
  isHorizontalResizeActive.value = false
  lastCursorX.value = -1

  document.removeEventListener("mousemove", onHorizontalMouseMove)
  document.removeEventListener("mouseup", stopHorizontalResize)
}

const onHorizontalResize = (directionOfMouseMove: "right" | "left", diff: number) => {
  if (!resizableImg.value) {
    console.error("Media ref is undefined|null", { resizableImg: resizableImg.value })
    return
  }

  const currentMediaDimensions = {
    width: resizableImg.value?.width,
    height: resizableImg.value?.height,
  }

  const newMediaDimensions = {
    width: -1,
    height: -1,
  }

  if (directionOfMouseMove === "left") {
    newMediaDimensions.width = currentMediaDimensions.width - Math.abs(diff)
  } else {
    newMediaDimensions.width = currentMediaDimensions.width + Math.abs(diff)
  }
  if (newMediaDimensions.width > proseMirrorContainerWidth.value)
    newMediaDimensions.width = proseMirrorContainerWidth.value
  newMediaDimensions.height = newMediaDimensions.width
  if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return
  props.updateAttributes(newMediaDimensions)
}

const onHorizontalMouseMove = (e: MouseEvent) => {
  if (!isHorizontalResizeActive.value) return
  props.updateAttributes({ dataFullWidth: null })
  const { clientX } = e
  const diff = lastCursorX.value - clientX
  lastCursorX.value = clientX
  if (diff === 0) return
  const directionOfMouseMove: "left" | "right" = diff > 0 ? "left" : "right"
  onHorizontalResize(directionOfMouseMove, Math.abs(diff))
}

const isVerticalResizeActive = ref(false)

const lastCursorY = ref(-1)

const startVerticalResize = (e: MouseEvent) => {
  isVerticalResizeActive.value = true
  lastCursorY.value = e.clientY
  document.addEventListener("mousemove", onVerticalMouseMove)
  document.addEventListener("mouseup", stopVerticalResize)
}

const stopVerticalResize = () => {
  isVerticalResizeActive.value = false
  lastCursorY.value = -1
  document.removeEventListener("mousemove", onVerticalMouseMove)
  document.removeEventListener("mouseup", stopVerticalResize)
}

const onVerticalMouseMove = (e: MouseEvent) => {
  if (!isVerticalResizeActive.value) return
  props.updateAttributes({ dataFullWidth: null })
  const { clientY } = e
  const diff = lastCursorY.value - clientY
  lastCursorY.value = clientY
  if (diff === 0) return
  const directionOfMouseMove: "up" | "down" = diff > 0 ? "up" : "down"
  if (!resizableImg.value) {
    console.error("Media ref is undefined|null", { resizableImg: resizableImg.value })
    return
  }

  const currentMediaDimensions = {
    width: resizableImg.value?.width,
    height: resizableImg.value?.height,
  }

  const newMediaDimensions = {
    width: -1,
    height: -1,
  }

  if (directionOfMouseMove === "up") {
    newMediaDimensions.height = currentMediaDimensions.height - Math.abs(diff)
  } else {
    newMediaDimensions.height = currentMediaDimensions.height + Math.abs(diff)
  }
  newMediaDimensions.width = newMediaDimensions.height * aspectRatio.value
  if (newMediaDimensions.width > proseMirrorContainerWidth.value) {
    newMediaDimensions.width = proseMirrorContainerWidth.value
    newMediaDimensions.height = newMediaDimensions.width / aspectRatio.value
  }

  if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return
  props.updateAttributes(newMediaDimensions)
}

const isAlign = computed<boolean>(() => !!props.node.attrs.dataAlign)
const isFullWidth = computed<boolean>(() => !!props.node.attrs.dataFullWidth)
</script>

<template>
  <node-view-wrapper
    as="article"
    class="media-node-view flex relative not-prose my-0 group"
    :class="[`${(isAlign && `align-${props.node.attrs.dataAlign}`) || ''}`]"
  >
    <PopoverRoot v-if="document_store.content_editable">
      <PopoverTrigger
        aria-label="Update dimensions"
        class="z-50 absolute left-0 top-0 flex justify-center print:hidden items-center"
      >
        <span class="size-9 bg-secondary/90 text-primary flex justify-center items-center">
          <Maximize2 v-if="props.node.attrs.dataFullWidth" class="size-4" />
          <AlignStartVertical v-else-if="props.node.attrs.dataAlign === 'left'" class="size-4" />
          <AlignCenterVertical v-else-if="props.node.attrs.dataAlign === 'center'" class="size-4" />
          <AlignEndVertical v-else-if="props.node.attrs.dataAlign === 'right'" class="size-4" />
        </span>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          :side="'bottom'"
          :align="'start'"
          class="px-0.5 h-9 justify-center items-center gap-0.5 flex font-mono text-xs text-foreground duration-300 focus-visible:ring-4 hover:ring-2 bg-background/90 ring-1 ring-primary"
        >
          <button
            v-for="(mediaAction, i) in resizableMediaActions"
            :key="i"
            :content="mediaAction.tooltip"
            class="size-8 flex justify-center items-center gap-1"
            @click="mediaAction.action?.(updateAttributes)"
          >
            <component class="shrink-0 size-4" :is="mediaAction.icon" />
            <span class="sr-only">{{ mediaAction.tooltip }}</span>
          </button>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <div
      v-if="document_store.content_editable"
      aria-label="Update dimensions"
      class="focus:!ring-primary z-50 focus:!ring-2 print:hidden absolute right-0 top-0 text-primary size-9 bg-secondary border border-primary flex justify-center items-center"
    >
      <button class="size-8 flex justify-center items-center gap-1" @click="deleteNode()">
        <Trash class="size-4" />
        <span class="sr-only">Delete</span>
      </button>
    </div>
    <div class="flex relative">
      <div v-show="document_store.content_editable" class="w-fit flex relative">
        <div v-if="mediaType === 'img'">
          <img
            v-bind="node.attrs"
            ref="resizableImg"
            class=""
            :class="[
              `${(isFullWidth && `w-full`) || ''}`,
              `${(isAlign && `align-${props.node.attrs.dataAlign}`) || ''}`,
            ]"
            draggable="true"
          />
        </div>

        <div class="relative" v-else-if="mediaType === 'video'">
          <span class="absolute flex justify-center items-center inset-0">
            <Video class="size-12" />
          </span>
          <video
            v-bind="node.attrs"
            ref="resizableImg"
            class="opacity-80"
            :class="[
              `${(isFullWidth && `w-full`) || ''}`,
              `${(isAlign && `align-${props.node.attrs.dataAlign}`) || ''}`,
            ]"
            draggable="true"
          >
            <source :src="node.attrs.src" />
          </video>
        </div>

        <div
          class="horizontal-resize-handle"
          :class="{ 'horizontal-resize-active': isHorizontalResizeActive }"
          title="Resize"
          @mousedown="startHorizontalResize"
          @mouseup="stopHorizontalResize"
        />

        <div
          class="vertical-resize-handle"
          :class="{ 'vertical-resize-active': isVerticalResizeActive }"
          title="Resize"
          @mousedown="startVerticalResize"
          @mouseup="stopVerticalResize"
        />
      </div>

      <div v-show="!document_store.content_editable" class="w-fit flex relative">
        <img
          v-if="mediaType === 'img'"
          v-bind="node.attrs"
          data-zoomable
          class=""
          :class="[
            `${(isFullWidth && `w-full`) || ''}`,
            `${(isAlign && `align-${props.node.attrs.dataAlign}`) || ''}`,
          ]"
          draggable="true"
        />

        <video
          v-else-if="mediaType === 'video'"
          v-bind="node.attrs"
          ref="resizableImg"
          class=""
          :class="[
            `${(isFullWidth && `w-full`) || ''}`,
            `${(isAlign && `align-${props.node.attrs.dataAlign}`) || ''}`,
          ]"
          draggable="true"
          controls="true"
        >
          <source :src="node.attrs.src" />
        </video>
      </div>
    </div>
  </node-view-wrapper>
</template>

<style>
.media-node-view {
  position: relative;
}

.media-node-view.f-left {
  @apply float-left;
}

.media-node-view.f-right {
  @apply float-right;
}

.media-node-view.align-left {
  @apply justify-start;
}

.media-node-view.align-center {
  @apply justify-center;
}

.media-node-view.align-right {
  @apply justify-end;
}

.horizontal-resize-handle,
.vertical-resize-handle {
  @apply absolute hover:bg-primary z-50 opacity-90;
}

.horizontal-resize-handle {
  @apply h-full w-2 top-0 right-0 cursor-col-resize;
}

.vertical-resize-handle {
  @apply w-full h-2 bottom-0 left-0 cursor-row-resize;
}

.image-actions-container {
  @apply flex gap-1;
}

.media-actions-container {
  padding: 4px !important;
  width: fit-content !important;

  .ep-button + .ep-button {
    margin-left: 0px;
  }
}

.is-editable video {
  pointer-events: none;
}

.is-preview .tiptap .ProseMirror-selectednode {
  @apply ring-0;
}
</style>
