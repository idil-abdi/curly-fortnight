import type { Request, ResponseToolkit } from '@hapi/hapi';
import { createTodo, getTodos } from './../service/todoService.js';

export const getTodosHandler = async () => {
    return getTodos()
}

export const createTodoHandler = async (request: Request, h: ResponseToolkit) => {
    const {title} = request.payload as {
        title: string
    }

    const todo =await createTodo(title)

    return h.response(todo).code(201)
}
