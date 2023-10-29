import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const mycookie = request.cookies.get("userData");
  let req = await request.text();
  
  if (mycookie) {
    const Data = JSON.parse(mycookie!.value);
    const token = Data?.response?.token;
    // console.log("srv friend name", req);

    const res = await fetch(
      `http://${process.env.NEXT_PUBLIC_HOST_PORT}/users/profile/${Data.response.user.username}/historyFriend/${req}`,
      {
        method:"GET",
        cache: "no-cache",
        headers: { authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    if(data[0])
      return NextResponse.json({ data });
  }
  return NextResponse.json({});
}