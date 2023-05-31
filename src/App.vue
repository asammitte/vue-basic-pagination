<script setup lang="ts">
function pageSelected(pageIndex: number): void {
  console.log(pageIndex)
}
</script>

<template>
  <header>
    
  </header>

  <main>
    <BasicPagination :page-count="32" />
  </main>
</template>
