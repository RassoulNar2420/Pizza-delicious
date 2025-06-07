<script setup>
import { ref, onMounted, defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'
import {http} from '@/plugins/http'
import ListArticleItem from '@/components/articles/ListArticleItem.vue'
import { useArticlesStore } from '@/stores/articlesStore'

const router = useRouter()
const props = defineProps({
	maxItems: {
		type: Number,
		default: () => 3
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
    	<section class="ftco-section">
	<div class="container">
		<div class="row justify-content-center mb-5 pb-3">
		<div class="col-md-7 heading-section  text-center">
			<h2 class="mb-4">Récent du blog</h2>
			<p>
				Loin, très loin, derrière les montagnes, loin des pays
				Vokalia et Consonantia, les textes aveugles, y vivent.
			</p>
		</div>
		</div>
		<div class="row d-flex">
		 <ListArticleItem v-for="article in recentsArticles" :key="article._id" :item="article" @item-clicked="onItemClicked"/>
		</div>
	</div>
	</section>
</template>
