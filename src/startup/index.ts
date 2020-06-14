import express from 'express'

let _express: any = null
let _config: any = null

export default class Server {
    constructor({ config, router }: any) {
        _config = config
        _express = express().use(router)
    }

    start() {
        return new Promise(resolve => {
            _express.listen(_config.PORT, () => {
                console.log(`server on port ${_config.PORT}`)
                resolve()
            })
        })
    }
}