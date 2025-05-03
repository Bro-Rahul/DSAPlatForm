import { NextRequest,NextResponse } from "next/server"
import { getToken } from "next-auth/jwt";

 
export async function middleware(request: NextRequest) {
    /* const session = await getToken({req:request,secret : process.env.NEXTAUTH_SECRET!});
    const {pathname} = request.nextUrl;
    if(!session){
        return NextResponse.redirect(new URL('/auth/login',request.url))
    }
    if(session.user.isAdmin && pathname.startsWith("/admin")){
        return NextResponse.next();
    }
    if(!session.user.isAdmin && pathname.startsWith("/general")){
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/',request.url)) */
}
export const config = {matcher : ['/admin/:path*', '/general/:path*'],}