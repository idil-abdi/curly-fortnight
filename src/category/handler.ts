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

    // const payload: GetByIdCategoryPayload = {id: Number(id)}
    const category = await categoryService.getById(Number(id))

    if(!category) {
        return h.response({message: 'category not found'}).code(404)
    } 

    return h.response(category).code(200)   
}


export async function deleteCategoryByIdHandler(
    request: Request, 
    h: ResponseToolkit
): Promise<ResponseObject> {
    const { categoryService } = request.server.app;
    const { id } = request.params
    
    const deleted = await categoryService.delete(Number(id))
    return h.response(deleted).code(200)
}

export async function updateCategoryByIdHandler(
    request: Request, 
    h: ResponseToolkit
): Promise<ResponseObject> {
    const { categoryService } = request.server.app;
    const { id } = request.params
    const data = request.payload as CreateCategoryPayload;


    const updated = await categoryService.update(Number(id), data)
    return h.response(updated).code(200)
}



