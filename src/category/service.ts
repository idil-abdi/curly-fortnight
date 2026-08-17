// import { PrismaClient } from '../../generated/prisma/client';
// import { CreateCategoryPayload } from './types';

import { ConflictException } from "../exception/ConflictException";
import { Category, PrismaClient } from "../generated/prisma/client";
import { CreateCategoryPayload, GetByIdCategoryPayload } from "./types";

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

    async getById(data: GetByIdCategoryPayload) {
        return prisma.category.findUnique({
            where: {id: data.id}
        })
    }
});

export type CategoryService = ReturnType<typeof createCategoryService>