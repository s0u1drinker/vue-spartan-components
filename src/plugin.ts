import type { App, Component } from 'vue'
import * as Components from './components'

export interface PluginOptions {}

export default {
  // Если с options.
  // install(app: App, options: PluginOptions = {}) {
  install(app: App) {
    // Регистрируем компоненты.
    Object.entries(Components).forEach(([name, component]): void => {
      if (component && typeof component === 'object') {
        app.component(name, component as Component)
      }
    })

    // Работа с options.
    // if (options.theme) {
    //   document.documentElement.setAttribute('data-theme', options.theme)
    // }
  },
}