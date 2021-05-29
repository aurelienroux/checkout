import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import { product, productToAdd, productInCart, cartActionEnum } from '@/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [] as productInCart[],
    products: [] as product[]
  },
  getters: {
    cartTotal: state => {
      return state.cart.reduce((acc, current) => {
        return current.price * current.qty + acc
      }, 0)
    }
  },
  mutations: {
    addToCart(state, product: productToAdd) {
      const index = state.cart.findIndex(el => {
        return el.productId === product.productId && el.variantId === product.variantId
      })

      if (index === -1) {
        state.cart = [...state.cart, { qty: 1, ...product }]
      } else {
        state.cart[index].qty++
      }
    },
    adjustQty(state, payload) {
      const { action, product } = payload
      const index = state.cart.findIndex(el => {
        return el.productId === product.productId && el.variantId === product.variantId
      })

      if (action === cartActionEnum.ADD) return state.cart[index].qty++

      if (action === cartActionEnum.REMOVE && state.cart[index].qty === 1) {
        state.cart.splice(index, 1)
      } else {
        state.cart[index].qty--
      }
    },
    setProducts(state, products: product[]) {
      state.products = products
    }
  },
  actions: {
    getProducts({ commit }) {
      axios
        .get('https://api.npoint.io/ec39ab1aa4edf145235a')
        .then(({ data }) => {
          commit('setProducts', data.products as product[])
        })
        .catch(e => console.log(e))
    }
  }
})
