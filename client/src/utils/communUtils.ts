export const addCurrency = (num: number) => {
  let resStr = "";
  const str = String(num).split("").reverse();

  str.forEach((el, i) => {
    if (i !== 0 && i % 3 === 0) {
      resStr = resStr + ".";
    }
    resStr = resStr + el;
  });

  resStr = resStr.split("").reverse().join("");

  return `Rp. ${resStr}`;
};
