<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {http} from '@/plugins/http'
import { AxiosError } from 'axios';

const router = useRouter()
const currentErrorMsg = ref('')
const formData = ref({"email":"mohamed.diagne@unchk.edu.sn","password":"123456789","name":"Mohamed","lastname":"Diagne","phone":"+34603258049","address":"C/ Manuel de Falla 3, 29004 Málaga","legalAccepted":false})
const intervalID = ref(null)

function createEmptyFormData() {
  return {
  email: '',
  password: '',
  name: '',
  lastname: '',
  phone: '',
  address: '',
  legalAccepted: false
}
}

async function createAccount() {
  try{
    if(!formData.value.legalAccepted){
      return showError('Debes aceptar los términos y condiciones.')      
    }
    const payload = {...formData.value}
    delete payload.legalAccepted

    await http.post('/users', payload)

    await router.push({name: 'login', query: { email: payload.email }})
  }catch(e){
    if(e instanceof AxiosError) {
      const errorData = e.response.data
      showError(errorData.errors.join(', '))
    }else{
      showError(e.message)
    }
  }
}

function showError(message) {
  if(!message) return
  if(intervalID.value) {
    clearTimeout(intervalID.value)
    intervalID.value = null
  }
  currentErrorMsg.value = message
  intervalID.value = setTimeout(() => currentErrorMsg.value = '', 4000)
}

</script>

<template>
  <main>
    <section class="ftco-section">
      <div class="container">
        <div class="row d-flex">
          <div class="bg-white col-md-4 offset-4 rounded p-5">
            <h3 style="color:black;">S'inscrire</h3>
            <label class="d-block" for="emailInput">Email</label>
            <input id="emailInput" name="email" type="email" v-model="formData.email" class="rounded p-1 mb-3" style="width: 100%;" />

            <label class="d-block" for="passwordInput">Mot de passe</label>
            <input id="passwordInput" type="password" v-model="formData.password" class="rounded p-1 mb-3" style="width: 100%;" />

            <label class="d-block" for="nameInput">Prénom</label>
            <input id="nameInput" type="text" v-model="formData.name" class="rounded p-1 mb-3" style="width: 100%;" />
            
            <label class="d-block" for="lastnameInput">Nom</label>
            <input id="lastnameInput" type="text" v-model="formData.lastname" class="rounded p-1 mb-3" style="width: 100%;" />

            <label class="d-block" for="phoneInput">Téléphone</label>
            <input id="phoneInput" type="tel" name="email" v-model="formData.phone" class="rounded p-1 mb-3" style="width: 100%;" />

            <label class="d-block" for="addressInput">Adresse complète</label>
            <input id="addressInput" type="text" name="email" v-model="formData.address" class="rounded p-1 mb-3" style="width: 100%;" />
          
            <div>
              <input id="legalInput" type="checkbox" style="display:inline; width: 15px; height: 15px;" v-model="formData.legalAccepted"/>
              <label class="d-inline" for="legalInput"> J'accepte les termes et conditions du site</label>
            </div>
              
            <div class="text-right mt-2">
              <Transition>
              <div class="text-danger text-left font-weight-bold p-1 rounded mb-3" style="border: 1px solid red;"  v-if="currentErrorMsg">
                {{ currentErrorMsg }}
              </div>
            </Transition>
              <button class="rounded text-uppercase" @click="createAccount" style="cursor: pointer;">Créer un compte</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
