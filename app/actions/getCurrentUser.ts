import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '../libs/prismadb'

export async function getSession() {
    try {
        return await getServerSession(authOptions)
    } catch (error: any) {
        // Silently handle JWT decryption errors (e.g., invalid/expired tokens, missing secret)
        // These are expected when there's no valid session
        return null
    }
}

export default async function getCurrentUser() {
    try {
        const session = await getSession()
        if (!session?.user?.email) return null

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) return null

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString()
        }
    } catch (error: any) {
        return null
    }
}

