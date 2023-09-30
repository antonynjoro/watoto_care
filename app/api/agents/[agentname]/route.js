// app/api/agents/[agentname]/route.js

import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { agentname } = request.nextUrl.searchParams;

    try {
        const agentData = await prisma.user.findUnique({
            where: {
                username: agentname
            }
        });

        if (!agentData) {
            return new NextResponse('Agent not found', {status: 404});
        }

        return NextResponse.json(agentData);
    } catch (error) {
        console.error("Error fetching agent data:", error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}
