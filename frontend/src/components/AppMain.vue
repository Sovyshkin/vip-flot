<script setup>
import { defineAsyncComponent } from 'vue'
import MainBlock from "./MainBlock.vue"
import LazyRender from "./LazyRender.vue"

const MainRoutesToursShowcase = defineAsyncComponent(() => import("./RoutesTours2.vue"))
const ActivitiesWater = defineAsyncComponent(() => import("./ActivitiesWater.vue"))
const OurBoats = defineAsyncComponent(() => import("./OurBoats.vue"))
const OurYachts = defineAsyncComponent(() => import("./OurYachts.vue"))
const OurSailing = defineAsyncComponent(() => import("./OurSailing.vue"))
const BoardServices = defineAsyncComponent(() => import("./BoardServices.vue"))
const HowToOrder = defineAsyncComponent(() => import("./HowToOrder.vue"))
const RequestBook = defineAsyncComponent(() => import("./RequestBook.vue"))
const FaqBlock = defineAsyncComponent(() => import("./FaqBlock.vue"))
const CommentsBlock = defineAsyncComponent(() => import("./CommentsBlock.vue"))
const OurVideos = defineAsyncComponent(() => import("./OurVideos.vue"))
const BlogBlock = defineAsyncComponent(() => import("./BlogBlock.vue"))
</script>
<template>
	<div class="wrap">
		<MainBlock/>
    <div id="tours">
      <LazyRender root-margin="140px 0px" min-height="420px" mobile-min-height="1120px">
        <MainRoutesToursShowcase/>
      </LazyRender>
    </div>
    <div id="activities">
      <LazyRender root-margin="180px 0px" min-height="420px" mobile-min-height="1040px">
        <ActivitiesWater/>
      </LazyRender>
    </div>
    <div id="boats">
      <LazyRender root-margin="220px 0px" min-height="620px" mobile-min-height="2780px">
        <OurBoats/>
      </LazyRender>
    </div>
    <div id="yachts">
      <LazyRender root-margin="220px 0px" min-height="620px" mobile-min-height="2780px">
        <OurYachts/>
      </LazyRender>
    </div>
    <div id="sailing">
      <LazyRender root-margin="220px 0px" min-height="620px" mobile-min-height="2780px">
        <OurSailing/>
      </LazyRender>
    </div>
    <div id="services">
      <LazyRender root-margin="220px 0px" min-height="360px" mobile-min-height="760px">
        <BoardServices/>
      </LazyRender>
    </div>
    <LazyRender root-margin="220px 0px" min-height="240px" mobile-min-height="780px">
      <HowToOrder/>
    </LazyRender>
    <div id="booking">
      <LazyRender root-margin="220px 0px" min-height="520px" mobile-min-height="980px">
        <RequestBook/>
      </LazyRender>
    </div>
    <LazyRender root-margin="220px 0px" min-height="360px" mobile-min-height="640px">
      <FaqBlock/>
    </LazyRender>
    <LazyRender root-margin="220px 0px" min-height="320px" mobile-min-height="520px">
      <CommentsBlock/>
    </LazyRender>
    <LazyRender root-margin="220px 0px" min-height="320px" mobile-min-height="420px">
      <OurVideos/>
    </LazyRender>
    <div id="blog">
      <LazyRender root-margin="220px 0px" min-height="360px" mobile-min-height="520px">
        <BlogBlock/>
      </LazyRender>
    </div>
	</div>
</template>
<style scoped>
.wrap > div,
.wrap > :deep(.lazy-render) {
	scroll-margin-top: 100px;
}
</style>
