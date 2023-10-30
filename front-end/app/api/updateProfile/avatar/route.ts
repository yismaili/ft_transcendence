import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export const dynamic = 'force-dynamic'

export async function PUT(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("userData");
  const res = await req.formData();
  // console.log("test res:",res);
  if (token) {
    const cookieObject = JSON.parse(token.value);
    //console.log("token", cookieObject.response.token);
    const data = await fetch(
      `http://backend:3001/users/profile/${cookieObject.response.user.username}/updateProfile`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cookieObject.response.token}`,
        },
        body: res,
      }
    );
    const isSent = await data.json();
    // console.log("test74:", isSent);
    if (isSent.user.uniquename) {
      // console.log("sbar")
      return NextResponse.json("done");
    }
  }
  return NextResponse.json("error");
}
