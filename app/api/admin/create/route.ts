import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";


export async function POST(req: Request) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  const { email, password, name } = await req.json();

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    return NextResponse.json({ message: "Admin created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}