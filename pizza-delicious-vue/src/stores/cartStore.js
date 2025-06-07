import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      items: []
    }
  },
  getters: {
    hasItems: (state) => {
      return state.items.length > 0
    },
    total: (state) => {
      return state.items.reduce((acc, item) => {
        return acc + item.subtotal
      }, 0)
    }
  },
  actions: {
     addItem(product) {
      const foundCartItemIndex = this.items.findIndex(item => item._id === product._id)
      // 1. existe -> incrementamos su cantidad en 1
      // 2. no existe -> añadirlo pero con cantidad 1
      if(foundCartItemIndex < 0) {
        const cartItem = {...product}
        cartItem.qty = 1
        cartItem.subtotal = product.price

        this.items.push(cartItem)
      }else{
        const productToUpdate = this.items[foundCartItemIndex]
        productToUpdate.qty++
        productToUpdate.subtotal = productToUpdate.price * productToUpdate.qty

        this.items[foundCartItemIndex] = productToUpdate
      }
    },
    modifyItemQty(product, incrementQty = 1) {
      const itemIndex = this.items.findIndex(item => item._id === product._id)
      if(itemIndex < 0) return
      const toUpdateItem = {...this.items[itemIndex]}
      toUpdateItem.qty += incrementQty
      if(toUpdateItem.qty < 1) {
          return this.removeItem(product)
      }
      toUpdateItem.subtotal = toUpdateItem.price * toUpdateItem.qty

      this.items[itemIndex] = toUpdateItem
    },
    removeItem(product) {
      const itemIndex = this.items.findIndex(item => item._id === product._id)
      if(itemIndex >= 0){
        this.items.splice(itemIndex, 1)
      }
    },
    clear() {
      this.items = []
    }
  }
})
