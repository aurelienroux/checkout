import { shallowMount } from '@vue/test-utils'
import ProductCartTile from '@/components/ProductCartTile.vue'
import { cartActionEnum } from '@/types'

const product = {
  id: '1',
  name: 'product name',
  image: 'http://image.example',
  variants: [
    {
      id: '1',
      name: '36 / cotton',
      price: 99,
      attributes: {
        name: 'Size',
        value: '36'
      }
    }
  ],
  description: 'string',
  defaultVariantId: 'string'
}

const adjustQty = jest.fn()

const wrapper = shallowMount(ProductCartTile, {
  propsData: {
    product
  },
  methods: {
    adjustQty
  }
})

describe('ProductCartTile component', () => {
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.tile').exists()).toBe(true)
    expect(wrapper.find('.tile__image').exists()).toBe(true)
    expect(wrapper.find('.tile__content').exists()).toBe(true)
    expect(wrapper.find('h3').exists()).toBe(true)
    expect(wrapper.find('.tile__qty').exists()).toBe(true)
    expect(wrapper.findAll('.button').length).toBe(2)
  })

  it('triggers adjustQty method on click', async () => {
    await wrapper.findAll('.button').at(0).trigger('click')
    expect(adjustQty).toHaveBeenCalledWith(cartActionEnum.REMOVE, product)
  })
})
