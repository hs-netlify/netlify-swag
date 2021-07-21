import router from "next/router";
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
  const [_, setCookie] = useCookies(["nf_lang"]);
  function changeLocale(newLocale) {
    if (newLocale === process.env.NEXT_PUBLIC_LOCALE || !locales[newLocale])
      return;
    setCookie("nf_lang", newLocale, {
      path: "/",
      domain: ".moneytronicswag.com",
    });
    window.location.href =
      "https://www.moneytronicswag.com" + window.location.pathname;
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
