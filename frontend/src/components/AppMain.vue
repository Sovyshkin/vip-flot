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
    <LazyRender root-margin="140px 0px" min-height="420px" mobile-min-height="1120px">
      <div id="tours"><MainRoutesToursShowcase/></div>
    </LazyRender>
    <LazyRender root-margin="180px 0px" min-height="420px" mobile-min-height="1040px">
      <div id="activities"><ActivitiesWater/></div>
    </LazyRender>
    <LazyRender root-margin="220px 0px" min-height="620px" mobile-min-height="2780px">
      <div id="boats"><OurBoats/></div>
    </LazyRender>
    <LazyRender root-margin="220px 0px" min-height="620px" mobile-min-height="2780px">
      <div id="yachts"><OurYachts/></div>
    </LazyRender>
    <LazyRender root-margin="220px 0px" min-height="620px" mobile-min-height="2780px">
      <div id="sailing"><OurSailing/></div>
    </LazyRender>
    <LazyRender root-margin="220px 0px" min-height="360px" mobile-min-height="760px">
      <div id="services"><BoardServices/></div>
    </LazyRender>
    <LazyRender root-margin="220px 0px" min-height="240px" mobile-min-height="780px">
      <HowToOrder/>
    </LazyRender>
    <LazyRender root-margin="220px 0px" min-height="520px" mobile-min-height="980px">
      <div id="booking"><RequestBook/></div>
    </LazyRender>
    <LazyRender root-margin="220px 0px" min-height="360px" mobile-min-height="640px">
      <FaqBlock/>
    </LazyRender>
    <LazyRender root-margin="220px 0px" min-height="320px" mobile-min-height="520px">
      <CommentsBlock/>
    </LazyRender>
    <LazyRender root-margin="220px 0px" min-height="320px" mobile-min-height="420px">
      <OurVideos/>
    </LazyRender>
    <LazyRender root-margin="220px 0px" min-height="360px" mobile-min-height="520px">
      <div id="blog"><BlogBlock/></div>
    </LazyRender>
	</div>
</template>
<style scoped>
.wrap > div,
.wrap > :deep(.lazy-render) {
	scroll-margin-top: 100px;
}
</style>
