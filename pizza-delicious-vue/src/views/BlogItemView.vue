<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {http} from '@/plugins/http'
import MainHero from '@/components/MainHero.vue'
import {formatDateTime} from '@/utils/formats'
import { useArticlesStore } from '@/stores/articlesStore'

const router = useRouter()
const route = useRoute()
const articlesStore = useArticlesStore()
const articleData = ref({
  title: '',
  image: '',
  dateAt: '',
  content: ''
})

function goBack(){
  router.go('/blog')
}

onMounted(async () => {
  const articleSlug = route.params?.slug
  await articlesStore.loadArticles()
  articleData.value = articlesStore.getArticleBySlug(articleSlug)
})

</script>

<template>
  <main>
    <section class="ftco-section">
      <Transition>
      <div class="container" v-show="articleData.title">
        <div class="row justify-content-center mb-5 pb-3">
          <div class="col-md-7 heading-section  text-center">
            <img class="mb-4" :src="articleData.image" />
            <h2 class="mb-4">{{ articleData.title }}</h2>
            <div>
            <span class="font-weight-bold">{{ formatDateTime(articleData.dateAt) }}</span>
            <span class="ml-2">{{ articleData.author }}</span>
            </div>
          </div>
        </div>
        <div class="row d-flex">
          <div class="col-md-12 d-flex flex-column text-justify" v-html="articleData.content">
          </div>
        </div>
        <div class="text-right">
          <RouterLink to="/blog" @click="goBack" >< Retour</RouterLink>
        </div>
      </div>
      </Transition>
    </section>
  </main>
</template>
