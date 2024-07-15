"use server"

import { currentRole } from "@/lib/auth"
import { UserRoles } from "@prisma/client"



export const admin = async () => {
    const role = await currentRole();
    if(role === UserRoles.ADMIN) {
        return {
            success: "Access Granted"
        }
    }
    else {
        return {
            error: "Access Denied"
            
        }
    }
}