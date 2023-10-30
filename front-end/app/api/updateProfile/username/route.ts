import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("userData");
  const res = JSON.stringify({ uniquename: await req.json() });
  if (token) {
    const cookieObject = JSON.parse(token.value);
    const data = await fetch(
      `http://backend:3001/users/profile/${cookieObject.response.user.username}/addUniquename`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieObject.response.token}`,
        },
        body: res,
      }
    );
    const isSent = await data.json();
    if (isSent.uniquename) return NextResponse.json("done");
  }
  return NextResponse.json("error");
}
