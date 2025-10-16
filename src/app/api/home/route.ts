import { NextResponse } from "next/server";
import ConnectDB from "@/lib/connectDB";
import Home from "@/models/Home";

export async function GET() {
  await ConnectDB();
  const home = await Home.findOne().select("carousel");
  return NextResponse.json({ data: home.carousel });
}
