<template>
  <v-tabs
    fixed-tabs
    background-color="primary"
    theme="dark"
  >
    <v-tab
      v-for="(option, index) in options"
      v-bind:key="index"
      :to="{ name: option.routeName }"
    >
      {{ option.name }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'TopBarTabs',

  data: () => ({
    options: [
      { name: 'Investments', routeName: 'investmentPage' },
      { name: 'Loot', routeName: 'lootPage' },
      { name: 'Profit', routeName: 'profitPage' },
      { name: 'Sync Prices', routeName: 'syncPricesPage' },
    ]
  }),
}
</script>