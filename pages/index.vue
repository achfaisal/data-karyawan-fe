<script setup>
import { onMounted, ref } from "vue";

const listKaryawan = ref([]);

onMounted(async () => {
  try {
    const res = await $fetch("http://localhost:5000/api/DataKaryawan/get-all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        CurrentPage: 1,
        PageSize: 3,
      },
    });

    listKaryawan.value = res.data;
    console.log(listKaryawan.value);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <h1>List Data Karyawan</h1>

  <ul>
    <li v-for="emp in listKaryawan">
      {{ emp.emp_no }} - {{ emp.emp_name }} -{{ emp.emp_email }}
    </li>
  </ul>
</template>

<style scoped></style>
