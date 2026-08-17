import { ConflictException } from "../exception/ConflictException";
import { PrismaClient } from "../generated/prisma/client";
import { CreateCategoryPayload, UpdateCategoryPayload } from "./types";
import { NotFoundException } from '../exception/NotFoundException';

export const createCategoryService = (prisma: PrismaClient) => ({
    async create(data: CreateCategoryPayload) {
        const cleanedName = data.name.trim().toUpperCase();

        const existing = await prisma.category.findFirst({
            where: { name: cleanedName },
        });

        if (existing) {
            throw new ConflictException('Category already exists');
        }

        return prisma.category.create({
            data: { ...data, name: cleanedName },
        });
    },

    async get() {
        return prisma.category.findMany()
    },

    async getById(id: number) {
        return prisma.category.findUnique({
            where: {id}
        })
    },

    async delete(id: number) {
        const category = await prisma.category.findUnique({
            where: { id },
        });

        if (!category) {
            throw new NotFoundException(
                `Category with id:${id} does not exist`,
            );
        }

        return prisma.category.delete({
            where: { id },
        });
    },

    async update(id: number, data: UpdateCategoryPayload) {
        const category = await prisma.category.findUnique({
            where: { id }
        })

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`)
        }

        // 2. If updating name, sanitize and check for duplicates (excluding current record)
        let cleanedName: string | undefined;
        if (data.name) {
            cleanedName = data.name.trim().toUpperCase();

            const existing = await prisma.category.findFirst({
                where: {
                    name: cleanedName,
                    NOT: { id },
                },
            });

            if (existing) {
                throw new ConflictException('Category name already exists');
            }
        }

        // 3. Perform the update
        return prisma.category.update({
            where: { id },
            data: {
                ...data,
                ...(cleanedName && { name: cleanedName }),
            },
        });
    }
});

export type CategoryService = ReturnType<typeof createCategoryService>