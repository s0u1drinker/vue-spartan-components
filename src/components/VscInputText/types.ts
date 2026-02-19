import { LABEL_STYLE } from './constants';
import { INPUT_TYPES } from '../VscInput/constants';
import type { VscInputProps, VscInputTypes } from '../VscInput/types';

type inputTextType = typeof INPUT_TYPES.text;
type inputPasswordType = typeof INPUT_TYPES.password;

export type VscInputTextTypes = Extract<VscInputTypes, inputTextType | inputPasswordType>;

export type VscInputTextProps = Omit<VscInputProps, 'type'> & {
  label: string;
  id?: string;
  labelStyle?: keyof typeof LABEL_STYLE;
  password?: boolean;
  isError?: boolean;
  errorText?: string;
};
