import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/:path*")) {
    console.log("middleware");
  }
}
