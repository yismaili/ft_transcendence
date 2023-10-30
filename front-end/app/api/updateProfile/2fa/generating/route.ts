import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export const dynamic = 'force-dynamic'

export async function POST() {
  const cookieStore = cookies();
  const token = cookieStore.get("userData");
  // console.log(token);
  if (token) {
    const cookieObject = JSON.parse(token.value);
    const data = await fetch(`http://backend:3001/auth/2fa/generate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookieObject.response.token}`,
      },
    });
    const img = await data.text();
    return NextResponse.json({ img });
  }
  return NextResponse.json({});
}
