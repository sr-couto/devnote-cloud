import { createApp } from "vue"
import { createPinia } from "pinia"
import { autoAnimatePlugin } from "@formkit/auto-animate/vue"
import "./assets/main.css"
import "./assets/driver.css"
import App from "./App.vue"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { i18n } from "./i18n"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(pinia)
app.use(autoAnimatePlugin)
app.use(i18n)

app.mount("#app")
