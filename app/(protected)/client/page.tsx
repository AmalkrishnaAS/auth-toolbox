"use client"
import { useCurrentUser } from "@/hooks/use-current-user";
import UserInfo from "@/components/UserInfo";
import { useSession } from "next-auth/react";
import { BeatLoader } from "react-spinners";

const ClientPage = () => {
    const { data: session, status } = useSession({ required: true });
    
    if (status === "loading") {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <BeatLoader color='black' />
            </div>
        );
    }

    return (
        <UserInfo user={session?.user} label="Client Component" />
    );
}

export default ClientPage;