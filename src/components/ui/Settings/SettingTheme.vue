<template>
  <div
    class="relative flex flex-row items-start justify-between py-3 pr-3 border-t border-secondary"
  >
    <div class="space-y-0.5">
      <h3 class="text-sm font-medium text-pretty mt-0">
        {{ t("settings.theme") }}
      </h3>
      <p class="text-xs text-muted-foreground text-balance">
        {{ t("settings.themeDescription") }}
      </p>
    </div>
    <ToggleTheme />
  </div>
</template>

<script setup lang="ts">
import ToggleTheme from "@/components/ui/ToggleTheme.vue"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
</script>
