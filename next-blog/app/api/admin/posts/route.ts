import { NextResponse } from "next/server";
import { prisma } from "@/app/_libs/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { supabase } from "@/app/_libs/supabase";

export async function GET(req: Request) {
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Prisma error: ${e.code} - ${e.message}`);
    }
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });
  
  try {
    const { title, content, thumbnailImageKey, categoryId } = await req.json();
    const post = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailImageKey,
        postCategories: {
          create: { categoryId },
        },
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Prisma error: ${e.code} - ${e.message}`);
    }
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 },
    );
  }
}
