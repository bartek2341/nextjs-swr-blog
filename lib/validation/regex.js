export const whiteSpacesRegex = /  +/; //only single space
export const breakLineRegex = /\n/g;
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const newLinesLength = (text) =>
  (text.match(breakLineRegex) || []).length;

export const containsWhiteSpaces = (text) => whiteSpacesRegex.test(text);
