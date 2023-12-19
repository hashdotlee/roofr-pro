export const getAbbreviation = (str?: string | null): string => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .filter((_, index) => index == 0 || index == str.split(" ").length - 1)
    .join("");
};

export const getShortName = (str?: string | null): string => {
  if (!str) return "";
  if (str.length <= 18) return str;
  return str
    .split(" ")
    .filter((_, index) => index == 0 || index == str.split(" ").length - 1)
    .join(" ");
};

export const getCurrencyNumber = (num: number) => {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
