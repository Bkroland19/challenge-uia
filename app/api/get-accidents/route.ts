import { prisma } from '@/app/utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const accidents = await prisma.accident.findMany();
        return NextResponse.json(accidents);
    } catch (error) {
        console.error('Error fetching accidents:', error);
        return NextResponse.json({ error: 'Unable to fetch accidents' }, { status: 500 });
    }
}
