import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserListTable from '../UserListTable.vue'
import type { User } from '../../types/models'

const mockUsers: User[] = [
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

describe('UserListTable.vue', () => {
  it('renders the table with headers', () => {
    const wrapper = mount(UserListTable, {
      props: {
        filteredUsers: [],
        getUserPosts: vi.fn()
      }
    })

    const headers = wrapper.findAll('th')
    expect(headers).toHaveLength(4)
    expect(headers[0].text()).toBe('Name')
    expect(headers[1].text()).toBe('Email')
    expect(headers[2].text()).toBe('City')
    expect(headers[3].text()).toBe('Company')
  })

  it('renders user data correctly', () => {
    const wrapper = mount(UserListTable, {
      props: {
        filteredUsers: mockUsers,
        getUserPosts: vi.fn()
      }
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(2)

    // Check first user data
    const firstRow = rows[0]
    const firstRowCells = firstRow.findAll('td')
    expect(firstRowCells[0].text()).toBe('John Doe')
    expect(firstRowCells[1].text()).toBe('john@example.com')
    expect(firstRowCells[2].text()).toBe('New York')
    expect(firstRowCells[3].text()).toBe('Tech Corp')

    // Check second user data
    const secondRow = rows[1]
    const secondRowCells = secondRow.findAll('td')
    expect(secondRowCells[0].text()).toBe('Jane Smith')
    expect(secondRowCells[1].text()).toBe('jane@example.com')
    expect(secondRowCells[2].text()).toBe('Los Angeles')
    expect(secondRowCells[3].text()).toBe('Design Inc')
  })

  it('calls getUserPosts when clicking on a user row', async () => {
    const getUserPosts = vi.fn()
    const wrapper = mount(UserListTable, {
      props: {
        filteredUsers: mockUsers,
        getUserPosts
      }
    })

    // Click on the first user row
    await wrapper.findAll('tbody tr')[0].trigger('click')

    // Check if the function was called with the correct user
    expect(getUserPosts).toHaveBeenCalledTimes(1)
    expect(getUserPosts).toHaveBeenCalledWith(mockUsers[0])
  })

  it('renders empty table when no users provided', () => {
    const wrapper = mount(UserListTable, {
      props: {
        filteredUsers: [],
        getUserPosts: vi.fn()
      }
    })

    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.findAll('tbody tr')).toHaveLength(0)
  })

  it('updates table when filteredUsers prop changes', async () => {
    const wrapper = mount(UserListTable, {
      props: {
        filteredUsers: [],
        getUserPosts: vi.fn()
      }
    })

    // Initially no rows
    expect(wrapper.findAll('tbody tr')).toHaveLength(0)

    // Update props with users
    await wrapper.setProps({ filteredUsers: mockUsers })

    // Should now show two rows
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(2)
    expect(rows[0].findAll('td')[0].text()).toBe('John Doe')
  })
})