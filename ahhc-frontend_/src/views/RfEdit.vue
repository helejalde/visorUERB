<template>
  <div class="container mx-auto px-4 md:px-8 lg:px-12">
    <h1 class="text-2xl font-bold mb-4 text-center">Editar Registro</h1>
    <table>
      <tbody>
        <!-- Código -->
        <tr>
          <td>Codigo</td>
          <td><input type="text" v-model="registro.codigo" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Nombre -->
        <tr>
          <td>Nombre</td>
          <td><input type="text" v-model="registro.nam" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Memorando Informe Jurídico RF -->
        <tr>
          <td>Memorando Informe Jurídico RF</td>
          <td><input type="text" v-model="registro.memo_inforjuri_rf" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Fecha Memorando Informe Jurídico RF -->
        <tr>
          <td>Fecha Memorando Informe Jurídico RF</td>
          <td><input type="date" v-model="registro.fecha_memo_inforjuri_rf" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Oficio RF UERB -->
        <tr>
          <td>Oficio RF UERB</td>
          <td><input type="text" v-model="registro.of_rf_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Fecha Oficio RF UERB -->
        <tr>
          <td>Fecha Oficio RF UERB</td>
          <td><input type="date" v-model="registro.fecha_of_rf_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Resolución Final SHOT -->
        <tr>
          <td>Resolución Final SHOT</td>
          <td><input type="text" v-model="registro.rf_shot" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Fecha Resolución Final SHOT -->
        <tr>
          <td>Fecha Resolución Final SHOT</td>
          <td><input type="date" v-model="registro.fecha_rf_shot" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Oficio Inscripción RF UERB -->
        <tr>
          <td>Oficio Inscripción RF UERB</td>
          <td><input type="text" v-model="registro.of_inscriprf_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Fecha Oficio Inscripción RF UERB -->
        <tr>
          <td>Fecha Oficio Inscripción RF UERB</td>
          <td><input type="date" v-model="registro.fechaof_inscriprf_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Oficio Inscripción RF Registro Propiedad -->
        <tr>
          <td>Oficio Razón Inscripción RF RPDMQ</td>
          <td><input type="text" v-model="registro.of_ra_inscrip_rf_rp" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Fecha Inscripción RF Registro Propiedad -->
        <tr>
          <td>Fecha Inscripción RF RPDMQ</td>
          <td><input type="date" v-model="registro.fecha_razon_inscrip_rp" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Razón Inscripción RF Registro Propiedad -->
        <tr>
          <td>Razón Inscripción </td>
          <td><input type="text" v-model="registro.razon_inscrip" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Oficio Certificación RF UERB -->
        <tr>
          <td>Oficio Certificación RF UERB</td>
          <td><input type="text" v-model="registro.of_certificacion_rf_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Fecha Oficio Certificación RF UERB -->
        <tr>
          <td>Fecha Oficio Certificación RF UERB</td>
          <td><input type="date" v-model="registro.fechaof_certificacion_rf_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Oficio Certificación SHOT -->
        <tr>
          <td>Oficio Certificación SHOT</td>
          <td><input type="text" v-model="registro.of_certificacion_shot" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Certificación SHOT -->
        <tr>
          <td>Certificación SHOT</td>
          <td><input type="text" v-model="registro.certificacion_shot" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Fecha Certificación SHOT -->
        <tr>
          <td>Fecha Certificación SHOT</td>
          <td><input type="date" v-model="registro.fecha_certificacion_shot" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Observaciones -->
        <tr>
          <td>Observaciones</td>
          <td><input type="text" v-model="registro.observ" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <!-- Guardar botón -->
        <tr>
          <td colspan="2">
            <button @click="guardar" class="ml-2 bg-red-400 text-white px-4 py-2 rounded hover:bg-red-700">Guardar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  
  <script>
  import axios from "axios";
  import { onMounted, reactive } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
  
      const registro = reactive({
        id_ri: "", 
        codigo: "", 
        nam: "", 
        memo_inforjuri_rf: "", 
        fecha_memo_inforjuri_rf: "", 
        of_rf_uerb: "", 
        fecha_of_rf_uerb: "", 
        rf_shot: "", 
        fecha_rf_shot: "", 
        of_inscriprf_uerb: "", 
        fechaof_inscriprf_uerb: "", 
        of_ra_inscrip_rf_rp: "", 
        razon_inscrip: "", 
        fecha_razon_inscrip_rp: "", 
        of_certificacion_rf_uerb: "", 
        fechaof_certificacion_rf_uerb: "", 
        of_certificacion_shot: "", 
        certificacion_shot: "", 
        fecha_certificacion_shot: "", 
        observ: "", 
      });
  
      const fetchRegistro = async () => {
        try {
          const codigo = route.params.codigo; // Asegurarse de usar el mismo nombre que en router-link
          const response = await axios.get(`http://localhost:3000/r_final/${codigo}`);
          Object.assign(registro, response.data);
        } catch (error) {
          console.error("Error al obtener el registro:", error);
        }
      };
  
      const guardar = async () => {
        try {
          const codigo = route.params.codigo;
          await axios.put(`http://localhost:3000/r_finalEdit/${codigo}`, registro);
          alert("Listooo actualizadoooo");
          router.push("Edit Rf");
        } catch (error) {
          console.error("Error al actualizar el registro:", error);
          alert("Hubo un error al actualizar el registro.");
        }
      };
  
      onMounted(fetchRegistro);
  
      return {
        registro,
        guardar,
      };
    },
  };
  </script>
  