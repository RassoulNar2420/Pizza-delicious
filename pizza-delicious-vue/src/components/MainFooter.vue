<script setup>
import { ref, onMounted, defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'
import {http} from '@/plugins/http'
import ListArticleItem from '@/components/articles/ListArticleItem.vue'
import FooterArticleItem from '@/components/articles/FooterArticleItem.vue'
import { useArticlesStore } from '@/stores/articlesStore'

const router = useRouter()
const props = defineProps({
	maxItems: {
		type: Number,
		default: () => 2
	}
})

const articlesStore = useArticlesStore()
const recentsArticles = computed(() => {
  return articlesStore.recentsArticles(props.maxItems)
})

async function onItemClicked(article){
	try{
		const articleUrl = `/blog/${article.slug}`
		await router.push(articleUrl)
	}catch(e){
		console.error(e)
	}
}

onMounted(async () => {
	await articlesStore.loadArticles()
})

</script>

<template>
  	<footer class="ftco-footer ftco-section img">
		<div class="overlay"></div>
		<div class="container">
		<div class="row mb-5">
			<div class="col-lg-3 col-md-6 mb-5 mb-md-5">
			<div class="ftco-footer-widget mb-4">
				<h2 class="ftco-heading-2">À propos de nous</h2>
				<p>
          Loin, très loin, derrière les montagnes, loin des pays
          Vokalia et Consonantia, les textes aveugles, y vivent.
				</p>
				<ul
				class="ftco-footer-social list-unstyled float-md-left float-lft mt-5"
				>
				<li class="">
					<a href="#"><span class="icon-twitter"></span></a>
				</li>
				<li class="">
					<a href="#"><span class="icon-facebook"></span></a>
				</li>
				<li class="">
					<a href="#"><span class="icon-instagram"></span></a>
				</li>
				</ul>
			</div>
			</div>
			<div class="col-lg-4 col-md-6 mb-5 mb-md-5">
			<div class="ftco-footer-widget mb-4">
				<h2 class="ftco-heading-2">Blog récent</h2>
				<FooterArticleItem v-for="article in recentsArticles" :key="article._id" :item="article" @item-clicked="onItemClicked" />
			</div>
			</div>
			<div class="col-lg-2 col-md-6 mb-5 mb-md-5">
			<div class="ftco-footer-widget mb-4 ml-md-4">
				<h2 class="ftco-heading-2">Services</h2>
				<ul class="list-unstyled">
				<li><a href="#" class="py-2 d-block">Cuit</a></li>
				<li><a href="#" class="py-2 d-block">Livrer</a></li>
				<li><a href="#" class="py-2 d-block">Des aliments de qualité</a></li>
				<li><a href="#" class="py-2 d-block">Mixte</a></li>
				</ul>
			</div>
			</div>
			<div class="col-lg-3 col-md-6 mb-5 mb-md-5">
			<div class="ftco-footer-widget mb-4">
				<h2 class="ftco-heading-2">Vous avez une question ?</h2>
				<div class="block-23 mb-3">
				<ul>
					<li>
					<span class="icon icon-map-marker"></span
					><span class="text"
						>Calle Manuel de falla 3 29004 Málaga</span
					>
					</li>
					<li>
					<a href="#"
						><span class="icon icon-phone"></span
						><span class="text">+34603258049</span></a
					>
					</li>
					<li>
					<a href="#"
						><span class="icon icon-envelope"></span
						><span class="text">mohamed.diagne@unchk.edu.sn</span></a
					>
					</li>
				</ul>
				</div>
			</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12 text-center">
			<p>
				<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
				Copyright 2024
				All rights reserved | This template is made with
				<i class="icon-heart" aria-hidden="true"></i> by
				<a href="https://colorlib.com" target="_blank">Colorlib</a>
				<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
			</p>
			</div>
		</div>
		</div>
	</footer>

</template>
