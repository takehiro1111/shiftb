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

    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json({ category }, { status: 200 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Prisma error: ${e.code} - ${e.message}`);
    }
    return NextResponse.json(
      { error: "Failed to fetch category" },
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

    const { name } = await req.json();
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });

    return NextResponse.json({ category }, { status: 200 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Prisma error: ${e.code} - ${e.message}`);
    }
    return NextResponse.json(
      { error: "Failed to update category" },
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

    await prisma.category.delete({
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
      { error: "Failed to delete category" },
      { status: 500 },
    );
  }
}
