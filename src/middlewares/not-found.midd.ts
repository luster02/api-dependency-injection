import { Request, Response, NextFunction } from 'express'

export function NotFoundMidd(req: Request, res: Response, next: NextFunction) {
    return res.status(404).send({ status: 404, message: 'Resource not found' })
}