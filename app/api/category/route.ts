"use server"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function GET(request: Request) {
    const result = await prisma.category.findMany({
        select: {
            id: true,
            category_name: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
    return Response.json({ category : result });
}

export async function POST(request: Request) {
    const { category_name } = await request.json();
    try {
        const result = await prisma.$transaction(async (tx) => {
            const category = await tx.category.create({
                data: {
                    category_name,
                },
            });
            return category;
        })
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        await prisma.$disconnect();
        return new Response(JSON.stringify(error), { status: 500 });
    }
}