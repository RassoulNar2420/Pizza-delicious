<script setup>
import {ref, onMounted, watch} from 'vue'
import { useRouter } from 'vue-router'
import {http} from '@/plugins/http'
import ListArticleItem from '@/components/articles/ListArticleItem.vue'
import MainHero from '@/components/MainHero.vue'
import { useArticlesStore } from '@/stores/articlesStore'

const router = useRouter()
const articlesStore = useArticlesStore()
const sortFieldOptions = [
  {value: '-dateAt', label: 'Fecha más nuevas primero'},
  {value: 'dateAt', label: 'Fecha más antiguas primero'},
  {value: 'title', label: 'Título A-Z'},
  {value: '-title', label: 'Título Z-A'},
]
const sortField = ref('-dateAt')

function onItemClicked(article) {
  const articleUrl = `/blog/${article.slug}`
  router.push(articleUrl)
}

watch(sortField, async (value, oldValue) => {
  await articlesStore.loadArticles(sortField.value)
})

onMounted(async () => {
  await articlesStore.loadArticles(sortField.value)
})

</script>

<template>
  <main>
    <MainHero
    subheading="Nuestro blog"
    heading="Actualidad culinaria"
  />
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center pb-4">
          <div class="col-md-7 heading-section  text-center">
            <h2 class="mb-4">Lisez notre blog</h2>
            <p>Loin, très loin, derrière les montagnes des mots, loin des pays de Vokalia et de Consonantia, vivent les textes aveugles.</p>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-md-7"></div>
          <div class="col-md-5 text-right">
            <label for="sortSelector" class="mr-2 text-uppercase">Ordre:</label>
            <select id="sortSelector" v-model="sortField" class="py-2 px-4 rounded">
              <option v-for="option in sortFieldOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
          </div>
        </div>
        <div class="row d-flex">
          <ListArticleItem v-for="article in articlesStore.articles" :key="article._id" :item="article" @item-clicked="onItemClicked"/>
        </div>
      </div>
    </section>
  </main>
</template>
