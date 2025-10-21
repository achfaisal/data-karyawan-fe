<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center p-6">
    <div class="card w-full max-w-4xl shadow-xl bg-base-100">
      <div class="card-body">
        <h2 class="card-title text-center">Daftar Karyawan</h2>

        <div v-if="loading" class="text-center py-6 text-gray-500">
          Memuat data karyawan...
        </div>

        <div v-else class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr class="text-gray-600">
                <th>No</th>
                <th>No. Karyawan</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Lokasi</th>
                <th>Jabatan</th>
                <th>Tanggal Join</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(emp, index) in employees" :key="emp.emp_no">
                <td>{{ emp.id }}</td>
                <td>{{ emp.emp_no }}</td>
                <td class="font-medium">{{ emp.emp_name }}</td>
                <td>{{ emp.emp_email }}</td>
                <td>{{ emp.worklocation }}</td>
                <td>{{ emp.jabatan }}</td>
                <td>
                  {{ new Date(emp.join_date).toLocaleDateString("id-ID") }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="error" class="text-center mt-4 text-red-500 font-medium">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const employees = ref([]);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    // const res = await $fetch("/data/karyawan.json");
    const res = await $fetch("http://localhost:5000/api/DataKaryawan/get-all", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        CurrentPage: 1,
        PageSize: 20,
      },
    });

    employees.value = res.data;
    console.log(employees.value);
  } catch (err) {
    console.error(err);
    error.value = "Gagal memuat data karyawan.";
  } finally {
    loading.value = false;
  }
});
</script>
