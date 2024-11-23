"use client"
import UserInfo from "@/components/UserInfo";
import { BeatLoader } from "react-spinners";
import { useAuth } from "@/hooks/use-auth";

const ClientPage = (): JSX.Element => {
    const { user, isLoading } = useAuth();
    
    if (isLoading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <BeatLoader color='black' />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <p>Not signed in</p>
            </div>
        );
    }

    return (
        <UserInfo user={user} label="Client Component" />
    );
}

export default ClientPage;