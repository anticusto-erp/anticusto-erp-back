import { ApiExpress } from "./infra/http/express/api.express";
import { CreateStoreRoute } from "./infra/http/express/routes/store/create-store";
import { StoreRepository } from "./infra/repositories/store/store.repository";
import { CreateStoreUsecase } from "./use-case/store/create-store.usecase";

import * as dotenv from "dotenv";
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
import { CreateEmployerUsecase } from "./use-case/employer/create";
import { CreateEmployerRoute } from "./infra/http/express/routes/employer/create";

import { UserRepository } from "./infra/repositories/user/user.repository";
import { CreateUserRoute } from "./infra/http/express/routes/user/create";
import { CreateUserUsecase } from "./use-case/user/create";
import { LoginUsecase } from "./use-case/login/create";
import { LoginRoute } from "./infra/http/express/routes/login/create";
import { ListUserUsecase } from "./use-case/user/list";
import { ListUserRoute } from "./infra/http/express/routes/user/list";
import { ListEmployerUsecase } from "./use-case/employer/list";
import { ListEmployerRoute } from "./infra/http/express/routes/employer/list";
import { ListAccessRoute } from "./infra/http/express/routes/access-role/list";
import { ListAccesUsecase } from "./use-case/access-role/list";
import { GetIp } from "./infra/http/express/routes/getIp/ip";
import { SupplyRepository } from "./infra/repositories/supply/supply.repositorie";
import { CreateSupplyUsecase } from "./use-case/supply/create.usecase";
import { CreateSupplyRoute } from "./infra/http/express/routes/supply/create";


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
    
    //access-role controller
    const createAccesRoleRoute = CreateAccesRoleRoute.create(createAccesRoleusecase);
    const listAccesRoleRoute = ListAccessRoute.create(listAccesRoleusecase);
  

    
    //employer resfull
    //employer repository
    const aEmployerRepository = EmployerRepository.create();

    //employer usecase
    const createEmployerusecase = CreateEmployerUsecase.create(aEmployerRepository, aStoreRepository);
    const listEmployerusecase = ListEmployerUsecase.create(aEmployerRepository);
    
    //employer controller
    const createEmployerRoute = CreateEmployerRoute.create(createEmployerusecase);
    const listEmployerRoute = ListEmployerRoute.create(listEmployerusecase);
    

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
    const createSupplyUsecase= CreateSupplyUsecase.create(aSupplyRepository);
    
    //supply controller
    const createSupply = CreateSupplyRoute.create(createSupplyUsecase);


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
        
        createEmployerRoute,
        listEmployerRoute,
        
        createUserRoute,
        listUserRoute,
        
        createSupply,
        
        getIpRoute,
        loginRoute
    ]);
    
    api.start(port);

}

main();

