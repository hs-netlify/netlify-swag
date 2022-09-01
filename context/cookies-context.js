import { createContext, useState } from "react";
import Cookies from "js-cookie";

const CookiesContext = createContext({
  cookieConsentGiven: null,
  acceptCookies: () => {},
});

export function CookieContextProvider(props) {
  const [cookieConsent, setCookieConsent] = useState(
    Cookies.get("cookieConsentGiven")
  );

  function acceptCookiesHandler() {
    document.cookie = "cookieConsentGiven=true; path=/";
    setCookieConsent(true);
  }

  const context = {
    cookieConsentGiven: cookieConsent,
    acceptCookies: acceptCookiesHandler,
  };

  return (
    <CookiesContext.Provider value={context}>
      {props.children}
    </CookiesContext.Provider>
  );
}

export default CookiesContext;
