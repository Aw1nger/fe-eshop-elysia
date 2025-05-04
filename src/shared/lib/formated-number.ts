import numeral from "numeral";

numeral.register("locale", "ru", {
  delimiters: {
    thousands: " ",
    decimal: ",",
  },
  abbreviations: {
    thousand: "тыс.",
    million: "млн",
    billion: "млрд",
    trillion: "трлн",
  },
  ordinal: () => "",
  currency: {
    symbol: "₽",
  },
});
numeral.locale("ru");

export const formatedNumber = (views: number) =>
  numeral(views).format("0.[0]a").replace(".0", "");
