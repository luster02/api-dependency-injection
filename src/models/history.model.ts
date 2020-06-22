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
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'owner is required']
    },
    org: {
        type: Schema.Types.ObjectId,
        ref: 'Org',
        required: [true, 'org is required']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

HistorySchema.plugin(Autopopulate)

interface IHistory extends Document {
    products: string
    totalPrice: number
    createdAt: Date
    customer: string
    completed: Boolean
}

HistorySchema.pre<IHistory>('save', function (next) {
    this.createdAt = new Date()
    next()
})

export const History = model('History', HistorySchema)