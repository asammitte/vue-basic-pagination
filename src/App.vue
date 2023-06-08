<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()

const customFunc = (pageIndex: number): void => {
  const query = { ...route.query, ...{ page: pageIndex } }
  router.push({ name: '', query: query })
}
</script>

<template>
  <header>
    
  </header>

  <main>
    <router-view />
    <BasicPagination
      :page-count="7"
      :selected-page="1"
      :page-range="3"
      :margin-pages="3"
      @pageSelected="customFunc"
    >
      <template v-slot:firstButtonContent>
        <router-link :to="{ path: '' }">
          F I R S T
        </router-link>
      </template>
      <template v-slot:prevButtonContent="slotProps">
        <router-link :to="{ name: '', query: { page: slotProps.pageNumber } }">
          P R E V
        </router-link>
      </template>
      <template v-slot:breakViewContent>
        ---
      </template>
      <template v-slot:pageContent="slotProps">
        <router-link :to="{ name: '', query: { page: slotProps.pageNumber } }">
          p {{ slotProps.pageNumber }}
        </router-link>
      </template>
      <template v-slot:currentPageContent="slotProps">
        &gt;&gt; {{ slotProps.pageNumber }} &lt;&lt;
      </template>
      <template v-slot:nextButtonContent="slotProps">
        <router-link :to="{ name: '', query: { page: slotProps.pageNumber } }">
          N E X T
        </router-link>
      </template>
      <template v-slot:lastButtonContent="slotProps">
        <router-link :to="{ name: '', query: { page: slotProps.pageNumber } }">
          L A S T
        </router-link>
      </template>
    </BasicPagination>
  </main>
</template>

<style>
/* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"; */
</style>