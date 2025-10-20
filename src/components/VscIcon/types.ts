type IconSize = `${number}px` | `${number}%` | `${number}rem` | `${number}em`
export type IconName = `${any}${string}:${any}${string}`

export interface IconProps {
  iconName: IconName,
  size?: IconSize,
}