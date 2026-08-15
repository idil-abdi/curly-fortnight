import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { CreateCategoryPayload } from './types';
import { ConflictException } from '../exception/ConflictException';

export async function createCategoryHandler(
    request: Request,
    h: ResponseToolkit,
): Promise<ResponseObject> {
    const { categoryService } = request.server.app;
    const data = request.payload as CreateCategoryPayload;

    try {
        const category = await categoryService.create(data)
        return h.response(category).code(201)
    } catch (err) {
        if (err instanceof ConflictException) {
            return h.response({error: err.message}).code(400)
        }
        throw err
    }

}
