<template>
  <v-btn
    elevation="2"
    @click="syncData"
  >
    Sync Data
  </v-btn>
  <v-divider></v-divider>
  <v-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left" style="width: 40%;">
            Name
          </th>
          <th class="text-left" style="width: 15%;">
            Items Available
          </th>
          <th class="text-left" style="width: 15%;">
            Syncronised
          </th>
          <th class="text-left" style="width: 30%;">
            Last Update
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in itemCategories"
          :key="item"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.count }}</td>
          <td>
             <v-icon icon="mdi-check" color="green" />
             <v-icon icon="mdi-close-circle" color="red" />
          </td>
          <td>
            {{ new Date() }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-table>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'SyncDataPage',
  data: () => ({
    actualStatus: 0,
    itemCategories: [
      { name: 'Artifact', count: 0, localStorageId: 'artifact', lastUpdate: 'N/A', checked: false },
      { name: 'Beast', count: 0, localStorageId: 'beast', lastUpdate: 'N/A', checked: false },
      { name: 'BlightRavagedMap', count: 0, localStorageId: 'blight_ravaged_map', lastUpdate: 'N/A', checked: false },
      { name: 'BlightedMap', count: 0, localStorageId: 'blighted_map', lastUpdate: 'N/A', checked: false },
      { name: 'Currency', count: 0, localStorageId: 'currency', lastUpdate: 'N/A', checked: false },
      { name: 'DeliriumOrb', count: 0, localStorageId: 'delirium_orb', lastUpdate: 'N/A', checked: false },
      { name: 'DivinationCard', count: 0, localStorageId: 'divination_card', lastUpdate: 'N/A', checked: false },
      { name: 'Essence', count: 0, localStorageId: 'essence', lastUpdate: 'N/A', checked: false },
      { name: 'Fossil', count: 0, localStorageId: 'fossil', lastUpdate: 'N/A', checked: false },
      { name: 'Fragment', count: 0, localStorageId: 'fragment', lastUpdate: 'N/A', checked: false },
      { name: 'Incubator', count: 0, localStorageId: 'incubator', lastUpdate: 'N/A', checked: false },
      { name: 'Oil', count: 0, localStorageId: 'oil', lastUpdate: 'N/A', checked: false },
      { name: 'Resonator', count: 0, localStorageId: 'resonator', lastUpdate: 'N/A', checked: false },
      { name: 'Scarab', count: 0, localStorageId: 'scarab', lastUpdate: 'N/A', checked: false },
    ]
  }),
  components: {
  },
  methods: {
    syncData() {
      // console.log(this.$storage.setStorageSync('xxxx', {
      //   name: 'max',
      //   age: 37
      // }))

      // this.$storage.setStorageSync('syncJobs', this.itemCategories);

      let syncJobs = this.$storage.getStorageSync('syncJobs');

      // _.forEach(this.itemCategories, function(){

      //   vm.$storage.setStorageSync('')
      // })

      // let itemSize = this.itemCategories.length;
      // let jobIndex = 0;

      // setTimeout(function(){
      //   if(jobIndex < itemSize) {
      //     vm.categorySyncQuery(vm.$storage.getStorageSync('syncJobs', vm.itemCategories[jobIndex]))
      //     jobIndex++;
      //   }
      // }, 3000);




    },
    categorySyncQuery(item) {
      console.log(item);
      // this.axios.get('https://raw.githubusercontent.com/The-Forbidden-Trove/poeninja-prices/main/League/' + item.name + '.txt')
      //           .then((response) => {
      //             console.log(response);
      //           });
    }
  },
  mounted() {

    // var vm = this;

    this.$storage.setStorageSync('syncJobs', this.itemCategories);

    // _.forEach(this.itemCategories, function(o) {

    //   if(vm.$storage.getStorageSync(o.localStorageId) == null){
    //     vm.$storage.setStorageSync(o.localStorageId, {
    //       count: o.count,
    //     })
    //   }

    // })
  }
}
</script>