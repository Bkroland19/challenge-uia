import { prisma } from "@/app/utils/prismaClient";

export async function POST(request: Request) {
    try {
        const { vehicleNo } = await request.json();

        // Find the vehicle by vehicle number plate
        const vehicle = await prisma.vehicle.findFirst({
            where: { numberPlate: vehicleNo },
            include: {
                policy: true,
            },
        });

        if (!vehicle || !vehicle.policy) {
            return new Response(JSON.stringify({ error: 'No matching vehicle or policy found' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

      
        if (vehicle.numberPlate !== vehicleNo) {
          
            return new Response(JSON.stringify({ error: 'Mismatch detected, manual review triggered' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

       
        return new Response(JSON.stringify({ message: 'No mismatch detected' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error in POST accident check:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
