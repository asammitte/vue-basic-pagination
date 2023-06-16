import type { App } from "vue"
import { BasicPagination } from "./components"

export default {
  install: (app: App) => {
    app.component("BasicPagination", BasicPagination)
  }
}

export { BasicPagination }
