import { addParamsToTheURL } from "./utils";

describe("test utils", () => {
  test("test add query params to the URL", () => {
    const newUrl = addParamsToTheURL({ query: "angular" });
    expect(newUrl).toBe(
      "https://hn.algolia.com/api/v1/search_by_date?query=angular"
    );
  });
  // testear cuando tiene query y page
  // testear si no se envia nada

  test("test get stories without page", () => {});
});
