import { isEmptyString } from "@/lib/index";
import { containsWhiteSpaces, newLinesLength, emailRegex } from "./regex";
import {
  MAX_TITLE_LENGTH,
  MAX_TEXT_LENGTH,
  MIN_TITLE_LENGTH,
  MIN_TEXT_LENGTH,
  MAX_NEW_LINES_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/data/index";

const stringClientValidation = (value, t, min, max) =>
  isEmptyString(value)
    ? t("common:fieldRequired")
    : containsWhiteSpaces(value)
    ? t("common:noWhiteSpaces")
    : newLinesLength(value) > MAX_NEW_LINES_LENGTH
    ? t("common:newLinesExceeded")
    : value.length < min
    ? t("common:tooShort")
    : value.length > max
    ? t("common:tooLong")
    : undefined;

export const titleClientValidation = (value, t) =>
  stringClientValidation(value, t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);

export const textClientValidation = (value, t) =>
  stringClientValidation(value, t, MIN_TEXT_LENGTH, MAX_TEXT_LENGTH);

export const loginValidation = (values, t) => {
  const { email, password } = values;
  const errors = {};
  if (!email) {
    errors.email = t("common:fieldRequired");
  } else if (!emailRegex.test(email)) {
    errors.email = t("secret:invalidEmail");
  }
  if (!password) {
    errors.password = t("common:fieldRequired");
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = t("secret:weakPassword");
  }
  return errors;
};
