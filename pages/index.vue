<script setup>
import { ref, onMounted } from "vue";

const employees = ref([]);
const loading = ref(true);
const error = ref("");
const CurrentPage = ref(1);
const pageSize = ref(5);
const totalData = ref(0);
const currentDataLength = ref(0);

async function fetchData() {
  try {
    const res = await $fetch("http://localhost:5000/api/DataKaryawan/get-all", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        CurrentPage: CurrentPage.value,
        PageSize: pageSize.value,
      },
    });
    employees.value = res.data;
    totalData.value = res.total;
    currentDataLength.value = res.data.length;
  } catch (err) {
    console.error(err);
    error.value = "Gagal memuat data karyawan.";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);

watch(pageSize, () => {
  fetchData();
});

function onButtonEdit(empNo) {
  console.log(`Button edit dengan ${empNo} diklik`);
  navigateTo(`/update-karyawan/${empNo}`);
}
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center p-6">
    <div class="card w-full max-w-6xl shadow-xl bg-base-100">
      <div class="card-body">
        <Breadcrumbs />
        <div class="flex items-center justify-between mb-4">
          <h2 class="card-title text-center md:text-left">Daftar Karyawan</h2>

          <div class="flex items-center gap-2">
            <button @click="" class="min-w-28 text-sky-800">
              + Tambah Data
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
              <tr v-for="(emp, index) in employees" :key="emp.emp_no">
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
                  <button class="btn btn-error btn-sm">Delete</button>
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
            <button class="join-item btn btn-sm">«</button>
            <button class="join-item btn btn-sm btn-active">1</button>
            <button class="join-item btn btn-sm">2</button>
            <button class="join-item btn btn-sm">3</button>
            <button class="join-item btn btn-sm">»</button>
          </div>
        </div>

        <div v-if="error" class="text-center mt-4 text-red-500 font-medium">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>
