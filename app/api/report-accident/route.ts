import { prisma } from '@/app/utils/prismaClient';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import cloudinary, { uploadImage } from '@/app/utils/cloudinary';

export async function POST(request: Request) {
    try {
        const { userId, details, location, images } = await request.json();

        if (!ObjectId.isValid(userId)) {
            return NextResponse.json({ error: 'Invalid userId format' }, { status: 400 });
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Upload images to Cloudinary and collect their URLs
        const imageUrls = await Promise.all(
            images.map(async (image: string) => {
                const result = await uploadImage(image);
                return result.secure_url;
            })
        );

        // Create the accident report and store the Cloudinary URLs in the database
        const accident = await prisma.accident.create({
            data: {
                userId,
                details,
                location,
                images: imageUrls, // Store Cloudinary URLs here
            },
        });

        return NextResponse.json(accident, { status: 201 });
    } catch (error) {
        console.error('Error in report-accident API route:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
