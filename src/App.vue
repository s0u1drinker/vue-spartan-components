<script setup lang="ts">
import {VscButton} from '@/components'
</script>

<template>
  <h1>Hello!</h1>
  <VscButton
    text="Click me!"
    @click="() => { console.log('Click!') }"
  />
</template>

<style scoped lang="scss">
</style>
