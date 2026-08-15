import { prisma } from '../lib/prisma.js'

export const getTodos = async () => {
    return prisma.todo.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const createTodo = async (
    title: string
) => {
    return prisma.todo.create({
        data: {
            title
        }
    })
}

export const getTodoById = async (
    id: number
) => {
    return prisma.todo.findUnique({
        where: {
            id
        }
    })
}

export const updateTodo = async (
    id: number,
    title: string,
    completed: boolean
) => {
    return prisma.todo.update({
        where: {
            id
        },
        data: {
            title,
            completed
        }
    })
}

export const deleteTodo = async (
    id: number
) => {
    return prisma.todo.delete({
        where: {
            id
        }
    })
}

