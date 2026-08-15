import type { ServerRoute } from "@hapi/hapi";
import { getTodosHandler, createTodoHandler } from "../controllers/todoController.js";

export const todoRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/todos',
        handler: getTodosHandler
    },
    {
        method: 'POST',
        path: '/todos',
        handler: createTodoHandler
    },
]