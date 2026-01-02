<script setup lang="ts">
import { ref } from 'vue';
import { VscButton, VscIcon, VscRating } from '../src/components';

const rating = ref<number>(4.5);
const handleButtonClick = () => {
  rating.value = 11;
  console.log('Click!');
};
</script>

<template>
  <h1>Hello!</h1>
  <p>
    You can try to click button <VscIcon icon-name="public:attach-file" /> after
    this text.
  </p>
  <VscButton text="Click me!" :elevated="true" @click="handleButtonClick">
    <VscIcon icon-name="public:attach-file" />
    <span>Прикрепить</span>
  </VscButton>
  <VscRating :current-value="rating" rating-icon="public:star" />
</template>

<style scoped lang="scss"></style>
