import { DataType } from "./types";

type AddParamsToTheURLInput = { query: string; page?: number };

export const addParamsToTheURL = ({
  query,
  page,
}: AddParamsToTheURLInput): string => {
  const URL = "https://hn.algolia.com/api/v1/search_by_date";
  if (!page) return `${URL}?query=${query}`;
  return `${URL}?query=${query}&page=${page}`;
};

export const fetchData = async (
  query: string,
  page: number
): Promise<DataType> => {
  const urlWithParams = addParamsToTheURL({ query: query, page: page });
  const data = await fetch(urlWithParams);
  const dataValue = await data.json();
  return dataValue;
};

type GetStoriesByPageInput = {
  query: string;
  page?: number;
};

export const getStoriesByPage = async ({
  query,
  page = 1,
}: GetStoriesByPageInput): Promise<DataType> => {
  const urlWithParams = addParamsToTheURL({ query: query, page: page });
  const data = await fetch(urlWithParams);
  const dataValue = await data.json();
  return dataValue;
};
