<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  subheading: {
    type: String,
    default: () => null
  },
  heading: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: () => null
  },
  image: {
    type: String,
    default: () => "bg_3"
  }
}
)
</script>

<template>
  <section class="home-slider owl-carousel img">
    <div class="slider-item" :style="`background-image: url('images/${image}.jpg');`">
      <div class="overlay"></div>
      <div class="container">
        <div class="row slider-text justify-content-center align-items-center" data-scrollax-parent="true">
          <div class="col-md-7 col-sm-12 text-center ">
            <span v-if="subheading" class="subheading">{{ subheading }}</span>
            <h1 class="mb-4">{{ heading }}</h1>
            <p v-if="description" class="mb-4 mb-md-5">
              {{ description }}
            </p>
            <slot />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
