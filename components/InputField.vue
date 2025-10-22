<script setup>
const props = defineProps({
  text: String,
  type: String,
  placeholder: String,
});

const emit = defineEmits(["update:text"]);
</script>

<template>
  <input
    :value="text"
    @input="emit('update:text', $event.target.value)"
    :type="type"
    :placeholder="placeholder"
    class="input input-bordered w-full"
    required
  />
</template>

<style></style>
