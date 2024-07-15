"use client"

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRoles } from "@prisma/client";
import FormError from "../FormError";
import { useState } from "react";

interface RoleGateProps {
    allowedRole: UserRoles
    children?: React.ReactNode;
}

const RoleGate = ({allowedRole, children}:RoleGateProps) => {
    const role = useCurrentRole();

   if(role !== allowedRole) {
     return <FormError message={`You are not authorized to view this page`} />
   }
   else {
       return children
   }
}

export default RoleGate