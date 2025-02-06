import { Request, Response } from "express";
import {HttpMethod, Route} from "../route";

import http from "https";

export class GetIp implements Route{
    public constructor(private readonly path: string, private readonly method: HttpMethod){}

    public static create(){
        return new GetIp(
            "/get-ip",
            HttpMethod.GET
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): string {
        return this.method;
    }

    public getHandler(){
        return async (request: Request, response: Response) => {
            try {

                http.get('https://api.ipify.org', (res) => {
                    let data = '';

                    res.on('data', (chunk) => {
                        data += chunk;
                    });

                    res.on('end', () => {
                        response.send(`O IP público do servidor é: ${data}`);
                    });


                }).on('error', (error) => {
                    console.error('Erro ao obter o IP:', error);
                    response.status(500).send('Erro ao obter o IP');
                  });

            } catch (error: any) {
                response.status(404).json({message: error.message}).send();
                
            }
        } 
    }

}