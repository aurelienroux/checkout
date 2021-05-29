<template>
  <div>
    payment total: {{ cartTotal }}

    <div v-for="(product, index) in cart" :key="index">
      <div>name:{{ product.name }}</div>
      <div>{{ product.description }}</div>
      <div>price:{{ product.price }}</div>
      <div>qty:{{ product.qty }}</div>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Payment',
  computed: {
    cart() {
      return this.$store.state.cart
    },
    cartTotal() {
      return this.$store.getters.cartTotal
    }
  }
})
</script>
