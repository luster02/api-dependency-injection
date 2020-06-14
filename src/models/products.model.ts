import { Schema, model, Document } from 'mongoose'

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'item name is required']
    },
    description: {
        type: String,
        required: [true, 'description is true']
    },
    status: {
        type: String,
        default: 'unavailable'
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    discount: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now()
    },
    imgUrl: {
        type: String
    },
    imgID: {
        type: String
    }
})

ProductSchema.pre<IProduct>('save', function (next) {
    this.created = new Date();
    next();
})

interface IProduct extends Document {
    name: string
    description: string
    status: string
    price: number
    discount: number
    created: Date
    imgUrl: string
    imgID: string
}

export const Product = model<IProduct>('Product', ProductSchema)