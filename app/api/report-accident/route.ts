import { prisma } from '@/app/utils/prismaClient';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import cloudinary, { uploadImage } from '@/app/utils/cloudinary';

export async function POST(request: Request) {
    try {
        const { userId, details, location, images, vehicleNo } = await request.json();

        if (!ObjectId.isValid(userId)) {
            return NextResponse.json({ error: 'Invalid userId format' }, { status: 400 });
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }


        const imageUrls = await Promise.all(
            images.map(async (image: string) => {
                const result: any = await uploadImage(image);
                return result.secure_url;
            })
        );

        const accident = await prisma.accident.create({
            data: {
                userId,
                details,
                location,
                vehicleNo,
                images: imageUrls,
            },
        });

        return NextResponse.json(accident, { status: 201 });
    } catch (error: any) {
        console.error('Error in report-accident API route:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
