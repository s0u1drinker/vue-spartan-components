import { INPUT_TYPES } from './constants';

export type VscInputTypes = keyof typeof INPUT_TYPES;

export interface VscInputProps {
  type: VscInputTypes;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
}
