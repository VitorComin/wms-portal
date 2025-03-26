export interface IProduct {
    id: string,
    name: string,
    code: string,
    quantity: number,
    status: "Recebimento" | "Estoque" | "Expedição" | "Expedido",
    updated_at: string
}