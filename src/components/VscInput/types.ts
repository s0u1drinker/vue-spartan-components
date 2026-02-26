import { INPUT_TYPES, LABEL_STYLE } from './constants';
import type { TAriaInvalid, TAriaLabelledby, TAriaDescribedby } from '@types';
import type { VscMessageProps } from '@components/VscMessage/types';
import type { IconName } from '@components/VscIcon/types';

export type VscInputTypes = keyof typeof INPUT_TYPES;

export interface VscInputProps {
  type: VscInputTypes;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  ariaInvalid?: TAriaInvalid;
  ariaLabelledby?: TAriaLabelledby;
  ariaDescribedby?: TAriaDescribedby;
}

export type VscInputBaseProps = Pick<VscInputProps, 'required'> & {
  /** Текст подписи. */
  label: string;
  /** Идентификатор элемента. */
  id: string;
  /** Способ отображения подписи. */
  labelStyle?: keyof typeof LABEL_STYLE;
  /** Показывать ошибку. */
  showError?: boolean;
  /** Данные об ошибке. */
  error?: VscMessageProps;
  /** Символ для отметки обязательного поля. */
  requiredMark?: string;
};

export type VscInputTextProps = Omit<VscInputProps, 'type'> & VscInputBaseProps;

export type VscInputPasswordProps = Pick<VscInputProps, 'placeholder' | 'disabled'> &
  Omit<VscInputBaseProps, 'required'> & {
    iconShow?: IconName;
    iconHide?: IconName;
  };
