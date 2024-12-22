<template>
  <div class="flex flex-row items-start w-full justify-between gap-3 pt-2 py-3 pr-3">
    <div class="space-y-0.5">
      <h3 class="text-sm font-medium text-pretty mt-0">
        {{ t("settings.export") }}
      </h3>
      <p class="text-xs text-muted-foreground text-balance">
        {{ t("tour.importExportDescription") }}
      </p>
    </div>
    <button
      class="bg-primary shrink-0 border-secondary border text-primary-foreground hover:bg-backgorund/80 text-xs inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold gap-3 focus:outline-2 focus:outline-foreground focus:outline-dashed focus:outline-offset-2"
      @click="counter.export_database(counter.file_name)"
    >
      <span>{{ t("settings.export") }}</span>
      <span class="sr-only">{{ t("tour.importExportDescription") }}</span>
      <Upload class="size-4" />
    </button>
  </div>
</template>

<script setup>
import { useSettingsStore } from "@/stores/settings"
import { useCounterStore } from "@/stores/counter"
const counter = useCounterStore()
import { Upload } from "lucide-vue-next"
const settings = useSettingsStore()
import { useI18n } from "vue-i18n"
const { t } = useI18n()
</script>
