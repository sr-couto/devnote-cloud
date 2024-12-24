<script setup>
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "reka-ui"
import { computed, onMounted } from "vue"
import { SunMedium, Moon } from "lucide-vue-next"
import { useColorMode, useStorage, useFavicon, useDark } from "@vueuse/core"
import { useDocumentStore } from "@/stores/document"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"

const document_store = useDocumentStore()
const mode = useColorMode()
const isDark = useDark()
const colorTheme = useStorage("theme", "theme-blue")
const { t } = useI18n()

const favicon = computed(() => {
  const theme = colorTheme.value.replace("theme-", "")
  return isDark.value ? `${theme}-dark.png` : `${theme}-light.png`
})

useFavicon(favicon, {
  baseUrl: "/",
  rel: "icon",
})

const toggleColorTheme = (theme) => {
  document.body.classList.remove(colorTheme.value)
  document.body.classList.add(theme)
  colorTheme.value = theme
}

onMounted(() => {
  toggleColorTheme(colorTheme.value)
})
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger class="interactive">
      <Tooltip
        :name="t('settings.theme')"
        :side="document_store.show_sidebar_documents ? 'bottom' : 'right'"
        :align="'end'"
      >
        <span
          class="flex items-center justify-center border hover:bg-secondary/80 border-secondary bg-background size-8"
        >
          <Moon
            class="transition-all duration-300 scale-100 rotate-0 size-4 dark:-rotate-90 dark:scale-0"
          />
          <SunMedium
            class="absolute transition-all duration-300 scale-0 rotate-90 size-4 dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">{{ t("settings.themeDescription") }}</span>
        </span>
      </Tooltip>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      :align="document_store.show_sidebar_documents ? 'end' : 'center'"
      :side="document_store.show_sidebar_documents ? 'bottom' : 'right'"
      class="z-10 grid w-40 text-xs bg-secondary"
    >
      <DropdownMenuGroup>
        <DropdownMenuItem
          @click="mode = 'light'"
          class="p-2 hover:bg-secondary-foreground/10 outline-none focus:ring-1 focus:ring-primary focus:bg-primary/20 focus:ring-inset"
        >
          {{ t("settings.light") }}
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="mode = 'dark'"
          class="p-2 hover:bg-secondary-foreground/10 outline-none focus:ring-1 focus:ring-primary focus:bg-primary/20 focus:ring-inset"
        >
          {{ t("settings.dark") }}
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="mode = 'auto'"
          class="p-2 hover:bg-secondary-foreground/10 outline-none focus:ring-1 focus:ring-primary focus:bg-primary/20 focus:ring-inset"
        >
          {{ t("settings.system") }}
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuGroup class="flex justify-between w-full p-3 bg-secondary">
        <DropdownMenuItem
          @click="toggleColorTheme('theme-rose')"
          class="rounded-full outline-none size-4 bg-rose-600 hover:ring-2 focus-visible:ring-2 ring-rose-500/50 ring-offset-1"
          :class="colorTheme === 'theme-rose' ? ' !ring-primary/50 ring-4 !ring-offset-1' : ''"
          ><span class="sr-only">{{ t("settings.theme") }} rose</span></DropdownMenuItem
        >
        <DropdownMenuItem
          @click="toggleColorTheme('theme-blue')"
          class="bg-blue-600 rounded-full outline-none size-4 hover:ring-2 focus-visible:ring-2 ring-blue-500/50 ring-offset-1"
          :class="colorTheme === 'theme-blue' ? ' !ring-primary/50 ring-4 !ring-offset-1' : ''"
          ><span class="sr-only">{{ t("settings.theme") }} blue</span></DropdownMenuItem
        >
        <DropdownMenuItem
          @click="toggleColorTheme('theme-green')"
          class="bg-green-600 rounded-full outline-none size-4 hover:ring-2 focus-visible:ring-2 ring-green-500/50 ring-offset-1"
          :class="colorTheme === 'theme-green' ? ' !ring-primary/50 ring-4 !ring-offset-1' : ''"
          ><span class="sr-only">{{ t("settings.theme") }} green</span></DropdownMenuItem
        >
        <DropdownMenuItem
          @click="toggleColorTheme('theme-yellow')"
          class="bg-yellow-600 rounded-full outline-none size-4 hover:ring-2 focus-visible:ring-2 ring-yellow-500/50 ring-offset-1"
          :class="colorTheme === 'theme-yellow' ? ' !ring-primary/50 ring-4 !ring-offset-1' : ''"
          ><span class="sr-only">{{ t("settings.theme") }} yellow</span></DropdownMenuItem
        >
        <DropdownMenuItem
          @click="toggleColorTheme('theme-violet')"
          class="rounded-full outline-none size-4 bg-violet-600 hover:ring-2 focus-visible:ring-2 ring-violet-500/50 ring-offset-1"
          :class="colorTheme === 'theme-violet' ? ' !ring-primary/50 ring-4 !ring-offset-1' : ''"
          ><span class="sr-only">{{ t("settings.theme") }} violet</span></DropdownMenuItem
        >
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>
