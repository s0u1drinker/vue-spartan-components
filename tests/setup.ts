import { config } from '@vue/test-utils'

config.global.mocks = {
  // Для использования i18n.
  $t: (msg: string) => msg,
}