import { NextResponse } from "next/server";
import { prisma } from "@/app/_libs/prisma";

export async function GET() {
  const posts = await prisma.post.findMany();

  return NextResponse.json({ posts }, { status: 200 });
}
