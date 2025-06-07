<script setup>
import { defineProps, defineEmits } from 'vue'
import { formatCalendar } from '@/utils/formats'

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
    <div class="block-21 mb-4 d-flex" @click="itemClicked">
        <a
            class="blog-img mr-4"
            :style="`background-image: url(${props.item.image});`"
        ></a>
        <div class="text">
            <h3 class="heading">
            <a href="#"
                >{{ props.item.title }}</a
            >
            </h3>
            <div class="meta">
                <div>
                    <a href="#"
                    ><span class="icon-calendar"></span> {{ formatCalendar(props.item.dateAt) }}</a
                    >
                </div>
                <div>
                    <a href="#"><span class="icon-person"></span>{{ props.item.author }}</a>
                </div>
            </div>
        </div>
    </div>
</template>