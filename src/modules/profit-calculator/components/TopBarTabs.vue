<template>
  <v-tabs
    fixed-tabs
    background-color="primary"
    theme="dark"
  >
    <v-tab v-for="(option, index) in options" v-bind:key="index">
      {{ option.name }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'TopBarTabs',

  data: () => ({
    options: [
      { name: 'One' },
      { name: 'Two' },
      { name: 'Three' }
    ]
  }),
}
</script>