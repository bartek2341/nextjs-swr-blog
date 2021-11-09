import cookies from "js-cookie";
import { AUTH_COOKIE_EXPIRE_TIME } from "@/data/index";

export const clearAuthCookie = () => {
  cookies.remove("auth");
};

export const setAuthCookie = (token) => {
  cookies.set("auth", token, {
    expires: AUTH_COOKIE_EXPIRE_TIME,
  });
};
