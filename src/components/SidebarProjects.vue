<script setup>
import NumberFlow from "@number-flow/vue"
import SearchItem from "./SearchItem.vue"
import SearchItemChecked from "./SearchItemChecked.vue"
import ButtonCreateDocument from "@/components/ui/ButtonCreateDocument.vue"
import { useFocusStore } from "@/stores/focus"
import { useDatabaseStore } from "@/stores/database"
import { allItemsTodo, allItemsChecked } from "@/composables/queries"
import { storeToRefs } from "pinia"
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "reka-ui"
import { ArrowDown, ArrowUp } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import { useIsMobile } from "@/composables/useIsMobile"
const focus = useFocusStore()
const { isMobile } = useIsMobile()
const db_store = useDatabaseStore()
const { focus_documents } = storeToRefs(focus)
const { t } = useI18n()
</script>

<template>
  <div class="h-full @container">
    <ButtonCreateDocument />
    <div
      class="flex pl-2 pr-2 py-1.5 mt-2 focus-within:border-primary bg-primary/10 border-t border-b border-secondary justify-between items-center"
    >
      <h2
        class="text-xs outline-none text-primary flex justify-start items-center gap-1"
        ref="focus_documents"
        tabindex="-1"
      >
        {{ t("commandBar.documents") }}
        <NumberFlow
          class="bg-primary font-mono font-bold text-primary-foreground size-4 rounded flex justify-center items-center"
          :value="`${allItemsTodo ? allItemsTodo?.length : 0}`"
        />
      </h2>
      <div
        v-if="!isMobile"
        class="shrink-0 flex justify-end gap-2 opacity-60 text-xs text-foreground"
      >
        <kbd class="scale-90">ctrl</kbd>
        <button
          @click="db_store.navigate_document('prev')"
          class="flex justify-center items-center bg-background"
        >
          <ArrowUp class="size-4 opacity-80" />
          <span class="sr-only">Navigate prev</span>
        </button>
        <button
          @click="db_store.navigate_document('next')"
          class="flex justify-center items-center bg-background"
        >
          <ArrowDown class="size-4 opacity-80" />
          <span class="sr-only">Navigate next</span>
        </button>
      </div>
    </div>
    <div class="overflow-y-auto pl-1 SidebarProjects overflow-x-hidden h-[calc(100dvh-7rem)]">
      <ScrollAreaRoot class="w-full h-full rounded overflow-hidden" style="--scrollbar-size: 10px">
        <ScrollAreaViewport class="w-full h-full rounded">
          <div
            class="py-1 px-0.5 flex flex-col justify-start items-start relative gap-1 w-full min-h-24"
            v-if="allItemsTodo"
          >
            <SearchItem v-for="item in allItemsTodo" :key="item.id" :data="item" />
            <SearchItemChecked v-for="item in allItemsChecked" :key="item.id" :data="item" />
          </div>
          <div
            v-if="allItemsTodo?.length + allItemsChecked?.length === 0"
            class="w-full h-[calc(100vh-20rem)] text-center flex items-center justify-center"
          >
            <p class="w-40 text-xs text-muted-foreground text-pretty">
              {{ t("sidebar.noResultsDescription") }}
            </p>
          </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar
          class="flex select-none touch-none p-0.5 bg-secondary transition-colors duration-[160ms] ease-out hover:bg-background data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollAreaThumb
            class="flex-1 bg-primary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
          />
        </ScrollAreaScrollbar>
      </ScrollAreaRoot>
    </div>
  </div>
</template>
