<template>
  
    <!-- Barra de navegación -->
    <nav class="navbar flex justify-between items center" v-if="user">
      <div class="flex space-x-4">
      <!-- Información del usuario -->
      <p class="ml-2" v-if="user">Usuario: {{ user.username }} ({{ user.rol }})</p>
      <!-- Enlaces de navegación -->
      <router-link to="/ahhc" class="nav-link">Asentamientos Humanos</router-link>
      <router-link to="/r_inicio" class="nav-link">Resolución Inicio</router-link>
      <router-link to="/r_final" class="nav-link">Resolución Final</router-link>
      <router-link to="/rezagados" class="nav-link">Rezagados</router-link>
      <router-link to="/escritura_individual" class="nav-link">Escrituración</router-link>
      <router-link to="/poligonos" class="nav-link"> Mapa </router-link>
      <a href="https://demo.gisquick.org/?PROJECT=server/AHHC_ene2025" target="_blank" class="nav-link">
        Visor AHHC
      </a>
    </div>
    <!-- Botón de cerrar sesión posicionado a la izquierda con utility de Tailwind para reordenar -->
    <button @click="logout" class="nav-link bg-red-500 text-white ">Cerrar Sesión</button>
    </nav>
    
    <!-- Vista que se renderiza según la ruta -->
    <router-view />
 
</template>

<script>
import axios from "axios";


export default {
  name: "App",
  computed: {
    user() {
      // Asegúrate de que 'user' se almacena en localStorage tras el login
      return JSON.parse(localStorage.getItem('user'));
    }
  },
  methods: {
    async checkSession() {
      try {
        const response = await axios.get("http://localhost:3000/revisa-sesion", {
          withCredentials: true,
        });
        if (!response.data.authenticated) {
          this.logout();
        }
      } catch (error) {
        this.logout();
      }
    },
    // Método corregido: usar el nombre startSessionChecker
    startSessionChecker() {
      setInterval(() => {
        this.checkSession();
      }, 10 * 60 * 1000); // Verifica cada 60 minutos
    },
    logout() {
      localStorage.removeItem('user');
      this.$router.push({ name: 'login' }).then(()=>{
            location.reload();
          });
    }
  },
  // Corregir el nombre del método llamado en el hook created:
  created() {
    this.startSessionChecker();
  }
};
</script>

<style>
/* Estilos generales */
body, html, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

/* Estilo del navbar */
.navbar {
  background: linear-gradient(to right, #6366F1, #14B8A6);
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}

/* Estilos de los enlaces y botones del navbar */
.nav-link {
  background: white;
  color: #1E3A8A;
  padding: 8px 16px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover {
  background: #E0E7FF;
}
</style>
