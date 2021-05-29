import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import { product, productToAdd, productInCart } from '@/types'

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
  },
  modules: {}
})
