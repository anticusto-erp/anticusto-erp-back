import { Request, Response } from "express";

export type HttpMethod = "get" | "list";

export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
    PATCH: "patch" as HttpMethod,
    DELETE: "delete" as HttpMethod
}

export interface Route {
    getHandler(): (request: Request, response: Response) => Promise<void>;
    getPath(): string;
    getMethod(): HttpMethod;
}
