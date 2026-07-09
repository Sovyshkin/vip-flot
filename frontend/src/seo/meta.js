import { buildFleetMetaDescription } from '../utils/fleetCopy'
import {
  buildActivityMetaDescription,
  buildRouteMetaDescription,
  buildServiceMetaDescription,
  buildYachtTourMetaDescription,
} from '../utils/pageCopy'

const SITE_NAME = 'Галерея яхт'
const DEFAULT_TITLE = 'Аренда яхт и катеров в Санкт-Петербурге | Галерея яхт'
const DEFAULT_DESCRIPTION = 'Галерея яхт — аренда яхт, катеров и парусных судов в Санкт-Петербурге для прогулок, маршрутов по Неве, Финскому заливу, праздников и мероприятий на воде.'
const DEFAULT_IMAGE = '/images/main-block.webp'
const SITE_URL = (
  process.env.VUE_APP_SITE_URL
  || (typeof window !== 'undefined' ? window.location.origin : 'https://galereya-yakht.ru')
).replace(/\/$/, '')

const staticPages = {
  Main: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: 'website',
  },
  Catalog: {
    title: 'Каталог яхт, катеров и парусных судов в Санкт-Петербурге | Галерея яхт',
    description: 'Подберите катер, яхту или парусное судно для прогулки по Санкт-Петербургу: вместимость, цены, фото, описание и быстрый переход к бронированию.',
  },
  Routes: {
    title: 'Маршруты водных прогулок по Санкт-Петербургу | Галерея яхт',
    description: 'Готовые маршруты прогулок по рекам и каналам, Неве, Финскому заливу и разводным мостам Санкт-Петербурга.',
  },
  BridgeRoutes: {
    title: 'Развод мостов на яхте или катере в Санкт-Петербурге | Галерея яхт',
    description: 'Ночные маршруты на развод мостов в Санкт-Петербурге на катерах и яхтах: красивые виды Невы, главные мосты и индивидуальный формат прогулки.',
  },
  Tours: {
    title: 'Яхт-туры и круизы из Санкт-Петербурга | Галерея яхт',
    description: 'Длительные яхт-туры и круизы из Санкт-Петербурга: Валаам, Кронштадт, Петергоф и другие направления на комфортных судах.',
  },
  PrivacyPolicy: {
    title: 'Политика конфиденциальности | Галерея яхт',
    description: 'Политика конфиденциальности сайта «Галерея яхт»: порядок обработки, хранения и защиты персональных данных пользователей.',
  },
  PersonalDataConsent: {
    title: 'Согласие на обработку персональных данных | Галерея яхт',
    description: 'Согласие пользователя на обработку персональных данных при отправке заявок и использовании форм сайта «Галерея яхт».',
  },
}

const routeLandingPages = {
  'reki-i-kanaly': {
    title: 'Маршруты по рекам и каналам Санкт-Петербурга | Галерея яхт',
    description: 'Популярные прогулки по рекам и каналам Петербурга: Нева, Фонтанка, Мойка, канал Грибоедова и индивидуальные сценарии маршрута.',
  },
  neva: {
    title: 'Прогулка по Неве на яхте или катере | Галерея яхт',
    description: 'Водные прогулки по Неве с видами на Эрмитаж, Стрелку Васильевского острова, Петропавловскую крепость и разводные мосты.',
  },
  'finskij-zaliv': {
    title: 'Прогулка в Финский залив на яхте или катере | Галерея яхт',
    description: 'Маршруты с выходом в Финский залив, видами на Лахта Центр, ЗСД, Газпром Арену и современный Петербург с воды.',
  },
}

function cleanText(value = '') {
  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(value, max = 165) {
  const text = cleanText(value)
  return text.length > max ? `${text.slice(0, max - 1).trim()}...` : text
}

function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}

function absoluteImage(path = DEFAULT_IMAGE) {
  if (!path) return absoluteUrl(DEFAULT_IMAGE)
  if (/^https?:\/\//.test(path)) return path
  return absoluteUrl(path.startsWith('/') ? path : `/images/${path}`)
}

async function findFleetItem(slug) {
  const [{ boats }, { yachts }, { sailingYachts }] = await Promise.all([
    import('../data/boats'),
    import('../data/yachts'),
    import('../data/sailing'),
  ])

  return [...boats, ...yachts, ...sailingYachts].find(item => item.slug === slug)
}

async function resolveRouteItem(slug) {
  const { routes } = await import('../data/routes')
  return routes.find(item => item.slug === slug)
}

async function resolveSeo(to) {
  const base = staticPages[to.name] || {}
  const path = to.path || '/'
  let seo = {
    title: base.title || DEFAULT_TITLE,
    description: base.description || DEFAULT_DESCRIPTION,
    image: DEFAULT_IMAGE,
    type: base.type || 'website',
    url: absoluteUrl(path),
  }

  if (to.name === 'BoatDetail') {
    const item = await findFleetItem(to.params.slug)
    if (item) {
      seo = {
        ...seo,
        title: `Аренда ${item.name} в Санкт-Петербурге | Галерея яхт`,
        description: truncate(buildFleetMetaDescription(item)),
        image: Array.isArray(item.cardImage) ? item.cardImage[0] : item.cardImage || item.images?.[0],
        type: 'product',
      }
    }
  }

  if (to.name === 'YachtTourDetail') {
    const { getYachtTourBySlug } = await import('../data/yachtsTours')
    const tour = getYachtTourBySlug(to.params.slug)
    if (tour) {
      seo = {
        ...seo,
        title: `${tour.title} — яхт-тур из Санкт-Петербурга | Галерея яхт`,
        description: truncate(buildYachtTourMetaDescription(tour)),
        image: tour.bannerImage || tour.imageUrl,
        type: 'article',
      }
    }
  }

  if (to.name === 'BlogArticle') {
    const { articles } = await import('../data/blog-articles')
    const article = articles.find(item => item.slug === to.params.slug)
    if (article) {
      seo = {
        ...seo,
        title: `${article.title} | Блог Галереи яхт`,
        description: truncate(article.description || article.excerpt || cleanText(article.content).slice(0, 220)),
        image: article.image,
        type: 'article',
      }
    }
  }

  if (to.name === 'RouteDetail') {
    const route = await resolveRouteItem(to.params.slug)
    if (route) {
      seo = {
        ...seo,
        title: `${route.name} — маршрут прогулки по Санкт-Петербургу | Галерея яхт`,
        description: truncate(buildRouteMetaDescription(route)),
        image: route.cardImage,
      }
    }
  }

  if (String(to.name || '').startsWith('MainRouteLanding')) {
    seo = { ...seo, ...(routeLandingPages[to.params.slug] || {}) }
  }

  if (to.name === 'ServiceDetail') {
    const { services } = await import('../data/services')
    const service = services.find(item => item.slug === to.params.slug)
    if (service) {
      seo = {
        ...seo,
        title: `${service.name} на яхте или катере | Галерея яхт`,
        description: truncate(buildServiceMetaDescription(service)),
        image: service.image,
      }
    }
  }

  if (to.name === 'ActivityDetail') {
    const { activities } = await import('../data/activities')
    const activity = activities.find(item => item.slug === to.params.slug)
    if (activity) {
      seo = {
        ...seo,
        title: `${activity.name} на яхте или катере в Санкт-Петербурге | Галерея яхт`,
        description: truncate(buildActivityMetaDescription(activity)),
        image: activity.image,
      }
    }
  }

  return {
    ...seo,
    description: truncate(seo.description || DEFAULT_DESCRIPTION),
    image: absoluteImage(seo.image),
  }
}

function setMeta(selectorAttr, key, content) {
  if (!content) return
  let element = document.head.querySelector(`meta[${selectorAttr}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(selectorAttr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

function setJsonLd(id, data) {
  let script = document.getElementById(id)
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

export async function applyRouteSeo(to) {
  if (typeof document === 'undefined') return

  const seo = await resolveSeo(to)
  document.title = seo.title

  setMeta('name', 'description', seo.description)
  setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
  setMeta('property', 'og:site_name', SITE_NAME)
  setMeta('property', 'og:title', seo.title)
  setMeta('property', 'og:description', seo.description)
  setMeta('property', 'og:type', seo.type)
  setMeta('property', 'og:url', seo.url)
  setMeta('property', 'og:image', seo.image)
  setMeta('property', 'og:locale', 'ru_RU')
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', seo.title)
  setMeta('name', 'twitter:description', seo.description)
  setMeta('name', 'twitter:image', seo.image)
  setCanonical(seo.url)

  setJsonLd('gallery-yachts-structured-data', {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_IMAGE),
    description: DEFAULT_DESCRIPTION,
    telephone: '+7 000 000 0000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Санкт-Петербург',
      addressCountry: 'RU',
    },
    areaServed: 'Санкт-Петербург',
    priceRange: '₽₽₽',
    sameAs: [],
  })
}

export { SITE_URL }
