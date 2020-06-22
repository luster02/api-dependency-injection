import { ErrorRequest } from '../helpers/error-request.helper'

export class BaseService {
    private _repository: any
    constructor(repository: any) {
        this._repository = repository
    }

    async get(id: string) {
        if (!id) {
            throw ErrorRequest(400, "id must be sent")
        }
        const currentEntity = await this._repository.get(id)

        if (!currentEntity) {
            throw ErrorRequest(404, "entity does not found")
        }

        return currentEntity
    }

    async getAll() {
        return await this._repository.getAll()
    }

    async create(entity: any) {
        return await this._repository.create(entity)
    }

    async update(id: string, entity: any) {
        if (!id) {
            throw ErrorRequest(400, "id must be sent")
        }
        return await this._repository.update(id, entity)
    }

    async delete(id: string) {
        if (!id) {
            throw ErrorRequest(400, "id must be sent")
        }
        return await this._repository.delete(id)
    }
}

