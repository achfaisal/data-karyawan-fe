<script setup>
import EmployeeForm from "~/components/EmployeeForm.vue";
import Breadcrumbs from "~/components/Breadcrumbs.vue";
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center p-6">
    <div class="card w-full max-w-2xl shadow-xl bg-base-100">
      <div class="card-body">
        <Breadcrumbs pageDescription="Tambah Data Karyawan" />
        <EmployeeForm
          endpoint="http://localhost:5000/api/DataKaryawan/insert"
          submit-label="Simpan Data"
        />
      </div>
    </div>
  </div>
</template>
