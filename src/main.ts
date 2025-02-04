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


function main(){
    dotenv.config();
    
    const aStoreRepository = StoreRepository.create();
    
    const createStoreUsecase = CreateStoreUsecase.create(aStoreRepository);
    const listStoreUsecase = ListStoreUsecase.create(aStoreRepository);
    const deleteStoreUsecase = DeleteStoreUsecase.create(aStoreRepository);
    const findOneStoreUsecase = FindOneStoreUsecase.create(aStoreRepository);
    
    const createRouteStore = CreateStoreRoute.create(createStoreUsecase);
    const listRouteStore = ListStoreRoute.create(listStoreUsecase);
    const deleteRouteStore = DeleteStoreRoute.create(deleteStoreUsecase);
    const findOneRouteStore = FindOneStoreRoute.create(findOneStoreUsecase);
   
    
    const port = 8000;
    const api = ApiExpress.create([createRouteStore, listRouteStore, deleteRouteStore, findOneRouteStore]);
    api.start(port);

}

main();

