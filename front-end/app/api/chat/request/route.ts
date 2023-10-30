import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const mycookie = request.cookies.get("userData");
  if (mycookie) {
    const Data = JSON.parse(mycookie!.value);
    const token = Data?.response?.token;

    const res = await fetch(
      `http://backend:3001/users/profile/${Data.response.user.username}/requests`,
      {
        cache: "no-cache",
        headers: { authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();

    return NextResponse.json(data);
  }

  return NextResponse.json({});
}
