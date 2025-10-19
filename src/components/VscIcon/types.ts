type IconName = `${any}${string}:${any}${string}`
type IconSize = `${number}px` | `${number}%` | `${number}rem` | `${number}em`

export interface IconProps {
  iconName: IconName,
  size?: IconSize,
}