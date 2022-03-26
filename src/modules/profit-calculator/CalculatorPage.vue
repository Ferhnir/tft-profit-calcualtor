<template>
  <top-bar-tabs/>
  <router-view name="calculatorPage" />
</template>

<script>

import TopBarTabs from './components/TopBarTabs.vue'

export default{
  name: 'CalculatorPage',

  components: {
    TopBarTabs
  },

  data: () => ({
    //
  }),
}
</script>
