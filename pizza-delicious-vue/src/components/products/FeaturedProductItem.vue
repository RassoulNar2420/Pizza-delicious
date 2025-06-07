<script setup>
import {defineProps, defineEmits} from 'vue'
import {formatCurrency} from '@/utils/formats'

const emit = defineEmits(['item-clicked'])

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

function itemClicked() {
    emit('item-clicked', props.item)
}

</script>

<template>
    <div class="col-lg-4 d-flex ">
        <div class="services-wrap d-flex">
        <a
            href="#"
            class="img"
            :style="`background-image: url(${props.item.image});`"
        ></a>
        <div class="text p-4">
            <h3>{{ props.item.name }}</h3>
            <p>{{ props.item.description }}</p>
            <p class="price">
            <span>{{ formatCurrency(props.item.price) }}</span>
            <a href="#" class="ml-2 btn btn-white btn-outline-white" @click.prevent="itemClicked"
                >Commander</a
            >
            </p>
        </div>
        </div>
    </div>
</template>