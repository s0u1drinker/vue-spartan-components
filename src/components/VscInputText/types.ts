import { LABEL_STYLE } from './constants';
import type { VscInputProps } from '../VscInput/types';
import type { VscInputMessgaeError } from '@types';

export type VscInputTextProps = Omit<VscInputProps, 'type'> & {
  /** Текст подписи. */
  label: string;
  /** Идентификатор элемента. */
  id?: string;
  /** Способ отображения подписи. */
  labelStyle?: keyof typeof LABEL_STYLE;
  /** Показывать ошибку. */
  showError?: boolean;
  /** Данные об ошибке. */
  error?: VscInputMessgaeError;
  /** Символ для отметки обязательного поля. */
  requiredMark?: string;
};
