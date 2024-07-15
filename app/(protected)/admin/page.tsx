"use client"
import RoleGate from "@/components/auth/RoleGate";
import FormSuccess from "@/components/FormSuccess";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrentRole } from "@/hooks/use-current-role";
import {UserRoles} from "@prisma/client";
import { admin } from "@/actions/admin";
import { toast } from "sonner";
export const AdminPage =  () => {

    const onApiRouteClick = async () => { 
        const response = await fetch('/api/admin')
        if(response.ok) {
            toast.success("SUCCESS")
        }
        else {
            toast.error("FORBIDDEN")
        }
         
    }  

    const onServerActionClick = async () => {
        const response = await admin();
        if(response.success) {
            toast.success(response.success)
        }
        else {
            toast.error(response.error)
        }

    }

    const role = useCurrentRole();
    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p
                className="text-2xl font-semibold text-center"
                >
                    Admin
                </p>
            </CardHeader>
            <CardContent
            className="space-y-4"
            >
                <RoleGate
                allowedRole={UserRoles.ADMIN}
                >
                    <FormSuccess message="You are allowed to view this page" />

                </RoleGate>
                <div className="flex flex-row justify-between p-3 border shadow-md rounded-lg items-center">
                    <p
                    className="text-sm font-medium"
                    >
                        Admin Only Route
                    </p>
                    <Button
                    onClick={onApiRouteClick}
                    >
                        Click to Test
                    </Button>
                </div>
                <div className="flex flex-row justify-between p-3 border shadow-md rounded-lg items-center">
                    <p
                    className="text-sm font-medium"
                    >
                        Admin Only Server Action
                    </p>
                    <Button
                    onClick={onServerActionClick}
                    >
                        Click to Test
                    </Button>
                </div>

            </CardContent>
        </Card>
    )
}

export default AdminPage;