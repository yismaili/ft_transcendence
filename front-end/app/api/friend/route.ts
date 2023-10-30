import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const mycookie = request.cookies.get("userData");
  let req = await request.text();

  if (mycookie) {
    const Data = JSON.parse(mycookie!.value);
    const token = Data?.response?.token;

    const res = await fetch(
      `http://backend:3001/users/profile/${Data.response.user.username}/searchTouser/${req}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: { authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    if (data.username) return NextResponse.json({ data });
  }
  return NextResponse.json({});
}
