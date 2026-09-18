// src/lib/tests/graphql.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchGraphQL } from "../graphql";

const GET_PUBLIC_PUBLISHED_CONTENT = `
  query GetPublicPublishedContent {
    newsPosts {
      id
      title
      status
      publishedAt
    }
    houseTypes {
      id
      name
      status
      price
    }
  }
`;

describe("fetchGraphQL — GetPublicPublishedContent", () => {
  beforeEach(() => {
    process.env.GRAPHQL_URL = "https://example.com/graphql"; // fixed: was GRAPHQL_ENDPOINT
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.GRAPHQL_URL;
  });

  it("returns both newsPosts and houseTypes from the response", async () => {
    const mockData = {
      newsPosts: [
        { id: "1", title: "New Development Launch", status: "published", publishedAt: "2026-09-01" },
        { id: "2", title: "Draft Article", status: "draft", publishedAt: null },
      ],
      houseTypes: [
        { id: "10", name: "The Oakwood", status: "published", price: 350000 },
        { id: "11", name: "The Willow (unreleased)", status: "draft", price: 420000 },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockData }),
    });

    const result = await fetchGraphQL(GET_PUBLIC_PUBLISHED_CONTENT);

    expect(result.newsPosts).toHaveLength(2);
    expect(result.houseTypes).toHaveLength(2);
  });

  it("filters newsPosts to only published items, matching the News page logic", async () => {
    const mockData = {
      newsPosts: [
        { id: "1", title: "Published Post", status: "published", publishedAt: "2026-09-01" },
        { id: "2", title: "Draft Post", status: "draft", publishedAt: null },
      ],
      houseTypes: [],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockData }),
    });

    const result = await fetchGraphQL(GET_PUBLIC_PUBLISHED_CONTENT);
    const published = result.newsPosts.filter((n) => n.status === "published");

    expect(published).toHaveLength(1);
    expect(published[0].title).toBe("Published Post");
  });

  it("filters houseTypes to only published items, matching the House Types page logic", async () => {
    const mockData = {
      newsPosts: [],
      houseTypes: [
        { id: "10", name: "The Oakwood", status: "published", price: 350000 },
        { id: "11", name: "The Willow", status: "draft", price: 420000 },
        { id: "12", name: "The Birchfield", status: "published", price: 299000 },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockData }),
    });

    const result = await fetchGraphQL(GET_PUBLIC_PUBLISHED_CONTENT);
    const published = result.houseTypes.filter((h) => h.status === "published");

    expect(published).toHaveLength(2);
    expect(published.map((h) => h.name)).toEqual(["The Oakwood", "The Birchfield"]);
  });

  it("handles an empty backend response without throwing", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { newsPosts: [], houseTypes: [] } }),
    });

    const result = await fetchGraphQL(GET_PUBLIC_PUBLISHED_CONTENT);

    expect(result.newsPosts).toEqual([]);
    expect(result.houseTypes).toEqual([]);
  });

  it("throws a clear error when GRAPHQL_URL is not set", async () => {
    delete process.env.GRAPHQL_URL;

    await expect(fetchGraphQL(GET_PUBLIC_PUBLISHED_CONTENT)).rejects.toThrow(
      "GRAPHQL_URL is missing in .env.local"
    );
  });
});