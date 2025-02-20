import '@/assets/scss/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {loading} from "@/directives/loading/loading";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('loading', loading)

app.mount('#app')
