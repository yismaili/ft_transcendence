import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {

  const mycookie = request.cookies.get('userData');
  
//   const cookieStore = cookies()
//   const mycookie = cookieStore.get('userData')
    console.log('from midlleware: ', mycookie);
    // console.log('request', request.nextUrl.pathname);
    // console.log(request.cookies.get);

    const response = NextResponse.next()
    // response.cookies.set('userData', 'fast')
    response.cookies.set({
      name: `${mycookie?.name}`,
      value: `${mycookie?.value}`,
    })
    const cookie = response.cookies.get('userData')
    console.log('second log is ->: ', cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
    // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.
   
    
}

export const config = {
  matcher: '/home',
}

  // const data = JSON.parse(mycookie!.value);
  // const token = data?.response?.token;
  // if (!token) throw new Error("Token not found in the user data.");
  // console.log('tooooooodlfgnd');
  // const res = await fetch(
  //   `http://localhost:3001/users/profile/${data.response.user.username}`,
  //   {
  //     headers: { authorization: `Bearer ${token}` },
  //   }
  // );
  // const Data = await res.json();
  // return NextResponse.json({ Data })
//}
