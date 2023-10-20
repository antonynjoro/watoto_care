import { NextResponse } from "next/server";

export async function GET(request) {
    const {searchParams} = new URL(request.url);

    const q = searchParams.get("q");


    return NextResponse.json({q});
}
  


