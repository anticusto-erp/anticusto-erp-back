import * as dotenv from "dotenv";

import { ApiExpress } from "./infra/http/express/api.express";
import { CreateStoreRoute } from "./infra/http/express/routes/store/create-store";
import { StoreRepository } from "./infra/repositories/store/store.repository";
import { CreateStoreUsecase } from "./use-case/store/create-store.usecase";

import { ListStoreUsecase } from "./use-case/store/list-store.usecase";
import { ListStoreRoute } from "./infra/http/express/routes/store/list-store";
import { DeleteStoreUsecase } from "./use-case/store/delete-store.usecase";
import { DeleteStoreRoute } from "./infra/http/express/routes/store/delete-store";
import { FindOneStoreUsecase } from "./use-case/store/find-one.usecase";
import { FindOneStoreRoute } from "./infra/http/express/routes/store/find-one-store";
import { UpdateStoreUsecase } from "./use-case/store/update-store.usecase";
import { UpdateStoreRoute } from "./infra/http/express/routes/store/update-store";
import { AccessRoleRepository } from "./infra/repositories/acess-role/acess-role.repository";
import { CreateAccessRoleUsecase } from "./use-case/access-role/create.usecase";
import { CreateAccesRoleRoute } from "./infra/http/express/routes/access-role/create";
import { EmployerRepository } from "./infra/repositories/employer/employer.repository";
import { CreateEmployerUsecase } from "./use-case/employer/create.usecase";
import { CreateEmployerRoute } from "./infra/http/express/routes/employer/create";

import { UserRepository } from "./infra/repositories/user/user.repository";
import { CreateUserRoute } from "./infra/http/express/routes/user/create";
import { CreateUserUsecase } from "./use-case/user/create";
import { LoginUsecase } from "./use-case/login/create";
import { LoginRoute } from "./infra/http/express/routes/login/create";
import { ListUserUsecase } from "./use-case/user/list";
import { ListUserRoute } from "./infra/http/express/routes/user/list";
import { ListEmployerUsecase } from "./use-case/employer/list.usecase";
import { ListEmployerRoute } from "./infra/http/express/routes/employer/list";
import { ListAccessRoute } from "./infra/http/express/routes/access-role/list";
import { ListAccesUsecase } from "./use-case/access-role/list.usecase";
import { GetIp } from "./infra/http/express/routes/getIp/ip";
import { SupplyRepository } from "./infra/repositories/supply/supply.repositorie";
import { CreateSupplyUsecase } from "./use-case/supply/create.usecase";
import { CreateSupplyRoute } from "./infra/http/express/routes/supply/create";
import { ProductRepository } from "./infra/repositories/product/product.repository";
import { CreateProductUsecase } from "./use-case/product/create.usecase";
import { CreateProductRoute } from "./infra/http/express/routes/product/create";
import { ListProductUsecase } from "./use-case/product/list.usecase";
import { ListProductRoute } from "./infra/http/express/routes/product/list";
import { ListSupplyRoute } from "./infra/http/express/routes/supply/list";
import { ListSupplyUsecase } from "./use-case/supply/list.usecase";
import { StockRepository } from "./infra/repositories/stock/stock.repository";
import { CreateStockUsecase } from "./use-case/stock/create.usecase";
import { CreateStockRoute } from "./infra/http/express/routes/stock/create";
import { ListStockUsecase } from "./use-case/stock/list.usecase";
import { ListStockRoute } from "./infra/http/express/routes/stock/list";
import { ClientRepository } from "./infra/repositories/client/Client.repository";
import { ListClientUsecase } from "./use-case/client/list.usecase";
import { CreateClientRoute } from "./infra/http/express/routes/client/create";
import { ListClientRoute } from "./infra/http/express/routes/client/list";
import { CreateClientUsecase } from "./use-case/client/create.usecase";
import { SaleRepository } from "./infra/repositories/sale/sale.repository";
import { CreateSaleUsecase } from "./use-case/sale/create.usecase";
import { ListSaleUsecase } from "./use-case/sale/list.usecase";
import { ListSaleRoute } from "./infra/http/express/routes/sale/list";
import { CreateSaleRoute } from "./infra/http/express/routes/sale/create";
import { ListOneSaleUsecase } from "./use-case/sale/list-one.usecase";
import { ListOneSaleRoute } from "./infra/http/express/routes/sale/list-one";
import { PaymentRepository } from "./infra/repositories/payment/payment.repository";
import { DeleteAccessRoleRoute } from "./infra/http/express/routes/access-role/delete";
import { DeleteAccessRoleUsecase } from "./use-case/access-role/delete.usecase";
import { FindOneAccessRoleUsecase } from "./use-case/access-role/find-one.usecase";
import { FindOneAccessRoleRoute } from "./infra/http/express/routes/access-role/find-one";
import { UpdateAccessRoleUsecase } from "./use-case/access-role/update.usecase";
import { UpdateAccessRoleRoute } from "./infra/http/express/routes/access-role/update";
import { DeleteClientUsecase } from "./use-case/client/delete.usecase";
import { DeleteClientRoute } from "./infra/http/express/routes/client/delete";
import { FindOneClientUsecase } from "./use-case/client/find-one.usecase";
import { FindOneClientRoute } from "./infra/http/express/routes/client/find-one";
import { UpdateClientUsecase } from "./use-case/client/update.usecase";
import { UpdateClientRoute } from "./infra/http/express/routes/client/update";
import { FindOneEmployerUsecase } from "./use-case/employer/find-one.usecase";
import { FindOneEmployerRoute } from "./infra/http/express/routes/employer/find-one";
import { UpdateEmployerUsecase } from "./use-case/employer/update.usecase";
import { UpdateEmployerRoute } from "./infra/http/express/routes/employer/update";
import { DeleteEmployerRoute } from "./infra/http/express/routes/employer/delete";
import { DeleteEmployerUsecase } from "./use-case/store/delete.usecase";
import { FindOneProductUsecase } from "./use-case/product/find-one.usecase";
import { FindOneProductRoute } from "./infra/http/express/routes/product/find-one";
import { DeleteProductUsecase } from "./use-case/product/delete.usecase";
import { DeleteProductRoute } from "./infra/http/express/routes/product/delete";
import { UpdateProductUsecase } from "./use-case/product/update.usecase";
import { UpdateProductRoute } from "./infra/http/express/routes/product/update";
import { DeleteStockUsecase } from "./use-case/stock/delete.usecase";
import { DeleteStockRoute } from "./infra/http/express/routes/stock/delete";
import { FindOneStockRoute } from "./infra/http/express/routes/stock/find-one";
import { FindOneStockUsecase } from "./use-case/stock/find-one.usecase";
import { UpdateStockUsecase } from "./use-case/stock/update.usecase";
import { UpdateStockRoute } from "./infra/http/express/routes/stock/update";


function main(){
    dotenv.config();

    //store restfull
    //store repository
    const aStoreRepository = StoreRepository.create();
    
    //store usecase
    const createStoreUsecase = CreateStoreUsecase.create(aStoreRepository);
    const listStoreUsecase = ListStoreUsecase.create(aStoreRepository);
    const deleteStoreUsecase = DeleteStoreUsecase.create(aStoreRepository);
    const findOneStoreUsecase = FindOneStoreUsecase.create(aStoreRepository);
    const updateStoreUsecase = UpdateStoreUsecase.create(aStoreRepository);
    //store controller
    const createRouteStore = CreateStoreRoute.create(createStoreUsecase);
    const listRouteStore = ListStoreRoute.create(listStoreUsecase);
    const deleteRouteStore = DeleteStoreRoute.create(deleteStoreUsecase);
    const findOneRouteStore = FindOneStoreRoute.create(findOneStoreUsecase);
    const updateRouteStore = UpdateStoreRoute.create(updateStoreUsecase);
   
    //access-role resfull
    //access-role repository
    const aAccessRoleRepository = AccessRoleRepository.create();

    //access-role usecase
    const createAccesRoleusecase = CreateAccessRoleUsecase.create(aAccessRoleRepository);
    const listAccesRoleusecase = ListAccesUsecase.create(aAccessRoleRepository);
    const deleteAccesRoleusecase = DeleteAccessRoleUsecase.create(aAccessRoleRepository);
    const findOneAccessRoleUsecase = FindOneAccessRoleUsecase.create(aAccessRoleRepository);
    const updateAccessRoleUsecase = UpdateAccessRoleUsecase.create(aAccessRoleRepository);
    

    //access-role controller
    const createAccesRoleRoute = CreateAccesRoleRoute.create(createAccesRoleusecase);
    const listAccesRoleRoute = ListAccessRoute.create(listAccesRoleusecase);
    const deleteAccesRoleRoute = DeleteAccessRoleRoute.create(deleteAccesRoleusecase);
    const findOneAccessRoleRoute = FindOneAccessRoleRoute.create(findOneAccessRoleUsecase);
    const updateAccessRoleRoute = UpdateAccessRoleRoute.create(updateAccessRoleUsecase);
    

    
    //employer resfull
    //employer repository
    const aEmployerRepository = EmployerRepository.create();

    //employer usecase
    const createEmployerusecase = CreateEmployerUsecase.create(aEmployerRepository, aStoreRepository);
    const listEmployerusecase = ListEmployerUsecase.create(aEmployerRepository);
    const findOneEmployerusecase = FindOneEmployerUsecase.create(aEmployerRepository);
    const updateEmployerusecase = UpdateEmployerUsecase.create(aEmployerRepository, aStoreRepository);
    const deleteEmployerusecase = DeleteEmployerUsecase.create(aEmployerRepository);
    //employer controller
    const createEmployerRoute = CreateEmployerRoute.create(createEmployerusecase);
    const listEmployerRoute = ListEmployerRoute.create(listEmployerusecase);
    const findOneEmployerRoute = FindOneEmployerRoute.create(findOneEmployerusecase);
    const updateEmployerRoute = UpdateEmployerRoute.create(updateEmployerusecase);
    const deleteEmployerRoute = DeleteEmployerRoute.create(deleteEmployerusecase);

    //user resfull
    //user repository
    const aUserRepository = UserRepository.create();

    //user usecase
    const createUserusecase = CreateUserUsecase.create(aUserRepository, aAccessRoleRepository, aEmployerRepository);
    const listUserusecase = ListUserUsecase.create(aUserRepository);
    
    //user controller
    const createUserRoute = CreateUserRoute.create(createUserusecase);
    const listUserRoute = ListUserRoute.create(listUserusecase);


    //supply resfull
    //reulstado repository
    const aSupplyRepository = SupplyRepository.create();

    //supply usecase
    const createSupplyUsecase = CreateSupplyUsecase.create(aSupplyRepository);
    const lisSupplyUsecase = ListSupplyUsecase.create(aSupplyRepository);
    
    //supply controller
    const createSupplyRoute = CreateSupplyRoute.create(createSupplyUsecase);
    const listSupplyRoute = ListSupplyRoute.create(lisSupplyUsecase);

    //product resfull
    //reulstado repository
    const aProductRepository = ProductRepository.create();

    //product usecase
    const createProductUsecase = CreateProductUsecase.create(aProductRepository);
    const listProductUsecase = ListProductUsecase.create(aProductRepository);
    const findOneProductUsecase = FindOneProductUsecase.create(aProductRepository);
    const deleteProductUsecase = DeleteProductUsecase.create(aProductRepository);
    const updateProductUsecase = UpdateProductUsecase.create(aProductRepository);
    
    //product controller
    const createProductRoute = CreateProductRoute.create(createProductUsecase);
    const listProductRoute = ListProductRoute.create(listProductUsecase);
    const findOneProductRoute = FindOneProductRoute.create(findOneProductUsecase);
    const deleteProductRoute = DeleteProductRoute.create(deleteProductUsecase);
    const updateProductRoute = UpdateProductRoute.create(updateProductUsecase);

    //stock resfull
    //stock repository
    const aStockRepository = StockRepository.create();

    //stock usecase
    const createStockUsecase = CreateStockUsecase.create(aStockRepository, aProductRepository);
    const listStockUsecase = ListStockUsecase.create(aStockRepository, aProductRepository);
    const deleteStockUsecase = DeleteStockUsecase.create(aStockRepository);
    const findOneStockUsecase = FindOneStockUsecase.create(aStockRepository, aProductRepository);
    const updateStockUsecase = UpdateStockUsecase.create(aStockRepository);
    
    //stock controller
    const createStockRoute = CreateStockRoute.create(createStockUsecase);
    const listStockRoute = ListStockRoute.create(listStockUsecase);
    const deleteStockRoute = DeleteStockRoute.create(deleteStockUsecase);
    const findOneStockRoute = FindOneStockRoute.create(findOneStockUsecase);
    const updateStockRoute = UpdateStockRoute.create(updateStockUsecase);


    //client resfull
    //client repository
    const aClienRepository = ClientRepository.create();

    //client usecase
    const createClientUsecase= CreateClientUsecase.create(aClienRepository);
    const listClientUsecase= ListClientUsecase.create(aClienRepository);
    const deleteClientUsecase= DeleteClientUsecase.create(aClienRepository);
    const findOneClientUsecase = FindOneClientUsecase.create(aClienRepository);
    const updateClientUsecase = UpdateClientUsecase.create(aClienRepository);
    
    //client controller
    const createClientRoute = CreateClientRoute.create(createClientUsecase);
    const listClientRoute = ListClientRoute.create(listClientUsecase);
    const deleteClientRoute = DeleteClientRoute.create(deleteClientUsecase);
    const findOneClientRoute = FindOneClientRoute.create(findOneClientUsecase);
    const updateClientRoute = UpdateClientRoute.create(updateClientUsecase);
    
    
    //sale resfull
    //sale repository
    const aSaleRepository = SaleRepository.create();
    const aPaymentRepository = PaymentRepository.create();

    //sale usecase

    const createSaleUsecase= CreateSaleUsecase.create(aSaleRepository, aProductRepository, aClienRepository, aUserRepository,aStockRepository, aPaymentRepository);
    const listSaleUsecase= ListSaleUsecase.create(aSaleRepository, aProductRepository, aClienRepository, aUserRepository);
    const listOneSaleUsecase= ListOneSaleUsecase.create(aSaleRepository, aProductRepository, aClienRepository, aUserRepository);
    
    //sale controller
    const createSaleRoute = CreateSaleRoute.create(createSaleUsecase);
    const listSaleRoute = ListSaleRoute.create(listSaleUsecase);
    const listOneSaleRoute = ListOneSaleRoute.create(listOneSaleUsecase);
    


    //login resr    
    //login usecase
    const loginUsecase = LoginUsecase.create(aUserRepository);
    //user controller
    const loginRoute = LoginRoute.create(loginUsecase);


    const getIpRoute = GetIp.create();

    const port = process.env.PORT ? Number(process.env.PORT) : 8001;

    //all routes
    const api = ApiExpress.create([
        createRouteStore,
        listRouteStore,
        deleteRouteStore,
        findOneRouteStore,
        updateRouteStore,
        
        createAccesRoleRoute,
        listAccesRoleRoute,
        deleteAccesRoleRoute,
        findOneAccessRoleRoute,
        updateAccessRoleRoute,

        createClientRoute,
        listClientRoute,
        deleteClientRoute,
        findOneClientRoute,
        updateClientRoute,
        
        createEmployerRoute,
        listEmployerRoute,
        findOneEmployerRoute,
        updateEmployerRoute,
        deleteEmployerRoute,
        
        createUserRoute,
        listUserRoute,
        
        createSupplyRoute,
        listSupplyRoute,

        createProductRoute,
        listProductRoute,
        findOneProductRoute,
        deleteProductRoute,
        updateProductRoute,

        createStockRoute,
        listStockRoute,
        deleteStockRoute,
        findOneStockRoute,
        updateStockRoute,

        listSaleRoute,
        createSaleRoute,
        listOneSaleRoute,

        getIpRoute,
        loginRoute
    ]);
    
    api.start(port);

}

main();

