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

const routes = [
  { path: '/', name: 'Main', component: AppMain },
  { path: '/catalog', name: 'Catalog', component: CatalogPage },
  { path: '/routes', name: 'Routes', component: RoutesPage },
  { path: '/marshruty/razvod-mostov', name: 'BridgeRoutes', component: BridgeRoutesPage },
  { path: '/marshruty/:slug', name: 'MainRouteLanding', component: MainRouteLandingPage },
  { path: '/tours', name: 'Tours', component: ToursPage },
  { path: '/kruizy/:slug', name: 'YachtTourDetail', component: YachtTourDetail },
  { path: '/boat/:slug', name: 'BoatDetail', component: BoatDetail },
  { path: '/blog/:slug', name: 'BlogArticle', component: BlogArticle },
  { path: '/route/:slug', name: 'RouteDetail', component: RouteDetail },
  { path: '/service/:slug', name: 'ServiceDetail', component: ServiceDetail },
  { path: '/activity/:slug', name: 'ActivityDetail', component: ActivityDetail }
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

export default router
