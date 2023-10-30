import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const mycookie = request.cookies.get("userData");
  if (mycookie) {
    const Data = JSON.parse(mycookie!.value);
    const token = Data?.response?.token;

    // console.log("its me", data.response.user.username);
    const res = await fetch(
      `http://backend:3001/users/profile/${Data.response.user.username}/friends`,
      {
        cache: "no-cache",
        headers: { authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    // console.log(Data);

    return NextResponse.json({ data });
  }

  return NextResponse.json({});
}

export async function POST(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("userData");

  const res = await req.json();

  if (token) {
    const cookieObject = JSON.parse(token.value);
    const data = await fetch(
      `http://backend:3001/users/profile/${cookieObject.response.user.username}/sendRequest/${res}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookieObject.response.token}`,
        },
      }
    );
    const isSent = await data.json();
    if (isSent.username !== cookieObject.response.user.username)
      return NextResponse.json("doesn't exist");
    return NextResponse.json("exist");
  }
  return NextResponse.json({});
}
