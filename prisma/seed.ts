import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const personal = await prisma.category.upsert({
        where: { name: 'PERSONAL' },
        update: {},
        create: { name: 'PERSONAL' },
    });

    const shopping = await prisma.category.upsert({
        where: { name: 'SHOPPING' },
        update: {},
        create: { name: 'SHOPPING' },
    });

    const todo1 = await prisma.todoTask.create({
        data: {
            name: 'Buy bread',
            categoryId: shopping.id,
        },
    });

    const todo2 = await prisma.todoTask.create({
        data: {
            name: 'Book dentist appointment',
            categoryId: personal.id,
        },
    });

    console.log({ personal, shopping, todo1, todo2 });
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });