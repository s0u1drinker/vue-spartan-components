<script setup lang="ts">
import { VscButton, VscIcon } from '@/components'
</script>

<template>
  <h1>Hello!</h1>
  <VscButton
    text="Click me!"
    :elevated="true"
    @click="() => { console.log('Click!') }"
  >
    <VscIcon icon-name="public:attach-file" />
    <span>Прикрепить</span>
  </VscButton>
  <VscIcon icon-name="public:attach-file" />
</template>

<style scoped lang="scss">
</style>
