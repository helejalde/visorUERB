<template>
  <div class="px-2 md:px-8 lg:px-12 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Registros de AHHC</h1>
    <input type="text" v-model="searchTerm" placeholder="Buscar por nombre" class="border rounded px-3 py-2 mb-4">
    <div class="overflow-auto max-h-[600px] border border-gray-300 rounded-lg">
    <table class="table-auto min-w-full border-collapse border border-gray-200">
      <thead class="sticky top-0 bg-gray-100">
        <tr class="bg-gray-100">
          <th class="border px-4 py-2 text-sm">Código</th>
          <th class="border px-4 py-2 text-sm">Nombre</th>
          <th class="border px-4 py-2 text-sm">Coordinación</th>
          <th class="border px-4 py-2 text-sm">Total Lotes</th>
          <th class="border px-4 py-2 text-sm">Extracto Fecha</th>
          <th class="border px-4 py-2 text-sm">Lotes a Entregar</th>
          <th class="border px-4 py-2 text-sm">Solicitud de Certif. G. UERB</th>
          <th class="border px-4 py-2 text-sm">Solicitud Certif. G. Fecha UERB</th>
          <th class="border px-4 py-2 text-sm">Oficio Certif. G. RPDMQ</th>
          <th class="border px-4 py-2 text-sm">Fecha Certif. G. Oficio RPDMQ</th>
          <th class="border px-4 py-2 text-sm">Número Certif. G. RPDMQ</th>
          <th class="border px-4 py-2 text-sm">Fecha Certif. G. RPDMQ</th>
          <th class="border px-4 py-2 text-sm">Memo Informe Jurídico RI UERB</th>
          <th class="border px-4 py-2 text-sm">Fecha Memo Informe Jurídico RI UERB</th>
          <th class="border px-4 py-2 text-sm">Oficio RI UERB</th>
          <th class="border px-4 py-2 text-sm">Fecha Oficio RI UERB</th>
          <th class="border px-4 py-2 text-sm">RI Shot</th>
          <th class="border px-4 py-2 text-sm">Fecha RI Shot</th>
          <th class="border px-4 py-2 text-sm">Oficio Inscripción RI UERB</th>
          <th class="border px-4 py-2 text-sm">Fecha Oficio Inscripción RI UERB</th>
          <th class="border px-4 py-2 text-sm">Oficio Inscripción RI RPDMQ</th>
          <th class="border px-4 py-2 text-sm">Fecha Oficio Inscripción RI RPDMQ</th>
          <th class="border px-4 py-2 text-sm">Razón Inscripción RI RPDMQ</th>
          <th class="border px-4 py-2 text-sm">Fecha Razón Inscripción RI RPDMQ</th>
          <th class="border px-4 py-2 text-sm">Certif. G. Oficio UERB</th>
          <th class="border px-4 py-2 text-sm">Fecha Oficio Certif. G. UERB</th>
          <th class="border px-4 py-2 text-sm">Certif. G. Oficio RPDMQ</th>
          <th class="border px-4 py-2 text-sm">Fecha Certif. G. Oficio RPDMQ</th>
          <th class="border px-4 py-2 text-sm">Número Certif. G. RPDMQ</th>
          <th class="border px-4 py-2 text-sm">Fecha Certif. G. RPDMQ</th>
          <th class="border px-4 py-2 text-sm">Observaciones</th>
          <th class="border px-4 py-2 text-sm w-24 sticky right-0 bg-[#d5e6ed]">Acciones</th>
        </tr>
      </thead>
      <tbody>
      <!-- Usamos v-for para iterar sobre registros -->
      <tr v-for="registro in filteredRegistros" :key="registro.codigo">
        <td class="border px-4 py-2">{{ registro.codigo }}</td>
        <td class="border px-4 py-2">{{ registro.nam }}</td>
        <td class="border px-4 py-2">{{ registro.coordinacion }}</td>
        <td class="border px-4 py-2">{{ registro.total_lotes }}</td>
        <td class="border px-4 py-2">{{ registro.extracto_fecha }}</td>
        <td class="border px-4 py-2">{{ registro.lotes_entrega }}</td>
        <td class="border px-4 py-2">{{ registro.cg_solicitud_uerb }}</td>
        <td class="border px-4 py-2">{{ registro.cg_solicitudfecha_uerb }}</td>
        <td class="border px-4 py-2">{{ registro.cg_oficio_rpdmq }}</td>
        <td class="border px-4 py-2">{{ registro.fechaof_cg_rpdmq }}</td>
        <td class="border px-4 py-2">{{ registro.cg_num_rpdmq }}</td>
        <td class="border px-4 py-2">{{ registro.fecha_cg_num_rpdmq }}</td>
        <td class="border px-4 py-2">{{ registro.memo_inforju_ri_uerb }}</td>
        <td class="border px-4 py-2">{{ registro.fechamemo_inforju_ri_uerb }}</td>
        <td class="border px-4 py-2">{{ registro.of_ri_uerb }}</td>
        <td class="border px-4 py-2">{{ registro.fechaof_ri_uerb }}</td>
        <td class="border px-4 py-2">{{ registro.ri_shot }}</td>
        <td class="border px-4 py-2">{{ registro.fecha_ri_shot }}</td>
        <td class="border px-4 py-2">{{ registro.of_inscrip_ri_uerb }}</td>
        <td class="border px-4 py-2">{{ registro.fechaof_inscrip_ri_uerb }}</td>
        <td class="border px-4 py-2">{{ registro.of_inscrip_ri_rpdmq }}</td>
        <td class="border px-4 py-2">{{ registro.fechaof_inscrip_ri_rpdmq }}</td>
        <td class="border px-4 py-2">{{ registro.razon_inscrip_ri_rpdmq }}</td>
        <td class="border px-4 py-2">{{ registro.fecha_razon_inscrip_ri_rpdmq }}</td>
        <td class="border px-4 py-2">{{ registro.of_cg_uerb }}</td>
        <td class="border px-4 py-2">{{ registro.fechaof_cg_uerb }}</td>
        <td class="border px-4 py-2">{{ registro.of_cg_rpdmq }}</td>
        <td class="border px-4 py-2">{{ registro.fecha_cg_rpdmq }}</td>
        <td class="border px-4 py-2">{{ registro.num_cg_rpdmq }}</td>
        <td class="border px-4 py-2">{{ registro.fech_cg_rpdmq }}</td>
        <td class="border px-4 py-2">{{ registro.observ }}</td>
        <td class="border px-4 py-2 w-24 sticky right-0 bg-[#d5e6ed]">
          <button @click="editar(registro.codigo)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Editar</button>
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
        const response = await axios.get("http://localhost:3000/r_inicio");
        this.registros = response.data;
      } catch (error) {
        console.error("Error al obtener los registros:", error);
      }
    },
        editar(codigo) {
      console.log("Editar registro con id:", codigo);
      this.$router.push({ name: 'Edit RI', params: { codigo } });
    }
  },
};
</script>
