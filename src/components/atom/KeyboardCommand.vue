<script setup lang="ts">
import apple from "../../assets/command-keyboard-apple.svg?raw"
import windows from "../../assets/command-keyboard-windows.svg?raw"


const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
let props = defineProps({
  imgClass: {
    type: String,
}})

const svg = isMac ? apple : windows;
</script>

<template>
  <div v-html="svg">
  </div>
</template>
