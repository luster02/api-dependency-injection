import { Schema, model, Document } from 'mongoose'
import Autopopulate from 'mongoose-autopopulate'

const OrgSchema = new Schema({
    name: {
        type: String,
        required: [true, 'org name is required']
    },
    description: {
        type: String,
        required: [true, 'org description is required']
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    category: {
        type: String,
        default: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'org owner is required'],
        //autopopulate: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        autopopulate: true
    }],
    logoUrl: {
        type: String,
        default: 'https://res.cloudinary.com/dqnilvouh/image/upload/v1586642238/placeholder_zhy1ce.png'
    },
    logoId: {
        type: String
    }
})

OrgSchema.plugin(Autopopulate)

interface IOrg extends Document {
    name: string
    description: string
    status: string
    category: string
    owner: string
    products: [string]
    logoUrl: string
    logoId: string
}

export const Org = model<IOrg>('Org', OrgSchema)