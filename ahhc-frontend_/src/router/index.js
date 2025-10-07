import { createRouter, createWebHistory } from "vue-router";

// Importa tus vistas
import ConsultaTodo from "@/views/AhhcList.vue";
import ConsultaUno from "@/views/ConsultaUnoAhhc.vue";
import AhhcEdit from "@/views/AhhcEdit.vue"
import ResolucionInicio from "@/views/ResolucionInicio.vue"
import RiEdit from "@/views/RiEdit.vue"
import ResolucionFinal from "@/views/ResolucionFinal.vue"
import RfEdit from "@/views/RfEdit.vue"
import Mapa from "@/views/mapAhhc.vue"
import Login from "@/views/InicioSesion.vue"
import Home from "@/App.vue";
import BarChart from "@/views/BarChart.vue";


const routes = [
  { path: "/login", name: "login", component: Login },
  {path: '/', name: 'home', component: Home, meta: {requiresAuth: true} },
  { path: "/ahhc", name: "ConsultaTodo", component: ConsultaTodo, meta: { requiresAuth: true } },
  { path: "/ahhc/:codigo", name: "ConsultaUno", component: ConsultaUno, meta: { requiresAuth: true } },
  { path: "/ahhcEdit/:codigo", name: "EditarAhhc", component: AhhcEdit, meta: { requiresAuth: true } },
  { path: "/r_inicio", name: "Resolucion Inicio", component: ResolucionInicio, meta: { requiresAuth: true } },
  { path: "/r_inicioEdit", name: "Edit RI", component: RiEdit, meta: { requiresAuth: true } },
  { path: "/r_final", name: "Resolucion Final", component: ResolucionFinal, meta: { requiresAuth: true } },
  { path: "/r_finalEdit", name: "Edit Rf", component: RfEdit, meta: { requiresAuth: true } },
  { path: "/poligonos", name: "Mapa", component: Mapa, meta: { requiresAuth: true } },
  { path: "/BarChart", name: "barchart", component: BarChart, meta: { requiresAuth: true } },
  
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({ name: 'login' });
  } else {
    next();
  }
});


export default router;

