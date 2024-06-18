import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const middleware = async (req: NextRequest) => {
  const session = await getToken({ req, secret: process.env.SECRET });

  if (!session) {
    const requestPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/login`;
    url.search = `p=${requestPage}`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export { middleware }

export const config = {
  matcher: '/toolhub'
}
