import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasicPagination from '../BasicPagination.vue'

describe('BasicPagination', () => {
  it('If pageCount <= 1 do not render pagination component', async () => {
    const wrapper = mount(BasicPagination, {
      props: {
        pageCount: 0
      }
    })
    expect(wrapper.find('.vue3-basic-pagination').exists()).toBe(false)
  })

  it('If pageCount <= 1 do not render pagination component', async () => {
    const wrapper = mount(BasicPagination, {
      props: {
        pageCount: 1
      }
    })
    expect(wrapper.find('.vue3-basic-pagination').exists()).toBe(false)
  })

  it('If pageCount > 1 do render pagination component', async () => {
    const wrapper = mount(BasicPagination, {
      props: {
        pageCount: 2
      }
    })
    expect(wrapper.find('.vue3-basic-pagination').exists()).toBe(true)
  })
})
