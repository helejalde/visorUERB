<template>
  <div class="container mx-auto px-4 md:px-8 lg:px-12">
    <h1 class="text-2xl font-bold mb-4 text-center">Editar Registro</h1>
    <table>
      <tbody>
        <tr>
          <td>Nombre</td>
          <td ><input type="text" v-model="registro.nam" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Código</td>
          <td><input type="text" v-model="registro.codigo" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Estado</td>
          <td><input type="text" v-model="registro.estado" class="border border-gray-300 p-2 rounded w-full"/></td>
        </tr>
        <tr>
          <td>Título 2025</td>
          <td><input type="text" v-model="registro.titulo_2025" class="border border-gray-300 p-2 rounded w-full"/></td>
        </tr>
        <tr>
          <td>Aprobado</td>
          <td><input type="text" v-model="registro.ahhc_aprobado" class="border border-gray-300 p-2 rounded w-full"/></td>
        </tr>
        <tr>
          <td>Número de Ordenanza</td>
          <td><input type="text" v-model="registro.num_ordenanza" class="border border-gray-300 p-2 rounded w-full"/></td>
        </tr>
        <tr>
          <td>Grupo Priorización Ordenanza</td>
          <td><input type="text" v-model="registro.grupo_ord" class="border border-gray-300 p-2 rounded w-full" /></td>
        </tr>
        <tr>
          <td>Coordinación</td>
          <td><input type="text" v-model="registro.coordinacion" class="border border-gray-300 p-2 rounded w-full" /></td>
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

    const registro = reactive({
      nam: "",
      codigo: "",
      estado: "",
      titulo_2025: "",
      ahhc_aprobado: "",
      num_ordenanza: "",
      grupo_ord: ""
    });

    const fetchRegistro = async () => {
      try {
        const codigo = route.params.codigo; // Asegurarse de usar el mismo nombre que en router-link
        const response = await axios.get(`http://localhost:3000/ahhc/${codigo}`);
        Object.assign(registro, response.data);
      } catch (error) {
        console.error("Error al obtener el registro:", error);
      }
    };

    const guardar = async () => {
      try {
        const codigo = route.params.codigo;
        await axios.put(`${process.env.VUE_APP_API_URL}/ahhcEdit/${codigo}`, registro);//`http://localhost:3000/ahhcEdit/${codigo}`
        alert("Listo ya le actualizaste.");
        router.push('ConsultaTodo').then(()=>{
            location.reload();
          });
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
