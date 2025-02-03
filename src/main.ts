import { ApiExpress } from "./infra/http/express/api.express";
import { CreateStoreRoute } from "./infra/http/express/routes/store/create-store";
import { StoreRepository } from "./infra/repositories/store/store.repository";
import { CreateStoreUsecase } from "./use-case/store/create/create-store.usecase";

import * as dotenv from "dotenv";
import { ListStoreUsecase } from "./use-case/store/list/list-store.usecase";
import { ListStoreRoute } from "./infra/http/express/routes/store/list-store";


function main(){
    dotenv.config();
    
    const aStoreRepository = StoreRepository.create();
    
    const createStoreUsecase = CreateStoreUsecase.create(aStoreRepository);
    const listStoreUsecase = ListStoreUsecase.create(aStoreRepository);
    
    const createRouteStore = CreateStoreRoute.create(createStoreUsecase);
    const listRouteStore = ListStoreRoute.create(listStoreUsecase);
    
    const port = 8000;
    const api = ApiExpress.create([createRouteStore, listRouteStore]);
    api.start(port);

}

main();

