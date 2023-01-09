export const nameRegex = new RegExp('[a-zA-Z]{3,30}');
export const phoneRegex = new RegExp('^[+][0-9]{3}[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$');
export const mailRegex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$');
export const cardNumberRegex = new RegExp('^[0-9]{16}$');
export const cvvCode = new RegExp('^[0-9]{3}$');
export const cardDate = new RegExp('^[0-9]{2}/[0-9]{2}$');

export function validate(regex: RegExp, inp: HTMLInputElement) {
  return regex.test(inp.value);
}

export function validateString(regex: RegExp, str: string) {
  return regex.test(str);
}

export function checkLength(str: string, length: number): boolean {
  return str.length >= length;
}

export function notValid(inp: HTMLInputElement, el: HTMLElement, message: string) {
  inp.classList.add('is-invalid');
  inp.classList.remove('is-valid');
  el.textContent = message;
}

export function isValid(inp: HTMLInputElement, el: HTMLElement) {
  inp.classList.remove('is-invalid');
  inp.classList.add('is-valid');
  el.textContent = '';
}
