import { createContext, useState } from "react";
import Cookies from "js-cookie";

const CookiesContext = createContext({
  cookieConsentGiven: null,
  acceptCookies: () => {},
});

export function CookieContextProvider({ cookieConsentFromEdge, children }) {
  const [cookieConsent, setCookieConsent] = useState(cookieConsentFromEdge);

  function acceptCookiesHandler() {
    Cookies.set("cookieConsentGiven", true);
    setCookieConsent(true);
  }

  const context = {
    cookieConsentGiven: cookieConsent,
    acceptCookies: acceptCookiesHandler,
  };

  return (
    <CookiesContext.Provider value={context}>
      {children}
    </CookiesContext.Provider>
  );
}

export default CookiesContext;
