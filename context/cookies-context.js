import { createContext, useState } from 'react';

const CookiesContext = createContext({
    cookies: null,
    accpectCookies: () => { },
});

export function CookieContextProvider(props) {
    const [cookieConsent, setCookieConsent] = useState();

    function acceptCookiesHandler() {
        document.cookie = "cookieConsentGiven=true; path=/";
        setCookieConsent(true);
    }

    const context = {
        cookies: cookieConsent,
        accpectCookies: acceptCookiesHandler
    };

    return <CookiesContext.Provider value={context}>
        {props.children}
    </CookiesContext.Provider>
}

export default CookiesContext;