import { NextResponse } from "next/server";
import { prisma } from "@/app/_libs/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { supabase } from "@/app/_libs/supabase";

type Params = Promise<{ id: string }>;

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Params;
  },
) {
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

  try {
    const { id } = await params;
    const hasNumInt = parseInt(id);

    if (isNaN(hasNumInt)) {
      return NextResponse.json({ error: "bad request" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: { postCategories: true },
    });
    return NextResponse.json({ post }, { status: 200 });
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

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Params;
  },
) {
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

  try {
    const { id } = await params;
    const hasNumInt = parseInt(id);

    if (isNaN(hasNumInt)) {
      return NextResponse.json({ error: "bad request" }, { status: 400 });
    }

    const { title, content, thumbnailImageKey, categoryId } = await req.json();
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        thumbnailImageKey,
        postCategories: {
          deleteMany: {},
          create: { categoryId },
        },
      },
    });

    return NextResponse.json({ post }, { status: 200 });
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

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Params;
  },
) {
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

  try {
    const { id } = await params;
    const hasNumInt = parseInt(id);

    if (isNaN(hasNumInt)) {
      return NextResponse.json({ error: "bad request" }, { status: 400 });
    }

    await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(null, { status: 204 });
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
