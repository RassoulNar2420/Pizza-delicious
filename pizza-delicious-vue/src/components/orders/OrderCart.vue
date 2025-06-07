<script setup>
import { formatCurrency } from '@/utils/formats'
import { useCartStore } from '@/stores/cartStore'

const modelValue = defineModel()
const cartStore = useCartStore()

function incrementItemQty(product) {
  cartStore.modifyItemQty(product, 1)
}

function decrementItemQty(product) {
  cartStore.modifyItemQty(product, -1)
}

function deleteItem(product) {
  cartStore.removeItem(product)
}
</script>

<template>
    <div class="text">
        <table class="table table-sm">
        <thead>
            <tr>
                <th scope="col">Produit</th>
                <th scope="col">unité</th>
                <th scope="col">Prix</th>
                <th scope="col">Sous total</th>
                <th scope="col">&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in modelValue" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ formatCurrency(item.price) }}</td>
                <td>{{ formatCurrency(item.subtotal) }}</td>
                <td>
                    <span class="icon icon-plus p-1 mr-1" style="color:green; cursor:pointer;" @click="() => incrementItemQty(item)"></span>
                    <span class="icon icon-minus p-1 mr-1" style="color:yellow; cursor:pointer;"  @click="() => decrementItemQty(item)"></span>
                    <span class="icon icon-trash p-1" style="color:red; cursor:pointer;" @click="() => deleteItem(item)"></span>
                </td>
            </tr>
            <tr v-if="modelValue.length === 0">
                <td colspan="4">
                    <div class="text-center bg-white font-weight-bold rounded mt-2 py-2" >
                        Ajoutez quelque produit au panier
                    </div>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>
