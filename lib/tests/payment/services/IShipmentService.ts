import { CartItem, IAddressInfo } from "./Models";

export interface IShipmentService {
    ship(info: IAddressInfo, items: CartItem[]): void;
}