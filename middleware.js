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

    const visitedProducts = request.cookies.get("visitedProducts");
    if (NextRequest.nextUrl.pathname === "/" && visitedProducts) {
      console.log("visitedProducts", visitedProducts);
    }

    return response;
  }
}
