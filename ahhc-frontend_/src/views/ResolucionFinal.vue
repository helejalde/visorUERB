<template>
  <div class="px-2 md:px-8 lg:px-12 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Registros Resolución Final</h1>
    <input type="text" v-model="searchTerm" placeholder="Buscar por nombre" class="border rounded px-3 py-2 mb-4">
    <div class="overflow-auto max-h-[600px] border border-gray-300 rounded-lg">
    <table class="table-auto w-full border-collapse border border-gray-200">
      <thead class="sticky top-0 bg-gray-100">
        <tr class="bg-gray-100">
          <th class="border px-4 py-2 text-sm">Código</th>
          <th class="border px-4 py-2 text-sm">Nombre</th>
          <th class="border px-4 py-2 text-sm">Memorando Informe Jurídico RF</th>
          <th class="border px-4 py-2 text-sm">Fecha Memorando Informe Jurídico RF</th>
          <th class="border px-4 py-2 text-sm">Oficio RF UERB</th>
          <th class="border px-4 py-2 text-sm">Fecha Oficio RF UERB</th>
          <th class="border px-4 py-2 text-sm">Resolución Final SHOT</th>
          <th class="border px-4 py-2 text-sm">Fecha Resolución Final SHOT</th>
          <th class="border px-4 py-2 text-sm">Oficio Inscripción RF UERB</th>
          <th class="border px-4 py-2 text-sm">Fecha Oficio Inscripción RF UERB</th>
          <th class="border px-4 py-2 text-sm">Oficio Inscripción RF Registro Propiedad</th>
          <th class="border px-4 py-2 text-sm">Fecha Oficio RF Registro Propiedad</th>
          <th class="border px-4 py-2 text-sm">Razón Inscripción RF Propiedad</th>
          <th class="border px-4 py-2 text-sm">Oficio Certificación RF UERB</th>
          <th class="border px-4 py-2 text-sm">Fecha Oficio Certificación RF UERB</th>
          <th class="border px-4 py-2 text-sm">Oficio Certificación SHOT</th>
          <th class="border px-4 py-2 text-sm">Certificación SHOT</th>
          <th class="border px-4 py-2 text-sm">Fecha Certificación SHOT</th>
          <th class="border px-4 py-2 text-sm">Observaciones</th>
          <th class="border px-4 py-2 text-sm w-24 sticky right-0 bg-[#d5e6ed]">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="registro in filteredRegistros" :key="registro.codigo">
          <td class="border px-4 py-2">{{ registro.codigo }}</td>
          <td class="border px-4 py-2">{{ registro.nam }}</td>
          <td class="border px-4 py-2">{{ registro.memo_inforjuri_rf }}</td>
          <td class="border px-4 py-2">{{ registro.fecha_memo_inforjuri_rf }}</td>
          <td class="border px-4 py-2">{{ registro.of_rf_uerb }}</td>
          <td class="border px-4 py-2">{{ registro.fecha_of_rf_uerb }}</td>
          <td class="border px-4 py-2">{{ registro.rf_shot }}</td>
          <td class="border px-4 py-2">{{ registro.fecha_rf_shot }}</td>
          <td class="border px-4 py-2">{{ registro.of_inscriprf_uerb }}</td>
          <td class="border px-4 py-2">{{ registro.fechaof_inscriprf_uerb }}</td>
          <td class="border px-4 py-2">{{ registro.of_ra_inscrip_rf_rp }}</td>
          <td class="border px-4 py-2">{{ registro.fecha_razon_inscrip_rp }}</td>
          <td class="border px-4 py-2">{{ registro.razon_inscrip }}</td>
          <td class="border px-4 py-2">{{ registro.of_certificacion_rf_uerb }}</td>
          <td class="border px-4 py-2">{{ registro.fechaof_certificacion_rf_uerb }}</td>
          <td class="border px-4 py-2">{{ registro.of_certificacion_shot }}</td>
          <td class="border px-4 py-2">{{ registro.certificacion_shot }}</td>
          <td class="border px-4 py-2">{{ registro.fecha_certificacion_shot }}</td>
          <td class="border px-4 py-2">{{ registro.observ }}</td>
          <td class="border px-4 py-2 w-24 sticky right-0 bg-[#d5e6ed]">
            <button @click="editar(registro.codigo)" class="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      registros: [],
      searchTerm: "",
    };
  },

  created() {
    this.fetchRegistros();
  },

  computed: {
    filteredRegistros() {
      const term = this.searchTerm.toLowerCase();
      return this.registros.filter(registro => {
        return registro.nam.toLowerCase().includes(term);

      });
    },
  },

  methods: {
    async fetchRegistros() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/r_final`);//"http://localhost:3000/r_final"
        this.registros = response.data;
      } catch (error) {
        console.error("Error al obtener los registros:", error);
      }
    },
        editar(codigo) {
      console.log("Editar registro con id:", codigo);
      this.$router.push({ name: 'Edit Rf', params: { codigo } });
    }
  },
};
</script>
