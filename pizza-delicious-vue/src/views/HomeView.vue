<script setup>
import MainHero from '@/components/MainHero.vue'
import HomeAddress from '@/components/HomeAddress.vue'
import HomeMeals from '@/components/HomeMeals.vue'
import HomeServices from '@/components/HomeServices.vue'
import HomeBlog from '@/components/HomeBlog.vue'
import {RouterLink} from 'vue-router'

</script>

<template>
  <main>
    <MainHero 
      subheading="Bienvenus" 
      heading="NOUS AVONS CUISINÉ LA RECETTE DE PIZZA QUE VOUS SOUHAITEZ"  
      description="Une petite rivière nommée Duden coule à proximité de leur localité et leur fournit les regelialia nécessaires."
    >
    <p>
      <RouterLink :to="{name: 'orders'}" class="btn btn-primary p-3 px-xl-4 py-xl-3">Commander maintenant</RouterLink>
    </p>
  </MainHero>
    <HomeAddress />
    <HomeMeals />
    <HomeServices />
    <HomeBlog />
  </main>
</template>
