<script setup>
import { computed, onMounted, ref } from 'vue';
import OrderListProductItem from '@/components/products/OrderListProductItem.vue'
import OrderCart from '@/components/orders/OrderCart.vue'
import { formatCurrency } from '@/utils/formats';
import {http} from '@/plugins/http'
import { useProductsStore } from '@/stores/productsStore'
import { useAuthStore } from '@/stores/authStore';
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import dayjs from 'dayjs';

const currentCategory = ref('Pizzas')
const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const currentErrorMsg = ref('')
const intervalID = ref()
const orderDetailsPopinOpened = ref(false)
const productsStore = useProductsStore()
const deliverType = ref('delivery')
const deliverAt = ref(dayjs().add(1, 'hour').toDate())
const selectingDeliverAt = ref()
const minSelectDeliverAt = ref(dayjs().add(1, 'hour').format('YYYY-MM-DD[T]HH:mm'))
const maxSelectDeliverAt = ref(dayjs().endOf('day').format('YYYY-MM-DD[T]HH:mm'))
const productsByCurrentCategory = computed(()=> {
  return productsStore.getProductsByCategory(currentCategory.value)
})

function closeOrderDetailsPopin(){
  orderDetailsPopinOpened.value = false
}

function selectCategory(category) {
  currentCategory.value = category.id
}

function addProductToCart(product) {
  cartStore.addItem(product)
}

async function placeOrder() {
  if(!cartStore.hasItems) {
    showError('Vous devez ajouter au moins 1 produit pour continuer')
    return
  }
  if(cartStore.total <= 10) {
    showError('Pour les livraisons à domicile, le montant de la commande doit être supérieur à 10,00 €')
    return
  }

  if(!authStore.hasSession) {
    //enviamos al login
    const routePath = route.path
    await router.push({name: 'login', query: {redirect_to: routePath}})
  }
  selectingDeliverAt.value = dayjs(deliverAt.value).format('YYYY-MM-DD[T]HH:mm')
  orderDetailsPopinOpened.value = true
}

async function sendOrder(){
  const limitDate = dayjs().add(1, 'hour')
  const userDeliverDate = dayjs(selectingDeliverAt.value)

  if(limitDate.isAfter(userDeliverDate)){
    return showError(`La date/heure de livraison doit être postérieure a ${limitDate.format('DD/MM/YYYY [á] HH:mm')}`)
  }

  const payload = {
    deliverAt: userDeliverDate.toISOString(),
    user: authStore.sessionId,
    products: cartStore.items.map((product) => {
      return {_id: product._id, qty: product.qty}
    }),
    deliverType: deliverType.value,
  }

  try{
    const response = await http.post('/orders', payload)
    const createdOrder = response.data

    alert(`La commande a été créée avec la référence ${createdOrder._id}`)

    cartStore.clear()
    await router.push({name: 'user-orders', query: {sort: '-createdAt'}})
  }catch(e){
    if (e instanceof AxiosError) {
      const errorData = e.response.data
      showError(errorData.errors?.join(', ') || errorData.message)
    } else {
      showError(e.message)
    }
  }
}

function showError(message) {
  if (!message) return
  if (intervalID.value) {
    clearTimeout(intervalID.value)
    intervalID.value = null
  }
  currentErrorMsg.value = message
  intervalID.value = setTimeout(() => currentErrorMsg.value = '', 4000)
}

onMounted(async () => {
  await productsStore.loadProducts()
})

</script>

<template>
  <main>
    <section class="ftco-menu">
      <div class="container-fluid">
        <div class="row d-md-flex">
          <div class="col-lg-12 p-md-5">
            <div class="row">
              <div class="col-md-12 nav-link-wrap mb-5 d-flex">
                <div class="nav  nav-pills mx-auto" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a v-for="category in productsStore.productCategories"
                    class="nav-link"
                    :class="{ active: currentCategory === category.id }"
                    href="#" @click.prevent="selectCategory(category)">{{ category.title }}
                  </a>
                </div>
              </div>
              <div class="col-md-12">
                <div class="tab-content " id="v-pills-tabContent">
                  <div class="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="v-pills-1-tab">
                    <div class="row">
                      <OrderListProductItem v-for="product in productsByCurrentCategory" :key="product.id" :item="product" @add-to-cart="addProductToCart" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ftco-intro">
      <div class="container-wrap">
        <div class="wrap d-md-flex">
          <div class="info">
            <div class="row no-gutters">
              <div class="col-md-4 d-flex">
                <div class="text">
                  <h3>VOUS COMMANDEZ</h3>
                  <p>Ajoutez votre délicieuse commande et appuyez sur le bouton « Commander » </p>
                </div>
              </div>
              <div class="col-md-8 d-flex">
                <OrderCart v-model="cartStore.items"/>
              </div>
            </div>
          </div>
          <div class="social d-md-flex p-4 align-items-center">
            <div class="text">
              <h2>TOTAL</h2>
              <h4>{{ formatCurrency(cartStore.total)  }}</h4>
            </div>
            <Transition name="fade">
                <div class="text-danger text-left font-weight-bold p-1 rounded mb-3" style="border: 1px solid red;"
                  v-if="currentErrorMsg">
                  {{ currentErrorMsg }}
                </div>
            </Transition>
            <button
            class="p-3 px-xl-4 py-xl-3 btn-white btn btn-outline-white"
            @click="placeOrder"
            >
              Commander maintenant
            </button>
          </div>
        </div>
      </div>

    </section>
    <div
    v-if="orderDetailsPopinOpened"
    style="position: fixed;
    left: 0px;
    height: 100%;
    top: 0px;
    width: 100%;
    z-index: 1000;">
      <div style="position:fixed; padding: 15px; transform: translate(-50%, -50%); left: 50%; top: 50%;z-index: 1999; background-color: white; width: 350px; min-height: 300px;" class="rounded">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <h3 style="color: black;">Données supplémentaires de la commande</h3>
          <a href="#" @click.prevent="closeOrderDetailsPopin">X</a>
        </div>
      <div>
        <label class="d-block" for="deliverTypeInput">Tipe d'envoie</label>
        <select id="deliverTypeInput" v-model="deliverType" class="rounded p-1 mb-3 w-100" >
          <option value="pickup">Ramassage en magasin</option>
          <option value="delivery">Livraison a domicile</option>
        </select>

          <label class="d-block" for="deliverAtInput">Heure de livraison</label>
          <input id="deliverAtInput" type="datetime-local" v-model="selectingDeliverAt" :min="minSelectDeliverAt" :max="maxSelectDeliverAt" class="rounded p-1 mb-3"
          style="width: 100%;" />

          <div class="mt-2" style="display: flex; justify-content: space-between;">
            <Transition>
              <div class="text-danger text-left font-weight-bold p-1 rounded mb-3" style="border: 1px solid red;"
                v-if="currentErrorMsg">
                {{ currentErrorMsg }}
              </div>
            </Transition>
            <button class="rounded text-uppercase" @click="sendOrder" style="cursor: pointer;">Confirmer</button>
          </div>
      </div>
      </div>
      <div style="z-index: 1001; position:fixed; width: 100%; height: 100%; background-color: black; opacity: 0.40">
      </div>
    </div>
  </main>
</template>
