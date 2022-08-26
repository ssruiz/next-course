import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { jwt } from '../../utils';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // const { token = '' } = req.cookies;

  // try {
  //   await jwt.isValidToken(token);
  //   return NextResponse.next();
  // } catch (error) {
  //   const baseUrl = req.nextUrl.clone();

  //   return NextResponse.redirect(
  //     `${baseUrl.origin}/auth/login?p=${req.page.name}`
  //   );
  // }

  //
  //
  // NextAuth 💚

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const url = req.nextUrl.clone();
    const requestedPage = req.page.name;
    url.pathname = `/auth/login`;
    url.search = `?p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
