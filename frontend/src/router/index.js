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
import { canonicalizeCatalogRoute } from './publicIds'

const redirectToNamedRoute = (name) => (to) => ({
  name,
  params: to.params,
  query: to.query,
  hash: to.hash,
})

const routes = [
  { path: '/', name: 'Main', component: AppMain },
  { path: '/catalog', name: 'Catalog', component: CatalogPage },
  { path: '/catalog/tours/:slug', name: 'YachtTourDetail', component: YachtTourDetail },
  { path: '/catalog/routes/:slug', name: 'RouteDetail', component: RouteDetail },
  { path: '/catalog/services/:slug', name: 'ServiceDetail', component: ServiceDetail },
  { path: '/catalog/events/:slug', name: 'ActivityDetail', component: ActivityDetail },
  { path: '/catalog/articles/:slug', name: 'BlogArticle', component: BlogArticle },
  { path: '/catalog/:slug', name: 'BoatDetail', component: BoatDetail },
  { path: '/routes', name: 'Routes', component: RoutesPage },
  { path: '/marshruty/razvod-mostov', name: 'BridgeRoutes', component: BridgeRoutesPage },
  { path: '/marshruty/:slug', name: 'MainRouteLanding', component: MainRouteLandingPage },
  { path: '/tours', name: 'Tours', component: ToursPage },
  { path: '/kruizy/:slug', redirect: redirectToNamedRoute('YachtTourDetail') },
  { path: '/boat/:slug', redirect: redirectToNamedRoute('BoatDetail') },
  { path: '/blog/:slug', redirect: redirectToNamedRoute('BlogArticle') },
  { path: '/route/:slug', redirect: redirectToNamedRoute('RouteDetail') },
  { path: '/service/:slug', redirect: redirectToNamedRoute('ServiceDetail') },
  { path: '/activity/:slug', redirect: redirectToNamedRoute('ActivityDetail') },
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

router.beforeEach((to) => {
  return canonicalizeCatalogRoute(to) || true
})

router.afterEach((to) => {
  applyRouteSeo(to)
})

export default router
