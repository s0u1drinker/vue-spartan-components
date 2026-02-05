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
  import { computed } from 'vue';
  import { VscIcon } from '@components';
  import { useRatingContext } from './composables/useRatingContext';
  import { CLASSES } from './constants';
  import type { VscRatingIconsProps } from './types';

  const { iconName, iconSize } = useRatingContext();

  const props = withDefaults(defineProps<VscRatingIconsProps>(), {
    filled: false,
  });

  /** Текст для ключа. */
  const keyText = computed(() => `${props.filled ? 'filled' : 'unfilled'}-icon`);

  /** Классы иконки. */
  const iconClasses = computed(() => [
    CLASSES.main,
    { [CLASSES.filled]: props.filled },
    { [CLASSES.unfilled]: !props.filled },
  ]);
</script>
