<script setup lang="ts">
  import { ref } from 'vue';
  import { VscButton, VscIcon, VscRating } from '../src/components';
  import './index.css';

  const rating = ref<number>(5.83);
  const maxValue = ref<number>(10);
  const handleButtonClick = () => {
    maxValue.value = 3;
    console.log('Click!');
  };
</script>

<template>
  <h1>Hello!</h1>
  <p>You can try to click button <VscIcon icon-name="public:attach-file" /> after this text.</p>
  <VscButton
    text="Click me!"
    :elevated="true"
    @click="handleButtonClick"
  >
    <VscIcon icon-name="public:attach-file" />
    <span>Прикрепить</span>
  </VscButton>
  <VscRating
    icon-name="public:star"
    icon-size="1.5rem"
    :maxValue="maxValue"
    showMaxValue
    v-model="rating"
  />
</template>

<style scoped lang="scss"></style>
