import type { App } from "vue"
import { BasicPagination } from "./components"

export default {
  install: (app: App) => {
  // install: (app: App, options: { img: string } = { img: "" }) => {
    app.component("BasicPagination", BasicPagination)
    // app.provide("specialUploadImage", options.img);
  },
}

export { BasicPagination }
