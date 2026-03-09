<template>
  <div
    class="carousel"
    @mouseenter="stopAuto"
    @mouseleave="startAuto"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
  >
    <div class="slides" ref="slidesEl" :style="{ transform: `translate3d(-${active * 100}%,0,0)` }">
      <slot />
    </div>

    <button v-if="count > 1 && showArrowsLocal" class="arrow arrow--prev" @click="prev" aria-label="Previous">‹</button>
    <button v-if="count > 1 && showArrowsLocal" class="arrow arrow--next" @click="next" aria-label="Next">›</button>

    <div v-if="count > 1 && showDotsLocal" class="dots" aria-hidden="false">
      <button
        v-for="n in count"
        :key="n"
        :class="['dot', { 'dot--active': (n - 1) === active }]"
        @click="go(n - 1)"
        aria-label="Go to slide"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick, defineComponent } from 'vue'

export default defineComponent({
  name: 'UiCarousel',
  props: {
    interval: { type: Number, default: 4000 },
    showDots: { type: Boolean, default: true },
    showArrows: { type: Boolean, default: true }
  },
  setup(props) {
    const active = ref(0)
    const slidesEl = ref(null)
    const count = ref(0)
    let autoTimer = null

    let startX = null
    let deltaX = 0
    let isPointerDown = false

    function updateCount() {
      count.value = slidesEl.value ? slidesEl.value.children.length : 0
    }

    function go(i) {
      if (count.value === 0) return
      active.value = ((i % count.value) + count.value) % count.value
    }

    function next() {
      go(active.value + 1)
    }

    function prev() {
      go(active.value - 1)
    }

    function startAuto() {
      stopAuto()
      if (count.value > 1 && props.interval > 0) autoTimer = setInterval(next, props.interval)
    }

    function stopAuto() {
      if (autoTimer) {
        clearInterval(autoTimer)
        autoTimer = null
      }
    }

    function onPointerDown(e) {
      isPointerDown = true
      startX = e.clientX
      deltaX = 0
      e.target.setPointerCapture?.(e.pointerId)
      stopAuto()
    }

    function onPointerMove(e) {
      if (!isPointerDown) return
      deltaX = e.clientX - startX
    }

    function onPointerUp() {
      if (!isPointerDown) return
      isPointerDown = false
      const threshold = 50
      if (deltaX > threshold) prev()
      else if (deltaX < -threshold) next()
      deltaX = 0
      startAuto()
    }

    function onPointerCancel() {
      isPointerDown = false
      deltaX = 0
      startAuto()
    }

    onMounted(async () => {
      await nextTick()
      updateCount()
      startAuto()
    })

    onUnmounted(() => stopAuto())

    return {
      active,
      slidesEl,
      count,
      go,
      next,
      prev,
      startAuto,
      stopAuto,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      showDotsLocal: props.showDots,
      showArrowsLocal: props.showArrows
    }
  }
})
</script>

<style scoped>
.carousel {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
  touch-action: pan-y;
}
.slides {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.45s cubic-bezier(.22,.9,.25,1);
}
.slides > * {
  min-width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}
.slides img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(26,26,26,0.6);
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 4;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.carousel:hover .arrow {
  opacity: 1;
}
.arrow--prev { left: 12px }
.arrow--next { right: 12px }
.dots {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 12px;
  display: flex;
  gap: 8px;
  z-index: 5;
}
.dot {
  width: 12px;
  height: 8px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.85);
  background: rgba(255,255,255,0.25);
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease;
}
.dot--active {
  background: #0076FC;
  border-color: #0076FC;
  transform: scale(1.2);
}

@media (max-width: 900px) {
  .arrow { width: 34px; height: 34px }
  .dot { width: 10px; height: 7px }
}

@media (max-width: 600px) {
  .arrow { display: none }
  .dot { width: 8px; height: 6px }
}
</style>
