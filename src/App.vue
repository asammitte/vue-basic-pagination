<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()

function customFunc(pageIndex: number): void {
  const query = { ...route.query, ...{ page: pageIndex } }
  router.push({ name: '', query: query })
}
</script>

<template>
  <header>
    
  </header>

  <main>
    <router-view />
    <BasicPagination :page-count="9" :selected-page="5" @pageSelected="customFunc">
      <template v-slot:firstButtonContent>
        <!-- <router-link :to="{ path: '' }">F I R S T</router-link> -->
        F I R S T
      </template>
      <template v-slot:breakViewContent>
        ..!..
      </template>
      <template v-slot:pageContent="slotProps">
        <router-link :to="{ name: '', query: { page: slotProps.pageNumber } }">
          {{ slotProps.pageNumber }}
        </router-link>
      </template>
      <template v-slot:lastButtonContent="slotProps">
        <router-link :to="{ name: '', query: { page: slotProps.pageNumber } }">L A S T</router-link>
      </template>
    </BasicPagination>
  </main>
</template>

<style>
/* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"; */
</style>