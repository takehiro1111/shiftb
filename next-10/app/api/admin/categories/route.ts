import { NextResponse } from "next/server";
import { prisma } from "@/app/_libs/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Prisma error: ${e.code} - ${e.message}`);
    }
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Prisma error: ${e.code} - ${e.message}`);
    }
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
}
