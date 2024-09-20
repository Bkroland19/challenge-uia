import { prisma } from '@/app/utils/prismaClient';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const { email, name, phoneNumber, password, role } = await request.json();

        if (!email || !name || !phoneNumber || !password || !role) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const validRoles = ['USER', 'ADMIN'];
        if (role && !validRoles.includes(role.toUpperCase())) {
            return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
        }

        const userRole = role?.toUpperCase() || 'USER';

        const user = await prisma.user.create({
            data: {
                email,
                name,
                phoneNumber,
                password: hashedPassword,
                role: userRole
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error('Error handling POST request:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
