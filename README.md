# vue3-plain-pagination

[![NPM version](https://badgen.net/npm/v/vue3-basic-pagination)](https://www.npmjs.com/package/vue3-basic-pagination)
![tests](https://github.com/asammitte/vue3-basic-pagination/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/asammitte/vue3-basic-pagination/branch/main/graph/badge.svg)](https://codecov.io/gh/asammitte/vue3-basic-pagination)
[![NPM downloads](https://badgen.net/npm/dm/vue3-basic-pagination)](https://www.npmjs.com/package/vue3-basic-pagination)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


[![vue](https://badges.aleen42.com/src/vue.svg)](https://badges.aleen42.com/src/vue.svg)
[![javascript](https://badges.aleen42.com/src/javascript.svg)](https://badges.aleen42.com/src/javascript.svg)
[![vitejs](https://badges.aleen42.com/src/vitejs.svg)](https://badges.aleen42.com/src/vitejs.svg)
[![rollup](https://badges.aleen42.com/src/rollup.svg)](https://badges.aleen42.com/src/rollup.svg)

<!-- [![npm version](https://badge.fury.io/js/vuejs-paginate-next.svg)](https://badge.fury.io/js/vuejs-paginate-next) -->
<!-- [![npm](https://nodei.co/npm/vuejs-paginate-next.png)](https://nodei.co/npm/vuejs-paginate-next/) -->

<!-- <img src="https://raw.githubusercontent.com/cloudeep/vuejs-paginate-next/main/public/vuejs-paginate-next.gif" width="550"/> -->

Simple pagination component for Vue3 / Nuxt3. Can be easily customized via css and/or slots.

## Installation

### NPM

Install the npm package.

```js
$ npm install vue3-basic-pagination --save
```

Register the component as plugin, so there is no need to import it every time we want to use it. In `main.ts` or `main.js`:

```js
import { createApp } from 'vue'
import App from './App.vue'
import PaginationPlugin from 'vue3-basic-pagination' // import component
import 'vue3-basic-pagination/styles' // register default styles

const app = createApp(App)
app.use(PaginationPlugin) // register plugin
app.mount('#app')
```

---

## Usage

### In Vue Template

**Basic Usage**

```html
<basic-pagination :page-count="20" />
```

So this is also avaliable

```html
<basic-pagination :pageCount="20" />
```

**Example**

```html
<template>
  <basic-pagination
    :page-count="20"
    :page-range="5"
    :margin-pages="1"
    :container-class="'custom-pagination'"
    :first-item-class="'custom-first-item'"
    :last-item-class="'custom-last-item'"
    :page-class="'custom-page-item'"
    :page-link-class="'custom-page-item-link'"
    :prev-item-class="'custom-prev-item'"
    :next-item-class="'custom-next-item'"
    :break-view-class="'custom-break-item'"
    :active-class="'custom-active-page'"
    :disabled-class="'custom-disabled'"
    :show-first-last-buttons="true"
    :show-prev-next-buttons="true"
    @pageSelected="customFunc"
  >
  </basic-pagination>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()

function customFunc(pageIndex: number): void {
  const query = { ...route.query, ...{ page: pageIndex } }
  router.push({ name: '', query: query })
}
</script>
```

## Props

| Name | Type | Default | Description |
|-|-|-|-|
| `page-count`* <em>(required)</em> | `Number` | | Total pages. |
| `page-range`   | `Number` | `5` | Range of pages which displayed. |
| `margin-pages` | `Number` | `1` | The number of displayed pages for margins. |
| `show-first-last-buttons` | `Boolean` | `true` |  Whether to show or hide buttons to navigate to first and last pages. |
| `show-prev-next-buttons` | `Boolean` | `true` |  Whether to show or hide buttons to navigate to previous and next pages. |
| `container-class` | `string` | `vue3-basic-pagination` | CSS class name for the layout. |
| `page-class` | `string` | `page-item` |  CSS class name for tag `li` of each page element. |
| `page-link-class` | `string` | `page-link` |  CSS class name for tag `span` of each page element. |
| `disabled-class` | `string` | `disabled-item` |  CSS class name for tag `li` of disabled element(s). |
| `first-item-class` | `string` | |  CSS class name for tag `li` of first element. |
| `first-item-link-class` | `string` | |  CSS class name for tag `span` of first element. |
| `last-item-class` | `string` | |  CSS class name for tag `li` of last element. |
| `last-item-link-class` | `string` | |  CSS class name for tag `span` of last element. |
| `prev-item-class` | `string` | |  CSS class name for tag `li` of previous element. |
| `prev-item-link-class` | `string` | |  CSS class name for tag `span` of previous element. |
| `next-item-class` | `string` | |  CSS class name for tag `li` of next element. |
| `next-item-link-class` | `string` | |  CSS class name for tag `span` of next element. |
| `break-view-class` | `string` | |  CSS class name for tag `li` of break element. |
| `break-view-link-class` | `string` | |  CSS class name for tag `span` of break element. |
| `active-class` | `string` | |  CSS class name for tag `li` of active element. |

## Events

| Name | Return Type | Description |
|-|-|-|
| `page-selected` | `Number` | Selected page number. |

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
