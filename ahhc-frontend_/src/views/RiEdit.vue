
<template>
  <div class="container mx-auto px-4 md:px-8 lg:px-12">
    <h1 class="text-2xl font-bold mb-4 text-center">Editar Registro</h1>
    <table>
      <tbody>
        <tr>
          <td>Código</td>
          <td><input type="text" v-model="registros.codigo" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Nombre</td>
          <td><input type="text" v-model="registros.nam" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Coordinación</td>
          <td><input type="text" v-model="registros.coordinacion" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Total Lotes</td>
          <td><input type="text" v-model="registros.total_lotes" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Extracto Fecha</td>
          <td><input type="Date" v-model="registros.extracto_fecha" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Lotes a Entregar</td>
          <td><input type="text" v-model="registros.lotes_entrega" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Certif. G. Solicitud UERB</td>
          <td><input type="text" v-model="registros.cg_solicitud_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Certif. G. Solicitud Fecha UERB</td>
          <td><input type="Date" v-model="registros.cg_solicitudfecha_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Certif. G. Oficio RPDMQ</td>
          <td><input type="text" v-model="registros.cg_oficio_rpdmq" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Fecha Oficio Certif. G. RPDMQ</td>
          <td><input type="Date" v-model="registros.fechaof_cg_rpdmq" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Certif. G. Número RPDMQ</td>
          <td><input type="text" v-model="registros.cg_num_rpdmq" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Fecha Certif. G. Número RPDMQ</td>
          <td><input type="Date" v-model="registros.fecha_cg_num_rpdmq" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Memo Informe Jurídico RI UERB</td>
          <td><input type="text" v-model="registros.memo_inforju_ri_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Fecha Memo Jurídico RI UERB</td>
          <td><input type="Date" v-model="registros.fechamemo_inforju_ri_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Oficio RI UERB</td>
          <td><input type="text" v-model="registros.of_ri_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Fecha Oficio RI UERB</td>
          <td><input type="Date" v-model="registros.fechaof_ri_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>RI Shot</td>
          <td><input type="text" v-model="registros.ri_shot" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Fecha RI Shot</td>
          <td><input type="Date" v-model="registros.fecha_ri_shot" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Oficio Inscripción RI UERB</td>
          <td><input type="text" v-model="registros.of_inscrip_ri_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Fecha Oficio Inscripción RI UERB</td>
          <td><input type="Date" v-model="registros.fechaof_inscrip_ri_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Oficio Inscripción RI RPDMQ</td>
          <td><input type="text" v-model="registros.of_inscrip_ri_rpdmq" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Fecha Oficio Inscripción RI RPDMQ</td>
          <td><input type="Date" v-model="registros.fechaof_inscrip_ri_rpdmq" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Razón Inscripción RI RPDMQ</td>
          <td><input type="text" v-model="registros.razon_inscrip_ri_rpdmq" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Fecha Razón Inscripción RI RPDMQ</td>
          <td><input type="Date" v-model="registros.fecha_razon_inscrip_ri_rpdmq" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Oficio Certif. G. UERB</td>
          <td><input type="text" v-model="registros.of_cg_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Fecha Certif. G. UERB</td>
          <td><input type="Date" v-model="registros.fechaof_cg_uerb" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Oficio Certif. G. RPDMQ</td>
          <td><input type="text" v-model="registros.of_cg_rpdmq" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Fecha Certif. G. RPDMQ</td>
          <td><input type="Date" v-model="registros.fecha_cg_rpdmq" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Número Certif. G. RPDMQ</td>
          <td><input type="text" v-model="registros.num_cg_rpdmq" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Fecha Certif. G. RPDMQ</td>
          <td><input type="Date" v-model="registros.fech_cg_rpdmq" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Observaciones</td>
          <td><input type="text" v-model="registros.observ" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
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

    const registros = reactive({
        codigo: "", 
        nam: "", 
        coordinacion: "", 
        total_lotes: "", 
        extracto_fecha: "", 
        lotes_entrega: "", 
        cg_solicitud_uerb: "", 
        cg_solicitudfecha_uerb: "", 
        cg_oficio_rpdmq: "", 
        fechaof_cg_rpdmq: "", 
        cg_num_rpdmq: "", 
        fecha_cg_num_rpdmq: "", 
        memo_inforju_ri_uerb: "", 
        fechamemo_inforju_ri_uerb: "", 
        of_ri_uerb: "", 
        fechaof_ri_uerb: "", 
        ri_shot: "", 
        fecha_ri_shot: "", 
        of_inscrip_ri_uerb: "", 
        fechaof_inscrip_ri_uerb: "", 
        of_inscrip_ri_rpdmq: "", 
        fechaof_inscrip_ri_rpdmq: "", 
        razon_inscrip_ri_rpdmq: "", 
        fecha_razon_inscrip_ri_rpdmq: "", 
        of_cg_uerb: "", 
        fechaof_cg_uerb: "", 
        of_cg_rpdmq: "", 
        fecha_cg_rpdmq: "", 
        num_cg_rpdmq: "", 
        fech_cg_rpdmq: "", 
        observ: "" 
    });

    const fetchRegistro = async () => {
      try {
        const codigo = route.params.codigo; // Asegurarse de usar el mismo nombre que en router-link
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/r_inicio/${codigo}`);//`http://localhost:3000/r_inicio/${codigo}`
        Object.assign(registros, response.data);
      } catch (error) {
        console.error("Error al obtener el registro:", error);
      }
    };

    const guardar = async () => {
      try {
        const codigo = route.params.codigo;
        await axios.put(`${process.env.VUE_APP_API_URL}/r_inicioEdit/${codigo}`, registros);//`http://localhost:3000/r_inicioEdit/${codigo}`
        alert("Listooo actualizadoooo");
        router.push("ConsultaTodo");
      } catch (error) {
        console.error("Error al actualizar el registro:", error);
        alert("NO SE ACTUALIZO... Escribele a Hernán E. a ver que pasa");
      }
    };

    onMounted(fetchRegistro);

    return {
      registros,
      guardar,
    };
  },
};
</script>
