import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"


export async function DELETE(req:Request,{params}:{params:{serverId:string}}) {
    try{
        const profile = await currentProfile(); 
        if (!profile) {
            return new NextResponse("Unauthorized",{status:401});
        }

        const server = await db.server.delete({
            where:{
                id: params.serverId,
                profileId: profile.id,
            }
        })
        return NextResponse.json(server);
        // return new NextResponse(JSON.stringify(server),{ status: 200 });
    }catch(err){
        console.log("[SERVER_ID_DELETE]", err);
    }
}