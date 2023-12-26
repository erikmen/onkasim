import prisma from '@/libs/prismadb'
import { getCurrentUser } from "@/app/action/getCurrentUser";
import { NextResponse } from "next/server";


export async function DELETE(
    request:Request , {params}: {params: {id:string}}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role !== "ADMIN"){
        return NextResponse.error();
    }


    const product = await prisma
}