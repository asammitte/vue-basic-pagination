<script setup lang="ts">
function pageSelected(pageIndex: number): void {
  console.log(pageIndex)
}
</script>

<template>
  <header>
    
  </header>

  <main>
    <router-view />
    <BasicPagination :page-count="9" :selected-page="5">
      <template v-slot:firstButtonContent>
        <router-link :to="{ path: '' }">F I R S T</router-link>
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
