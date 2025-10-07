<template>
  <div id="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
//import eventBus from "@/eventBus"; // Importar eventBus

export default {
  name: "mapAhhc",
  data() {
    return {
      map: null, // Variable para almacenar el mapa
      geojsonLayer: null, // Guardar referencia a la capa GeoJSON
    };
  },
  mounted() {
    this.initMap();
    //eventBus.on("centrarMapa", this.centrarEnPoligono); // Escuchar evento global
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove(); // Eliminar mapa al salir de la vista
      this.map = null;
    }
    //eventBus.off("centrarMapa", this.centrarEnPoligono); // Limpiar evento al desmontar
  },
  methods: {
    async initMap() {
      // Verifica si el contenedor del mapa ya está inicializado
      if (this.map) return; // Elimina el mapa existente si ya está inicializado
      
      // Inicializa el mapa
      this.map = L.map("map").setView([-0.18, -78.528], 10.5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(this.map);
      
      await this.cargarPoligonos();
    },
    async cargarPoligonos(){
      try {
        const response = await axios.get("http://localhost:3000/poligonos");
        const geojsonData = response.data; // Corregido

        if (!geojsonData || !geojsonData.features) {
          console.error("Datos GeoJSON no válidos");
          return;
        }
        // Si ya existe la capa... la eliminamos antes de agregar la nueva
        if (this.geojsonLayer) {
          this.map.removeLayer(this.geojsonLayer);
        }
        // Agrega los polígonos al mapa con popups
        this.geojsonLayer = L.geoJSON(geojsonData, {
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

        this.geojsonLayer.addTo(this.map);
      } catch (error) {
        console.error("❌ Error al cargar los polígonos:", error);
      }
    },
    /*centrarEnPoligono(codigo) {
      if (!this.geojsonLayer) return;

      let encontrado = false;
      this.geojsonLayer.eachLayer((layer) => {
        if (layer.codigo === codigo) {
          const bounds = layer.getBounds();
          this.map.fitBounds(bounds); // Centrar el mapa en el polígono
          layer.openPopup(); // Mostrar popup del asentamiento
          encontrado = true;
        }
      });

      if (!encontrado) {
        console.error(`No se encontró el asentamiento con código: ${codigo}`);
      }

    }*/
  },
};
</script>

<style scoped>
#map-container {
  width: 90%;
  max-width: 1000px;
  height: 675px;
  margin: 10px auto;
  border-radius: 1px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

#map {
  width: 100%;
  height: 100%;
}
</style>

