export const getFirstWord = (sentence = "") => sentence.split(" ")[0];

export function phoneNumber(phoneNumber: string | undefined): string {
  if (!phoneNumber) return "";

  const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

  if (numericPhoneNumber.length < 10) return numericPhoneNumber;

  const formattedPhoneNumber = `(${numericPhoneNumber.slice(
    0,
    3
  )}) ${numericPhoneNumber.slice(3, 6)}-${numericPhoneNumber.slice(6)}`;

  return formattedPhoneNumber;
}

function removeLeadingSlash(sentence: string) {
  if (sentence.length === 0) return sentence;

  if (sentence.charAt(0) === "/") return sentence.slice(1);

  return sentence;
}

function truncate(str: string): string {
  if (str.length <= 5) return str;

  return str.slice(0, 9) + "…";
}

export default {
  phoneNumber,
  getFirstWord,
  removeLeadingSlash,
  truncate,
};
