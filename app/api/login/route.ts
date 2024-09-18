import { prisma } from '@/app/utils/prismaClient';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 401 });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Login successful', user });
    } catch (error) {
        return NextResponse.json({ error: 'Unable to login' }, { status: 500 });
    }
}
