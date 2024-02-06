import { DataType } from "./types";

type pathProps = { param: string; page?: number };

const getPath = ({ param, page }: pathProps): string => {
  const URL = "https://hn.algolia.com/api/v1/search_by_date";
  if (!page) return `${URL}?query=${param}`;
  return `${URL}?query=${param}&page=${page}`;
};

export const fetchData = async (
  param: string,
  page: number
): Promise<DataType> => {
  const urlWithParams = getPath({ param: param, page: page });
  const data = await fetch(urlWithParams);
  const dataValue = await data.json();
  return dataValue;
};

export const fetchDataForPage = async (
  param: string,
  page: number
): Promise<DataType> => {
  const urlWithParams = getPath({ param: param, page: page });
  const data = await fetch(urlWithParams);
  const dataValue = await data.json();
  return dataValue;
};
