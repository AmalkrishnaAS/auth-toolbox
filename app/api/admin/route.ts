import { NextResponse } from "next/server"
import { currentRole } from "@/lib/auth";
import { UserRoles } from "@prisma/client";
export async  function GET() {
    const role = await currentRole();
    if (role === UserRoles.ADMIN) {
        return new NextResponse(null, {
            status:200,
        }
        );
    }
    return new NextResponse(null, {
        status:403,
    }
    );
}