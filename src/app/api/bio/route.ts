import prisma from "../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  if (!id) {
    return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
  }

  try {
    const bio = await prisma.customer.findUnique({
      where: { id: parseInt(id) },
    });

    if (!bio) {
      return NextResponse.json({ error: "Bio not found" }, { status: 404 });
    }

    return NextResponse.json(bio);
  } catch (error) {
    console.error("Error fetching bio:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}