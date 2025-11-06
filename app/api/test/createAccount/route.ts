import { createAccount } from "@/actions/dashboard";
import { NextResponse } from "next/server";


export async function POST(request : Request){
    const body = await request.json() ;
    try{
        const res = await createAccount(body);
        return NextResponse.json(res);
    }catch (error: any){
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }

}