// app/api/register/route.ts
import { prisma } from '@/app/utils/prismaClient';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'


export async function POST(request: Request) {
    try {
        const { email, name, phoneNumber, password } = await request.json();


        if (!email || !name || !phoneNumber || !password) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: { email, name, phoneNumber, password: hashedPassword },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error('Error handling POST request:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
