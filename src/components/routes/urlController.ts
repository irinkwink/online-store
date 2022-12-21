import { SearchParams } from '../../types/types';

export const addSearchParamsToUrl = (params: SearchParams[]) => {
  const url = new URL(window.location.href);
  params.forEach((item) => {
    url.searchParams.set(item.param, item.value);
  });
  window.history.pushState({}, '', url);
};

export const getSearchParamsFromUrl = (params: string[]) => {
  const url = new URL(window.location.href);
  const searchParams = params.map((item) => {
    const value = url.searchParams.get(item);
    return { param: item, value: value };
  });

  console.log('searchParams: ', searchParams);

  return searchParams;
};
