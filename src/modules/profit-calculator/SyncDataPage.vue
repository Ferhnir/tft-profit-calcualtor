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
          <th class="text-center" style="width: 15%;">
            Syncronised
          </th>
          <th class="text-center" style="width: 30%;">
            Last Update
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in itemCategoriesList"
          :key="item"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.count }}</td>
          <td class="text-center">
            <div v-if="item.checked">
             <v-icon icon="mdi-check" color="green" />
            </div>
            <div v-else>
             <v-icon icon="mdi-close-circle" color="red" />
            </div>
          </td>
          <td class="text-center">
            {{ item.lastUpdate ?? 'N/A' }}
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
    urlSync: 'https://raw.githubusercontent.com/The-Forbidden-Trove/poeninja-prices/main/League/',
    actualStatus: 0,
    itemCategories: [
      { name: 'Artifact', count: 0, localStorageId: 'artifact', lastUpdate: 'N/A', checked: false, data: null},
      { name: 'Beast', count: 0, localStorageId: 'beast', lastUpdate: 'N/A', checked: false, data: null},
      { name: 'BlightRavagedMap', count: 0, localStorageId: 'blight_ravaged_map', lastUpdate: 'N/A', checked: false, data: null},
      { name: 'BlightedMap', count: 0, localStorageId: 'blighted_map', lastUpdate: 'N/A', checked: false, data: null},
      { name: 'Currency', count: 0, localStorageId: 'currency', lastUpdate: 'N/A', checked: false, data: null},
      { name: 'DeliriumOrb', count: 0, localStorageId: 'delirium_orb', lastUpdate: 'N/A', checked: false, data: null},
      { name: 'DivinationCard', count: 0, localStorageId: 'divination_card', lastUpdate: 'N/A', checked: false, data: null},
      { name: 'Essence', count: 0, localStorageId: 'essence', lastUpdate: 'N/A', checked: false, data: null},
      { name: 'Fossil', count: 0, localStorageId: 'fossil', lastUpdate: 'N/A', checked: false, data: null},
      { name: 'Fragment', count: 0, localStorageId: 'fragment', lastUpdate: 'N/A', checked: false, data: null},
      { name: 'Incubator', count: 0, localStorageId: 'incubator', lastUpdate: 'N/A', checked: false, data: null},
      { name: 'Oil', count: 0, localStorageId: 'oil', lastUpdate: 'N/A', checked: false, data: null},
      { name: 'Resonator', count: 0, localStorageId: 'resonator', lastUpdate: 'N/A', checked: false, data: null},
      { name: 'Scarab', count: 0, localStorageId: 'scarab', lastUpdate: 'N/A', checked: false, data: null},
    ],
    syncInterval: null
  }),
  components: {
  },
  methods: {
    syncData() {
      this.executeSyncJob();
      console.log(this.$storage.getStorageSync('itemsPrices'));
    },
    executeSyncJob() {
      let vm = this;
      // let jobIndex = 0;

      _.forEach(this.itemCategories, (itemSet, i) => {
        setTimeout(() => {
          vm.categorySyncQuery(itemSet, i)
        }, i * 3000);
      });
    },
    categorySyncQuery(item, index) {
      let vm = this;
      vm.axios.get(vm.urlSync + item.name + '.txt')
        .then((response) => {
          vm.itemCategories[index].checked = true;
          vm.itemCategories[index].lastUpdate = new Date();
          vm.itemCategories[index].data = response.data;
          vm.$storage.setStorageSync('itemsPrices', vm.itemCategories);
          console.log(response);
        });
    }
  },
  mounted() {
    if(
      typeof this.$storage.getStorageSync('itemsPrices') === 'undefined' ||
      this.$storage.getStorageSync('itemsPrices') == null
    ){
      console.log(this.$storage.getStorageSync('itemsPrices'));
     this.$storage.setStorageSync('itemsPrices', this.itemCategories);
    }
  },
  computed: {
    itemCategoriesList() {
      return this.$storage.getStorageSync('itemsPrices');
    }
  }
}
</script>