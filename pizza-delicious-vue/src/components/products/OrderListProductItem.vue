<script setup>
import { formatCurrency } from '@/utils/formats';
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['add-to-cart'])
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

function itemClicked(){
    emit('add-to-cart', props.item)
}
</script>

<template>
    <div class="col-md-3 text-center">
        <div class="menu-wrap">
            <div href="#" class="menu-img img mb-4" :style="`background-image: url(${props.item.image});`"></div>
            <div class="text">
            <h3>{{ props.item.name }}</h3>
            <p>{{ props.item.description }}</p>
            <p class="price"><span>{{ formatCurrency(props.item.price) }}</span></p>
            <p>
                <a href="#" class="btn btn-white btn-outline-white" @click.prevent="itemClicked">
                    Ajouter
                </a>
            </p>
            </div>
        </div>
    </div>
</template>