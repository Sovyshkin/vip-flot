<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>
<template>
  <AppHeader/>
  <main class="main-content">
    <router-view/>
  </main>
  <AppFooter/>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Geologica:wght,CRSV@100..900,0&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
#app {
  font-family: "Geologica", sans-serif;
  width: 100%;
}
* {
  padding: 0px;
  margin: 0px;
  border: none;
  font-weight: 400;
  font-style: normal;
  font-family: "Geologica", sans-serif;
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

.main-content {
  padding-top: 85px;
  flex: 1;
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
    padding: 20px 30px;
    gap: 56px;
  }
}

@media (max-width: 768px) {
  .wrap {
    padding: 16px 24px;
    gap: 48px;
  }
  
  .main-content {
    padding-top: 75px;
  }
}

@media (max-width: 480px) {
  .wrap {
    padding: 12px 20px;
    gap: 40px;
  }
  
  .main-content {
    padding-top: 70px;
  }
}

</style>
