import { productInCart, product, attributeEnum } from '@/types'

export const productInCartMock: productInCart = {
  description: 'description',
  price: 100,
  productId: '1',
  qty: 4,
  variantId: '4'
}

export const productMock: product = {
  id: '1',
  name: 'product name',
  image: 'http://image.example',
  variants: [
    {
      id: '1',
      name: '36 / cotton',
      price: 99,
      attributes: [
        {
          name: attributeEnum.SIZE,
          value: '36'
        },
        {
          name: attributeEnum.FABRIC,
          value: 'cotton'
        }
      ]
    }
  ],
  description: 'description',
  defaultVariantId: '1'
}
