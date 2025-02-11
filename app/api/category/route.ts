"use server"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function GET(request: Request) {
    const url = new URL(request.url);
    
    const page = url.searchParams.get('page');
    const limit = parseInt(url.searchParams.get('limit')!);
    const search = url.searchParams.get('search')!; 
    const total = await prisma.category.count({
        where: {
            category_name: {
                contains: search
            }
        },
    });
    const result = await prisma.category.findMany({
        where: {
            category_name: {
                contains: search
            }
        },
        take: limit,
        skip: (Number(page) - 1) * limit,
        select: {
            id: true,
            category_name: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });    
    return Response.json({ category : result ,total: total});
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