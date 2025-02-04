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
    
    //access-role controller
    const createAccesRoleRoute = CreateAccesRoleRoute.create(createAccesRoleusecase);
    
    const port = 8000;

    //all routes
    const api = ApiExpress.create([createRouteStore, listRouteStore, deleteRouteStore, findOneRouteStore, updateRouteStore, createAccesRoleRoute]);
    api.start(port);

}

main();

