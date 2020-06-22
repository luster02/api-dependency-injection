import { Schema, Document, model } from 'mongoose'
import Autopopulate from 'mongoose-autopopulate'

const CartSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'owner is required']
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        autopopulate: true
    }],
    totalPrice: {
        type: Number,
        default: 0
    }
})

CartSchema.plugin(Autopopulate)

interface ICart extends Document {
    customer: string
    products: string
    totalPrice: string
}

export const Cart = model<ICart>('Cart', CartSchema)