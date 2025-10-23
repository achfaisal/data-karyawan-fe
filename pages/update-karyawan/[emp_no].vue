<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const detail = ref({});
const toastMessage = ref("");
const toastType = ref("success");

async function fetchData() {
  const res = await $fetch(
    "http://localhost:5000/api/DataKaryawan/get-details",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { emp_no: route.params.emp_no },
    }
  );
  detail.value = res.data[0];
}

onMounted(fetchData);
</script>

<template>
  <div>
    <div class="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div class="card w-full max-w-2xl shadow-xl bg-base-100">
        <div v-if="showToast" class="toast toast-top toast-center z-50">
          <div
            class="alert shadow-lg"
            :class="{
              'alert-success': toastType === 'success',
              'alert-error': toastType === 'error',
              'alert-info': toastType === 'info',
              'alert-warning': toastType === 'warning',
            }"
          >
            <span class="font-semibold">{{ toastMessage }}</span>
          </div>
        </div>
        <div class="card-body">
          <Breadcrumbs pageDescription="Edit Data Karyawan" />
          <EmployeeForm
            endpoint="http://localhost:5000/api/DataKaryawan/update"
            submit-label="Update Data"
            :model-value="detail"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
