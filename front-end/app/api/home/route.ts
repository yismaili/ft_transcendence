import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const mycookie = request.cookies.get("userData");
  if (mycookie) {
    const Data = JSON.parse(mycookie!.value);
    const token = Data?.response?.token;

    // console.log("its me", data.response.user.username);
    const res = await fetch(
      `http://${process.env.NEXT_PUBLIC_HOST_PORT}/users/profile/${Data.response.user.username}`,
      {
        cache: "no-cache",
        headers: { authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    return NextResponse.json({data});
  }

  return NextResponse.json(mycookie);
}
