<script setup>
import {defineProps} from 'vue'
import { formatCurrency } from '@/utils/formats'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="col-md-6">
        <div class="pricing-entry d-flex">
        <div class="img"
            :style="`background-image: url(${props.item.image});`"
        ></div>
        <div class="desc pl-3">
            <div class="d-flex text align-items-center">
            <h3><span>{{ props.item.name }}</span></h3>
            <span class="price">{{ formatCurrency(props.item.price) }}</span>
            </div>
            <div class="d-block">
            <p>{{ props.item.description }}</p>
            </div>
        </div>
        </div>
    </div>
</template>