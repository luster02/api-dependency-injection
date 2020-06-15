import { Request, Response } from 'express'
let _homeService: any = null

export class HomeController {
    constructor({ HomeService }: any) {
        _homeService = HomeService
    }

    index(req: Request, res: Response) {
        return res.send(_homeService.index())
    }
}