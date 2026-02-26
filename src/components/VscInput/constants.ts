export const BASE_CLASS = 'vsc-input-base';

/** Типы комопнентов. */
export const INPUT_TYPES = {
  text: 'text',
  password: 'password',
  email: 'email',
  number: 'number',
  tel: 'tel',
  url: 'url',
  search: 'search',
} as const;

/** Стили отображения подписи. */
export const LABEL_STYLE = {
  default: 'default',
  column: 'column',
} as const;
