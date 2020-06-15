export class BaseRepository {
    private model: any
    constructor(model: any) {
        this.model = model
    }

    async get(id: string) {
        return await this.model.findById(id)
    }

    async getAll() {
        return await this.model.find()
    }

    async create(entity: any) {
        return await this.model.create(entity)
    }

    async update(id: string, entity: any) {
        return await this.model.findByIdAndUpdate(id, entity, { new: true })
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id)
        return true
    }
}