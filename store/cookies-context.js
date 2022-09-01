import { createContext, useState } from 'react';

const CookiesContext = createContext({
    cookieConsent,
    accpectCookies: () => { },
});

export function FavoritesContextProvider(props) {
    const [cookieConsent, setCookieConsent] = useState();

    function acceptCookiesHandler() {
        document.cookie = "cookieConsentGiven=true; path=/";
        setCookieConsent(true);
    }

    const context = {
        cookieConsent,
        accpectCookies: acceptCookiesHandler
    };

    return <CookiesContext.Provider value={context}>
        {props.children}
    </CookiesContext.Provider>
}

export default CookiesContext;