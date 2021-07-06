import router from "next/router";
import Router from "next/router";
import { useCookies } from "react-cookie";

const locales = {
  en: {
    name: "English",
  },
  es: {
    name: "Español",
  },
};

export default function LocalePicker() {
  const [cookies, setCookie] = useCookies(["nf_lang"]);
  console.log(cookies);

  function changeLocale(newLocale) {
    if (newLocale === process.env.NEXT_PUBLIC_LOCALE || !locales[newLocale])
      return;
    setCookie("nf_lang", newLocale, {
      path: "/",
      domain: ".moneytronicswag.com",
    });
    window.location.href = window.location.origin + router.pathname;
  }

  return (
    <select
      value={process.env.NEXT_PUBLIC_LOCALE}
      onChange={(e) => changeLocale(e.currentTarget.value)}
    >
      {Object.entries(locales).map(([code, { name }]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
