<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {http} from '@/plugins/http'
import FeaturedProductItem from '@/components/products/FeaturedProductItem.vue'
import MenuProductItem from '@/components/products/MenuProductItem.vue'
import { useProductsStore } from '@/stores/productsStore'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()

async function onItemClick(item) {
	try{
    cartStore.addItem(item)
		await router.push(`/orders`)
	}catch(e) {
		console.error(e)
	}
}

onMounted(async () => {
	await productsStore.loadProducts()
})
</script>

<template>
    <section class="ftco-section">
	<div class="container">
		<div class="row justify-content-center mb-5 pb-3">
		<div class="col-md-7 heading-section  text-center">
			<h2 class="mb-4">Nos produits phares</h2>
			<p>
        Loin, très loin, derrière les montagnes, loin des pays
        Vokalia et Consonantia, les textes aveugles, y vivent.
			</p>
		</div>
		</div>
	</div>
	<div class="container-wrap">
		<div class="row no-gutters d-flex">
			<FeaturedProductItem v-for="item in productsStore.featuredProducts" :key="item._id" :item="item" @item-clicked="onItemClick" />
		</div>
	</div>

	<div class="container">
		<div class="row justify-content-center mb-5 pb-3 mt-5 pt-5">
		<div class="col-md-7 heading-section text-center ">
			<h2 class="mb-4">Nos tarifs de menu</h2>
			<p class="flip">
			<span class="deg1"></span><span class="deg2"></span
			><span class="deg3"></span>
			</p>
			<p class="mt-5">
        Loin, très loin, derrière les montagnes, loin des pays
        Vokalia et Consonantia, les textes aveugles, y vivent.
			</p>
		</div>
		</div>
		<div class="row">
			<MenuProductItem v-for="item in productsStore.menuProducts" :key="item._id" :item="item" />
		</div>
	</div>
	</section>
</template>
