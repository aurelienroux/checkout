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
