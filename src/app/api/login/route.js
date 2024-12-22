import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { DOMAIN } from "@/lib/utils";
import jwt from "jsonwebtoken"; // JWT kütüphanesini dahil ediyoruz

export async function POST(request) {
  const { phoneNumber, password } = await request.json();

  try {
    const response = await fetch(`${DOMAIN}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, password }),
    });

    const result = await response.json();

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message || "Invalid credentials" },
        { status: 401 }
      );
    }

    const cookie = serialize("token", result.data, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const responseHeaders = new Headers();
    responseHeaders.append("Set-Cookie", cookie);

    // JWT'yi çözümle
    const decoded = jwt.decode(result.data);

    // firstName ve lastName'i birleştir
    const nameSurname = `${decoded.firstName} ${decoded.lastName}`;

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Login successful",
        nameSurname,
      }),
      { headers: responseHeaders }
    );
  } catch (error) {
    console.log("API login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
