const DEFAULT_HEADER_OFFSET = 68
const MAX_ELEMENT_WAIT_ATTEMPTS = 30
const MAX_LAYOUT_SYNC_ATTEMPTS = 8
const ELEMENT_RETRY_DELAY = 80
const LAYOUT_RETRY_DELAY = 220
const POSITION_TOLERANCE = 8
const SCROLL_DURATION = 720

let activeScrollFrame = null

function getHeaderOffset() {
  const header = document.querySelector('.site-header')
  const headerHeight = header?.getBoundingClientRect().height || DEFAULT_HEADER_OFFSET

  return Math.round(headerHeight + 12)
}

function getElementTop(id) {
  const element = document.getElementById(id)

  if (!element) return null

  const top = element.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset()
  return Math.max(top, 0)
}

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2
}

function cancelActiveScroll() {
  if (activeScrollFrame !== null) {
    window.cancelAnimationFrame(activeScrollFrame)
    activeScrollFrame = null
  }
}

function smoothScrollToElement(id, duration = SCROLL_DURATION) {
  cancelActiveScroll()

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    const reducedMotionTop = getElementTop(id)
    if (reducedMotionTop !== null) {
      window.scrollTo({ top: reducedMotionTop })
    }
    return Promise.resolve()
  }

  const startTop = window.pageYOffset
  const startedAt = performance.now()

  return new Promise((resolve) => {
    function step(now) {
      const targetTop = getElementTop(id)

      if (targetTop === null) {
        activeScrollFrame = null
        resolve()
        return
      }

      const progress = Math.min((now - startedAt) / duration, 1)
      const nextTop = startTop + (targetTop - startTop) * easeInOutCubic(progress)

      window.scrollTo({ top: nextTop })

      if (progress < 1) {
        activeScrollFrame = window.requestAnimationFrame(step)
        return
      }

      activeScrollFrame = null
      resolve()
    }

    activeScrollFrame = window.requestAnimationFrame(step)
  })
}

function waitForElement(id, attempt = 0) {
  return new Promise((resolve) => {
    const element = document.getElementById(id)

    if (element) {
      resolve(element)
      return
    }

    if (attempt >= MAX_ELEMENT_WAIT_ATTEMPTS) {
      resolve(null)
      return
    }

    window.setTimeout(() => {
      resolve(waitForElement(id, attempt + 1))
    }, ELEMENT_RETRY_DELAY)
  })
}

function waitForPaint() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resolve)
    })
  })
}

function syncScrollWithLayout(id, attempt = 0) {
  const targetTop = getElementTop(id)

  if (targetTop === null) return

  const distance = Math.abs(window.pageYOffset - targetTop)

  if (distance <= POSITION_TOLERANCE || attempt >= MAX_LAYOUT_SYNC_ATTEMPTS) {
    return
  }

  window.scrollTo({ top: targetTop })

  window.setTimeout(() => {
    syncScrollWithLayout(id, attempt + 1)
  }, LAYOUT_RETRY_DELAY)
}

export async function scrollToElementById(id) {
  const element = await waitForElement(id)

  if (!element) return false

  await waitForPaint()

  const targetTop = getElementTop(id)

  if (targetTop === null) return false

  await smoothScrollToElement(id)

  window.setTimeout(() => {
    syncScrollWithLayout(id)
  }, LAYOUT_RETRY_DELAY)

  return true
}

export async function navigateToSection(router, id) {
  const hash = `#${id}`
  const currentRoute = router.currentRoute.value

  if (currentRoute.path !== '/' || currentRoute.hash !== hash) {
    window.__skipNextHashScroll = hash
    await router.push({ path: '/', hash })
  } else if (window.location.hash !== hash) {
    window.history.replaceState(null, '', hash)
  }

  await scrollToElementById(id)
}
