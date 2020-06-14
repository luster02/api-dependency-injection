export class BaseService {
    private _repository: any
    constructor(repository: any) {
        this._repository = repository
    }

    async get(id: string) {
        if (!id) {
            const error: any = new Error()
            error.status = 400
            error.message = "id must be sent"
            throw error
        }
        const currentEntity = await this._repository.get(id)

        if (!currentEntity) {
            const error: any = new Error()
            error.status = 404
            error.message = "entiti does not found"
            throw error
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
            const error: any = new Error()
            error.status = 400
            error.message = "id must be sent"
            throw error
        }
        return await this._repository.update(id, entity)
    }

    async delete(id: string) {
        if (!id) {
            const error: any = new Error()
            error.status = 400
            error.message = "id must be sent"
            throw error
        }
        return await this._repository.delete(id)
    }
}

