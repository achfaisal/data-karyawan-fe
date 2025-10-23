<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useToast } from "~/composables/useToast";
import EmployeeForm from "~/components/EmployeeForm.vue";
import Breadcrumbs from "~/components/Breadcrumbs.vue";

const route = useRoute();
const detail = ref({});
const { showToast, toastMessage, toastType, showTempToast } = useToast();
const isDisabled = ref(false);

async function fetchData() {
  try {
    const res = await $fetch(
      "http://localhost:5000/api/DataKaryawan/get-details",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { emp_no: route.params.emp_no },
      }
    );
    detail.value = res.data[0];
  } catch (err) {
    console.error("Gagal memuat data:", err);
    showTempToast("Gagal memuat data karyawan", "error");
  }
}

onMounted(fetchData);

function onSuccess() {
  isDisabled.value = true;
  showTempToast("Data karyawan berhasil diperbarui!", "success");

  setTimeout(() => {
    navigateTo("/");
  }, 1000);
}

function onFailed(err) {
  showTempToast("Gagal memperbarui data karyawan!", "error");
  isDisabled.value = false;
  console.error("Update gagal:", err);
}
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center p-6">
    <div class="card w-full max-w-2xl shadow-xl bg-base-100">
      <div class="card-body">
        <Breadcrumbs pageDescription="Edit Data Karyawan" />

        <!-- Toast -->
        <div v-if="showToast" class="toast toast-top toast-center z-50">
          <div
            class="alert shadow-lg"
            :class="{
              'alert-success': toastType === 'success',
              'alert-error': toastType === 'error',
            }"
          >
            <span class="font-semibold">{{ toastMessage }}</span>
          </div>
        </div>

        <!-- Form -->
        <EmployeeForm
          endpoint="http://localhost:5000/api/DataKaryawan/update"
          submit-label="Update Data"
          :model-value="detail"
          :disabled="isDisabled"
          @submit-success="onSuccess"
          @submit-failed="onFailed"
        />
      </div>
    </div>
  </div>
</template>
