import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  url.pathname = `/product/classic-netlify-sweatshirt`;
  const res = NextResponse.rewrite(url);
  return res;
}
