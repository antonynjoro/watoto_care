// app/api/agents/[agentname]/route.js

import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const agentname = request.nextUrl.pathname.split('/').pop();

    console.log("route api page")
    console.log("agentname")
    console.log(agentname)

    try {
        const agentData = await prisma.user.findUnique({
            where: {
                username: agentname
            }
        });

        if (!agentData) {
            console.log("agent not found")
            return new NextResponse('Agent not found', {status: 404});
        }

        console.log("agentData")
        console.log(agentData)

        return NextResponse.json(agentData);
    } catch (error) {
        console.error("Error fetching agent data:", error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}
