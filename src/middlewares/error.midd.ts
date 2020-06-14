import { Request, Response, NextFunction } from 'express'

export function ErrorMidd(err: any, req: Request, res: Response, next: NextFunction) {
    const httpStatus = err.status || 500
    return res.status(httpStatus).send({
        status: httpStatus,
        message: err.message || "Internal server error"
    })
}