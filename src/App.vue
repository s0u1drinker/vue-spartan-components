<script setup lang="ts">
import { ref } from 'vue';
import { VscIcon, VscButton } from './components';

const icon = ref<string>('public:attach-file');

const clickHandler = () => {
  icon.value = 'mdi:home';
};
</script>

<template>
  <main>
    <VscIcon :icon-name="icon" size="2rem" icon-color="red" />
    {{ icon }}
    <VscButton text="Button" @click="clickHandler" />
  </main>
</template>

<style scoped></style>
