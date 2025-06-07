<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useElementVisibility } from '@vueuse/core'

const route = useRoute()
const authStore = useAuthStore()
const mainMenuTogglerRef = ref()
const mainMenuTogglerIsVisible = useElementVisibility(mainMenuTogglerRef)
const mainMenuVisible = ref(true)
const menu = computed(() => {
  const currentRouteName = route.name
  const menuItems = [
    { title: "Accueil", route: "home" },
    { title: "Commandes", route: "orders" },
    { title: "Blog", route: "blog" },
    { title: "Contact", route: "contact" },
  ].map((menuItem) => {
    if (menuItem.route === currentRouteName) {
      menuItem.extraClasses = "current"
    }
    return menuItem
  })

  if (authStore.hasSession) {
    menuItems.push({ title: '', route: 'user-profile', img: authStore.tokenData?.avatar })
  } else {
    menuItems.push({ title: "Regístrate", route: "registration", extraClasses: "text-warning" })
    menuItems.push({ title: 'Login', route: 'login', extraClasses: "text-warning" })
  }

  return menuItems

})

function toggleMobileMenu() {
  if (!mainMenuTogglerIsVisible.value) return

  mainMenuVisible.value = !mainMenuVisible.value
}

function closeMenu(){
  mainMenuVisible.value = false
}

watch(() => mainMenuTogglerIsVisible.value, (isVisible) => {
  if (isVisible) {
    mainMenuVisible.value = false
  } else {
    mainMenuVisible.value = true
  }
})

onMounted(() => {
  if(mainMenuTogglerIsVisible.value) mainMenuVisible.value = false
})

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">
        <span class="flaticon-pizza-1 mr-1"></span>Pizza<br /><small>Delicious</small>
      </RouterLink>
      <button ref="mainMenuTogglerRef" class="navbar-toggler" type="button" aria-controls="ftco-nav"
        aria-expanded="false" aria-label="Toggle navigation" @click="toggleMobileMenu">
        <span class="oi oi-menu"></span> Menu
      </button>
      <Transition>
        <div v-show="mainMenuVisible" class="navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-for="item in menu">
              <RouterLink :to="{ name: item.route }" @click="closeMenu" class="nav-link" :class="item.extraClasses">
                <img v-if="item.img" :src="item.img" class="rounded" style="width: 28px; height: 28px;" />
                {{ item.title }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </nav>
</template>
