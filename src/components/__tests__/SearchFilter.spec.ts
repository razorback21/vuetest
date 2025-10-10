import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchFilter from '../SearchFilter.vue'

describe('SearchFilter.vue', () => {
  it('renders input with placeholder', () => {
    const wrapper = mount(SearchFilter)
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect((input.element as HTMLInputElement).placeholder).toBe('Search name...')
  })

  it('updates exposed searchQuery when input changes', async () => {
    const wrapper = mount(SearchFilter)
    const input = wrapper.find('input')

    await input.setValue('Alice')

    // Access exposed searchQuery
    const exposed = (wrapper.vm as any).$exposed
    // Some Vue Test Utils setups expose via vm.$.exposed
    const searchQuery = exposed?.searchQuery || (wrapper.vm as any).searchQuery

    // Handle both possible locations depending on test-utils version
    expect(searchQuery?.value ?? searchQuery).toBeDefined()
    // If it's a ref, check .value, otherwise direct
    if (searchQuery && typeof searchQuery === 'object' && 'value' in searchQuery) {
      expect(searchQuery.value).toBe('Alice')
    } else {
      expect(searchQuery).toBe('Alice')
    }
  })
})