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

    const visitedProductsJSON = request.cookies.get("visitedProducts");
    if (NextRequest.nextUrl.pathname === "/" && visitedProductsJSON) {
      const visitedProducts = JSON.parse(visitedProductsJSON);
      const keepShoppingProducts = Object.values(visitedProducts)
        .sort((a, b) => {
          return new Date(b.lastVisited) - new Date(a.lastVisited);
        })
        .slice(0, 2)
        .map((p) => p.product);
      response.setPageProp("keepShopping", {
        title: "Keep Shopping",
        products: keepShoppingProducts,
      });
    }

    return response;
  }
}
