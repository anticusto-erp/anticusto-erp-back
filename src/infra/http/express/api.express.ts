import { IApi } from "../api";
import express, { Express } from "express";
import cors from "cors";
import { Route } from "./routes/route";

export class ApiExpress implements IApi {

    private app: Express | any;

    private constructor(routes: Route[]){
        this.app = {}
        this.app = express();

        //For developement use any url
        this.app.use(cors());

        //for production use the right url
        // this.app.use(cors({
        //     origin: "http://localhost:5173",
        //     methods: ["GET", "POST", "DELETE", "PATCH"],
        //     allowedHeaders: ["Content-Type", "Authorization"]
        // }));

        this.app.use(express.json());
        this.addRoutes(routes);
    }

    public static create(routes: Route[]){
        return new ApiExpress(routes);
    }

    public addRoutes(routes: Route[]){
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();

            this.app[method](path, handler);
        });
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server is running on por ${port}`);
            this.listenRoutes();
        })
    }

    private listenRoutes(){
        const routes = this.app._router.stack.filter((route: any) => route.route).map((route: any) => {
            return {
                path: route.route.path,
                method: route.route.stack[0].method
            }
        });

        console.log(routes);
    }

}