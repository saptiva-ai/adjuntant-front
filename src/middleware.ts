import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  return NextResponse.next({
    headers: {
      ...req.headers,
      "x-forwarded-path": req.nextUrl.pathname,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
