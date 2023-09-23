import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("userData");

  if (token) {
    const cookieObject = JSON.parse(token.value);
    const data = await fetch(
      `http://backend:3001/users/profile/${cookieObject.response.user.username}/friends`,
      {
        headers: {
          Authorization: `Bearer ${cookieObject.response.token}`,
        },
      }
    );
    const friends = await data.json();

    return NextResponse.json({ friends });
  }
  return NextResponse.json({});
}

export async function POST() { 
  const cookieStore = cookies();
  const token = cookieStore.get("userData");

  if (token) {
    const cookieObject = JSON.parse(token.value);
    const data = await fetch(
      `http://backend:3001/users/profile/${cookieObject.response.user.username}/friends`,
      {
        headers: {
          Authorization: `Bearer ${cookieObject.response.token}`,
        },
      }
      
    );
    const friends = await data.json();

    return NextResponse.json({ friends });
  }
  return NextResponse.json({});
}