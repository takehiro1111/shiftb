import { NextResponse } from "next/server";
import { prisma } from "@/app/_libs/prisma";

type Params = Promise<{ id: string }>;

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Params;
  },
) {
  const { id } = await params;
  const hasNumInt = parseInt(id);

  if (isNaN(hasNumInt)) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  return NextResponse.json({ post }, { status: 200 });
}
