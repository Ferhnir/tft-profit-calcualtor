import { createApp } from 'vue'
import { useRouter } from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(useRouter)
  .mount('#app')
