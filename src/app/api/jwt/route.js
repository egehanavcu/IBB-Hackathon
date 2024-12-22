import { NextResponse } from "next/server";
import { parse } from "cookie";
import { DOMAIN } from "@/lib/utils";

export async function GET(request) {
  try {
    const cookies = request.headers.get("cookie");
    const parsedCookies = parse(cookies || "");
    const token = parsedCookies.token;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, token }, { status: 200 });
  } catch (error) {
    console.log("Error fetching token:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
