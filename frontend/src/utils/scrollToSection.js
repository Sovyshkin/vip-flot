const HEADER_OFFSET = 68
const MAX_SCROLL_ATTEMPTS = 20
const SCROLL_RETRY_DELAY = 120

export function scrollToElementById(id, attempt = 0) {
  const element = document.getElementById(id)

  if (!element) {
    if (attempt < MAX_SCROLL_ATTEMPTS) {
      window.setTimeout(() => {
        scrollToElementById(id, attempt + 1)
      }, SCROLL_RETRY_DELAY)
    }
    return
  }

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
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
