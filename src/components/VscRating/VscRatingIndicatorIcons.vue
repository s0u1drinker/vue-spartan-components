<template>
  <VscIcon
    :class="iconClasses"
    :icon-name="iconName"
    :size="iconSize"
    v-for="i in props.count"
    :key="`${keyText}-${i}`"
  />
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';
import { VscIcon } from '@components';
import type { VscRatingIndicatorIconsProps } from './types';
import type { IconName, IconSize } from '@components/VscIcon/types';

const iconName = inject('iconName') as IconName;
const iconSize = inject('iconSize') as IconSize;

const props = withDefaults(defineProps<VscRatingIndicatorIconsProps>(), {
  unfilled: false,
});
/** Текст для ключа. */
const keyText = computed(() => `${props.unfilled ? 'un' : ''}filled-icon`);
/** Классы иконки. */
const iconClasses = computed(() => [
  'vsc-rating__icon',
  { 'vsc-rating__icon_unfilled': props.unfilled },
]);
</script>
