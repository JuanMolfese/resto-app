import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest){

	const session = await getToken ({ req, secret: process.env.NEXTAUTH_SECRET });

	if (!session) {
	  const requestedPage = req.nextUrl.pathname;
	  const url = req.nextUrl.clone();
	  url.pathname = `/login`;
	  url.search = `p=${requestedPage}`;

	  return NextResponse.redirect (url);
	}

//	if (request.nextUrl.pathname.startsWith('/dashboard')) {
//	    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
//	}

	return NextResponse.next();
}
/*
export const config={
  matcher: ['/dashboard/:path*','/((?!api|_next/static|_next/image|favicon.ico).*)']
}
*/	
