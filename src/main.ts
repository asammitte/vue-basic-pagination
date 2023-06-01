import { createApp } from 'vue'
import App from './App.vue'
import PaginnationPlugin from './PaginationPlugin'
import router from "@/router/index"

const app = createApp(App)
app.use(PaginnationPlugin)
app.use(router)

app.mount("#app")
