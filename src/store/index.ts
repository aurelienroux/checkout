import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import { product } from '@/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [] as product[]
  },
  mutations: {
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
