<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import MainBlock from "./MainBlock.vue"
// import YachtTours from "./YachtTours.vue"
import RoutesTours from "./RoutesTours.vue"
import ActivitiesWater from "./ActivitiesWater.vue"
import OurBoats from "./OurBoats.vue"
import OurYachts from "./OurYachts.vue"
import OurSailing from "./OurSailing.vue"
import BoardServices from "./BoardServices.vue"
import HowToOrder from "./HowToOrder.vue"
import RequestBook from "./RequestBook.vue"
import FaqBlock from "./FaqBlock.vue"
import CommentsBlock from "./CommentsBlock.vue"
import OurVideos from "./OurVideos.vue"
import BlogBlock from "./BlogBlock.vue"

let observer = null

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, options)

  const blocks = document.querySelectorAll('.animate-block')
  blocks.forEach(block => observer.observe(block))
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
<template>
	<div class="wrap">
		<MainBlock/>
		<!-- <div id="tours" class="animate-block" style="--delay: 0s;"><YachtTours/></div> -->
        <div class="animate-block" style="--delay: 0s;"><RoutesTours/></div>
        <div id="activities" class="animate-block" style="--delay: 0s;"><ActivitiesWater/></div>
        <div id="boats" class="animate-block" style="--delay: 0s;"><OurBoats/></div>
        <div id="yachts" class="animate-block" style="--delay: 0s;"><OurYachts/></div>
        <div id="sailing" class="animate-block" style="--delay: 0s;"><OurSailing/></div>
        <div id="services" class="animate-block" style="--delay: 0s;"><BoardServices/></div>
        <div class="animate-block" style="--delay: 0s;"><HowToOrder/></div>
        <div id="booking" class="animate-block" style="--delay: 0s;"><RequestBook/></div>
        <div class="animate-block" style="--delay: 0s;"><FaqBlock/></div>
        <div class="animate-block" style="--delay: 0s;"><CommentsBlock/></div>
        <div class="animate-block" style="--delay: 0s;"><OurVideos/></div>
        <div id="blog" class="animate-block" style="--delay: 0s;"><BlogBlock/></div>
	</div>
</template>
<style scoped>
.wrap > div,
.wrap > .animate-block {
	scroll-margin-top: 100px;
}

/* Smooth fade-in animations */
.animate-block {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--delay, 0s);
}

.animate-block.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Prevent layout shift */
.animate-block > * {
  width: 100%;
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .animate-block {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
