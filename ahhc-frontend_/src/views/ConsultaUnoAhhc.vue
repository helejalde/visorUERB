<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Detalle del Registro</h1>
    <div v-if="registro">
      <p><strong>Nombre:</strong> {{ registro.nam }}</p>
      <p><strong>Código:</strong> {{ registro.codigo }}</p>
      <p><strong>Estado:</strong> {{ registro.estado }}</p>
      <p><strong>Titulo 2025:</strong> {{ registro.titulo_2025 }}</p>
      <p><strong>AHHC Aprobado:</strong> {{ registro.ahhc_aprobado }}</p>
      <p><strong>Numero de Ordenanza:</strong> {{ registro.num_ordenanza }}</p>
      <p><strong>Grupo Ordenanza:</strong> {{ registro.grupo_ordenanza }}</p>
    </div>
    <div v-else>
      <p class="text-red-500">Registro no encontrado</p>
    </div>
    <router-link to="/" class="text-blue-500 hover:underline">Volver</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      registro: null,
    };
  },
  created() {
    this.fetchRegistro();
  },
  methods: {
    async fetchRegistro() {
      try {
        const { codigo } = this.$route.params;
        const response = await axios.get(`http://localhost:3000/ahhc/${codigo}`);
        this.registro = response.data;
      } catch (error) {
        console.error("Error al obtener el registro:", error);
      }
    },
  },
};
</script>