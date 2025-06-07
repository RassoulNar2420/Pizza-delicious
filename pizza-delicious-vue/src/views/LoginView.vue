<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { http } from '@/plugins/http'
import { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const currentErrorMsg = ref('')
const formData = ref({
  email: '',
  password: ''
})
const intervalID = ref(null)

async function login() {
  try {
    if (!formData.value.email) {
      return showError('Introduce tu email')
    }
    if (!formData.value.password) {
      return showError('Introduce tu contraseña')
    }
    const payload = { ...formData.value }
    const response = await http.post('/users/logins', payload)

    const jwtToken = response.data.jwt
    authStore.setSession(jwtToken)
    const redirectTo = route.query?.redirect_to || null
    if(redirectTo){
      await router.push({path: redirectTo})
    }else{
      await router.push({ name: 'home' })
    }
  } catch (e) {
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

onMounted(() => {
  const loginEmail = route.query?.email || ''
  formData.value.email = loginEmail
})
</script>

<template>
  <main>
    <section class="ftco-section">
      <div class="container">
        <div class="row d-flex">
          <div class="bg-white col-md-4 offset-4 rounded p-5">
            <h3 style="color:black;">Se connecter</h3>
            <label class="d-block" for="emailInput">Email</label>
            <input id="emailInput" name="email" type="email" v-model="formData.email" class="rounded p-1 mb-3"
              style="width: 100%;" />

            <label class="d-block" for="passwordInput">Mot de ppasse</label>
            <input id="passwordInput" type="password" v-model="formData.password" class="rounded p-1 mb-3"
              style="width: 100%;" />

            <div class="mt-2">
              <Transition name="fade">
                <div class="text-danger text-left font-weight-bold p-1 rounded mb-3" style="border: 1px solid red;"
                  v-if="currentErrorMsg">
                  {{ currentErrorMsg }}
                </div>
              </Transition>
              <div style="display: flex;align-items: center;justify-content: space-between;">
                <RouterLink to="/registration">¿Vous n'avez pas de compte?</RouterLink>
                <button class="rounded text-uppercase" @click="login" style="cursor: pointer;">Acceder</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
