import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside

const privateRoutes = ["/dashboard", "/itinerary"];
export async function proxy(req) {
  const token = await getToken({ req });

  const isAuthenticated = Boolean(token);
  const reqPath = req.nextUrl.pathname;
  const isPrivate = privateRoutes.some((route) => reqPath.startsWith(route));

  console.log(
    "isAuthenticated: ",
    isAuthenticated,
    "isPrivate: ",
    isPrivate,
    token,
  );

  if (!isAuthenticated && isPrivate) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/itinerary:path*"],
};
