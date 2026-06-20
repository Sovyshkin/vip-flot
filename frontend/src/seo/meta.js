import { boats } from '../data/boats'
import { yachts } from '../data/yachts'
import { sailingYachts } from '../data/sailing'
import { articles } from '../data/blog-articles'
import { services } from '../data/services'
import { activities } from '../data/activities'
import { routes as routeItems } from '../data/routes'
import { getYachtTourBySlug } from '../data/yachtsTours'

const SITE_NAME = 'VIP FLOT'
const DEFAULT_TITLE = 'Аренда яхт и катеров в Санкт-Петербурге | VIP FLOT'
const DEFAULT_DESCRIPTION = 'VIP FLOT — аренда яхт, катеров и парусных судов в Санкт-Петербурге для прогулок, маршрутов по Неве, Финскому заливу, праздников и мероприятий на воде.'
const DEFAULT_IMAGE = '/images/main-block.jpg'
const SITE_URL = (process.env.VUE_APP_SITE_URL || 'https://vipflot.ru').replace(/\/$/, '')

const staticPages = {
  Main: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: 'website',
  },
  Catalog: {
    title: 'Каталог яхт, катеров и парусных судов в Санкт-Петербурге | VIP FLOT',
    description: 'Подберите катер, яхту или парусное судно для прогулки по Санкт-Петербургу: вместимость, цены, фото, описание и быстрый переход к бронированию.',
  },
  Routes: {
    title: 'Маршруты водных прогулок по Санкт-Петербургу | VIP FLOT',
    description: 'Готовые маршруты прогулок по рекам и каналам, Неве, Финскому заливу и разводным мостам Санкт-Петербурга.',
  },
  BridgeRoutes: {
    title: 'Развод мостов на яхте или катере в Санкт-Петербурге | VIP FLOT',
    description: 'Ночные маршруты на развод мостов в Санкт-Петербурге на катерах и яхтах: красивые виды Невы, главные мосты и индивидуальный формат прогулки.',
  },
  Tours: {
    title: 'Яхт-туры и круизы из Санкт-Петербурга | VIP FLOT',
    description: 'Длительные яхт-туры и круизы из Санкт-Петербурга: Валаам, Кронштадт, Петергоф и другие направления на комфортных судах.',
  },
}

const routeLandingPages = {
  'reki-i-kanaly': {
    title: 'Маршруты по рекам и каналам Санкт-Петербурга | VIP FLOT',
    description: 'Популярные прогулки по рекам и каналам Петербурга: Нева, Фонтанка, Мойка, канал Грибоедова и индивидуальные сценарии маршрута.',
  },
  neva: {
    title: 'Прогулка по Неве на яхте или катере | VIP FLOT',
    description: 'Водные прогулки по Неве с видами на Эрмитаж, Стрелку Васильевского острова, Петропавловскую крепость и разводные мосты.',
  },
  'finskij-zaliv': {
    title: 'Прогулка в Финский залив на яхте или катере | VIP FLOT',
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

function findFleetItem(slug) {
  return [...boats, ...yachts, ...sailingYachts].find(item => item.slug === slug)
}

function resolveRouteItem(slug) {
  return routeItems.find(item => item.slug === slug)
}

function resolveSeo(to) {
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
    const slug = to.params.slug
    const item = findFleetItem(slug)
    if (item) {
      const price = item.pricePerHour ? ` от ${Number(item.pricePerHour).toLocaleString('ru-RU')} ₽/час` : ''
      seo = {
        ...seo,
        title: `Аренда ${item.name} в Санкт-Петербурге | VIP FLOT`,
        description: truncate(`${item.name}: аренда судна в Санкт-Петербурге${price}. Вместимость до ${item.capacity || 'нескольких'} гостей. ${item.description || 'Фото, характеристики и условия аренды.'}`),
        image: Array.isArray(item.cardImage) ? item.cardImage[0] : item.cardImage || item.images?.[0],
        type: 'product',
      }
    }
  }

  if (to.name === 'YachtTourDetail') {
    const tour = getYachtTourBySlug(to.params.slug)
    if (tour) {
      seo = {
        ...seo,
        title: `${tour.title} — яхт-тур из Санкт-Петербурга | VIP FLOT`,
        description: truncate(`${tour.route || tour.title}. ${tour.description}`),
        image: tour.bannerImage || tour.imageUrl,
        type: 'article',
      }
    }
  }

  if (to.name === 'BlogArticle') {
    const slug = to.params.slug
    const article = articles.find(item => item.slug === slug)
    if (article) {
      seo = {
        ...seo,
        title: `${article.title} | Блог VIP FLOT`,
        description: truncate(article.description || article.excerpt || article.content),
        image: article.image,
        type: 'article',
      }
    }
  }

  if (to.name === 'RouteDetail') {
    const slug = to.params.slug
    const route = resolveRouteItem(slug)
    if (route) {
      seo = {
        ...seo,
        title: `${route.name} — маршрут прогулки по Санкт-Петербургу | VIP FLOT`,
        description: truncate(route.description),
        image: route.cardImage,
      }
    }
  }

  if (String(to.name || '').startsWith('MainRouteLanding')) {
    seo = { ...seo, ...(routeLandingPages[to.params.slug] || {}) }
  }

  if (to.name === 'ServiceDetail') {
    const slug = to.params.slug
    const service = services.find(item => item.slug === slug)
    if (service) {
      seo = {
        ...seo,
        title: `${service.name} на яхте или катере | VIP FLOT`,
        description: truncate(service.fullDescription || service.description),
        image: service.image,
      }
    }
  }

  if (to.name === 'ActivityDetail') {
    const slug = to.params.slug
    const activity = activities.find(item => item.slug === slug)
    if (activity) {
      seo = {
        ...seo,
        title: `${activity.name} на яхте или катере в Санкт-Петербурге | VIP FLOT`,
        description: truncate(activity.fullDescription || activity.description),
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

export function applyRouteSeo(to) {
  if (typeof document === 'undefined') return

  const seo = resolveSeo(to)
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

  setJsonLd('vipflot-structured-data', {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_IMAGE),
    description: DEFAULT_DESCRIPTION,
    telephone: '+7 (812) 660-55-16',
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
