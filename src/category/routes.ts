import { ServerRoute } from "@hapi/hapi";
import { createCategoryHandler } from "./handler";
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
    }
]