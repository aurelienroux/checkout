import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import Cart from '@/components/Cart.vue'
import { productInCart } from '@/types'
import { productInCartMock } from './__mocks__'

const localVue = createLocalVue()
localVue.use(Vuex)

function createLocalWrapper(cartTotal: number, cartState: productInCart[]) {
  const store = new Vuex.Store({
    getters: {
      cartTotal: () => cartTotal
    }
  })

  const computed = {
    cartProducts: () => cartState
  }

  return shallowMount(Cart, {
    computed,
    store,
    localVue
  })
}

describe('Cart component', () => {
  it('renders with empty cart', () => {
    const wrapper = createLocalWrapper(0, [])

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('button').text()).toContain('pay $0')
    expect(wrapper.find('.cart__empty').exists()).toBe(true)
    expect(wrapper.findAll('productcarttile-stub').length).toBe(0)
  })

  it('renders with products in cart', () => {
    const wrapper = createLocalWrapper(199, [productInCartMock, productInCartMock])

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('button').text()).toContain('pay $199')
    expect(wrapper.find('.cart__empty').exists()).toBe(false)
    expect(wrapper.findAll('productcarttile-stub').length).toBe(2)
  })
})
