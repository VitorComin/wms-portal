export interface IProduct {
  id: string;
  name: string;
  code: string;
  quantity: number;
  status: string;
  destination?: string | null;
  updated_at: string;
}

export interface IProductInfosMap {
  stockProducts: IProduct[];
  receivingProducts: IProduct[];
  shippingProducts: IProduct[];
  shippedProducts: IProduct[];
  todayShippedProducts: IProduct[];
}

export interface IHomeProductsTableColumns {
  property: string;
  label: string;
}

export interface IHomeProductsTableItens {
  name: string;
  code: string;
  quantity: number;
  status: string;
}

export interface IReceivingProductsTableItems {
  id: string;
  name: string;
  code: string;
  quantity: number;
  receive: string[];
}
