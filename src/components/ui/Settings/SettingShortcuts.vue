<template>
  <div class="flex flex-row items-start justify-between py-3 pr-3 border-t border-secondary">
    <div class="space-y-0.5">
      <h3 class="text-sm font-medium text-pretty mt-0">
        {{ t("settings.shortcuts") }}
      </h3>
      <p class="text-xs text-muted-foreground text-balance">
        {{ t("settings.shortcutsDescription") }}
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <div
        v-for="(shortcut, action) in shortcuts.shortcuts"
        :key="action"
        class="flex items-center gap-2"
      >
        <span class="text-xs text-muted-foreground">{{ t(`shortcuts.${action}`) }}</span>
        <button
          @click="editShortcut(action)"
          class="px-2 h-8 min-w-24 text-xs border border-secondary bg-background hover:bg-secondary/80 focus:outline-2 focus:outline-foreground focus:outline-dashed focus:outline-offset-2"
        >
          {{ shortcut }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShortcutsStore } from "@/stores/shortcuts"
import { useI18n } from "vue-i18n"

const shortcuts = useShortcutsStore()
const { t } = useI18n()

function editShortcut(action) {
  const newShortcut = prompt(t("settings.enterShortcut"), shortcuts.shortcuts[action])
  if (newShortcut && newShortcut !== shortcuts.shortcuts[action]) {
    shortcuts.updateShortcut(action, newShortcut)
  }
}
</script>
