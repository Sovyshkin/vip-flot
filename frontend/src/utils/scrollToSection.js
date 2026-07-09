const HEADER_OFFSET = 68
const MAX_ELEMENT_WAIT_ATTEMPTS = 30
const MAX_LAYOUT_SYNC_ATTEMPTS = 12
const ELEMENT_RETRY_DELAY = 120
const LAYOUT_RETRY_DELAY = 180
const POSITION_TOLERANCE = 6

function getElementTop(id) {
  const element = document.getElementById(id)

  if (!element) return null

  const top = element.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET
  return Math.max(top, 0)
}

function smoothScrollTo(top) {
  window.scrollTo({
    top,
    behavior: 'smooth'
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

function syncScrollWithLayout(id, attempt = 0) {
  const targetTop = getElementTop(id)

  if (targetTop === null) return

  const distance = Math.abs(window.pageYOffset - targetTop)

  if (distance <= POSITION_TOLERANCE || attempt >= MAX_LAYOUT_SYNC_ATTEMPTS) {
    if (distance > POSITION_TOLERANCE) {
      window.scrollTo({ top: targetTop, behavior: 'auto' })
    }
    return
  }

  smoothScrollTo(targetTop)

  window.setTimeout(() => {
    syncScrollWithLayout(id, attempt + 1)
  }, LAYOUT_RETRY_DELAY)
}

export async function scrollToElementById(id) {
  const element = await waitForElement(id)

  if (!element) return

  smoothScrollTo(getElementTop(id))

  window.setTimeout(() => {
    syncScrollWithLayout(id)
  }, LAYOUT_RETRY_DELAY)
}

export async function navigateToSection(router, id) {
  const hash = `#${id}`
  const currentRoute = router.currentRoute.value

  if (currentRoute.path !== '/' || currentRoute.hash !== hash) {
    await router.push({ path: '/', hash })
  }

  window.requestAnimationFrame(() => {
    scrollToElementById(id)
  })
}
