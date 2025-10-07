
<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="relative w-full max-w-md">
      <!-- Imagen de fondo -->
      <img :src="logo" alt="Fondo"  />

      <!-- Contenedor del formulario -->
        <div class="relative bg-white p-8 rounded shadow-md">
          <h2 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
          <form @submit.prevent="login">
            <div class="mb-4">
              <label for="username" class="block text-gray-700">Usuario:</label>
              <input type="text" v-model="username" class="border border-gray-300 p-2 rounded w-full" required />
            </div>
            <div class="mb-4">
              <label for="password" class="block text-gray-700">Contraseña:</label>
              <input type="password" v-model="password" class="border border-gray-300 p-2 rounded w-full" required />
            </div>
            <div class="mb-4">
              <button type="submit" class="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Iniciar Sesión</button>
            </div>
            <p v-if="error" class="text-red-500">{{ error }}</p>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import logo from "@/assets/LOGO-REGULA-TU-BARRIO.png";
  export default {
    data() {
      return {
        username: "",
        password: "",
        logo: logo,
        error: null,
      };
    },

    methods: {
      async login() {
        try {
          const response = await axios.post("http://localhost:3000/login", {
            username: this.username,
            password: this.password,
          }, { withCredentials: true });
  
          localStorage.setItem("user", JSON.stringify(response.data.user));
         // this.startSessionChecker();
          this.$router.push({name: 'ConsultaTodo'}).then(()=>{
            location.reload();
          });
          

        } catch (err) {
          this.error = err.response?.data?.error || "Error en el login";
        }
      },
      
  },

  /*created() {
    this.startSessionChecker(); // 🔍 Verifica la sesión al cargar el componente
  }*/

  };
  </script>
  <style scoped>
  /* Estilos adicionales para la imagen de fondo */
  .relative {
    position: relative;
  }
  
  .absolute {
    position: absolute;
  }
  
  .inset-0 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  
  .object-cover {
    object-fit: cover;
  }
  
  .opacity-50 {
    opacity: 0.5;
  }
  </style>
