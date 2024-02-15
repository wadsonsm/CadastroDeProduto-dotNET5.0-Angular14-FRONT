import { Guid } from "guid-typescript";

export class Products
{
  id?: Guid;
  productName?: string;
  productCost?: string;
  productDescription?: string;
  stock?: number;
}
