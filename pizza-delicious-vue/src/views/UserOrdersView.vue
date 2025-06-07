<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { http } from '@/plugins/http'
import { formatCurrency, formatDateTime, formatTime } from '@/utils/formats';

const route = useRoute()
const userOrders = ref([])

async function loadCustomerOrdersData() {
  try {
    const sortField = route.query?.sort || '-createdAt'
    const response = await http.get(`/orders?sort=${sortField}`)
    userOrders.value = response.data
  } catch (e) {
    showError(e)
  }
}

onMounted(async () => {
  await loadCustomerOrdersData()
})

</script>

<template>
  <main>
    <section class="ftco-section">
      <div class="container">
        <div class="row d-flex">
          <div class="bg-white col-md-12 rounded p-5">
            <h3 style="color:black;">Vos commandes</h3>
            <table class="w-100">
              <thead>
                <tr>
                  <th><span class="p-1" style="color: black;">État</span></th>
                  <th><span class="p-1" style="color: black;">Date</span></th>
                  <th><span class="p-1" style="color: black;">Heure de livraison</span></th>
                  <th><span class="p-1" style="color: black;">Produits</span></th>
                  <th><span class="p-1" style="color: black;">Total</span></th>
                  <th><span class="p-1" style="color: black;">Tipe</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in userOrders" :key="item._id">
                  <td><span class="p-1 rounded" style="background-color: chocolate; color: white;">{{item.status}}</span></td>
                  <td>{{formatDateTime(item.createdAt)}}</td>
                  <td>{{formatTime(item.deliverAt)}}</td>
                  <td>
                    <div class="mb-2 p-1 rounded" style="background-color: lightblue;" v-for="product in item.products" :key="product._id">
                      <img :src="product.image" style="width: 50px; height: 50px;" />
                      <span>{{ product.name }}</span>
                      <span class="font-weight-bold">{{ product.price }} x {{ product.qty }}</span>
                    </div>
                  </td>
                  <td><span class="p-1">{{ formatCurrency(item.total) }}</span></td>
                  <td><span class="p-1 rounded" style="background-color: chocolate; color: white;">{{  item.deliverType }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
