import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/tailwind.css'; // Importa el archivo CSS de Tailwind

createApp(App).use(router) .mount('#app')
