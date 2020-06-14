import { Request, Response } from 'express'
import { HomeService } from '../services'
let _homeService: any = null

export class HomeController {
    constructor({ HomeService }: any) {
        _homeService = HomeService
    }

    index(req: Request, res: Response) {
        return res.send(_homeService.index())
    }
}