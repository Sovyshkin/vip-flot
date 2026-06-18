import { boats } from '../data/boats'
import { yachts } from '../data/yachts'
import { sailingYachts } from '../data/sailing'
import { routes as routeItems } from '../data/routes'
import { articles } from '../data/blog-articles'
import { services } from '../data/services'
import { activities } from '../data/activities'
import { yachtTours, getYachtTourSlugFromLink } from '../data/yachtsTours'

const fleetItems = [...boats, ...yachts, ...sailingYachts].map((item, index) => ({
  ...item,
  publicId: `v-${index + 1}`,
}))

const publicConfigs = {
  BoatDetail: {
    prefix: 'v',
    basePath: '/catalog',
    items: fleetItems,
    getSlug: item => item.slug,
    getId: item => item.publicId,
  },
  YachtTourDetail: {
    prefix: 't',
    basePath: '/catalog/tours',
    items: yachtTours,
    getSlug: item => getYachtTourSlugFromLink(item.link),
    getId: item => `t-${item.id}`,
  },
  RouteDetail: {
    prefix: 'r',
    basePath: '/catalog/routes',
    items: routeItems,
    getSlug: item => item.slug,
    getId: item => `r-${item.id}`,
  },
  ServiceDetail: {
    prefix: 's',
    basePath: '/catalog/services',
    items: services,
    getSlug: item => item.slug,
    getId: item => `s-${item.id}`,
  },
  ActivityDetail: {
    prefix: 'e',
    basePath: '/catalog/events',
    items: activities,
    getSlug: item => item.slug,
    getId: item => `e-${item.id}`,
  },
  BlogArticle: {
    prefix: 'a',
    basePath: '/catalog/articles',
    items: articles,
    getSlug: item => item.slug,
    getId: item => `a-${item.id}`,
  },
}

function getConfig(routeName) {
  return publicConfigs[routeName] || null
}

function findBySlug(config, slug) {
  return config.items.find(item => config.getSlug(item) === slug)
}

function findById(config, publicId) {
  return config.items.find(item => config.getId(item) === publicId)
}

export function isPublicId(routeName, value) {
  const config = getConfig(routeName)
  return Boolean(config && new RegExp(`^${config.prefix}-\\d+$`).test(String(value || '')))
}

export function toPublicId(routeName, slugOrId) {
  const config = getConfig(routeName)
  const value = String(slugOrId || '')
  if (!config || !value) return value
  if (isPublicId(routeName, value)) return value
  const item = findBySlug(config, value)
  return item ? config.getId(item) : value
}

export function toCanonicalSlug(routeName, slugOrId) {
  const config = getConfig(routeName)
  const value = String(slugOrId || '')
  if (!config || !value) return value
  if (!isPublicId(routeName, value)) return value
  const item = findById(config, value)
  return item ? config.getSlug(item) : value
}

export function getPublicPath(routeName, slugOrId) {
  const config = getConfig(routeName)
  if (!config) return null
  return `${config.basePath}/${toPublicId(routeName, slugOrId)}`
}

export function canonicalizeCatalogRoute(to) {
  const config = getConfig(to.name)
  const currentParam = to.params?.slug
  if (!config || !currentParam) return null

  const publicId = toPublicId(to.name, currentParam)
  if (!publicId || publicId === currentParam) return null

  return {
    path: `${config.basePath}/${publicId}`,
    query: to.query,
    hash: to.hash,
    replace: true,
  }
}

export function getSitemapCatalogEntries() {
  return Object.entries(publicConfigs).flatMap(([routeName, config]) => (
    config.items
      .map(item => config.getSlug(item))
      .filter(Boolean)
      .map(slug => ({ routeName, path: getPublicPath(routeName, slug) }))
  ))
}
