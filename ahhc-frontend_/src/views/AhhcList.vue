<template>
  <div class="container mx-auto px-4 md:px-8 lg:px-12">
    <!-- Título y buscador fuera del contenedor de la tabla -->
    <h1 class="text-2xl font-bold mb-4 text-center">ASENTAMIENTOS HUMANOS DE HECHO Y CONSOLIDADO</h1>
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Buscar por: nombre/codigo/estado "
      class="border rounded px-3 py-2 mb-4 w-90 mr-6"
    />

  <select
    v-model="selectedCoordinacion"
    class="border rounded px-3 py-2 w-90 ml-6"
  >
    <option value="">----Coordinaciones----</option>
    <option v-for="coordinacion in coordinaciones" :key="coordinacion" :value="coordinacion">
      {{ coordinacion }}
    </option>
  </select>

  <button
      @click="generarReporte"
      class="bg-green-500 text-white px-4 py-2 ml-6 rounded hover:bg-green-700 mb-4">
      Generar Reporte
  </button>

    <!-- Contenedor del listado -->
    <div class="bg-white shadow-md rounded-lg p-4 mb-4 max-h-[400px] overflow-y-auto">
      <table class="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="border px-4 py-2">Código</th>
            <th class="border px-4 py-2">Nombre</th>
            <th class="border px-4 py-2">Estado</th>
            <th class="border px-4 py-2">Titulo 2025</th>
            <th class="border px-4 py-2">Ordenanza Inscrita</th>
            <th class="border px-4 py-2">Número de Ordenanza</th>
            <th class="border px-4 py-2">Coordinación</th>
            <th class="border px-4 py-2">Total lotes</th>
            <th class="border px-4 py-2">Predios Catastrados</th>
            <th class="border px-4 py-2">Lotes titularizados</th>
            <th class="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="registro in filteredRegistros" :key="registro.id">
            <td class="border px-4 py-2">{{ registro.codigo }}</td>
            <td class="border px-4 py-2">{{ registro.nam }}</td>
            <td class="border px-4 py-2">{{ registro.estado }}</td>
            <td class="border px-4 py-2">{{ registro.titulo_2025 }}</td>
            <td class="border px-4 py-2">{{ registro.ordenanza_inscrita }}</td>
            <td class="border px-4 py-2">{{ registro.num_ordenanza }}</td>
            <td class="border px-4 py-2">{{ registro.coordinacion }}</td>
            <td class="border px-4 py-2">{{ registro.total_lotes }}</td>
            <td class="border px-4 py-2">{{ registro.predios_catastrados }}</td>
            <td class="border px-4 py-2">{{ registro.lotes_titularizados}}</td>
            <td class="border px-4 py-2 flex space-x-2">
              <button
                @click="verEnMapa(registro.codigo)"
                class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >Ver</button>
              <button
                @click="editar(registro.codigo)"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Contenedor del mapa -->
    <div id="map" class="w-full h-[500px] border rounded"></div>
  </div>
</template>

<script>
import axios from "axios";
import L from "leaflet";

export default {
  data() {
    return {
      registros: [],
      searchTerm: "",
      selectedCoordinacion: "",
      coordinaciones: [], // Lista única de coordinaciones
      map: null,
      geoJsonLayer: null,
    };
  },

  /*computed: {
    filteredRegistros() {
      const term = this.searchTerm.toLowerCase();
      return this.registros.filter((registro) => registro.nam.toLowerCase().includes(term));
    },
  },*/

  computed: {
  filteredRegistros() {
    const term = this.searchTerm.toLowerCase();
    return this.registros.filter((registro) => {
      const nam = registro.nam ? registro.nam.toLowerCase() : ""; // Manejo de nulo
      const codigo = registro.codigo ? registro.codigo.toLowerCase() : ""; // Manejo de nulo
      const estado = registro.estado ? registro.estado.toLowerCase() : ""; // Manejo de nulo

      const matchesSearchTerm =
        nam.includes(term) || codigo.includes(term) || estado.includes(term);
      const matchesCoordinacion =
        this.selectedCoordinacion === "" || registro.coordinacion === this.selectedCoordinacion;

      return matchesSearchTerm && matchesCoordinacion;
    });
  },
},

  mounted() {
    this.initMap();
    this.fetchRegistros();
    this.extractCoordinaciones();
  },

  methods: {
   /* async fetchRegistros() {
      try {
        const response = await axios.get("http://172.21.16.20:3000/ahhc");
        this.registros = response.data;
      } catch (error) {
        console.error("Error al obtener los registros:", error);
      }
    },*/

    async fetchRegistros() {
      try {
       const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/ahhc`); //"http://localhost:3000/api/ahhc"
      
        this.registros = response.data;
            // Llamar a extractCoordinaciones después de obtener los registros
        this.extractCoordinaciones();
      } catch (error) {
        console.error("Error al obtener los registros:", error);
      }
    },

    extractCoordinaciones() {
      this.coordinaciones = [...new Set(this.registros.map((registro) => registro.coordinacion))];
    },

    generarReporte() {
    // procesar los datos y convertirlos a un formato descargable.
    const reporte = this.filteredRegistros.map(registro => ({
      Código: registro.codigo,
      Nombre: registro.nam,
      Estado: registro.estado,
      Coordinación: registro.coordinacion,
      'Titulos_2025': registro.titulo_2025,
      'Ordenanza':registro.num_ordenanza
      
    }));
        // Convertir datos a JSON o CSV (en este caso CSV)
        const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        Object.keys(reporte[0]).join(';'), // Encabezados
        ...reporte.map(row => Object.values(row).join(';')), // Datos
      ].join('\n');

    // Crear un enlace para descargar el archivo CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'AHHC_reporte.csv');
    document.body.appendChild(link);

    link.click(); // Simula el clic
    document.body.removeChild(link);
  },
    async initMap() {
      this.map = L.map("map",{
        zoomAnimation: true, // Desactiva las animaciones de zoom
      }).setView([-0.18, -78.528], 10.5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      }).addTo(this.map);
            // Opcional: Escucha los eventos de zoom
            this.map.on("zoomstart", () => {
            console.log("Zoom iniciado");
            });

            this.map.on("zoomend", () => {
              console.log("Zoom finalizado");
            });
      await this.cargarPoligonos();
      
    },

    async cargarPoligonos() {
    try {
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/poligonos`);//"http://localhost:3000/poligonos"
      const geojsonData = response.data;

      if (!geojsonData || !geojsonData.features) {
        console.error("Datos GeoJSON no válidos");
        return;
      }
      // Si ya existe la capa, la eliminamos antes de agregar la nueva
      if (this.geoJsonLayer) {
        this.map.removeLayer(this.geoJsonLayer);
      }
      // Agrega los polígonos al mapa con popups
      this.geoJsonLayer = L.geoJSON(geojsonData, {
        style: { color: "blue", weight: 2 },
        onEachFeature: function (feature, layer) {
          if (feature.properties) {
            const nombre = feature.properties.nam || "Desconocido";
            const codigo = feature.properties.codigo || "N/A";

            // Guardar el código en la capa para poder buscarlo después
            layer.codigo = codigo;

            layer.bindPopup(`
              <b>Nombre:</b> ${nombre}<br>
              <b>Código:</b> ${codigo}
            `);
          }
        },
      });

      this.geoJsonLayer.addTo(this.map);
    } catch (error) {
      console.error("❌ Error al cargar los polígonos:", error);
    }
  },

    verEnMapa(codigo) {
      let encontrado = false;

      if (this.geoJsonLayer) {
        this.geoJsonLayer.eachLayer((layer) => {
          if (layer.codigo === codigo) {
            this.map.fitBounds(layer.getBounds());
            encontrado = true;
            layer.openPopup(); // Opcional: abrir el popup
          }
        });
      }

      if (!encontrado) {
        console.error(`No se encontró ningún feature con el código: ${codigo}`);
      }
    },

    editar(codigo) {
      console.log("Editar registro con id:", codigo);
      this.$router.push({ name: "EditarAhhc", params: { codigo } });
    },
  },
};
</script>

<style>
#map {
  height: 500px;
}

/* Ajustar el tamaño del contenedor de la tabla */
.bg-white {
  max-height: 300px; /* Ajusta el tamaño según tus necesidades */
}
</style>