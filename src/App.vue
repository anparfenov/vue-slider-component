<script setup lang="ts">
import { ref } from 'vue';
import VSlider from './components/Slider/Slider.vue'
let sliderValue = ref(0);
</script>

<template>
    slider value: {{ sliderValue.toFixed(2) }}
    <v-slider v-model="sliderValue" />
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}
</style>
