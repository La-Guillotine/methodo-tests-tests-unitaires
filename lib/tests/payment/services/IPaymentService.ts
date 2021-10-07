import { ICard } from "./Models";

export interface IPaymentService {
  charge(total: number, card: ICard): boolean;
}