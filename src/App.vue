<template>
  <v-app>
    <v-main>
      <top-navbar/>
      <calculator-page/>
    </v-main>
  </v-app>
</template>

<script>
import TopNavbar from './components/TopNavbar.vue'
import CalculatorPage from './modules/profit-calculator/CalculatorPage.vue'

export default {
  name: 'App',

  components: {
    TopNavbar,
    CalculatorPage
  },

  data: () => ({
    //
  }),
}
</script>
