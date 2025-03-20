export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Jakarta",
  });
  return formatter.format(date);
};

export const formatDateSM = (dateStr: string) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  });
  return formatter.format(date);
};

export const encryptPass = (text: string): string => {
  // Validasi input
  if (typeof text !== "string") {
    throw new Error("Input must be a string");
  }

  // Ambil salt dari environment variable
  const salt = process.env.NEXT_PUBLIC_SALT_ENCRYPT_PASSWORD;
  if (!salt) {
    throw new Error("Encryption salt is not configured");
  }

  // Konversi ke array ASCII
  const textToChars = (text: string): number[] =>
    text.split("").map((c) => c.charCodeAt(0));

  // Fungsi XOR dengan salt
  const applySaltToChar = (code: number): number => {
    const saltCodes = textToChars(salt);
    return saltCodes.reduce((a, b) => a ^ b, code);
  };

  // Konversi ke HEX
  const byteHex = (n: number): string => ("0" + n.toString(16)).substr(-2);

  return text
    .split("")
    .map((char) => applySaltToChar(char.charCodeAt(0)))
    .map(byteHex)
    .join("");
};

export const decryptPass = (encoded: string): string => {
  try {
    // Validasi input
    if (!encoded || typeof encoded !== "string") return "";

    // Ambil salt dari environment variable
    const salt = process.env.NEXT_PUBLIC_SALT_ENCRYPT_PASSWORD;
    if (!salt) {
      throw new Error("Encryption salt is not configured");
    }

    // Konversi karakter ke ASCII
    const textToChars = (text: string): number[] =>
      text.split("").map((c) => c.charCodeAt(0));

    // Fungsi XOR dengan salt
    const applySaltToChar = (code: number): number => {
      const saltChars = textToChars(salt);
      return saltChars.reduce((a, b) => a ^ b, code);
    };

    // Validasi format hex
    const hexRegex = /^[0-9a-fA-F]{2}$/;
    const hexPairs = encoded.match(/.{1,2}/g) || [];

    return hexPairs
      .map((hex) => {
        if (!hexRegex.test(hex)) {
          throw new Error(`Invalid hex format: ${hex}`);
        }
        return parseInt(hex, 16);
      })
      .map(applySaltToChar)
      .map((charCode) => {
        if (charCode < 0 || charCode > 255) {
          throw new Error(`Invalid character code: ${charCode}`);
        }
        return String.fromCharCode(charCode);
      })
      .join("");
  } catch (error) {
    console.error("Decryption error:", error);
    return "DECRYPTION_ERROR";
  }
};
