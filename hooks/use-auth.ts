import { useSession } from "next-auth/react";
import { ExtendedUser } from "@/next-auth";

interface UseAuthReturn {
    user: ExtendedUser | null | undefined;
    isLoading: boolean;
}

export const  useAuth = (): UseAuthReturn => {
    const { data: session, status } = useSession({
        required: false,
    });

    return {
        user: session?.user,
        isLoading: status === "loading"
    };
};
