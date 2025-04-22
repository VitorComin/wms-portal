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

export interface TableIcon {
  action: (row: IReceivingProductsTableItems) => void;
  color: string;
  icon: string;
  tooltip: string;
  value: string;
}

export interface IReceivingTableColumns {
  property: string;
  label: string;
  type?: string;
  sortable?: boolean;
  icons?: TableIcon[];
}

export interface IShippingTableItems {
  id: string;
  name: string;
  code: string;
  quantity: number;
  destination?: string | null;
  shipping: string[];
}

interface IColumnIcon {
  action: () => void;
  color: string;
  icon: string;
  tooltip: string;
  value: string;
}

export interface IShippingTableColumns {
  property: string;
  label: string;
  type?: string;
  sortable?: boolean;
  icons?: IColumnIcon[];
}
