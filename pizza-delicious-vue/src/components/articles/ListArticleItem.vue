<script setup>
import {formatCalendar} from '@/utils/formats'
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['item-clicked'])

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

function itemClicked(){
    emit('item-clicked', props.item)
}
</script>

<template>
    <div class="col-md-4 d-flex" href="#" @click.prevent="itemClicked" style="cursor: pointer;">
        <div class="blog-entry align-self-stretch">
        <div
            href="#"
            class="block-20"
            :style="`background-image: url(${props.item.image});`"
        >
        </div>
        <div class="text py-4 d-block">
            <div class="meta">
            <div>{{ formatCalendar(props.item.dateAt) }}</div>
            <div>{{ props.item.author}}</div>
            </div>
            <h3 class="heading mt-2">{{ props.item.title }}</h3>
            <p>{{ props.item.excerpt }}</p>
        </div>
        </div>
    </div>
</template>