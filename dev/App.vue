<script setup lang="ts">
  import { ref } from 'vue';
  import { VscButton, VscIcon, VscInputPassword } from './../src/components';
  import type { VscMessageProps } from './../src/components/VscMessage/types';
  import './index.css';

  const inp = ref('');
  const show = ref(false);
  const handleButtonClick = () => {
    show.value = !show.value;
  };
  const error: VscMessageProps = {
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
  <VscInputPassword
    id="login"
    class="input"
    label="Логин"
    placeholder="Какой-нибудь текст..."
    :show-error="show"
    :error
    v-model="inp"
  />
  Данные: {{ inp }}
</template>

<style scoped lang="scss">
  .input {
    --vsc-input-text-padding: 1rem;
    margin-top: 1rem;
  }
</style>
