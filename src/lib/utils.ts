export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Jakarta",
  });
  return formatter.format(date);
};

export const encryptPass = (text: string): string => {
  const salt = "eNcSlT24rXz";
  const textToChars = (text: string): number[] =>
    text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n: number): string => ("0" + n.toString(16)).substr(-2);

  const applySaltToChar = (code: number): number => {
    return textToChars(salt).reduce((a, b) => a ^ b, code);
  };

  return text
    .split("")
    .map((char) => applySaltToChar(char.charCodeAt(0)))
    .map(byteHex)
    .join("");
};

export const decryptPass = (encoded: string): string => {
  const salt = "eNcSlT24rXz";
  const textToChars = (text: string): number[] =>
    text.split("").map((c) => c.charCodeAt(0));

  const applySaltToChar = (code: number): number => {
    return textToChars(salt).reduce((a, b) => a ^ b, code);
  };

  if (!encoded) return "";
  const matches = encoded.match(/.{1,2}/g);
  if (!matches) return "";
  return matches
    .map((hex: string): number => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode: number): string => String.fromCharCode(charCode))
    .join("");
};

