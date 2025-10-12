import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PostsTable from "../PostsTable.vue";

const mockPosts = [
  {
    id: 1,
    title: "Test Post 1",
    body: "Test Content 1",
  },
  {
    id: 2,
    title: "Test Post 2",
    body: "Test Content 2",
  },
];

describe("PostsTable.vue", () => {
  it("renders the component with PostsTable", () => {
    const wrapper = mount(PostsTable, {
      props: {
        posts: mockPosts,
      },
    });

    // Check if table exists
    expect(wrapper.find("table").exists()).toBe(true);

    // Check if all posts are rendered
    const rows = wrapper.findAll("tbody tr");
    expect(rows).toHaveLength(2);

    // Check content of first post
    expect(rows[0].text()).toContain("Test Post 1");
    expect(rows[0].text()).toContain("Test Content 1");
  });

  it("renders empty table when no PostsTable provided", () => {
    const wrapper = mount(PostsTable, {
      props: {
        posts: [],
      },
    });

    // Check if table exists but has no data rows
    expect(wrapper.find("table").exists()).toBe(true);
    expect(wrapper.findAll("tbody tr")).toHaveLength(0);
  });
});
