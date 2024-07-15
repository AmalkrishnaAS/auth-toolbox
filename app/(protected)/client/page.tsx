"use client"
import { useCurrentUser } from "@/hooks/use-current-user";
import UserInfo from "@/components/UserInfo";
import { useSession } from "next-auth/react";

export const clientPage = () => {
    const user = useSession().data?.user
    
   

    return (
        <UserInfo user={user} label="Client Component" />

    )
    }

export default clientPage;