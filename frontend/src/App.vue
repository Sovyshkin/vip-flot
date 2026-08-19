<script setup>
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import CookieBanner from './components/CookieBanner.vue'

const route = useRoute()
</script>
<template>
  <AppHeader/>
  <main :class="['main-content', { 'main-content--inner': route.name !== 'Main' }]">
    <router-view/>
  </main>
  <CookieBanner />
  <AppFooter/>
</template>
<style>
:root {
  --font-base: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-logo: "Arial Narrow", "Roboto Condensed", "Helvetica Neue", Arial, sans-serif;
  --header-height: 60px;
}

#app {
  font-family: var(--font-base);
  width: 100%;
}
* {
  padding: 0px;
  margin: 0px;
  border: none;
  font-weight: 400;
  font-style: normal;
  font-family: var(--font-base);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.wrap {
  
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  width: 100%;
  gap: 64px;
  /* max-width: 1440px;
  margin: 0 auto; */
}

body,
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

body {
  overflow-x: hidden;
}

.main-content {
  padding-top: var(--header-height);
  flex: 1;
}

.main-content--inner .wrap {
  gap: 20px;
}

/* Links */

a,
a:link,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

/* Common */

aside,
nav,
footer,
header,
section,
main {
  display: block;
}

ul,
ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

img,
svg {
  max-width: 100%;
  height: auto;
}

address {
  font-style: normal;
}

/* Form */

input,
textarea,
button,
select {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
}

input::-ms-clear {
  display: none;
}

button,
input[type="submit"] {
  display: inline-block;
  box-shadow: none;
  background-color: transparent;
  background: none;
  cursor: pointer;
}

input:focus,
input:active,
button:focus,
button:active {
  outline: none;
  box-shadow: none;
}

/* Responsive */
@media (max-width: 1024px) {
  .wrap {
    padding: 20px 24px;
    gap: 56px;
  }
}

@media (max-width: 768px) {
  :root {
    --header-height: 60px;
  }

  .wrap {
    padding: 16px;
    gap: 48px;
  }
}

@media (max-width: 480px) {
  :root {
    --header-height: 60px;
  }

  .wrap {
    padding: 12px 20px;
    gap: 40px;
  }
}

</style>
