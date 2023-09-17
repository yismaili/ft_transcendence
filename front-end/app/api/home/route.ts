import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const mycookie = request.cookies.get("userData");
  if (mycookie) {
    const Data = JSON.parse(mycookie!.value);
    const token = Data?.response?.token;

    // console.log("its me", data.response.user.username);
    const res = await fetch(
      `http://localhost:3001/users/profile/${Data.response.user.username}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    // console.log(Data);
    
    return NextResponse.json({ data });
  }

  return NextResponse.json({});
}
