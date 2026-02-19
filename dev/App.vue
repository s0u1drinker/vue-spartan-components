<script setup lang="ts">
  import { ref } from 'vue';
  import { VscButton, VscIcon, VscInput, VscLabel } from '../src/components';
  import './index.css';

  const inp = ref('');
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
  <div>
    <VscLabel
      id="input-1"
      label-text="Ok, let`s go"
      required
    />
    <VscInput
      id="input-1"
      type="text"
      placeholder="Какой-нибудь текст..."
      required
      v-model="inp"
    />
  </div>
  {{ inp }}
</template>

<style scoped lang="scss"></style>
