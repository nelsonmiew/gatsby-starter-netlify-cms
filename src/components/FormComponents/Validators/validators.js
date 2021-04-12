//IF NECESSARY USE ====> https://github.com/gtournie/redux-form-validators

export const isRequired = (value) => (value ? undefined : "Campo obrigatório");

export const isEmail = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,40}$/i.test(value) ? "Endereço de e-mail inválido" : undefined;

export const isAlphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? "Only alphanumeric characters" : undefined;

export const isNumber = (value) => (value && isNaN(Number(value)) ? "Tem que ser um número" : undefined);

export const minLength = (min) => (value) =>
  value && value.length < min ? `Deve ter mais de ${min} caracteres` : undefined;

export const maxLength = (max) => (value) =>
  value && value.length > max ? `Deve ter menos de ${max} caracteres` : undefined;

export const isPhoneNumber = (value) =>
  value && !/^(9[1236]\d) ?(\d{3}) ?(\d{3})$/gm.test(value) ? "Número de telemóvel inválido" : undefined;

export const isPlateNumber = (value) =>
  value && !/^((?:[A-Z]{2}-\d{2}-\d{2})|(?:\d{2}-[A-Z]{2}-\d{2})|(?:\d{2}-\d{2}-[A-Z]{2}))$/.test(value.toUpperCase())
    ? "Matrícula inválida"
    : undefined;

export const isTokenCode = (value) =>
  value && !/^((?:(\d\s){5}\d))$/.test(value.toUpperCase()) ? "Código inválido" : undefined;

export const isNIF = (value) => (value && !taxNumber(value) ? "NIF inválido" : undefined);

const taxNumber = (str) => {
  let nif = str.toUpperCase();
  if (!/(PT)?([123568]\d{1}|45|7[0124579]|9[0189])(\d{7})/.test(nif)) {
    return false;
  }

  nif = nif.replace(/PT/, ""); //remove the PT part
  const checkDigit = () => {
    let c = 0;
    for (let i = 0; i < nif.length - 1; ++i) {
      c += Number(nif[i]) * (10 - i - 1);
    }
    c = 11 - (c % 11);
    return c >= 10 ? 0 : c;
  };

  return checkDigit() === Number(str.charAt(str.length - 1));
};
