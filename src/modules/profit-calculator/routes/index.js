// const Home = { template: '<div>Home</div>' }

import InvestmentsPage from '../InvestmentsPage'
import LootPage from '../LootPage'
import ProfitPage from '../ProfitPage'
import SyncPricesPage from '../SyncPricesPage'

const routes = [
  {
    path: '/',
    name: 'investmentPage',
    components: {
      default: InvestmentsPage,
      calculatorPage: InvestmentsPage
    }
  },
  {
    path: '/Loot',
    name: 'lootPage',
    components: {
      default: LootPage,
      calculatorPage: LootPage
    }
  },
  {
    path: '/Profit',
    name: 'profitPage',
    components: {
      default: ProfitPage,
      calculatorPage: ProfitPage
    }
  },
  {
    path: '/SyncPrices',
    name: 'syncPricesPage',
    components: {
      default: SyncPricesPage,
      calculatorPage: SyncPricesPage
    }
  }
]

export {routes};
