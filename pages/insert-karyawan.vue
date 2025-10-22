<script setup>
import { ref } from "vue";

const responseMessage = ref("");

function success(res) {
  console.log(res);
  responseMessage.value = "Sukses";
}

function failed(err) {
  if (err) {
    console.log(err);
  }
  responseMessage.value = "Gagal";
}
</script>

<template>
  <h1>Hasil : {{ responseMessage }}</h1>

  <div class="min-h-screen bg-base-200 flex items-center justify-center p-6">
    <div class="card w-full max-w-2xl shadow-xl bg-base-100">
      <div class="card-body">
        <Breadcrumbs />

        <EmployeeForm
          endpoint="http://localhost:5000/api/DataKaryawan/insert"
          @submit-success="success"
          @submit-failed="failed"
        />
      </div>
    </div>
  </div>
</template>
