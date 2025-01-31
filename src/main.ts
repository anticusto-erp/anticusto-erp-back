import { ApiExpress } from "./infra/http/express/api.express";
import { CreateStoreRoute } from "./infra/http/express/routes/store/store";
import { StoreRepository } from "./infra/repositories/store/store.repository";
import { CreateStoreUsecase } from "./use-case/store/create/create-store.usecase";

function main(){

    const aStoreRepository = StoreRepository.create();

    const createStoreUsecase = CreateStoreUsecase.create(aStoreRepository);

    const createRouteStoreUsecase = CreateStoreRoute.create(createStoreUsecase);
    
    const port = 8000;
    const api = ApiExpress.create([createRouteStoreUsecase]);
    api.start(port);

}

main();

