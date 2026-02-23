import { LABEL_STYLE } from './constants';
import type { VscInputProps } from '../VscInput/types';
import type { VscInputMessgaeError } from '@types';

export type VscInputTextProps = Omit<VscInputProps, 'type'> & {
  label: string;
  id?: string;
  labelStyle?: keyof typeof LABEL_STYLE;
  showError?: boolean;
  error?: VscInputMessgaeError;
};
