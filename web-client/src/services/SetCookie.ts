import Cookies from "universal-cookie";

export const setCookie = (name: string, value: any, c: Cookies) => {
  c.set(name, JSON.stringify(value), { domain: window.location.hostname, maxAge: 99999 });
};
