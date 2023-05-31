import { createApp } from 'vue'
import App from './App.vue'
import PaginnationPlugin from './PaginationPlugin'

const app = createApp(App)
app.use(PaginnationPlugin)

app.mount("#app")
