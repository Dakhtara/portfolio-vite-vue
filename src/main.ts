import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueEasyLightbox from 'vue-easy-lightbox'

let app = createApp(App)
app.use(VueEasyLightbox)

app.mount('#app')