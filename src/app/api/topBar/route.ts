import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Home from "@/models/Home";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const home = await Home.findOne().select("topBar");

    if (!home) {
      return NextResponse.json(
        { message: "No topBar data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Topbar retrieved successfully",
        data: home.topBar,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("topbar error:", err instanceof Error ? err.message : err);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
