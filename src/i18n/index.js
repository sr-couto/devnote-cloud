import { createI18n } from "vue-i18n"
import { useStorage } from "@vueuse/core"
import es from "./locales/es.json"
import en from "./locales/en.json"

const locale = useStorage("locale", "en")

export const i18n = createI18n({
  legacy: false,
  locale: locale.value,
  fallbackLocale: "en",

  messages: {
    es,
    en,
  },
})
