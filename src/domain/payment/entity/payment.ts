export type paymentProps = {
    id?: string,
    id_sale: string,
    price: number
}


export class Payment {

    public constructor(private readonly props: paymentProps ){}

    public static create(id_sale: string, price: number, id?: string){
        return new Payment({
            id: id ?? crypto.randomUUID().toString(),
            id_sale,
            price
        })
    }

    public get id(){
        return this.props.id;
    }

    public get id_sale(){
        return this.props.id_sale;
    }

    public get price(){
        return this.props.price;
    }

}
