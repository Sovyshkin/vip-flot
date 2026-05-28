<template>
  <section class="detail-page-sections">
    <div class="wrap detail-page-sections__stack">
      <RoutesTours :routes-type="routesType" />
      <YachtTours />
      <OurYachts />
      <OurBoats />
      <OurSailing />
      <RequestBook />
    </div>
  </section>
</template>

<script setup>
/* global defineProps */
defineProps({
  routesType: {
    type: String,
    default: 'boats'
  }
})

import RoutesTours from './RoutesTours.vue'
import YachtTours from './YachtTours.vue'
import OurYachts from './OurYachts.vue'
import OurBoats from './OurBoats.vue'
import OurSailing from './OurSailing.vue'
import RequestBook from './RequestBook.vue'
</script>

<style scoped>
.detail-page-sections {
  width: 100%;
  padding: 42px 0 56px;
}

.detail-page-sections__stack {
  display: flex;
  flex-direction: column;
  gap: 42px;
}

@media (max-width: 768px) {
  .detail-page-sections {
    padding: 30px 0 44px;
  }

  .detail-page-sections__stack {
    gap: 30px;
  }
}
</style>
