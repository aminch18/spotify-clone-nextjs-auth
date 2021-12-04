import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  console.log(req);
  const { pathname } = req.nextUrl;

  //Allow the requests if the follolowing is true..
  //1. Token exists

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //2. Token does not exist then redirect to login page
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
