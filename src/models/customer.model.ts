import { Schema, Document, model } from 'mongoose'
import { compareSync, hashSync, genSaltSync } from 'bcryptjs'

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
    }
})

interface ICustomer extends Document {
    name: string
    email: string
    password: string
    addres: string
    phone: string
    CP: string
    comparePassword(password: string): boolean
    toJSON(): ICustomer
}

CustomerSchema.methods.comparePassword = function (password: string) {
    return compareSync(password, this.password)
}

CustomerSchema.methods.toJSON = function () {
    let user: ICustomer = this.toObject()
    delete user.password
    return user
}

CustomerSchema.pre('save', async function (next) {
    const user: any = this

    if (!user.isModified('password')) {
        return next()
    }

    const salt = genSaltSync(10)
    const hashPassword = hashSync(user.password, salt)
    user.password = hashPassword
    next()
})


export const Customer = model<ICustomer>('Customer', CustomerSchema)