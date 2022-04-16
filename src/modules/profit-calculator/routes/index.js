// const Home = { template: '<div>Home</div>' }

import InvestmentsPage from '../InvestmentsPage'
import LootPage from '../LootPage'
import ProfitPage from '../ProfitPage'
import SyncDataPage from '../SyncDataPage'

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
    path: '/SyncDataPage',
    name: 'syncDataPage',
    components: {
      default: SyncDataPage,
      calculatorPage: SyncDataPage
    }
  }
]

export {routes};
