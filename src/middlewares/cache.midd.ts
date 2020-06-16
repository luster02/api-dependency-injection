import { Request, NextFunction } from 'express'
import mcache from 'memory-cache'
import config from '../config'

export default function (duration: number) {
    return (req: Request, res: any, next: NextFunction) => {
        const key = config.CACHE_KEY + req.originalUrl || req.url
        const cacheBody = mcache.get(key)

        if (cacheBody) {
            return res.json({ ok: true, data: JSON.parse(cacheBody) })
        } else {
            res.sendResponse = res.send
            res.send = (body: any) => {
                mcache.put(key, body, duration * 1000)
                res.sendResponse(body)
            }
            next()
        }
    }
}