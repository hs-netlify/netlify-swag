import { MiddlewareRequest } from "@netlify/next";
const recommandationsAPI =
  "https://netlifyswag-recommendations.netlify.app/recommendations/";

const discountCodes = {
  US: {
    code: "LABORDAY2022",
    discount: 20,
  },
  UK: {
    code: "CORBLIMEY!",
    discount: 50,
  },
};

export async function middleware(NextRequest) {
  // enrich request with Advanced middleware goodness
  const request = new MiddlewareRequest(NextRequest);
  const response = await request.next();

  if (NextRequest.nextUrl.pathname === "/") {
    const geoDiscount = discountCodes[request.geo.country];
    if (geoDiscount) {
      const message = `Save ${geoDiscount.discount}% with code: ${geoDiscount.code}`;
      response.replaceText("#discountMessage", message);
      response.setPageProp("discountMessage", message);
    }
  }

  const hasCookieConsent = request.cookies.get("cookieConsentGiven");
  if (hasCookieConsent) {
    response.setPageProp("cookieConsentGiven", true);
    response.rewriteHTML("#cookie-banner", {
      element(e) {
        e.remove();
      },
    });

    const lastVisitedProduct = request.cookies.get("lastVisitedProduct");
    if (NextRequest.nextUrl.pathname === "/" && lastVisitedProduct) {
      try {
        const recommendations = await fetch(
          `${recommandationsAPI}${lastVisitedProduct}`
        );
        if (!recommendations.ok) {
          throw new Error(recommendations.body);
        } else {
          const data = await recommendations.json();
          const recommendedProducts = {
            title: "Recommended for you",
            products: data,
          };
          response.setPageProp("recommendedProducts", recommendedProducts);
        }
      } catch (error) {
        console.log(`Error getting recommendations: ${error}`);
      }
    }
  }
  return response;
}
