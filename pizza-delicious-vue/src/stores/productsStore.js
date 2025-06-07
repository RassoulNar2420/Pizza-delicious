import { defineStore } from 'pinia'
import { http } from '@/plugins/http'

export const useProductsStore = defineStore('products', {
  // contenido del store
  state: () => {
    return {
      products: [],
      productCategories: []
    }
  },
  getters: {
    getProductsByCategory(state){
        return (categoryId) => {
          return state.products.filter((product) => product.category === categoryId)
        }
    },
    featuredProducts(state){
      return state.products.filter((product) => product.featured)
    },
    menuProducts(state) {
      return state.products.filter((product) => product.menu)
    }
  },
  actions: {
    async loadProducts() {
      try{
        if(this.products.length > 0){
            return this.products
        }
        const response = await http.get('/products?sort=name')
        this.products = response.data
        this.productCategories = initProductCategories(response.data)
      }catch(e){
        console.warn("No se pudieron cargar los productos")
      }
    }
  }
})

function initProductCategories(productList) {
  const categories = productList.map(product => {
      return {id: product.category, title: product.category}
    })
  const uniqueCategories = []
  categories.forEach(element => {
    const alreadyExistsInUniqueCategories = uniqueCategories.find(item => item.id === element.id)
    //console.info(`${element.id} existe en uniqueCategories? ${!!alreadyExistsInUniqueCategories}`)
    if(!alreadyExistsInUniqueCategories) {
      //console.info(`Agrega elemento ${element.id}`)
      uniqueCategories.push(element)
    }
  })
  return uniqueCategories.sort(sortByTitleAsc)
}

function sortByTitleAsc(a, b) {
  if(a.title.toUpperCase() > b.title.toUpperCase()) {
    return 1
  }

  if(a.title.toUpperCase() < b.title.toUpperCase()) {
    return -1
  }

  return 0
}

/*
1. Implementar el store de productos
2. refactorizar (modificar) todas las partes de pizza delicious donde se carguen productos para que lo haga desde el store
*/
