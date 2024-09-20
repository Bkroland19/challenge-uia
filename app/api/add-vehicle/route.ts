import { prisma } from "@/app/utils/prismaClient";

export async function POST(request: Request) {
    const { numberPlate } = await request.json();

    if (!numberPlate) {
        return new Response(JSON.stringify({ error: "Vehicle number plate is required." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const vehicle = await prisma.vehicle.create({
            data: {
                numberPlate,
            },
        });

        return new Response(JSON.stringify(vehicle), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error adding vehicle:", error);
        return new Response(JSON.stringify({ error: "Failed to add vehicle." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
