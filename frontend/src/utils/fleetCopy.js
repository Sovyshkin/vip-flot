const TYPE_LABELS = {
  boat: {
    nominative: 'катер',
    genitive: 'катера',
    accusative: 'катер',
    plural: 'катера',
  },
  yacht: {
    nominative: 'яхта',
    genitive: 'яхты',
    accusative: 'яхту',
    plural: 'яхты',
  },
  sailing: {
    nominative: 'парусная яхта',
    genitive: 'парусной яхты',
    accusative: 'парусную яхту',
    plural: 'парусные яхты',
  },
}

const LONG_TRIP_SLUGS = new Set([
  'asgard',
  'atlantica',
  'bali',
  'amsterdam',
  'beluga',
  'livadia',
  'monaco',
  'monte-carlo',
  'benetti-90-kalisa',
  'broward-98',
  'california-62',
  'carver-62-mila',
  'fairline-65',
  'princess-57',
  'princess-68',
  'rodman-44',
])

function normalizeWhitespace(value = '') {
  return String(value).replace(/\s+/g, ' ').trim()
}

function uniq(items = []) {
  const seen = new Set()
  return items.filter(item => {
    const key = normalizeWhitespace(item).toLowerCase()
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function getFleetTypeKey(item) {
  if (item?.sails !== undefined || item?.mastHeight || item?.draft) return 'sailing'
  if (item?.flybridge !== undefined || item?.sleepingBerths !== undefined) return 'yacht'
  return 'boat'
}

export function getFleetTypeLabels(item) {
  return TYPE_LABELS[getFleetTypeKey(item)] || TYPE_LABELS.boat
}

export function getFleetCabins(item) {
  return item?.specifications?.cabins || item?.cabins || 'не указано'
}

export function normalizeFleetFeature(feature) {
  const raw = normalizeWhitespace(feature)
    .replace(/^[-—•]\s*/, '')
    .replace(/\s*[.;]\s*$/, '')

  if (!raw) return ''

  const parts = raw.split(/\s+[—-]\s+/).map(part => normalizeWhitespace(part)).filter(Boolean)
  const base = parts[0] || raw

  return base.replace(/^(на борту есть|предусмотрены|предусмотрено)\s+/i, '')
}

export function getFleetHighlights(item, limit = 8) {
  return uniq((item?.features || []).map(normalizeFleetFeature)).slice(0, limit)
}

function getTripFormats(item) {
  const labels = getFleetTypeLabels(item)
  const formats = [
    'спокойных прогулок по Неве и центральным каналам',
    'вечерних выходов с городскими огнями и красивым светом',
  ]

  if ((item?.capacity || 0) >= 10) {
    formats.unshift('дней рождения, приватных встреч и камерных событий')
  } else {
    formats.unshift('романтических выходов и уютного отдыха небольшой компанией')
  }

  if (labels.nominative === 'катер') {
    formats.push('динамичных маршрутов по акватории города')
  } else if (labels.nominative === 'яхта') {
    formats.push('солидных приемов, семейных выходных и продолжительных прогулок')
  } else {
    formats.push('неторопливых выходов под парусом и маршрутов с особой атмосферой')
  }

  if (item?.pricePerDay || LONG_TRIP_SLUGS.has(item?.slug)) {
    formats.push('поездок с выходом в залив и маршрутов увеличенной продолжительности')
  }

  return uniq(formats).slice(0, 4)
}

export function buildFleetLead(item) {
  if (!item) return ''

  const labels = getFleetTypeLabels(item)
  const cabins = getFleetCabins(item)
  const intro = `${item.name} — ${labels.nominative} для компании до ${item.capacity} гостей`
  const lengthPart = item.length ? ` длиной ${String(item.length).replace('.', ',')} м` : ''
  const cabinPart = cabins && cabins !== 'нет' && cabins !== 'нет кают' && cabins !== 'не указано'
    ? ` с ${String(cabins).replace(/^есть$/i, 'каютой')}`
    : ''

  const toneByType = {
    boat: 'Маршрут ощущается легко и свободно: можно выбрать короткую прогулку по центру, вечерний выход под огни города или более насыщенный сценарий с несколькими остановками.',
    yacht: 'На борту легко совместить красивый маршрут, спокойный отдых, общение и сервисный формат мероприятия без ощущения тесноты или спешки.',
    sailing: 'Главная ценность такого выхода — не только виды, но и сама атмосфера движения под парусом, когда прогулка становится более вдумчивой и по-настоящему морской.',
  }

  return `${intro}${lengthPart}${cabinPart}. ${toneByType[getFleetTypeKey(item)]}`
}

export function buildFleetDescriptionSections(item) {
  if (!item) return []

  const labels = getFleetTypeLabels(item)
  const cabins = getFleetCabins(item)
  const hasCabins = cabins && !/^(нет|не указано)$/i.test(String(cabins))
  const highlights = getFleetHighlights(item, 10)
  const formats = getTripFormats(item)

  const comfortParagraph = [
    `${item.name} подходит для тех, кто хочет провести время на воде без лишней суеты: с понятной посадкой, удобной рассадкой и продуманными бытовыми деталями.`,
    hasCabins
      ? `Наличие ${String(cabins).replace(/^есть$/i, 'каюты')} делает ${labels.accusative} более универсальной для длительных выходов, отдыха с детьми или приватного формата мероприятия.`
      : `Это хороший выбор для прогулок в дневном и вечернем формате, когда важны обзор, открытые зоны и комфортное размещение гостей в течение нескольких часов.`,
  ]

  const bookingParagraph = item.berth
    ? `${labels.nominative[0].toUpperCase()}${labels.nominative.slice(1)} базируется у причала ${item.berth}. Мы можем дополнить прогулку кейтерингом, сопровождением фотографа, гидом или оформить сценарий под частное событие.`
    : `Мы можем дополнить прогулку кейтерингом, сопровождением фотографа, гидом или оформить сценарий под частное событие, чтобы поездка полностью соответствовала вашему формату отдыха.`

  return [
    {
      type: 'paragraph',
      title: 'Формат отдыха',
      content: comfortParagraph,
    },
    {
      type: 'list',
      title: 'На борту',
      items: highlights,
    },
    {
      type: 'list',
      title: 'Подойдет для',
      items: formats,
    },
    {
      type: 'paragraph',
      title: 'Организация прогулки',
      content: [bookingParagraph],
    },
  ]
}

export function buildFleetMetaDescription(item) {
  if (!item) return ''
  const labels = getFleetTypeLabels(item)
  const price = item.pricePerHour ? ` от ${Number(item.pricePerHour).toLocaleString('ru-RU')} ₽/час` : ''
  const length = item.length ? `, длина ${String(item.length).replace('.', ',')} м` : ''

  return `${item.name} — аренда ${labels.genitive} в Санкт-Петербурге${price}. Вместимость до ${item.capacity} гостей${length}, фото, оснащение и быстрый переход к бронированию.`
}
