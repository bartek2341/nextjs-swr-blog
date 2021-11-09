import { isEmptyString } from "@/lib/index";
import { containsWhiteSpaces, newLinesLength } from "./regex";
import {
  MAX_TITLE_LENGTH,
  MAX_TEXT_LENGTH,
  MIN_TITLE_LENGTH,
  MIN_TEXT_LENGTH,
  MAX_NEW_LINES_LENGTH,
} from "@/data/index";

const stringServerValidation = (value, min, max) =>
  !isEmptyString(value) &&
  !containsWhiteSpaces(value) &&
  newLinesLength(value) <= MAX_NEW_LINES_LENGTH &&
  value.length >= min &&
  value.length <= max;

export const titleServerValidation = (value) =>
  stringServerValidation(value, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);

export const textServerValidation = (value) =>
  stringServerValidation(value, MIN_TEXT_LENGTH, MAX_TEXT_LENGTH);
