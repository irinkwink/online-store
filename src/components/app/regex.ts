export const regexName = new RegExp('([a-zA-Z]{3,30}s*)+');
export const regexSurname = new RegExp('[a-zA-Z]{3,30}');
export const regexPhone = new RegExp('^[+][0-9]{3}[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$');
export const regexEmail = new RegExp('^[^s@]+@[^s@]+.[^s@]+$/');
export const regexCardNumber = new RegExp('^[0-9]{16}$');
export const regexCvvCode = new RegExp('^[0-9]{3}$');
export const regexCardDate = new RegExp('^[0-9]{2}/[0-9]{2}$');

export function validate(regex: RegExp, inputElem: HTMLInputElement) {
  if (inputElem.value) {
    return regex.test(inputElem.value);
  }
  return false;
}


// export const nameRegex = new RegExp('[a-zA-Z]{3,30}');
// export const phoneRegex = new RegExp('^[+][0-9]{3}[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$');
// export const mailRegex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$');
// export const cardNumberRegex = new RegExp('^[0-9]{16}$');
// export const cvvCode = new RegExp('^[0-9]{3}$');
// export const cardDate = new RegExp('^[0-9]{2}/[0-9]{2}$');

// export function validate(regex: RegExp, inp: HTMLInputElement) {
//   return regex.test(inp.value);
// }

// export function validateString(regex: RegExp, str: string) {
//   return regex.test(str);
// }

// export function checkLength(str: string, length: number): boolean {
//   return str.length >= length;
// }