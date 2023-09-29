import bcrypt from 'bcrypt';
import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request){
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password){
        return new NextResponse('Missing fields', {status: 400})
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (existingUser){
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashed_password: hashedPassword
        }
    })

    return NextResponse.json(user)
}