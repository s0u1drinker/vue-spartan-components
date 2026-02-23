<script setup lang="ts">
  import { ref } from 'vue';
  import { VscButton, VscIcon, VscInputText } from './../src/components';
  import type { VscInputMessgaeError } from './../src/types';
  import './index.css';

  const inp = ref('');
  const show = ref(false);
  const handleButtonClick = () => {
    show.value = !show.value;
  };
  const error: VscInputMessgaeError = {
    isError: true,
    message: 'Ошибка ввода данных',
    icon: 'mdi:warning',
    showBackground: false,
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
  <VscInputText
    label="Логин"
    placeholder="Какой-нибудь текст..."
    required
    :show-error="show"
    :error
    v-model="inp"
  />
  {{ inp }}
</template>

<style scoped lang="scss"></style>
