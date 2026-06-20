import { createRouter, createWebHistory } from 'vue-router'
import AppMain from '../components/AppMain.vue'
import BoatDetail from '../components/BoatDetail.vue'
import BlogArticle from '../components/BlogArticle.vue'
import RouteDetail from '../components/RouteDetail.vue'
import BridgeRoutesPage from '../components/BridgeRoutesPage.vue'
import CatalogPage from '../components/CatalogPage.vue'
import RoutesPage from '../components/RoutesPage.vue'
import ToursPage from '../components/ToursPage.vue'
import YachtTourDetail from '../components/YachtTourDetail.vue'
import ServiceDetail from '../components/ServiceDetail.vue'
import ActivityDetail from '../components/ActivityDetail.vue'
import MainRouteLandingPage from '../components/MainRouteLandingPage.vue'
import { applyRouteSeo } from '../seo/meta'

const routes = [
  { path: '/', name: 'Main', component: AppMain },
  { path: '/catalog', name: 'Catalog', component: CatalogPage },
  { path: '/catalog/:slug', name: 'BoatDetail', component: BoatDetail },
  { path: '/blog/:slug', name: 'BlogArticle', component: BlogArticle },
  { path: '/routes', name: 'Routes', component: RoutesPage },
  { path: '/routes/razvod-mostov', name: 'BridgeRoutes', component: BridgeRoutesPage },
  { path: '/routes/reki-i-kanaly', name: 'MainRouteLandingRekiKanaly', component: MainRouteLandingPage },
  { path: '/routes/neva', name: 'MainRouteLandingNeva', component: MainRouteLandingPage },
  { path: '/routes/finskij-zaliv', name: 'MainRouteLandingFinskijZaliv', component: MainRouteLandingPage },
  { path: '/routes/:slug', name: 'RouteDetail', component: RouteDetail },
  { path: '/tours', name: 'Tours', component: ToursPage },
  { path: '/tours/:slug', name: 'YachtTourDetail', component: YachtTourDetail },
  { path: '/services/:slug', name: 'ServiceDetail', component: ServiceDetail },
  { path: '/events/:slug', name: 'ActivityDetail', component: ActivityDetail },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const element = document.querySelector(to.hash)
          if (element) {
            resolve({
              el: to.hash,
              behavior: 'smooth',
              top: 100
            })
          } else {
            resolve({ top: 0 })
          }
        }, 100)
      })
    }
    return { top: 0 }
  }
})

router.afterEach((to) => {
  applyRouteSeo(to)
})

export default router
