export function ErrorRequest(status: number, message: string) {
    const error: any = new Error()
    error.status = status
    error.message = message
    return error
}