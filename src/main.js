import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

//LocalForge
import Vue3Storage, { StorageType } from "vue3-storage";

//AXIOS
import axios from 'axios'
import VueAxios from 'vue-axios'

import { routes } from './modules/profit-calculator/routes'

loadFonts()

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

createApp(App)
  .use(VueAxios, axios)
  .use(vuetify)
  .use(Vue3Storage, { namespace: "tft_", storage: StorageType.Local })
  .use(router)
  .mount('#app')
