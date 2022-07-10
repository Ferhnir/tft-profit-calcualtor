<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          elevation="2"
          @click="executeSyncJob"
          class="my-2 mx-2 float-right"
        >
          Sync Data
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto" elevation="2" style="max-width: 1650px;">
          <v-progress-linear
            v-model="actualIndexUpdate"
            color="blue-grey"
            height="25"
            class="mx-auto my-2"
            style="max-width: 1600px;"
          >
            <template v-slot:default="{ value }">
              <strong class="mt-2">{{ Math.trunc(value) }}%</strong>
            </template>
          </v-progress-linear>
          <v-divider></v-divider>
          <v-table class="mx-auto mt-2" style="max-width: 1600px;">
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
                  <td>{{ item.displayName }}</td>
                  <td>{{ item.count }}</td>
                  <td class="text-center">
                    <div v-if="item.icon != null">
                      <v-icon :icon="item.icon.type" :color="item.icon.color" :class="item.icon.class" />
                    </div>
                  </td>
                  <td class="text-center">
                    {{ formatMomentDate(item.lastUpdate) ?? '- N/A -' }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash'
import moment from 'moment';

export default {
  name: 'SyncDataPage',
  data: () => ({
    urlSync: 'https://raw.githubusercontent.com/The-Forbidden-Trove/poeninja-prices/main/League/',
    itemCategories: [
      { name: 'Artifact', displayName: 'Artifacts', count: 0, localStorageId: 'artifact', lastUpdate: null, icon: false, data: null},
      { name: 'Beast', displayName: 'Beasts', count: 0, localStorageId: 'beast', lastUpdate: null, icon: null, data: null},
      { name: 'BlightRavagedMap', displayName: 'Blight Ravaged Maps', count: 0, localStorageId: 'blight_ravaged_map', lastUpdate: null, icon: null, data: null},
      { name: 'BlightedMap', displayName: 'Blighte dMaps', count: 0, localStorageId: 'blighted_map', lastUpdate: null, icon: null, data: null},
      { name: 'Currency', displayName: 'Currencies', count: 0, localStorageId: 'currency', lastUpdate: null, icon: null, data: null},
      { name: 'DeliriumOrb', displayName: 'Delirium Orbs', count: 0, localStorageId: 'delirium_orb', lastUpdate: null, icon: null, data: null},
      { name: 'DivinationCard', displayName: 'Divination Cards', count: 0, localStorageId: 'divination_card', lastUpdate: null, icon: null, data: null},
      { name: 'Essence', displayName: 'Essencees', count: 0, localStorageId: 'essence', lastUpdate: null, icon: null, data: null},
      { name: 'Fossil', displayName: 'Fossils', count: 0, localStorageId: 'fossil', lastUpdate: null, icon: null, data: null},
      { name: 'Fragment', displayName: 'Fragments', count: 0, localStorageId: 'fragment', lastUpdate: null, icon: null, data: null},
      { name: 'Incubator', displayName: 'Incubators', count: 0, localStorageId: 'incubator', lastUpdate: null, icon: null, data: null},
      { name: 'Oil', displayName: 'Oils', count: 0, localStorageId: 'oil', lastUpdate: null, icon: null, data: null},
      { name: 'Resonator', displayName: 'Resonators', count: 0, localStorageId: 'resonator', lastUpdate: null, icon: null, data: null},
      { name: 'Scarab', displayName: 'Scarabs', count: 0, localStorageId: 'scarab', lastUpdate: null, icon: null, data: null},
    ],
    iconsStatus: {
      uptodate: {
        type: 'mdi-check',
        color: 'green',
        class: null
      },
      expired: {
        type: 'mdi-close-circle',
        color: 'red',
        class: null
      },
      updating: {
        type: 'mdi-rotate-right',
        color: 'blue',
        class: 'spin'
      }
    },
    actualIndexUpdate: 0
  }),
  components: {
  },
  methods: {
    executeSyncJob() {
      let vm = this;
      var dateNow = new moment();

      _.forEach(this.itemCategories, (itemSet, i) => {

        let storageItemSet = vm.$storage.getStorageSync(`tft-item-${itemSet.localStorageId}`);

        if(
          typeof storageItemSet === 'undefined' ||
          moment.duration(dateNow.diff(moment(storageItemSet.timestamp))).as('hours') > 0
        ){
          itemSet.icon = vm.iconsStatus.updating;
          setTimeout(() => vm.categorySyncQuery(itemSet, i), i * 3000);
        }

      });
    },
    categorySyncQuery(item, index) {
      let vm = this;

      this.actualIndexUpdate = ((index + 1) / vm.itemCategories.length) * 100;

      vm.axios.get(vm.urlSync + item.name + '.txt')
        .then((response) => {
          vm.$storage.setStorageSync('tft-item-' + item.localStorageId, {
            data: response.data,
            timestamp: new moment()
          });
          item.lastUpdate = new moment();
          item.count = response.data.length;
          item.icon = vm.iconsStatus.uptodate;
        });
    },
    formatMomentDate(date) {
      return moment(date).format('DD/MM/YYYY HH:mm');
    }
  },
  mounted() {

  },
  computed: {
    itemCategoriesList() {
      return _.orderBy(this.itemCategories, 'displayName', 'asc')
    }
  },
  beforeMount() {
    var vm = this;
    var y = new moment();

    _.forEach(this.itemCategories, itemSet => {

      if(vm.$storage.hasKey(`tft-item-${itemSet.localStorageId}`)){

        let storageItem = vm.$storage.getStorageSync(`tft-item-${itemSet.localStorageId}`);

        itemSet.lastUpdate = storageItem.timestamp;
        itemSet.count = storageItem.data.length;

        if(moment.duration(y.diff(storageItem.timestamp)).as('hours') < 1){
          itemSet.icon = vm.iconsStatus.uptodate;
          console.log(itemSet.icon)
        } else {
          itemSet.icon = vm.iconsStatus.expired;
        }

      } else {
        itemSet.icon = vm.iconsStatus.expired;
      }

    });
  }
}
</script>

<style scoped>
  @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
  }

  .spin {
    animation-name: spin;
    animation-duration: 4000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
</style>

