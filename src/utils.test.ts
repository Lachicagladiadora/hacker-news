import { addParamsToTheURL, getStoriesByPage } from "./utils";
// import { FetchMock } from "jest-fetch-mock";
// import { getStoriesByPage } from "./utils";

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

  // const getStoriesByPage = require("./utils");
  // jest.mock('');
  // jest.mock("./utils");

  // beforeEach(() => {
  //   getStoriesByPage({ query: "angular", page: 1 }).mockClear();
  // });

  test("test get stories without page", async () => {
    // const mockGetStoriesByPage = jest.fn();

    jest.mock("./utils");

    const getStoryByPage = await getStoriesByPage({
      query: "angular",
      page: 1,
    });

    expect(getStoryByPage.hits[0]).toBe({});

    // const mock = jest.fn();
    // console.log({ mock });
    // mock();
    // expect(mock).toHaveBeenCalled();

    // getStoriesByPage({ query: "angular", page: 1 }).mockReturnValueOnce({
    //   _highlightResult: {
    //     author: {
    //       matchLevel: "none",
    //       matchedWords: [],
    //       value: "huytersd",
    //     },
    //     comment_text: {
    //       fullyHighlighted: false,
    //       matchLevel: "full",
    //       matchedWords: ["angular"],
    //       value:
    //         "If you\u2019re somewhat rural the contractors just don\u2019t have the experience to do it so they try to quote you out of the decision. I had to shop around until I found a contractor that had done this before and I was able to get a whole home heat pump for about the same price as a <em>regular</em> furnace/AC system (because of the rebates).",
    //     },
    //     story_title: {
    //       matchLevel: "none",
    //       matchedWords: [],
    //       value:
    //         "Nine US states are teaming up to accelerate the adoption of heat pumps",
    //     },
    //     story_url: {
    //       matchLevel: "none",
    //       matchedWords: [],
    //       value:
    //         "https://www.wired.com/story/these-states-are-basically-begging-you-to-get-a-heat-pump/",
    //     },
    //   },
    //   _tags: ["comment", "author_huytersd", "story_39315545"],
    //   author: "huytersd",
    //   children: [39319150, 39319137, 39319963, 39319257, 39319054],
    //   comment_text:
    //     "If you\u2019re somewhat rural the contractors just don\u2019t have the experience to do it so they try to quote you out of the decision. I had to shop around until I found a contractor that had done this before and I was able to get a whole home heat pump for about the same price as a regular furnace&#x2F;AC system (because of the rebates).",
    //   created_at: "2024-02-09T19:11:18Z",
    //   created_at_i: 1707505878,
    //   objectID: "39319005",
    //   parent_id: 39318968,
    //   story_id: 39315545,
    //   story_title:
    //     "Nine US states are teaming up to accelerate the adoption of heat pumps",
    //   story_url:
    //     "https://www.wired.com/story/these-states-are-basically-begging-you-to-get-a-heat-pump/",
    //   updated_at: "2024-02-09T22:42:25Z",
    // });
    // const dataValue = await fetch(
    //   addParamsToTheURL({ query: "angular", page: 1 })
    // );
    // expect(await dataValue.json()).toBe({
    //   _highlightResult: {
    //     author: {
    //       matchLevel: "none",
    //       matchedWords: [],
    //       value: "huytersd",
    //     },
    //     comment_text: {
    //       fullyHighlighted: false,
    //       matchLevel: "full",
    //       matchedWords: ["angular"],
    //       value:
    //         "If you\u2019re somewhat rural the contractors just don\u2019t have the experience to do it so they try to quote you out of the decision. I had to shop around until I found a contractor that had done this before and I was able to get a whole home heat pump for about the same price as a <em>regular</em> furnace/AC system (because of the rebates).",
    //     },
    //     story_title: {
    //       matchLevel: "none",
    //       matchedWords: [],
    //       value:
    //         "Nine US states are teaming up to accelerate the adoption of heat pumps",
    //     },
    //     story_url: {
    //       matchLevel: "none",
    //       matchedWords: [],
    //       value:
    //         "https://www.wired.com/story/these-states-are-basically-begging-you-to-get-a-heat-pump/",
    //     },
    //   },
    //   _tags: ["comment", "author_huytersd", "story_39315545"],
    //   author: "huytersd",
    //   children: [39319150, 39319137, 39319963, 39319257, 39319054],
    //   comment_text:
    //     "If you\u2019re somewhat rural the contractors just don\u2019t have the experience to do it so they try to quote you out of the decision. I had to shop around until I found a contractor that had done this before and I was able to get a whole home heat pump for about the same price as a regular furnace&#x2F;AC system (because of the rebates).",
    //   created_at: "2024-02-09T19:11:18Z",
    //   created_at_i: 1707505878,
    //   objectID: "39319005",
    //   parent_id: 39318968,
    //   story_id: 39315545,
    //   story_title:
    //     "Nine US states are teaming up to accelerate the adoption of heat pumps",
    //   story_url:
    //     "https://www.wired.com/story/these-states-are-basically-begging-you-to-get-a-heat-pump/",
    //   updated_at: "2024-02-09T22:42:25Z",
    // });
  });
});
