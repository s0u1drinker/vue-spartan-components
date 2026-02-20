import type { IconName } from '@components/VscIcon/types';

export interface VscMessage {
  message: string;
  icon?: IconName;
  showBackground?: boolean;
}
