import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';

import { ICartProduct, ShippingAddress } from '../../interfaces';

import { CartContext, cartReducer } from './';
import { IProduct, ISummary } from '../../interfaces';
import Cookies from 'js-cookie';

export interface CartState {
  initialized: boolean;
  cart: ICartProduct[];
  summary: ISummary;
  shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  initialized: false,
  summary: { numberOfItems: 0, subTotal: 0, taxes: 0, total: 0 },
  shippingAddress: undefined,
};

interface Props {
  children?: React.ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
        : [];
      dispatch({ type: 'LoadCartFromCookies', payload: cookieProducts });
    } catch (error) {
      dispatch({ type: 'LoadCartFromCookies', payload: [] });
    }
  }, []);

  useEffect(() => {
    if (Cookie.get('firstName')) {
      const shippingAddress: ShippingAddress = {
        firstName: Cookie.get('firstName') || '',
        lastName: Cookie.get('lastName') || '',
        address: Cookie.get('address') || '',
        addres2: Cookie.get('addres2') || '',
        zip: Cookie.get('zip') || '',
        country: Cookie.get('country') || '',
        city: Cookie.get('city') || '',
        phone: Cookie.get('phone') || '',
      };
      dispatch({ type: 'UpdateShippingAddress', payload: shippingAddress });
    }
  }, []);

  useEffect(() => {
    if (state.initialized) Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart, state.initialized]);

  useEffect(() => {
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary: ISummary = state.cart.reduce(
      (prev: ISummary, currentValue: ICartProduct) => {
        const subTotal =
          prev.subTotal + currentValue.quantity * currentValue.price;

        const taxes = subTotal * taxRate;

        return {
          numberOfItems: prev.numberOfItems + currentValue.quantity,
          subTotal,
          taxes,
          total: prev.total + subTotal + taxes,
        };
      },
      { numberOfItems: 0, subTotal: 0, taxes: 0, total: 0 } as ISummary
    );

    dispatch({ type: 'UpdateSummary', payload: orderSummary });
  }, [state.cart]);

  const addToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);

    const productIncarButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );

    if (!productInCart)
      return dispatch({
        type: 'UpdateProductsInCart',
        payload: [...state.cart, product],
      });

    if (!productIncarButDifferentSize)
      return dispatch({
        type: 'UpdateProductsInCart',
        payload: [...state.cart, product],
      });

    const updateProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;

      if (p.size !== product.size) return p;

      return { ...p, quantity: p.quantity + product.quantity };
    });

    console.log(updateProducts);

    dispatch({
      type: 'UpdateProductsInCart',
      payload: updateProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({
      type: 'UpdateQuantity',
      payload: product,
    });
  };

  const removeProducFromCart = (product: ICartProduct) => {
    dispatch({
      type: 'RemoveProductFromCart',
      payload: product,
    });
  };

  const updateAddress = (address: ShippingAddress) => {
    Cookies.set('firstName', address.firstName);
    Cookies.set('lastName', address.lastName);
    Cookies.set('address', address.address);
    Cookies.set('addres2', address.addres2 || '');
    Cookies.set('zip', address.zip);
    Cookies.set('country', address.country);
    Cookies.set('city', address.city);
    Cookies.set('phone', address.phone);

    dispatch({
      type: 'UpdateShippingAddressV2',
      payload: address,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateCartQuantity,
        removeProducFromCart,
        updateAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
