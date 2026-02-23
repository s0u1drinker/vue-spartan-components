import type { VscMessage } from '@components/VscMessage/types';

export type VscInputMessgaeError = VscMessage & {
  isError: boolean;
};
