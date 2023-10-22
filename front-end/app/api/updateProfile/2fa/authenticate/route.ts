import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export  async function POST(req:NextRequest) {
    const cookieStore = cookies();
    const res = JSON.stringify(await req.json());

    const data = await fetch(
      `http://localhost:3001/auth/2fa/authenticate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: res,
      }
    );
    const response =  await data.json();
    if(response)
    {
      return NextResponse.json({response});
    }
    return NextResponse.json({"false"});
}