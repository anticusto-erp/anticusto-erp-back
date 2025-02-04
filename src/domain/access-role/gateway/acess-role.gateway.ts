export interface AcessRoleGateway {
    save(): Promise<void>;
    list(): Promise<void>;
    findOne(): Promise<void>;
    update(): Promise<void>;
    delete(): Promise<void>;
}