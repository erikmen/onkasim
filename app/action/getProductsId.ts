import prisma from '@/libs/prismadb'
import { orderBy } from 'firebase/firestore';
interface IPrams{
    productId: string
}

export default async function getProductID(params:IPrams) {
    const {productId} = params;
    const product = await prisma.product.findUniqe({
        where:{
            id:productId
        },
        include:{
            reviews:{
                include:{
                    user: true
                },
                orderBy:{
                    createdDate:'desc'
                }
            }
        }
    })
    if(!product){
        return null
    }
    return product
}