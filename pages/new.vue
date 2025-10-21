<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center p-6">
    <div class="card w-full max-w-2xl shadow-xl bg-base-100">
      <div class="card-body">
        <Breadcrumbs />

        <form @submit.prevent="handleSubmit" class="form-control space-y-4">
          <!-- Data Pribadi -->
          <h3 class="font-semibold text-lg border-b pb-1">Data Karyawan</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label"
                ><span class="label-text">Nomor Karyawan</span></label
              >
              <input
                v-model="form.emp_no"
                type="text"
                placeholder="E001"
                class="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label class="label"
                ><span class="label-text">Nama Karyawan</span></label
              >
              <input
                v-model="form.emp_name"
                type="text"
                placeholder="Nama Lengkap"
                class="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label class="label"><span class="label-text">Email</span></label>
              <input
                v-model="form.emp_email"
                type="email"
                placeholder="nama@company.com"
                class="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label class="label"
                ><span class="label-text">Lokasi Kerja</span></label
              >
              <input
                v-model="form.worklocation"
                type="text"
                placeholder="Jakarta"
                class="input input-bordered w-full"
              />
            </div>

            <div class="md:col-span-2">
              <label class="label"
                ><span class="label-text">Alamat</span></label
              >
              <textarea
                v-model="form.alamat"
                placeholder="Jl. Sudirman No. 88"
                class="textarea textarea-bordered w-full"
                rows="2"
              ></textarea>
            </div>

            <div>
              <label class="label"
                ><span class="label-text">Nomor HP</span></label
              >
              <input
                v-model="form.no_hp"
                type="tel"
                placeholder="08150001111"
                class="input input-bordered w-full"
              />
            </div>

            <div>
              <label class="label"
                ><span class="label-text">Jabatan</span></label
              >
              <input
                v-model="form.jabatan"
                type="text"
                placeholder="Data Analyst"
                class="input input-bordered w-full"
              />
            </div>

            <div>
              <label class="label"
                ><span class="label-text">Tanggal Join</span></label
              >
              <input
                v-model="form.join_date"
                type="date"
                required
                class="input input-bordered w-full text-gray-400 invalid:text-gray-400 valid:text-black"
              />
            </div>
          </div>

          <!-- Supervisor -->
          <h3 class="font-semibold text-lg border-b pb-1 mt-6">
            Data Supervisor
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="label"
                ><span class="label-text">No. Supervisor</span></label
              >
              <input
                v-model="form.spv_emp_no"
                type="text"
                placeholder="SPV001"
                class="input input-bordered w-full"
              />
            </div>
            <div>
              <label class="label"
                ><span class="label-text">Nama Supervisor</span></label
              >
              <input
                v-model="form.spv_name"
                type="text"
                placeholder="Jordan"
                class="input input-bordered w-full"
              />
            </div>
            <div>
              <label class="label"
                ><span class="label-text">Email Supervisor</span></label
              >
              <input
                v-model="form.spv_email"
                type="email"
                placeholder="jordan@company.com"
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <!-- Manager -->
          <h3 class="font-semibold text-lg border-b pb-1 mt-6">Data Manager</h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="label"
                ><span class="label-text">No. Manager</span></label
              >
              <input
                v-model="form.mgr_emp_no"
                type="text"
                placeholder="MGR001"
                class="input input-bordered w-full"
              />
            </div>
            <div>
              <label class="label"
                ><span class="label-text">Nama Manager</span></label
              >
              <input
                v-model="form.mgr_name"
                type="text"
                placeholder="Budi"
                class="input input-bordered w-full"
              />
            </div>
            <div>
              <label class="label"
                ><span class="label-text">Email Manager</span></label
              >
              <input
                v-model="form.mgr_email"
                type="email"
                placeholder="budi@company.com"
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <!-- Tombol Submit -->
          <div class="pt-6">
            <button type="submit" class="btn btn-primary w-full">
              Simpan Data
            </button>
          </div>
        </form>

        <p
          v-if="message"
          class="text-center mt-4 font-medium"
          :class="
            message.includes('berhasil') ? 'text-green-700!' : 'text-red-600!'
          "
        >
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  emp_no: "",
  emp_name: "",
  emp_email: "",
  worklocation: "",
  alamat: "",
  no_hp: "",
  jabatan: "",
  join_date: "",
  spv_emp_no: "",
  spv_name: "",
  spv_email: "",
  mgr_emp_no: "",
  mgr_name: "",
  mgr_email: "",
});

const message = ref("");

async function handleSubmit() {
  try {
    // contoh endpoint insert data karyawan
    const res = await $fetch("http://localhost:5000/api/DataKaryawan/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: toRaw(form),
    });
    console.log(res);

    message.value = "Data karyawan berhasil disimpan!";
    // Object.keys(form).forEach((key) => (form[key] = ""));
  } catch (err) {
    console.error(err);
    message.value = "Gagal menyimpan data!";
  }
}
</script>
