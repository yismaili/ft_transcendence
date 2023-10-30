import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("userData");
  const res = JSON.stringify({ code: await req.json() });

  if (token) {
    // console.log(res);
    const cookieObject = JSON.parse(token.value);
    const data = await fetch(`http://backend:3001/auth/2fa/turn-off`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieObject.response.token}`,
      },
      body: res,
    });
    const test = await data.text();
    // console.log("test005 :",test);
    if (test.length != 0) return NextResponse.json("false");
    else return NextResponse.json("done");
  }
  return NextResponse.json({});
}
