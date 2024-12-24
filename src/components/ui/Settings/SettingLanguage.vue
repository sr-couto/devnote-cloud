<template>
  <div class="flex flex-row items-start justify-between py-3 pr-3 border-b border-secondary">
    <div class="space-y-0.5">
      <h3 class="text-sm font-medium text-pretty mt-0">
        {{ t("settings.language") }}
      </h3>
      <p class="text-xs text-muted-foreground text-balance">
        {{ t("settings.languageDescription") }}
      </p>
    </div>
    <div class="flex gap-2">
      <LanguageSelector />
    </div>
  </div>
</template>

<script setup lang="ts">
import LanguageSelector from "@/components/ui/LanguageSelector.vue"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
</script>
