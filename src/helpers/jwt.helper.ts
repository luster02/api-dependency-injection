import { sign } from 'jsonwebtoken'
import config from '../config'

export function generateToken(user: any) {
    return sign({ user }, String(config.JWT_SECRET), { expiresIn: "4h" })
}

export function generateTokenResetPassword(user: any) {
    return sign({ user }, String(config.JWT_SECRET), { expiresIn: "15m" })
}