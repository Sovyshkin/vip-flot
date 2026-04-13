<template>
  <Teleport to="body">
    <Transition name="booking-modal">
      <div v-if="modelValue" class="booking-modal" @click.self="close">
        <div class="booking-modal__dialog" role="dialog" aria-modal="true">
          <button class="booking-modal__close" type="button" aria-label="Закрыть" @click="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <RequestBook />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
/* global defineProps, defineEmits */
import RequestBook from './RequestBook.vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.booking-modal {
  position: fixed;
  inset: 0;
  background: rgba(10, 20, 35, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 2200;
}

.booking-modal__dialog {
  width: min(960px, 100%);
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.booking-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.booking-modal__close:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-2px);
}

.booking-modal-enter-active,
.booking-modal-leave-active {
  transition: opacity 0.25s ease;
}

.booking-modal-enter-from,
.booking-modal-leave-to {
  opacity: 0;
}

.booking-modal-enter-active .booking-modal__dialog,
.booking-modal-leave-active .booking-modal__dialog {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.booking-modal-enter-from .booking-modal__dialog {
  transform: translateY(20px) scale(0.98);
  opacity: 0;
}

.booking-modal-leave-to .booking-modal__dialog {
  transform: translateY(12px) scale(0.98);
  opacity: 0;
}

@media (max-width: 768px) {
  .booking-modal {
    padding: 16px;
  }

  .booking-modal__dialog {
    border-radius: 18px;
  }
}
</style>
