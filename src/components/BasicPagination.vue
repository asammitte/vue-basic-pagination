<template>
  <div v-if="pageCount > 1">
    <ul :class="containerClass">
      <li
        v-if="firstLastButton"
        :class="[pageClass, firstPageSelected ? disabledClass : '']"
      >
        <span
          :class="pageLinkClass"
          :tabindex="firstPageSelected ? -1 : 0"
          @click="pageSelected(0)"
        >
          {{ firstButtonText }}
        </span>
      </li>

      <li
        v-if="!(firstPageSelected && hidePrevNext)"
        :class="[prevClass, firstPageSelected ? disabledClass : '']"
      >
        <span v-if="firstPageSelected" :class="prevLinkClass" :tabindex="-1">
          <span class="tablet-hide">{{ getPrevText }}</span>
        </span>
        <span
          v-else
          :class="prevLinkClass"
          :tabindex="firstPageSelected ? -1 : 0"
          @click="pageSelected(prevPage)"
        >
          <span class="tablet-hide">{{ getPrevText }}</span>
        </span>
      </li>

      <template v-for="(page, index) in pages">
        <li
          v-if="page"
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
              {{ breakViewText }}
            </slot>
          </span>
          <span v-else-if="page.disabled" :class="pageLinkClass" tabindex="0">
            {{ page.content }}
          </span>
          <span
            v-else-if="!page.selected"
            :class="pageLinkClass"
            tabindex="0"
            @click="pageSelected(page.index! + 1)"
          >
            {{ page.content }}
          </span>
          <span v-else :class="pageLinkClass" tabindex="0">
            {{ page.content }}
          </span>
        </li>
      </template>

      <li
        v-if="!(lastPageSelected && hidePrevNext)"
        :class="[nextClass, lastPageSelected ? disabledClass : '']"
      >
        <span
          v-if="!lastPageSelected"
          :class="nextLinkClass"
          :tabindex="lastPageSelected ? -1 : 0"
          @click="pageSelected(nextPage)"
        >
          <span class="tablet-hide">{{ getNextText }}</span>
        </span>
        <span v-else :class="nextLinkClass" :tabindex="-1">
          <span class="tablet-hide">{{ getNextText }}</span>
        </span>
      </li>

      <li
        v-if="firstLastButton"
        :class="[pageClass, lastPageSelected ? disabledClass : '']"
      >
        <span
          :class="pageLinkClass"
          :tabindex="lastPageSelected ? -1 : 0"
          @click="pageSelected(selectLastPage)"
        >
          {{ lastButtonText }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface IPaginationProps {
  pageCount: number
  pageRange?: number
  marginPages?: number
  isHr?: boolean
  prevText?: string
  nextText?: string
  breakViewText?: string
  containerClass?: string
  pageClass?: string
  pageLinkClass?: string
  prevClass?: string
  prevLinkClass?: string
  nextClass?: string
  nextLinkClass?: string
  breakViewClass?: string
  breakViewLinkClass?: string
  activeClass?: string
  disabledClass?: string
  firstLastButton?: boolean
  firstButtonText?: string
  lastButtonText?: string
  hidePrevNext?: boolean
}

interface IPageItem {
  index?: number
  content?: number
  selected?: boolean
  disabled?: boolean
  breakView?: boolean
}

const props = withDefaults(defineProps<IPaginationProps>(), {
  pageRange: 5,
  marginPages: 1,
  prevText: '<',
  nextText: '>',
  breakViewText: '…',
  containerClass: 'pagination c-pagination',
  pageClass: 'page-item',
  pageLinkClass: '',
  prevClass: '',
  prevLinkClass: '',
  nextClass: '',
  nextLinkClass: '',
  breakViewClass: '',
  breakViewLinkClass: '',
  activeClass: 'active-page',
  disabledClass: 'disabled',
  firstLastButton: true,
  firstButtonText: 'First',
  lastButtonText: 'Last',
  hidePrevNext: false
})

const emit = defineEmits(['pageSelected'])
const selected = ref(1)

// const selected = computed(() => {
//   // return route.query ? +route.query.page : 1
//   return 1
// })

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

const getPrevText = computed(() => {
  return props.prevText // || this.$t('pagination.prev')
})

const getNextText = computed(() => {
  return props.nextText // || this.$t('pagination.next')
})

function pageSelected(index: number): void {
  selected.value = index
  emit('pageSelected', index)
}
</script>

<style>
.c-pagination {
  text-align: center;
}
.c-pagination li {
  display: inline-block;
  color: #000000;
}

.c-pagination li a,
.c-pagination li span {
  outline: 0;
  cursor: pointer;
  padding-left: 12px;
  padding-right: 12px;
  text-decoration: none;
}

.c-pagination li.disabled a,
.c-pagination li.disabled span {
  cursor: not-allowed;
}

/* .c-pagination li:last-child a:after,
.c-pagination li:last-child span:after {
  content: '\25BA';
  display: inline;
}

.c-pagination li:first-child a:before,
.c-pagination li:first-child span:before {
  content: '\25c4';
  display: inline;
} */

/* @include breakpoint($tablet down) {
  a {
    padding-left: 8px;
    padding-right: 8px;
  }

  &:first-child {
    a {
      padding: 0;
    }
  }

  &:last-child a {
    padding: 0;
  }

  &.disabled {
    padding: 0;

    a {
      padding: 0;
    }
  }
} */

.c-pagination .active-page span {
  color: #ff3860;
  font-weight: bold;
}
</style>
