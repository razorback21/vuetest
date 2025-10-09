import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UserListTable from '../UserListTable.vue'

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    address: { city: 'New York' },
    company: { name: 'Tech Corp' }
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    address: { city: 'Los Angeles' },
    company: { name: 'Design Inc' }
  }
]

// Mock fetch globally
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
  vi.resetAllMocks()
})

describe('UserListTable.vue', () => {
  it('renders user data correctly', async () => {
    // Mock the fetch response
    vi.mocked(fetch).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUsers)
    } as Response)

    const wrapper = mount(UserListTable, {
      props: {
        searchQuery: '',
        getUserPosts: () => {}
      }
    })

    // Wait for mounted hook and async operations
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(2)

    // Verify the content of the first row
    const firstRowCells = rows[0].findAll('td')
    expect(firstRowCells[0].text()).toBe('John Doe')
    expect(firstRowCells[1].text()).toBe('john@example.com')
    expect(firstRowCells[2].text()).toBe('New York')
    expect(firstRowCells[3].text()).toBe('Tech Corp')
  })

  it('renders empty table when no users provided', async () => {
    // Mock empty users response
    vi.mocked(fetch).mockResolvedValueOnce({
      json: () => Promise.resolve([])
    } as Response)

    const wrapper = mount(UserListTable, {
      props: {
        searchQuery: '',
        getUserPosts: () => {}
      }
    })

    await wrapper.vm.$nextTick()
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(0)
  })

  it('calls getUserPosts when clicking on a user row', async () => {
    const getUserPosts = vi.fn()

    // Mock the fetch response
    vi.mocked(fetch).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUsers)
    } as Response)

    const wrapper = mount(UserListTable, {
      props: {
        searchQuery: '',
        getUserPosts
      }
    })

    // Wait for mounted hook and async operations
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    // Find and click the first row
    const firstRow = wrapper.find('tbody tr')
    await firstRow.trigger('click')

    expect(getUserPosts).toHaveBeenCalledWith(mockUsers[0])
  })

  it('updates table when filteredUsers prop changes', async () => {
    // Mock the fetch response
    vi.mocked(fetch).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUsers)
    } as Response)

    const wrapper = mount(UserListTable, {
      props: {
        searchQuery: '',
        getUserPosts: () => {}
      }
    })

    // Wait for mounted hook and async operations
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    // Initially should show all users
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)

    // Update search query to filter users
    await wrapper.setProps({ searchQuery: 'John' })
    await wrapper.vm.$nextTick()

    // Should now only show one user
    const filteredRows = wrapper.findAll('tbody tr')
    expect(filteredRows).toHaveLength(1)
    expect(filteredRows[0].findAll('td')[0].text()).toBe('John Doe')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })
})