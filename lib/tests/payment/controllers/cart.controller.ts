import { ICartService } from "../services/ICartService";
import { IPaymentService } from "../services/IPaymentService";
import { IShipmentService } from "../services/IShipmentService";
import { IAddressInfo, ICard } from "../services/Models";

export class CartController 
  {
    constructor(
      public _cartService: ICartService,
      public _paymentService: IPaymentService,
      public _shipmentService: IShipmentService
    ) {}

    checkOut(card: ICard, addressInfo: IAddressInfo): string 
    {
        const result = this._paymentService.charge(this._cartService.total(), card);
        if (result)
        {
            this._shipmentService.ship(addressInfo, this._cartService.items());
            return "charged";
        }
        else {
            return "not charged";
        }
    }
  }