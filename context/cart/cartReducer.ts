import { ICartProduct, ISummary } from '../../interfaces';
import { CartState } from '.';
import { ShippingAddress } from './CartProvider';

type CartType =
  | {
      type: 'LoadCartFromCookies';
      payload: ICartProduct[];
    }
  | { type: 'UpdateProductsInCart'; payload: ICartProduct[] }
  | { type: 'UpdateQuantity'; payload: ICartProduct }
  | { type: 'RemoveProductFromCart'; payload: ICartProduct }
  | { type: 'UpdateSummary'; payload: ISummary }
  | { type: 'UpdateShippingAddress'; payload: ShippingAddress }
  | { type: 'UpdateShippingAddressV2'; payload: ShippingAddress };

export const cartReducer = (state: CartState, action: CartType): CartState => {
  switch (action.type) {
    case 'LoadCartFromCookies':
      return {
        ...state,
        initialized: true,
        cart: action.payload,
      };
    case 'UpdateProductsInCart':
      return {
        ...state,
        cart: [...action.payload],
      };
    case 'UpdateQuantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return { ...product, quantity: action.payload.quantity };
        }),
      };
    case 'RemoveProductFromCart':
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (product._id !== action.payload._id) return true;
          if (product.size !== action.payload.size) return true;

          return false;
        }),
      };
    case 'UpdateSummary':
      return {
        ...state,
        summary: action.payload,
      };
    case 'UpdateShippingAddress':
    case 'UpdateShippingAddressV2':
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};
