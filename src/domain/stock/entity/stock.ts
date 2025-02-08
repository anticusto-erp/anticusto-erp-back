export type StockProps = {
    id: string;
    id_produto: string;
    quantidade: number;
    created_at: string;
    updated_at: string;
}

export class Stock {

    public constructor(props: StockProps){}

    public static create(id_produto: string, quantidade: number){}

}
