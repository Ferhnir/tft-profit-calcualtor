<template>
  <v-tabs
    fixed-tabs
    background-color="primary"
    theme="dark"
    v-model="activeTab"
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
import _ from 'lodash'

export default {
  name: 'TopBarTabs',

  data: () => ({
    options: [
      { name: 'Investments', routeName: 'investmentPage' },
      { name: 'Loot', routeName: 'lootPage' },
      { name: 'Profit', routeName: 'profitPage' },
      { name: 'Sync Data', routeName: 'syncDataPage' },
    ]
  }),
  computed: {
    activeTab() {
      return _.findIndex(this.options, o => { return o.routeName == this.$route.name});
    }
  }
}
</script>