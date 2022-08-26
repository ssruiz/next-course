import { DB } from '.';
import { IProduct } from '../interfaces';
import { Product } from '../models';

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await DB.connect();

  const product = await Product.findOne({ slug }).lean();

  await DB.disconnect();

  if (!product) return null;

  return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
  slug: string;
}

export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
  await DB.connect();

  const slugs = await Product.find().select('slug -_id').lean();

  await DB.disconnect();

  return slugs;
};

export const getProductByTerm = async (term: string): Promise<IProduct[]> => {
  await DB.connect();

  const products = await Product.find({
    $text: { $search: term.toString().toLowerCase() },
  })
    .select('title images price inStock slug -_id')
    .lean();

  await DB.disconnect();

  return products;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  await DB.connect();

  const products = await Product.find()
    .select('title images price inStock slug -_id')
    .lean();

  await DB.disconnect();

  return products;
};
