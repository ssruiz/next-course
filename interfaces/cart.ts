import { ISize, IType } from './products';

export interface ICartProduct {
  _id: number;
  image: string;
  price: number;
  size?: ISize;
  slug: string;
  title: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  quantity: number;
}
