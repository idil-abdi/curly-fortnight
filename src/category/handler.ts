import { Payload } from './../generated/prisma/internal/prismaNamespace';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { CreateCategoryPayload, GetByIdCategoryPayload } from './types';
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

export async function getCategoryHandler(
    request: Request, 
    h: ResponseToolkit
): Promise<ResponseObject> {
    const { categoryService } = request.server.app
    const categories = await categoryService.get()

    return h.response(categories).code(200)
}

export async function getCategoryByIdHandler(
    request: Request, 
    h: ResponseToolkit
): Promise<ResponseObject> {
    const { id } = request.params
    const { categoryService } = request.server.app

    const payload: GetByIdCategoryPayload = {id: Number(id)}
    const category = await categoryService.getById(payload)

    if(!category) {
        return h.response({message: 'category not found'}).code(404)
    } 

    return h.response(category).code(200)   
}

// export async function deleteCategoryByIdHandler(
//     request: Request, 
//     h: ResponseToolkit
// ): Promise<ResponseObject> {
//     const { id } = request.params
//     const { categoryService } = request.server.app

//     const payload: GetByIdCategoryPayload = {id: Number(id)}
//     const category = await categoryService.getById(payload)

//     if(!category) {
//         return h.response({message: 'category not found'}).code(404)
//     } 

//     return h.response(category).code(200)   
// }



