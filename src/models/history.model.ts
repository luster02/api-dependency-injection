import { Schema, Document, model } from 'mongoose'
import Autopopulate from 'mongoose-autopopulate'

const HistorySchema = new Schema({
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        autopopulate: true
    }],
    totalPrice: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

HistorySchema.plugin(Autopopulate)

interface IHistory extends Document {
    products: string
    totalPrice: number
    createdAt: Date
}

HistorySchema.pre<IHistory>('save', function (next) {
    this.createdAt = new Date()
    next()
})

export const History = model('History', HistorySchema)