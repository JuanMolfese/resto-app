export { default } from "next-auth/middleware"



export const config={
/*   matcher: ['/dashboard/:path*','/((?!api|_next/static|_next/image|favicon.ico).*)'] */
  matcher: ["/dashboard/:path*", "/productos/:path*", "/profile"]
}

