<script setup>
import { ref } from "vue";

const name = ref("");
const name2 = ref("");
</script>

<template>
  <button class="btn" onclick="my_modal_3.showModal()">open modal</button>
  <Modal />
</template>

<style></style>
