import { prisma } from "@/app/utils/prismaClient";

export async function POST(request: Request) {
    const { userId, renewalAt, vehicle } = await request.json();

    // Validate the request body
    if (!userId || !renewalAt || !vehicle) {
        return new Response(JSON.stringify({ error: "Missing required fields." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const policy = await prisma.policy.create({
            data: {
                userId,
                renewalAt: new Date(renewalAt),
                vehicle: {
                    create: {
                        numberPlate: vehicle,
                    },
                },
            },
        });

        return new Response(JSON.stringify(policy), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating policy:", error);
        return new Response(JSON.stringify({ error: "Failed to create policy." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
