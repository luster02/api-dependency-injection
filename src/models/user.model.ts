import { Schema, model, Document } from 'mongoose'
import { compareSync, hashSync, genSaltSync } from 'bcryptjs'

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'email is required']
    }
})

interface IUser extends Document {
    name: string
    email: string
    password: string
    comparePassword(password: string): boolean
    toJSON(): IUser
}

UserSchema.methods.comparePassword = function (password: string) {
    return compareSync(password, this.password)
}

UserSchema.methods.toJSON = function () {
    let user: IUser = this.toObject()
    delete user.password
    return user
}

UserSchema.pre('save', async function (next) {
    const user: any = this

    if (!user.isModified('password')) {
        return next()
    }

    const salt = genSaltSync(10)
    const hashPassword = hashSync(user.password, salt)
    user.password = hashPassword
    next()
})

export const User = model<IUser>('User', UserSchema)