"use client";
import React from 'react';
import { useRouter } from "next/navigation";



interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

const LoginButton = ({
    children,
    mode = "modal",
    asChild = false,
}: LoginButtonProps) => {

    const router = useRouter();

    const onClick = () => {
       router.push("/settings");

    };

    return (
        <span
            onClick={onClick}
            className="cursor-pointer"
        >
            {children}
        </span>
    );
}

export default LoginButton;
