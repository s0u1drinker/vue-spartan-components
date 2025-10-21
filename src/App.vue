<script setup lang="ts">
import { VscButton, VscIcon } from '@/components'
</script>

<template>
  <h1>Hello!</h1>
  <VscButton
    text="Прикрепить"
    :elevated="true"
    icon-right="public:attach-file"
    @click="() => { console.log('Click!') }"
  />
  <p><VscIcon icon-name="public:attach-file" /> Прикрепите какой-нибудь файл.</p>
</template>

<style lang="scss">
</style>
