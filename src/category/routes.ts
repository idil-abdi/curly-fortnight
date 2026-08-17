import { ServerRoute } from "@hapi/hapi";
import { createCategoryHandler, getCategoryByIdHandler, getCategoryHandler } from "./handler";
import { createCategorySchema } from "./validation";

export const categoryRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/categories',
        handler: createCategoryHandler,
        options: {
            validate: {
                payload: createCategorySchema,
            }
        }
    },
    {
        method: 'GET',
        path: '/categories',
        handler: getCategoryHandler,
    },
    // {
    //     method: 'PUT',
    //     path: '/categories/{id}',
    //     handler: getCategoryByIdHandler,
    // },
    // {
    //     method: 'DELETE',
    //     path: '/categories/{id}',
    //     // handler: deleteCategoryByIdHandler,
    // }
]