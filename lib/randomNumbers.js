import { SLUG_NUMBERS_LENGTH } from "@/data/index";

const randomNumbers = () => {
  let results = "";
  for (let i = 0; i < SLUG_NUMBERS_LENGTH; i++) {
    results += Math.floor(Math.random() * 10);
  }
  return results;
};
export default randomNumbers;
