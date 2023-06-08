# vue3-plain-pagination

[![NPM](https://nodei.co/npm/vue3-basic-pagination.png)](https://nodei.co/npm/vue3-basic-pagination/)

[![NPM version](https://badgen.net/npm/v/vue3-basic-pagination)](https://www.npmjs.com/package/vue3-basic-pagination)
![tests](https://github.com/asammitte/vue3-basic-pagination/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/asammitte/vue3-basic-pagination/branch/main/graph/badge.svg)](https://codecov.io/gh/asammitte/vue3-basic-pagination)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
<!-- [![NPM downloads](https://badgen.net/npm/dm/vue3-basic-pagination)](https://www.npmjs.com/package/vue3-basic-pagination)
[![Bundlephobia minified + gzip](https://badgen.net/bundlephobia/minzip/vue3-basic-pagination)](https://bundlephobia.com/package/vue3-basic-pagination) -->


[![vue](https://badges.aleen42.com/src/vue.svg)](https://badges.aleen42.com/src/vue.svg)
[![javascript](https://badges.aleen42.com/src/javascript.svg)](https://badges.aleen42.com/src/javascript.svg)
[![vitejs](https://badges.aleen42.com/src/vitejs.svg)](https://badges.aleen42.com/src/vitejs.svg)
[![rollup](https://badges.aleen42.com/src/rollup.svg)](https://badges.aleen42.com/src/rollup.svg)

Simple pagination component for Vue3 / Nuxt3. Can be easily customized via css and/or slots.

## Installation

### NPM

Install the npm package.

```js
$ npm install vue3-basic-pagination --save
```

**Register as plugin**
So there is no need to import it every time.

```js
// main.js or main.ts
import { createApp } from 'vue'
import App from './App.vue'
import PaginationPlugin from 'vue3-basic-pagination' // import component
import 'vue3-basic-pagination/styles' // register default styles

const app = createApp(App)
app.use(PaginationPlugin) // register plugin
app.mount('#app')
```

**As component**
```js
// CustomComponent.vue
import PaginationPlugin from 'vue3-basic-pagination'
```
---

## Usage

### In Vue Template

**Basic Usage**

```html
<basic-pagination :page-count="20" />
```

Or

```html
<BasicPagination :pageCount="20" />
```

## Props

| Name | Type | Default | Description |
|-|-|-|-|
| `page-count` <em>(required)</em> | `Number` | | Total pages. |
| `page-range`   | `Number` | `5` | Range of pages which displayed. |
| `margin-pages` | `Number` | `1` | The number of displayed pages for margins. |
| `show-first-last-buttons` | `Boolean` | `true` | Whether to show or hide buttons to navigate to first and last pages. |
| `show-prev-next-buttons` | `Boolean` | `true` | Whether to show or hide buttons to navigate to previous and next pages. |
| `container-class` | `string` | `vue3-basic-pagination` | CSS class name for the layout. |
| `page-class` | `string` | `page-item` | CSS class name for tag `li` of each page element. |
| `page-link-class` | `string` | `page-link` | CSS class name for tag `span` of each page element. |
| `disabled-class` | `string` | `disabled-item` | CSS class name for tag `li` of disabled element(s). |
| `first-item-class` | `string` | `first-item` | CSS class name for tag `li` of first element. |
| `first-item-link-class` | `string` | `first-link` | CSS class name for tag `span` of first element. |
| `last-item-class` | `string` | `last-item` | CSS class name for tag `li` of last element. |
| `last-item-link-class` | `string` | `last-link` | CSS class name for tag `span` of last element. |
| `prev-item-class` | `string` | `prev-item` | CSS class name for tag `li` of previous element. |
| `prev-item-link-class` | `string` | `prev-link` | CSS class name for tag `span` of previous element. |
| `next-item-class` | `string` | `next-item` | CSS class name for tag `li` of next element. |
| `next-item-link-class` | `string` | `next-link` | CSS class name for tag `span` of next element. |
| `break-view-class` | `string` | `break-item` | CSS class name for tag `li` of break element. |
| `break-view-link-class` | `string` | `break-link` | CSS class name for tag `span` of break element. |
| `active-class` | `string` | `active-item` | CSS class name for tag `li` of active element. |

**Using props**

```html
<template>
  <BasicPagination
    :page-count="20"
    :page-range="5"
    :margin-pages="3"
    :container-class="'custom-container-class'"
  >
  </BasicPagination>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
// import PaginationPlugin from 'vue3-basic-pagination' // uncomment if not registered as plugin

const route = useRoute()
const router = useRouter()

const customFunc = (pageIndex: number): void => {
  const query = { ...route.query, ...{ page: pageIndex } }
  router.push({ name: '', query: query })
}
</script>
```

## Events

| Name | Return Type | Description |
|-|-|-|
| `page-selected` | `Number` | Selected page number. |

**Using events**

```html
<template>
  <BasicPagination
    :page-count="20"
    @pageSelected="customFunc"
  >
  </BasicPagination>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
// import PaginationPlugin from 'vue3-basic-pagination' // uncomment if not registered as plugin

const route = useRoute()
const router = useRouter()

const customFunc = (pageIndex: number): void => {
  const query = { ...route.query, ...{ page: pageIndex } }
  router.push({ name: '', query: query })
}
</script>
```

## Slots

| Name | Description |
|-|-|
| `firstButtonContent` | Content of first page item. |
| `lastButtonContent` | Content of last page item. |
| `prevButtonContent` | Content of prev page item. |
| `nextButtonContent` | Content of next page item. |
| `pageContent` | Content of page item. |
| `currentPageContent` | Content of current page item. |
| `breakViewContent` | Content of break item. |

**Using slots**
```html
<BasicPagination
  :page-count="7"
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
```
