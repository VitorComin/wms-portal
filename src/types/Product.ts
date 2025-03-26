export interface IProduct {
    id: string,
    name: string,
    code: string,
    quantity: number,
    status: "recebimento" | "estoque" | "expedicao" | "expedido",
    updated_at: string
}