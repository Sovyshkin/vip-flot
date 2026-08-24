import { createRouter, createWebHistory } from 'vue-router'

const AppMain = () => import('../components/AppMain.vue')
const BoatDetail = () => import('../components/BoatDetail.vue')
const BlogArticle = () => import('../components/BlogArticle.vue')
const RouteDetail = () => import('../components/RouteDetail.vue')
const BridgeRoutesPage = () => import('../components/BridgeRoutesPage.vue')
const CatalogPage = () => import('../components/CatalogPage.vue')
const RoutesPage = () => import('../components/RoutesPage.vue')
const ToursPage = () => import('../components/ToursPage.vue')
const YachtTourDetail = () => import('../components/YachtTourDetail.vue')
const ServiceDetail = () => import('../components/ServiceDetail.vue')
const ActivityDetail = () => import('../components/ActivityDetail.vue')
const MainRouteLandingPage = () => import('../components/MainRouteLandingPage.vue')
const LegalPage = () => import('../components/LegalPage.vue')

const routes = [
  { path: '/', name: 'Main', component: AppMain },
  { path: '/catalog', name: 'Catalog', component: CatalogPage },
  { path: '/catalog/:slug', name: 'BoatDetail', component: BoatDetail },
  { path: '/blog/:slug', name: 'BlogArticle', component: BlogArticle },
  { path: '/routes', name: 'Routes', component: RoutesPage },
  { path: '/routes/razvod-mostov', name: 'BridgeRoutes', component: BridgeRoutesPage },
  { path: '/routes/reki-kanaly', redirect: '/routes/reki-i-kanaly' },
  { path: '/routes/reki-i-kanaly', name: 'MainRouteLandingRekiKanaly', component: MainRouteLandingPage },
  { path: '/routes/neva', name: 'MainRouteLandingNeva', component: MainRouteLandingPage },
  { path: '/routes/finskiy-zaliv', redirect: '/routes/finskij-zaliv' },
  { path: '/routes/finskij-zaliv', name: 'MainRouteLandingFinskijZaliv', component: MainRouteLandingPage },
  { path: '/routes/:slug', name: 'RouteDetail', component: RouteDetail },
  { path: '/tours', name: 'Tours', component: ToursPage },
  { path: '/tours/petergof-morskoy', redirect: '/tours/petergof' },
  { path: '/tours/kronshtadt-tour', redirect: '/tours/kronshtadt' },
  { path: '/tours/oreshek', redirect: '/tours/krepost-oreshek' },
  { path: '/tours/:slug', name: 'YachtTourDetail', component: YachtTourDetail },
  { path: '/services/:slug', name: 'ServiceDetail', component: ServiceDetail },
  { path: '/events/:slug', name: 'ActivityDetail', component: ActivityDetail },
  { path: '/privacy-policy', name: 'PrivacyPolicy', component: LegalPage },
  { path: '/personal-data-consent', name: 'PersonalDataConsent', component: LegalPage },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      if (window.__skipNextHashScroll === to.hash) {
        window.__skipNextHashScroll = null
        return false
      }

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

router.afterEach(async (to) => {
  const { applyRouteSeo } = await import('../seo/meta')
  await applyRouteSeo(to)
})

export default router
