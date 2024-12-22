<script setup>
import Tooltip from "@/components/ui/Tooltip.vue"

import { useCounterStore } from "@/stores/counter"
import { storeToRefs } from "pinia"

import { CircleOff } from "lucide-vue-next"
import { useI18n } from "vue-i18n"

const counter = useCounterStore()
const { loaded_id } = storeToRefs(counter)
const { t } = useI18n()

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

function toggleCheck(item, isChecked) {
  counter.change_project_checked(item, isChecked)
}
</script>

<template>
  <div
    class="z-20 flex items-center animate__animated animate__fadeIn justify-between w-full pr-3 duration-300 h-7 md:pr-2 opacity-70"
  >
    <span
      class="flex py-0.5 ml-1 rounded-full w-full items-center outline-none justify-start gap-2 text-sm text-left focus-within:ring-1 ring-primary"
      :class="loaded_id === props.data?.id ? 'text-primary' : ''"
    >
      <p
        class="@sm:max-w-full max-w-80 py-1 md:py-0 line-clamp-1 line-through decoration-wavy decoration-primary/50 text-foreground/50 decoration-1"
      >
        {{ props.data?.project_data.name }}
      </p>
    </span>

    <Tooltip :name="t('sidebar.markAsUndone')" side="right" :align="'end'">
      <span>
        <label :for="'itemcompleted-' + props.data?.id" class="">
          <input
            type="checkbox"
            :id="'itemcompleted-' + props.data?.id"
            :checked="props.data?.project_data.checked"
            class="sr-only peer"
            required
            :aria-label="t('sidebar.markAsUndone')"
            @change="toggleCheck(props.data, $event.target.checked)"
          />
          <div
            class="peer-focus:outline-none items-center size-7 md:size-6 flex justify-center rounded-full relative z-[50] mr-0.5 peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-primary"
          >
            <CircleOff class="size-5 md:size-4" />
          </div>

          <span class="sr-only">{{ t("sidebar.markAsUndone") }}</span>
        </label>
      </span>
    </Tooltip>
  </div>
</template>
