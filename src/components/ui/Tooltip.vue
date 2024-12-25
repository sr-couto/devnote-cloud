<script setup>
import {
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "reka-ui"

const props = defineProps({
  name: {
    type: String,
    default: "",
    required: false,
  },
  shortcut: {
    type: String,
    default: "",
    required: false,
  },
  side: {
    type: String,
    default: "right",
    required: false,
  },
  align: {
    type: String,
    default: "center",
    required: false,
  },
  alignOffset: {
    type: Number,
    default: 0,
    required: false,
  },
})
</script>

<template>
  <TooltipProvider>
    <TooltipRoot :delay-duration="400" ignore-non-keyboard-focus>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          class="print:!hidden ring-primary ring-1 select-none max-w-80 min-h-7 bg-secondary px-2.5 py-1.5 flex gap-2 items-center justify-center"
          :class="props.shortcut ? 'flex-col' : ' '"
          :side-offset="6"
        >
          <span
            v-show="props.name"
            class="font-mono text-xs font-medium text-secondary-foreground"
            >{{ props.name }}</span
          >
          <kbd
            v-show="props.shortcut"
            class="pointer-events-none uppercase inline-flex h-5 select-none items-center gap-1 rounded px-1.5 font-mono text-[11px] text-secondary-foreground font-extrabold "
          >
            {{ props.shortcut }}
          </kbd>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
