import { MiddlewareRequest } from "@netlify/next";
const recommandationsAPI =
  "https://netlifyswag-recommendations.netlify.app/recommendations/";
export async function middleware(NextRequest) {
  const request = new MiddlewareRequest(NextRequest);

  const hasCookieConsent = request.cookies.get("cookieConsentGiven");
  if (hasCookieConsent) {
    const response = await request.next();
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

    return response;
  }
}
