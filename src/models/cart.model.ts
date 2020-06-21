import { Schema, Document, model } from 'mongoose'

const CartSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'owner is required']
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    payed: {
        type: Boolean,
        default: false
    }
})

interface ICart extends Document {
    customer: string
    products: string
    totalPrice: string
    payed: Boolean
}

export const Cart = model<ICart>('Cart', CartSchema)