import cloudinary from 'cloudinary'

export async function cloudinaryConfig(cloudName: any, apiKey: any, apiSecret: any) {
    return await cloudinary.v2.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
    })
}

export async function uploadPhoto(file: any) {
    return await cloudinary.v2.uploader.upload(file)
}

export async function deletePhoto(fileId: string) {
    return await cloudinary.v2.uploader.destroy(fileId)
}