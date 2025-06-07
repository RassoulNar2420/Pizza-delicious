<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { http } from '@/plugins/http'
import { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const currentErrorMsg = ref('')
const formData = ref(createEmptyFormData())
const intervalID = ref(null)
const authStore = useAuthStore()

function createEmptyFormData() {
  return {
    email: '',
    name: '',
    lastname: '',
    phone: '',
    address: ''
  }
}

async function updateAccount() {
  try {
    const payload = { ...formData.value }
    const userId = authStore.tokenData.id
    await http.put(`/users/${userId}`, payload)

    await router.push({ name: 'home' })
  } catch (e) {
    if (e instanceof AxiosError) {
      const errorData = e.response.data
      showError(errorData.errors.join(', '))
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

async function loadCustomerData() {
  try {
    const userId = authStore.tokenData.id

    const response = await http.get(`/users/${userId}`)
    const userData = response.data
    formData.value = {
      email: userData.email,
      name: userData.name,
      lastname: userData.lastname,
      phone: userData.phone,
      address: userData.address
    }
  } catch (e) {
    showError(e)
  }
}

async function logout() {
  try {
    console.info(authStore.resetSession)
    authStore.resetSession()

    await router.replace({ name: 'home' })
  } catch (e) {
    console.error(e)
    if (e instanceof AxiosError) {
      const errorData = e.response.data
      showError(errorData.errors.join(', '))
    } else {
      showError(e.message)
    }
  }
}

onMounted(async () => {
  await loadCustomerData()
})

</script>

<template>
  <main>
    <section class="ftco-section">
      <div class="container">
        <div class="row d-flex">
          <div class="bg-white col-md-4 offset-4 rounded p-5">
            <h3 style="color:black;">Vos données</h3>
            <label class="d-block" for="emailInput">Email</label>
            <input id="emailInput" name="email" type="email" v-model="formData.email" class="rounded p-1 mb-3"
              style="width: 100%;" />

            <label class="d-block" for="nameInput">Prénom</label>
            <input id="nameInput" type="text" v-model="formData.name" class="rounded p-1 mb-3" style="width: 100%;" />

            <label class="d-block" for="lastnameInput">Nom</label>
            <input id="lastnameInput" type="text" v-model="formData.lastname" class="rounded p-1 mb-3"
              style="width: 100%;" />

            <label class="d-block" for="phoneInput">Téléphone</label>
            <input id="phoneInput" type="tel" name="email" v-model="formData.phone" class="rounded p-1 mb-3"
              style="width: 100%;" />

            <label class="d-block" for="addressInput">Adresse complète</label>
            <input id="addressInput" type="text" name="email" v-model="formData.address" class="rounded p-1 mb-3"
              style="width: 100%;" />

            <div class="mt-2" style="display: flex; justify-content: space-between;">
              <Transition>
                <div class="text-danger text-left font-weight-bold p-1 rounded mb-3" style="border: 1px solid red;"
                  v-if="currentErrorMsg">
                  {{ currentErrorMsg }}
                </div>
              </Transition>
              <a href="#" class="rounded text-uppercase" @click="logout">
                Fermer la session
              </a>
              <button class="rounded text-uppercase" @click="updateAccount" style="cursor: pointer;">Actualizer
                la compte</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
