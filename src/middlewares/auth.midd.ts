import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import config from '../config/index'

export function verifyToken(req: any, res: Response, next: NextFunction) {
    const token = req.headers['authorization']
    if (!token) {
        const error: any = new Error()
        error.message = "Token must be sent"
        error.status = 400
        throw error
    }

    jwt.verify(token, String(config.JWT_SECRET), function (err: any, decodedToken: any) {
        if (err) {
            const error: any = new Error()
            error.message = "Invalid Token"
            error.status = 401
            throw error
        }

        req.user = decodedToken.user
        next()
    })
}