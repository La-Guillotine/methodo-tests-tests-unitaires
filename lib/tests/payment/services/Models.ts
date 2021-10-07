export interface IAddressInfo {
  street: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
}

export interface ICard {
  cardNumber: string;
  name: string;
  validTo: Date;
}

export interface CartItem {
    productId: number;
    quantity: number;
    price: number;
  }