import type { IconName } from '@components/VscIcon/types';
import type { TRoleMessage, TAriaAtomic } from '@types';

export interface VscMessageProps {
  message: string;
  icon?: IconName;
  showBackground?: boolean;
  isError?: boolean;
  role?: TRoleMessage;
  ariaAtomic?: TAriaAtomic;
}
