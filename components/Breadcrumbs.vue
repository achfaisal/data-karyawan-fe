<script setup>
import { defineProps } from "vue";

const props = defineProps({
  pageDescription: String,
});
</script>
<template>
  <div class="breadcrumbs text-sm">
    <ul>
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li>{{ pageDescription }}</li>
    </ul>
  </div>
</template>
<style></style>
