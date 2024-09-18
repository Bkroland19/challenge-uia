import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
    try {
        const users = await prisma.user.findMany(); // Replace 'user' with an existing model
        console.log('Connected to the database:', users);
    } catch (error) {
        console.error('Database connection error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
