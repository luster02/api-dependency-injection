import { createContainer, asClass, asValue, asFunction } from 'awilix'
import config from '../config'
import app from '.'
//services
import { HomeService } from '../services'
//constrollers
import { HomeController } from '../controllers'
//routes
import { HomeRoutes } from '../routes/index.route'
import Routes from '../routes/index'

const container = createContainer()

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        HomeService: asClass(HomeService).singleton()
    })
    .register({
        HomeController: asClass(HomeController.bind(HomeController)).singleton()
    })
    .register({
        HomeRoutes: asFunction(HomeRoutes).singleton()
    })

export default container

