import { type NextRequest, NextResponse } from "next/server";

export const middleware = async function middleware(req: NextRequest) {
  return NextResponse.next({
    headers: {
      ...req.headers,
      "x-forwarded-path": req.nextUrl.pathname,
    },
  });
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
