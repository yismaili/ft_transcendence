import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(req: NextRequest) {
    const cookieStore = cookies();
    const token = cookieStore.get("userData");
    const res =  await req.formData();
    // console.log("test res:",res);
    if (token) {
        const cookieObject = JSON.parse(token.value);
        console.log("token", cookieObject.response.token);
        const data = await fetch(
          `http://${process.env.NEXT_PUBLIC_HOST_PORT}/users/profile/${cookieObject.response.user.username}/updateProfile`,
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
        if(isSent.user.uniquename)
        {
          // console.log("sbar")
          return NextResponse.json("done");
        }
      }
      return NextResponse.json("error");
}