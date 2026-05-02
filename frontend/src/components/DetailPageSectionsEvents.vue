<template>
  <section class="detail-page-sections">
    <div class="wrap detail-page-sections__stack">
      <FleetTabs />
      <YachtToursGallery v-if="pageType === 'activity'" />
      <RequestBook />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import FleetTabs from './FleetTabs.vue'
import YachtToursGallery from './YachtToursGallery.vue'
import RequestBook from './RequestBook.vue'

const route = useRoute()

const pageType = computed(() => {
  if (route.name === 'ServiceDetail') {
    return 'service'
  }
  if (route.name === 'ActivityDetail') {
    return 'activity'
  }
  return 'default'
})
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