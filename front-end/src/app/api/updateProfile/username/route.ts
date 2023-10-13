import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(req: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get("userData");
    const res = await req.json();

    if (token) {
        const cookieObject = JSON.parse(token.value);
        const data = await fetch(
          `http://backend:3001/users/profile/${cookieObject.response.user.username}/sendRequest/${res}`,
          {
            headers: {
              Authorization: `Bearer ${cookieObject.response.token}`,
            },
          }
        );
        const isSent = await data.json();
        console.log(isSent.statusCode);
        if(isSent.statusCode != 200)
          return NextResponse.json("doesn't exist");
        return NextResponse.json("exist");
      }
      return NextResponse.json({});
}