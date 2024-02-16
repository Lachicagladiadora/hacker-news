import { StoriesPage } from "./types";
import { addParamsToTheURL, getStoriesByPage } from "./utils";

describe("test utils", () => {
  test("test add query params to the URL", () => {
    const newUrl = addParamsToTheURL({ query: "angular" });
    expect(newUrl).toBe(
      "https://hn.algolia.com/api/v1/search_by_date?query=angular"
    );
  });
  // testear cuando tiene query y page
  test("test add query and page params to the URL", () => {
    const newUrl = addParamsToTheURL({ query: "angular", page: 1 });
    expect(newUrl).toBe(
      "https://hn.algolia.com/api/v1/search_by_date?query=angular&page=1"
    );
  });
  // testear si no se envia nada
  test("test without params to the URL", () => {
    const newUrl = addParamsToTheURL({ query: "" });
    expect(newUrl).toBe("https://hn.algolia.com/api/v1/search_by_date?query=");
  });
});

const QUERY_ANGULAR = "angular";

const MOCK_STORIES = {
  author: "data_maan",
  created_at: "2024-02-16T16:03:07Z",
  created_at_i: 1708099387,
  story_title: "Alexei Navalny has died",
  story_url:
    "https://www.reuters.com/world/europe/jailed-russian-opposition-leader-navalny-dead-prison-service-2024-02-16/",
};

const MOCK_STORIES_PAGE_1: StoriesPage = {
  hits: [MOCK_STORIES],
  page: 1,
  query: QUERY_ANGULAR,
} as StoriesPage;

const MOCK_STORIES_PAGE_2: StoriesPage = {
  hits: [MOCK_STORIES],
  page: 2,
  query: QUERY_ANGULAR,
} as StoriesPage;

const MOCK_STORIES_PAGE_WITHOUT_QUERY: StoriesPage = {
  hits: [MOCK_STORIES],
  page: 1,
  query: "",
} as StoriesPage;

window.fetch = jest
  .fn()
  .mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(MOCK_STORIES_PAGE_1),
    })
  )
  .mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(MOCK_STORIES_PAGE_2),
    })
  )
  .mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(MOCK_STORIES_PAGE_WITHOUT_QUERY),
    })
  );

describe("test stories by page", () => {
  test("test stories without page", async () => {
    const stories = await getStoriesByPage({ query: QUERY_ANGULAR });
    expect(stories.query).toBe(QUERY_ANGULAR);
    expect(stories.page).toBe(1);
    expect(stories.hits).toEqual([MOCK_STORIES]);
  });

  test("test stories with page", async () => {
    const stories = await getStoriesByPage({ query: QUERY_ANGULAR, page: 2 });
    expect(stories.query).toBe(QUERY_ANGULAR);
    expect(stories.page).toBe(2);
    expect(stories.hits).toEqual([MOCK_STORIES]);
  });

  test("test stories without query", async () => {
    const stories = await getStoriesByPage({ query: "", page: 1 });
    expect(stories.query).toBe("");
    expect(stories.page).toBe(1);
    expect(stories.hits).toEqual([MOCK_STORIES]);
  });
});
