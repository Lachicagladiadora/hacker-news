import { fetchData } from "./utils";

test("fetchData function", async () => {
  const data = await fetchData("angular", 1);
  // const res = await data.json();
  console.log({ data });
  expect(data).toBeTruthy;
});
