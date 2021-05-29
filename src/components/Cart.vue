<template>
  <div class="container">
    <h2>Welcome back Sarah!</h2>
    <p>Nice to see you again!</p>
    <button class="button button--purple button--large">pay ${{ cartTotal }}</button>
    <hr />
    <div v-for="(product, index) in cartProducts" :key="index">
      <div>name:{{ product.name }}</div>
      <div>{{ product.description }}</div>
      <div>price:{{ product.price }}</div>
      <div>qty:{{ product.qty }}</div>
      <button class="button button--plain" @click="adjustQty(cartActionEnum.ADD, product)">+</button>
      <button class="button button--plain" @click="adjustQty(cartActionEnum.REMOVE, product)">-</button>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { productInCart, cartActionEnum } from '@/types'

export default Vue.extend({
  name: 'Payment',
  data() {
    return {
      cartActionEnum
    }
  },
  computed: {
    cartProducts() {
      return this.$store.state.cart
    },
    cartTotal() {
      return this.$store.getters.cartTotal
    }
  },
  methods: {
    adjustQty(action: string, product: productInCart) {
      this.$store.commit('adjustQty', { action, product })
    }
  }
})
</script>
