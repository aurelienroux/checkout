export interface product {
  id: string
  name: string
  image: string
  variants: variant[]
  description: string
  defaultVariantId: string
}

export interface variant {
  id: string
  name: string
  price: number
  attributes: {
    name: string
    value: string
  }[]
}

export interface updateAttribute {
  attribute: string
  value: string
}

export interface productToAdd {
  description: string
  image: string
  name: string
  price: number
  productId: string
  variantId: string
}

export interface productInCart {
  description: string
  price: number
  productId: string
  qty: number
  variantId: string
}

export enum attributeEnum {
  SIZE = 'Size',
  FABRIC = 'Fabric'
}

export enum cartActionEnum {
  ADD = 'add',
  REMOVE = 'remove'
}
