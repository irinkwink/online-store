import { SearchParam } from '../../types/types';

export const addSearchParamToUrl = ({ key, value }: SearchParam): void => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
};

export const deleteSearchParamFromUrl = (key: string): void => {
  const url = new URL(window.location.href);

  if (url.searchParams.has(key)) {
    url.searchParams.delete(key);
    window.history.pushState({}, '', url);
  }
};

export const deleteSearchParamsFromUrl = (keys: string[]): void => {
  const url = new URL(window.location.href);
  const isPush =
    keys
      .map((key) => {
        if (url.searchParams.has(key)) {
          url.searchParams.delete(key);
          return true;
        }
        return false;
      })
      .filter((item) => item).length !== 0;

  if (isPush) {
    window.history.pushState({}, '', url);
  }
};

export const getSearchParamsFromUrl = (): SearchParam[] => {
  const url = new URL(window.location.href);

  const searchParams = Array.from(url.searchParams.entries()).map((item) => ({ key: item[0], value: item[1] }));

  return searchParams;
};

export const getSearchParamValueFromUrl = (param: string): string | null => {
  const url = new URL(window.location.href);

  const searchParam = Array.from(url.searchParams.entries()).find((item) => item[0] === param);

  return searchParam ? searchParam[1] : null;
};

export const copyToClipboard = (): void => {
  const inputCopy = document.body.appendChild(document.createElement('input'));
  inputCopy.value = window.location.href;
  inputCopy.select();
  navigator.clipboard.writeText(inputCopy.value);
  inputCopy.parentNode?.removeChild(inputCopy);
};
