import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import {router} from "./routes";

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(VueEasyLightbox)
app.use(router)
app.mount('#app')
