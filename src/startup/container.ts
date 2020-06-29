import { createContainer, asClass, asValue, asFunction } from 'awilix'
import config from '../config'
import app from '.'
//services
import {
    HomeService,
    OrgService,
    UserService,
    ProductService,
    AuthService,
    CartService,
    CustomerService,
    HistoryService
} from '../services'
//constrollers
import {
    HomeController,
    OrgController,
    ProductController,
    UserController,
    AuthController,
    CartController,
    CustomerController,
    HistoryController
} from '../controllers'
//routes
import {
    HomeRoutes,
    ProductRoutes,
    OrgRoutes,
    UserRoutes,
    AuthRoutes,
    CartRoutes,
    CustomerRoutes,
    HistoryRoutes
} from '../routes/index.route'
import Routes from '../routes/index'
//models
import {
    Org,
    Product,
    User,
    Cart,
    History,
    Customer
} from '../models/index'
//repositories
import {
    OrgRepository,
    ProductRepository,
    UserRepository,
    CartRepository,
    CustomerRepository,
    HistoryRepository
} from '../repositories'

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
        AuthService: asClass(AuthService),
        CartService: asClass(CartService).singleton(),
        CustomerService: asClass(CustomerService).singleton(),
        HistoryService: asClass(HistoryService).singleton(),
        config: asValue(config)
    })
    .register({
        //controller register
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        OrgController: asClass(OrgController.bind(OrgController)).singleton(),
        ProductController: asClass(ProductController.bind(ProductController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        CartController: asClass(CartController.bind(CartController)).singleton(),
        CustomerController: asClass(CustomerController.bind(CustomerController)).singleton(),
        HistoryController: asClass(HistoryController.bind(HistoryController)).singleton(),
    })
    .register({
        //routes register
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        ProductRoutes: asFunction(ProductRoutes).singleton(),
        OrgRoutes: asFunction(OrgRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        CartRoutes: asFunction(CartRoutes).singleton(),
        CustomerRoutes: asFunction(CustomerRoutes).singleton(),
        HistoryRoutes: asFunction(HistoryRoutes).singleton(),
    })
    .register({
        //models register
        User: asValue(User),
        Product: asValue(Product),
        Org: asValue(Org),
        Cart: asValue(Cart),
        History: asValue(History),
        Customer: asValue(Customer),
    })
    .register({
        //repositories register
        OrgRepository: asClass(OrgRepository).singleton(),
        ProductRepository: asClass(ProductRepository).singleton(),
        UserRepository: asClass(UserRepository).singleton(),
        CartRepository: asClass(CartRepository).singleton(),
        CustomerRepository: asClass(CustomerRepository).singleton(),
        HistoryRepository: asClass(HistoryRepository).singleton(),
    })

export default container

