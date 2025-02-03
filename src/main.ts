import { ApiExpress } from "./infra/http/express/api.express";
import { CreateStoreRoute } from "./infra/http/express/routes/store/store";
import { StoreRepository } from "./infra/repositories/store/store.repository";
import { CreateStoreUsecase } from "./use-case/store/create/create-store.usecase";

function main(){

    const aStoreRepository = StoreRepository.create();
    
    const createStoreUsecase = CreateStoreUsecase.create(aStoreRepository);
    // aStoreRepository.save()
    
    const createRouteStore = CreateStoreRoute.create(createStoreUsecase);
    
    const port = 8000;
    const api = ApiExpress.create([createRouteStore]);
    api.start(port);

}

main();

