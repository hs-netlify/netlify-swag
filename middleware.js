import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("middleware");
  if (request.nextUrl.pathname.startsWith("/:path*")) {
    console.log("middleware");
  }
}
