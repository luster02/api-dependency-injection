import fs from 'fs-extra'

export function removeFile(filePath: any): Promise<any> {
    return fs.unlink(filePath)
        .then(() => true)
        .catch((error) => {
            console.log(error)
            return false
        })
}