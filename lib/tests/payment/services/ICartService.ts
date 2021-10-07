import { CartItem } from "./Models";

export interface ICartService {
    total(): number;
    items(): CartItem[];
}