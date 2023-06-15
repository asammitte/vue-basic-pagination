<template>
  <div v-if="pageCount > 1">
    <ul :class="containerClass">
      <li
        v-if="showFirstLastButtons"
        :class="[firstItemClass, pageClass, firstPageSelected ? disabledClass : '']"
      >
        <span
          :class="[pageLinkClass, firstItemLinkClass]"
          :tabindex="firstPageSelected ? -1 : 0"
          @click="pageSelected(1)"
        >
          <slot name="firstButtonContent">
            &lt;&lt;
          </slot>
        </span>
      </li>

      <li
        v-if="showPrevNextButtons"
        :class="[pageClass, prevItemClass, firstPageSelected ? disabledClass : '']"
      >
        <span
          v-if="firstPageSelected"
          :class="[pageLinkClass, prevItemLinkClass]"
          :tabindex="-1"
        >
          <slot name="prevButtonContent">
            &lt;
          </slot>
        </span>
        <span
          v-else
          :class="[pageLinkClass, prevItemLinkClass]"
          :tabindex="firstPageSelected ? -1 : 0"
          @click="pageSelected(prevPage)"
        >
          <slot name="prevButtonContent" :pageNumber="prevPage">
            &lt;
          </slot>
        </span>
      </li>

      <li
        v-for="(page, index) in pages"
        :key="index"
        :class="[
          pageClass,
          page.selected ? activeClass : '',
          page.disabled ? disabledClass : '',
          page.breakView ? breakViewClass : ''
        ]"
      >
        <span
          v-if="page.breakView"
          :class="[pageLinkClass, breakViewLinkClass]"
          tabindex="0"
        >
          <slot name="breakViewContent">
            …
          </slot>
        </span>
        <span
          v-else-if="!page.selected"
          :class="pageLinkClass"
          tabindex="0"
          @click="pageSelected(page.index! + 1)"
        >
          <slot name="pageContent" :pageNumber="page.content">
            {{ page.content }}
          </slot>
        </span>
        <span v-else :class="pageLinkClass" tabindex="0">
          <slot name="currentPageContent" :pageNumber="page.content">
            {{ page.content }}
          </slot>
        </span>
      </li>

      <li
        v-if="showPrevNextButtons"
        :class="[pageClass, nextItemClass, lastPageSelected ? disabledClass : '']"
      >
        <span
          v-if="!lastPageSelected"
          :class="[pageLinkClass, nextItemLinkClass]"
          :tabindex="lastPageSelected ? -1 : 0"
          @click="pageSelected(nextPage)"
        >
          <slot name="nextButtonContent" :pageNumber="nextPage">
            &gt;
          </slot>
        </span>
        <span
          v-else
          :class="[pageLinkClass, nextItemLinkClass]"
          :tabindex="-1"
        >
          <slot name="nextButtonContent">
            &gt;
          </slot>
        </span>
      </li>

      <li
        v-if="showFirstLastButtons"
        :class="[lastItemClass, pageClass, lastPageSelected ? disabledClass : '']"
      >
        <span
          :class="[pageLinkClass, lastItemLinkClass]"
          :tabindex="lastPageSelected ? -1 : 0"
          @click="pageSelected(selectLastPage)"
        >
          <slot name="lastButtonContent" :pageNumber="selectLastPage">
            &gt;&gt;
          </slot>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface IPaginationProps {
  pageCount: number
  selectedPage?: number
  pageRange?: number
  marginPages?: number
  showFirstLastButtons?: boolean
  showPrevNextButtons?: boolean
  containerClass?: string
  pageClass?: string
  pageLinkClass?: string
  firstItemClass?: string
  firstItemLinkClass?: string
  lastItemClass?: string
  lastItemLinkClass?: string
  prevItemClass?: string
  prevItemLinkClass?: string
  nextItemClass?: string
  nextItemLinkClass?: string
  breakViewClass?: string
  breakViewLinkClass?: string
  activeClass?: string
  disabledClass?: string
}

interface IPageItem {
  index?: number
  content?: number
  selected?: boolean
  disabled?: boolean
  breakView?: boolean
}

const props = withDefaults(defineProps<IPaginationProps>(), {
  selectedPage: 1,
  pageRange: 5,
  marginPages: 1,
  showFirstLastButtons: true,
  showPrevNextButtons: true,
  containerClass: 'vue3-basic-pagination',
  pageClass: 'page-item',
  pageLinkClass: 'page-link',
  firstItemClass: 'first-item',
  firstItemLinkClass: 'first-link',
  lastItemClass: 'last-item',
  lastItemLinkClass: 'last-link',
  prevItemClass: 'prev-item',
  prevItemLinkClass: 'prev-link',
  nextItemClass: 'next-item',
  nextItemLinkClass: 'next-link',
  breakViewClass: 'break-item',
  breakViewLinkClass: 'break-link',
  activeClass: 'active-item',
  disabledClass: 'disabled-item'
})

const emit = defineEmits(['pageSelected'])
const selected = ref(props.selectedPage)

const pages = computed<IPageItem[]>(() => {
  const items: any = {}
  if (props.pageCount <= props.pageRange) {
    for (let index = 0; index < props.pageCount; index++) {
      const page = {
        index: index,
        content: index + 1,
        selected: index === selected.value - 1
      }
      items[index] = page
    }
  } else {
    const halfPageRange = Math.floor(props.pageRange / 2)

    const setPageItem = (index: number) => {
      const page = {
        index: index,
        content: index + 1,
        selected: index === selected.value - 1
      }

      items[index] = page
    }

    const setBreakView = (index: number) => {
      const breakView = {
        disabled: true,
        breakView: true
      }

      items[index] = breakView
    }

    // 1st - loop thru low end of margin pages
    for (let i = 0; i < props.marginPages; i++) {
      setPageItem(i)
    }

    // 2nd - loop thru selected range
    let selectedRangeLow = 0
    if (selected.value - halfPageRange > 0) {
      selectedRangeLow = selected.value - 1 - halfPageRange
    }

    let selectedRangeHigh = selectedRangeLow + props.pageRange - 1
    if (selectedRangeHigh >= props.pageCount) {
      selectedRangeHigh = props.pageCount - 1
      selectedRangeLow = selectedRangeHigh - props.pageRange + 1
    }

    for (
      let i = selectedRangeLow;
      i <= selectedRangeHigh && i <= props.pageCount - 1;
      i++
    ) {
      setPageItem(i)
    }

    // Check if there is breakView in the left of selected range
    if (selectedRangeLow > props.marginPages) {
      setBreakView(selectedRangeLow - 1)
    }

    // Check if there is breakView in the right of selected range
    if (selectedRangeHigh + 1 < props.pageCount - props.marginPages) {
      setBreakView(selectedRangeHigh + 1)
    }

    // 3rd - loop thru high end of margin pages
    for (
      let i = props.pageCount - 1;
      i >= props.pageCount - props.marginPages;
      i--
    ) {
      setPageItem(i)
    }
  }
  console.log(items)
  return items
})

const prevPage = computed(() => {
  if (selected.value <= 1) {
    return 1
  }
  return selected.value - 1
})

const nextPage = computed(() => {
  if (selected.value >= props.pageCount) {
    return props.pageCount
  }
  return selected.value + 1
})

const firstPageSelected = computed(() => {
  return selected.value === 1
})

const lastPageSelected = computed(() => {
  return selected.value === props.pageCount || props.pageCount === 0
})

const selectLastPage = computed(() => {
  return props.pageCount
})

function pageSelected(index: number): void {
  selected.value = index
  emit('pageSelected', index)
}
</script>

<style>
.vue3-basic-pagination {
  text-align: center;
}

.vue3-basic-pagination .page-item {
  display: inline-block;
  color: #000000;
}

.vue3-basic-pagination .active-item {
  font-weight: bolder;
}

/* .c-pagination li a, */
.vue3-basic-pagination .page-item .page-link {
  outline: 0;
  cursor: pointer;
  padding-left: 12px;
  padding-right: 12px;
  text-decoration: none;
}

.vue3-basic-pagination .disabled-item .page-link {
  cursor: not-allowed;
}
</style>
