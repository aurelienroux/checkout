import { shallowMount } from '@vue/test-utils'

import ProductTile from '@/components/ProductTile.vue'
import { productMock } from './__mocks__'
import { attributeEnum } from '@/types'

const wrapper = shallowMount(ProductTile, {
  propsData: {
    productInfo: productMock
  },
  computed: {
    selectedVariant: () => productMock.variants[0],
    sizeOptions: () => ['36', '38'],
    fabricOptions: () => ['cotton', 'leather']
  }
})

describe('ProductTile component', () => {
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.tile__image').exists()).toBe(true)
    expect(wrapper.find('.tile__content').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toEqual(productMock.image)
    expect(wrapper.find('.button--purple').exists()).toBe(true)
    expect(wrapper.find('.button--purple').text()).toEqual('add to cart')
  })

  it('renders with correct header', () => {
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('header .price').exists()).toBe(true)
    expect(wrapper.find('header h2').text()).toEqual(productMock.name)
    expect(wrapper.find('header .price').text()).toEqual(`$${productMock.variants[0].price}`)
  })

  it('renders with description', () => {
    expect(wrapper.find('p').text()).toEqual(productMock.description)
  })

  it('renders with correct attributes', () => {
    const selector = 'attributeselector-stub'

    expect(wrapper.findAll(selector).length).toBe(2)
    expect(wrapper.findAll(selector).at(0).attributes('attribute')).toEqual(attributeEnum.SIZE)
    expect(wrapper.findAll(selector).at(0).attributes('attroptions')).toEqual('36,38')
    expect(wrapper.findAll(selector).at(0).attributes('selectedvalue')).toEqual('36')
    expect(wrapper.findAll(selector).at(1).attributes('attribute')).toEqual(attributeEnum.FABRIC)
    expect(wrapper.findAll(selector).at(1).attributes('attroptions')).toEqual('cotton,leather')
    expect(wrapper.findAll(selector).at(1).attributes('selectedvalue')).toEqual('cotton')
  })
})
