

import prisma from "../../libs/prismadb";
import { NextResponse } from 'next/server';

export async function fetchAgentData(agentname) {
    
    // Fetch the agent data from the database
    const agentData = await prisma.user.findUnique({
        where: {
            username: agentname
        }
    });

    // If the agent doesn't exist, return a 404
    if (!agentData) {
        return new NextResponse('Agent not found', {status: 404});
    }

    // Return the agent data
    return NextResponse.json(agentData);


    
}