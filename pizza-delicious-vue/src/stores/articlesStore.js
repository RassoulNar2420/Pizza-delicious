import { defineStore } from 'pinia'
import { http } from '@/plugins/http'

export const useArticlesStore = defineStore('articles', {
  // contenido del store
  state: () => {
    return {
      articles: []
    }
  },
  getters: {
    getArticleBySlug(state) {
      return (articleSlug) => {
        return state.articles.find((article) => article.slug === articleSlug)
      }
    },
    recentsArticles(state) {
      return (maxItems = 3) => {
        return [...state.articles].splice(0, maxItems)
      }
    }
  },
  actions: {
    async loadArticles(sortField = '-dateAt') {
      try {
        if (this.articles.length > 0) {
          return this.articles
        }
        const response = await http.get(`/articles?sort=${sortField}`)
        this.articles = response.data
      } catch (e) {
        console.warn("No se pudieron cargar los productos")
      }
    }
  }
})

function initProductCategories(productList) {
  const categories = productList.map(product => {
    return { id: product.category, title: product.category }
  })
  const uniqueCategories = []
  categories.forEach(element => {
    const alreadyExistsInUniqueCategories = uniqueCategories.find(item => item.id === element.id)
    //console.info(`${element.id} existe en uniqueCategories? ${!!alreadyExistsInUniqueCategories}`)
    if (!alreadyExistsInUniqueCategories) {
      //console.info(`Agrega elemento ${element.id}`)
      uniqueCategories.push(element)
    }
  })
  return uniqueCategories.sort(sortByTitleAsc)
}

function sortByTitleAsc(a, b) {
  if (a.title.toUpperCase() > b.title.toUpperCase()) {
    return 1
  }

  if (a.title.toUpperCase() < b.title.toUpperCase()) {
    return -1
  }

  return 0
}

/*
1. Implementar el store de productos
2. refactorizar (modificar) todas las partes de pizza delicious donde se carguen productos para que lo haga desde el store
*/
