import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchFilter from '../SearchFilter.vue'

describe('SearchFilter.vue', () => {
  it('renders input with placeholder', () => {
    const wrapper = mount(SearchFilter, {
      props: {
        searchQuery: ''
      }
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Search name...')
  })

  it('displays the searchQuery prop value', () => {
    const searchQuery = 'test query'
    const wrapper = mount(SearchFilter, {
      props: {
        searchQuery
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe(searchQuery)
  })

  it('emits update:searchQuery event when input changes', async () => {
    const wrapper = mount(SearchFilter, {
      props: {
        searchQuery: ''
      }
    })

    const input = wrapper.find('input')
    const newValue = 'new search'

    await input.setValue(newValue)

    // Check that the event was emitted
    expect(wrapper.emitted()).toHaveProperty('update:searchQuery')

    // Check that the emitted value is correct
    const emittedEvents = wrapper.emitted('update:searchQuery')
    expect(emittedEvents).toHaveLength(1)
    expect(emittedEvents![0]).toEqual([newValue])
  })

  it('handles empty input value', async () => {
    const wrapper = mount(SearchFilter, {
      props: {
        searchQuery: 'initial value'
      }
    })

    const input = wrapper.find('input')
    await input.setValue('')

    // Check that empty string is emitted
    const emittedEvents = wrapper.emitted('update:searchQuery')
    expect(emittedEvents).toHaveLength(1)
    expect(emittedEvents![0]).toEqual([''])
  })

  it('updates input when prop changes', async () => {
    const wrapper = mount(SearchFilter, {
      props: {
        searchQuery: 'initial'
      }
    })

    // Update the prop
    await wrapper.setProps({ searchQuery: 'updated value' })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('updated value')
  })
})