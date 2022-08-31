import { MiddlewareRequest } from "@netlify/next";

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
    if (NextRequest.nextUrl.pathname.startsWith("/product")) {
      const visitedProductsJson = request.cookies.get("visitedProducts");
      let visitedProducts = {};
      if (visitedProductsJson) {
        visitedProducts = JSON.parse(visitedProductsJson);
      }
      const productSlug = NextRequest.nextUrl.pathname.split("/")[2];
      if (visitedProducts[productSlug]) {
        visitedProducts[productSlug].vistCount++;
        visitedProducts[productSlug].lastVisited = new Date();
      } else {
        visitedProducts[productSlug] = {
          vistCount: 1,
          lastVisited: new Date(),
        };
      }
      console.log(visitedProducts);
      response.cookies.set("visitedProducts", JSON.stringify(visitedProducts));
    }

    return response;
  }
}
