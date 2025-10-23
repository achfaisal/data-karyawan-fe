<script setup>
import { ref, onMounted } from "vue";

const employees = ref([]);
const loading = ref(true);
const error = ref("");
const currentPage = ref(1);
const pageSize = ref(5);
const totalData = ref(0);
const currentDataLength = ref(0);
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref("success");

const totalPagination = ref(0);

async function fetchData() {
  try {
    const res = await $fetch("http://localhost:5000/api/DataKaryawan/get-all", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        CurrentPage: currentPage.value,
        PageSize: pageSize.value,
      },
    });
    employees.value = res.data;
    totalData.value = res.total;
    currentDataLength.value = res.data.length;
    totalPagination.value = Math.ceil(res.total / pageSize.value);
  } catch (err) {
    console.error(err);
    error.value = "Gagal memuat data karyawan.";
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await fetchData();
  if (toastMessage.value) {
    console.log("Pesan toast terdeteksi:", toastMessage.value);
    showTempToast(toastMessage.value, toastType.value);
    toastMessage.value = "";
    toastType.value = "";
  } else {
    console.log("Tidak ada pesan toast ditemukan.");
  }
});

watch(pageSize, () => {
  currentPage.value = 1;
  fetchData();
});

watch(currentPage, () => {
  fetchData();
});

function showTempToast(message, type = "success", duration = 5000) {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => (showToast.value = false), duration);
}

function onButtonEdit(empNo) {
  navigateTo(`/update-karyawan/${empNo}`);
}

async function onButtonDelete(id) {
  console.log("Id karyawan : ", id);
  try {
    await $fetch(`http://localhost:5000/api/DataKaryawan/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: {},
    });
    await fetchData();
    showTempToast("Data berhasil dihapus", "success");
  } catch (error) {
    error.value = "Gagal menghapus data karyawan.";
    showTempToast("Gagal menghapus data", "error");
  }
}

function onButtonPage(page) {
  currentPage.value = page;
}

function goToPrevPage() {
  currentPage.value--;
}

function goToNextPage() {
  currentPage.value++;
}
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center p-6">
    <div class="card w-full max-w-6xl shadow-xl bg-base-100">
      <div class="card-body">
        <Breadcrumbs pageDescription="Data Karyawan" />
        <div class="flex items-center justify-between mb-4">
          <h2 class="card-title text-center md:text-left">Daftar Karyawan</h2>

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

          <div class="flex items-center gap-2">
            <button class="btn btn-link min-w-28 text-sky-800 no-underline">
              <NuxtLink to="/insert-karyawan"> + Tambah Data </NuxtLink>
            </button>
            <span class="text-sm text-gray-600">Tampilkan:</span>
            <select v-model="pageSize" class="select select-bordered select-sm">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
          </div>
        </div>

        <div v-if="loading" class="text-center py-6 text-gray-500">
          Loading...
        </div>

        <div v-else class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr class="text-gray-600">
                <th>No. Karyawan</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Lokasi</th>
                <th>Jabatan</th>
                <th>Tanggal Join</th>
                <th colspan="2" class="text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="emp in employees" :key="emp.emp_no">
                <td>{{ emp.emp_no }}</td>
                <td class="font-medium">{{ emp.emp_name }}</td>
                <td>{{ emp.emp_email }}</td>
                <td>{{ emp.worklocation }}</td>
                <td>{{ emp.jabatan }}</td>
                <td>
                  {{ new Date(emp.join_date).toLocaleDateString("id-ID") }}
                </td>
                <td class="px-1">
                  <button
                    @click="onButtonEdit(emp.emp_no)"
                    class="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                </td>
                <td class="px-1">
                  <button
                    @click="onButtonDelete(emp.id)"
                    class="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-6">
          <div>
            Menampilkan {{ currentDataLength }} dari total {{ totalData }} data
          </div>

          <div class="join">
            <button
              class="join-item btn btn-sm"
              @click="goToPrevPage"
              :disabled="currentPage === 1"
            >
              «
            </button>

            <button
              v-for="page in totalPagination"
              :key="page"
              @click="onButtonPage(page)"
              class="join-item btn btn-sm"
              :class="{ 'btn-active': currentPage === page }"
            >
              {{ page }}
            </button>

            <button
              class="join-item btn btn-sm"
              @click="goToNextPage"
              :disabled="totalPagination <= currentPage"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
