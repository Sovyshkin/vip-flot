import { createRouter, createWebHistory } from 'vue-router'
import AppMain from '../components/AppMain.vue'
import BoatDetail from '../components/BoatDetail.vue'
import BlogArticle from '../components/BlogArticle.vue'
import RouteDetail from '../components/RouteDetail.vue'
import CatalogPage from '../components/CatalogPage.vue'

const routes = [
  { path: '/', name: 'Main', component: AppMain },
  { path: '/catalog', name: 'Catalog', component: CatalogPage },
  { path: '/boat/:slug', name: 'BoatDetail', component: BoatDetail },
  { path: '/blog/:slug', name: 'BlogArticle', component: BlogArticle },
  { path: '/route/:slug', name: 'RouteDetail', component: RouteDetail }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.name === 'BoatDetail' || to.name === 'RouteDetail' || to.name === 'Catalog') {
      return { top: 0 }
    }
    return null
  }
})

export default router
