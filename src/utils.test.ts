import { addParamsToTheURL } from "./utils";

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

  // test("test get stories without page", () => {});
});
