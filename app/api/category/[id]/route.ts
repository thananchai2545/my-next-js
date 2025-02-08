import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(request: Request,{ params }: { params: { id: string } }) {
    const {id} = await params
    const { category_name } = await request.json();
    try {
        const result = await prisma.$transaction(async (tx) => {
            const category = await tx.category.update({
                where: {
                    id: id,
                },
                data: {
                    category_name: category_name,
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

export async function DELETE(request: Request,{ params }: { params: { id: string } }) {    
    const { id } = await params;
    try {
        const result = await prisma.$transaction(async (tx) => {
            const category = await tx.category.delete({
                where: {
                    id: id,
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