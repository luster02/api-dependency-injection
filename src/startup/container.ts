import { createContainer, asClass, asValue, asFunction } from 'awilix'
import config from '../config'
import app from '.'
//services
import { HomeService, OrgService, UserService, ProductService } from '../services'
//constrollers
import { HomeController, OrgController, ProductController, UserController } from '../controllers'
//routes
import { HomeRoutes, ProductRoutes, OrgRoutes, UserRoutes } from '../routes/index.route'
import Routes from '../routes/index'
//models
import { Org, Product, User } from '../models/index'
//repositories
import { OrgRepository, ProductRepository, UserRepository } from '../repositories'

const container = createContainer()

container
    .register({
        //app register
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        //service register
        HomeService: asClass(HomeService).singleton(),
        OrgService: asClass(OrgService).singleton(),
        UserService: asClass(UserService).singleton(),
        ProductService: asClass(ProductService).singleton(),
        config: asValue(config)
    })
    .register({
        //controller register
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        OrgController: asClass(OrgController.bind(OrgController)).singleton(),
        ProductController: asClass(ProductController.bind(ProductController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
    })
    .register({
        //routes register
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        ProductRoutes: asFunction(ProductRoutes).singleton(),
        OrgRoutes: asFunction(OrgRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton(),
    })
    .register({
        //models register
        User: asValue(User),
        Product: asValue(Product),
        Org: asValue(Org)
    })
    .register({
        //repositories register
        OrgRepository: asClass(OrgRepository).singleton(),
        ProductRepository: asClass(ProductRepository).singleton(),
        UserRepository: asClass(UserRepository).singleton(),
    })

export default container

