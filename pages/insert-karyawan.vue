<script setup>
import EmployeeForm from "~/components/EmployeeForm.vue";
import Breadcrumbs from "~/components/Breadcrumbs.vue";

const toastMessage = ref("");
const toastType = ref("success");

function onSuccess() {
  toastMessage.value = "Data berhasil ditambahkan";
  toastType.value = "success";
  alert("Update Berhasil");
}
function onFailed() {
  toastMessage.value = "Gagal menambahkan data";
  toastType.value = "error";
}

// function showTempToast(message, type = "success", duration = 5000) {
//   toastMessage.value = message;
//   toastType.value = type;
//   showToast.value = true;
//   setTimeout(() => (showToast.value = false), duration);
// }
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center p-6">
    <div class="card w-full max-w-2xl shadow-xl bg-base-100">
      <div class="card-body">
        <Breadcrumbs pageDescription="Tambah Data Karyawan" />
        <EmployeeForm
          endpoint="http://localhost:5000/api/DataKaryawan/insert"
          submit-label="Simpan Data"
          @submit-success="onSuccess"
          @submit-failed="onFailed"
        />
      </div>
    </div>
  </div>
</template>
