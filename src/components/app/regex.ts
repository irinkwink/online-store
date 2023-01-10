export const regexName = new RegExp('[a-zA-Z]{3,30}');
export const regexPhone = new RegExp('^[+][0-9]{3}[-s.]?[0-9]{3}[-s.]?[0-9]{3,6}$');
export const regexEmail = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$');
export const regexCardNumber = new RegExp('^[0-9]{16}$');
export const regexCvvCode = new RegExp('^[0-9]{3}$');
export const regexCardDate = new RegExp('^[0-9]{2}/[0-9]{2}$');
export const regexProductPage = new RegExp('^/product/[0-9]{1,}');

export function validate(regex: RegExp, inputElem: HTMLInputElement): boolean {
  if (inputElem.value) {
    return regex.test(inputElem.value);
  }
  return false;
}

export function validateString(regex: RegExp, str: string): boolean {
  return regex.test(str);
}

export function validateLength(str: string, length: number): boolean {
  return str.length >= length;
}

export function checkPage(regex: RegExp, path: string): boolean {
  return regex.test(path);
}
