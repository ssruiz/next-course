import { createContext } from 'react';
import { ICartProduct, ISummary } from '../../interfaces';
import { ShippingAddress } from './CartProvider';

interface ContextProps {
  cart: ICartProduct[];
  summary: ISummary;
  initialized: boolean;
  shippingAddress: ShippingAddress;

  addToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeProducFromCart: (product: ICartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);
