import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import HomePage from "../HomePage.vue";
import PostsTable from "../PostsTable.vue";

// Mock fetch API
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    address: { city: "New York" },
    company: { name: "Tech Corp" },
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    address: { city: "Los Angeles" },
    company: { name: "Design Inc" },
  },
];

const mockPosts = [
  {
    id: 1,
    title: "Test Post 1",
    body: "Test Content 1",
  },
];

describe("HomePage.vue", () => {
  beforeEach(() => {
    // Mock the global fetch
    vi.stubGlobal("fetch", vi.fn());
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  it("renders the component", async () => {
    // Mock the fetch response for users since it's called on mount
    vi.mocked(fetch).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUsers),
    } as Response);

    const wrapper = mount(HomePage);
    await wrapper.vm.$nextTick();

    // Search input should always be present
    expect(wrapper.find('input[placeholder="Search name..."]').exists()).toBe(
      true
    );
  });

  it("fetches and displays users", async () => {
    // Mock the fetch response for users
    vi.mocked(fetch).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUsers),
    } as Response);

    const wrapper = mount(HomePage);

    // Wait for the component to update and async operations to complete
    await wrapper.vm.$nextTick();
    await vi.waitFor(() => {
      expect(wrapper.findAll("tbody tr").length).toBeGreaterThan(0);
    });

    // Check if users are displayed
    const rows = wrapper.findAll("tbody tr");
    expect(rows).toHaveLength(2);
    expect(rows[0].text()).toContain("John Doe");
    expect(rows[0].text()).toContain("john@example.com");
  });

  it("filters users based on search query", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUsers),
    } as Response);

    const wrapper = mount(HomePage);

    // Wait for initial data to load
    await wrapper.vm.$nextTick();
    await vi.waitFor(() => {
      expect(wrapper.findAll("tbody tr").length).toBeGreaterThan(0);
    });

    // Set search query
    const input = wrapper.find("input");
    await input.setValue("John");
    await wrapper.vm.$nextTick();

    // Check filtered results
    const rows = wrapper.findAll("tbody tr");
    expect(rows).toHaveLength(1);
    expect(rows[0].text()).toContain("John Doe");
  });

  it("loads user posts when clicking on a user", async () => {
    // Mock both fetch calls (users and posts)
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers),
      } as Response)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPosts),
      } as Response);

    const wrapper = mount(HomePage);

    // Wait for initial users to load
    await wrapper.vm.$nextTick();
    await vi.waitFor(() => {
      expect(wrapper.findAll("tbody tr").length).toBe(2);
    });

    // Click on the first user
    const firstUser = wrapper.findAll("tbody tr")[0];
    await firstUser.trigger("click");
    await wrapper.vm.$nextTick();

    // Check if posts component is rendered
    expect(wrapper.findComponent(PostsTable).exists()).toBe(true);
    expect(wrapper.find("#user-name").text()).toContain("John Doe");
  });

  it("handles fetch errors gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

    const wrapper = mount(HomePage);
    await wrapper.vm.$nextTick();

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
