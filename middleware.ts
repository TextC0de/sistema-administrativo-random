import { NextResponse, NextRequest } from 'next/server'
import {jwtVerify} from 'jose'
import * as apiEndpoints from './lib/apiEndpoints'
/**
 * Function that executes first whenever a request comes to the server.
 * Here you can validate JWT or other data when coming trough any specific route.
 * With this you're able to protect routes, requiring the request to contain a jwt in a cookie or a jwt alone(for mobile apps)
 * provided to the client when the user logged in.
 * In this way the controller doesn't worry about validating the user.
 * 
 */

export async function middleware(req:NextRequest){
    const secret = process.env.SECRET
    const {pathname} = req.nextUrl
    //console.log(pathname)
    const jwt = req.cookies.get('access_token') //(1)
    //console.log(jwt);

    
    
    if(pathname.includes('/api') || pathname.includes('/login')){
        return NextResponse.next()  
    }
    if(!jwt){
        console.log('nohay jwt')
        console.log(req.url);
        const url = new URL('/login', /* apiEndpoints.baseUrl */req.nextUrl.origin)

        
        return NextResponse.redirect( url )
    }
    try {
        const verifiedToken = await jwtVerify(jwt, new TextEncoder().encode(secret))
        //console.log(verifiedToken.payload)
        return NextResponse.next()    
    } catch (error) {
        console.error(error)
        console.log('error');
        
        return NextResponse.redirect( new URL('/login', /* apiEndpoints.baseUrl */req.nextUrl.origin))
    }

}
export const config = {
    matcher: "/",
};

/* export const config = {
    matcher: [
        '/((?!_next/static|favicon.ico|login|api|).*)',
    ]
} */