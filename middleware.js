import { NextResponse } from "next/server";
import { MiddlewareRequest } from "@netlify/next";

export async function middleware(NextRequest) {
  const request = new MiddlewareRequest(NextRequest);
  console.log(request.cookies);
  const hasCookieConsent = request.cookies.get("cookieConsentGiven");
  //if (hasCookieConsent) {
  //  console.log("has cookie consent");
  const response = await request.next();
  response.setPageProp("changedFromEdge", true);
  //  response.setPageProp("cookieConsentGiven", true);
  //  response.rewriteHTML("#cookie-banner", {
  //    element(e) {
  //      e.remove();
  //    },
  //  });
  //}
}
