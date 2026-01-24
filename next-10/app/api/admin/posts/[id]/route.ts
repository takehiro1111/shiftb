import { NextResponse } from "next/server";
import { prisma } from "@/app/_libs/prisma";
import { Prisma } from "@/app/generated/prisma/client";

type Params = Promise<{ id: string }>;

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: Params;
  },
) {
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
  try {
    const { id } = await params;
    const hasNumInt = parseInt(id);

    if (isNaN(hasNumInt)) {
      return NextResponse.json({ error: "bad request" }, { status: 400 });
    }

    const { title, content, thumbnailUrl, categoryId } = await req.json();
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        thumbnailUrl,
        postCategories: {
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
  _req: Request,
  {
    params,
  }: {
    params: Params;
  },
) {
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
