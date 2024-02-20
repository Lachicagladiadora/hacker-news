import { StoriesPage } from "./types";

type AddParamsToTheURLInput = { query: string; page?: number };

export const addParamsToTheURL = ({
  query,
  page,
}: AddParamsToTheURLInput): string => {
  const URL = "https://hn.algolia.com/api/v1/search_by_date";
  if (!page) return `${URL}?query=${query}`;
  return `${URL}?query=${query}&page=${page}`;
};

type GetStoriesByPageInput = {
  query: string;
  page?: number;
};

export const getStoriesByPage = async ({
  query,
  page = 1,
}: GetStoriesByPageInput): Promise<StoriesPage> => {
  const urlWithParams = addParamsToTheURL({ query: query, page: page });
  const data = await fetch(urlWithParams);
  const dataValue = await data.json();
  return dataValue;
};
