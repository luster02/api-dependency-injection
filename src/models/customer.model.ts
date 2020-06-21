import { Schema, Document, model } from 'mongoose'

const CustomerSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    addres: {
        type: String,
    },
    phone: {
        type: String
    },
    CP: {
        type: String
    },
    history: [{
        type: Schema.Types.ObjectId,
        ref: 'History'
    }]
})

interface ICustomer extends Document {
    name: string
    email: string
    password: string
    addres: string
    phone: string
    CP: string
}

export const Customer = model<ICustomer>('Customer', CustomerSchema)