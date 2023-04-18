import { client } from './client';

export const atCheckList = async (
  productId: string | undefined,
  businessType: string | undefined,
) => {
    if (productId && businessType) {
      const { data } = await client.get(`/api/detail/product/${productId}/business/${businessType}/`);
      return data;
    } else {
      console.error(productId, businessType);
    }
};

export const fromFavorite = async (
  productId: string | undefined,
  businessType: string | undefined,
  goodsId: string | undefined,
) => {
  try {
    const { data } = await client.get(`/api/detail/product/${productId}/goods/${goodsId}/business/${businessType}`);
    return data;
  } catch (error) {}
};

export const detailSelectBoxChange = async (
  goodsId: string | undefined,
  businessType: string | undefined,
) => {
  try {
    if (goodsId && businessType) {
      const { data } = await client.get(`/api/detail/goods/${goodsId}/business/${businessType}`);
      return data;
    }
  } catch (error) {
    // console.error(error);
  }
};
