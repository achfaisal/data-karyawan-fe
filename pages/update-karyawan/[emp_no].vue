<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();

async function fetchData() {
  const res = await $fetch(
    "http://localhost:5000/api/DataKaryawan/get-details",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { emp_no: route.params.emp_no },
    }
  );
  console.log(res);
}

console.log(route.params.emp_no);

onMounted(fetchData);
</script>

<template>
  <div>
    <h1>Tes</h1>
    <EmployeeForm
      endpoint="http://localhost:5000/api/DataKaryawan/update"
      submit-label="Update Data"
    />
  </div>
</template>

<style></style>
