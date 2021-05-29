<template>
  <div class="cart container">
    <h2>Welcome back Sarah!</h2>
    <p>Nice to see you again!</p>
    <button class="button button--purple button--large">pay ${{ cartTotal }}</button>
    <h2 class="cart__title">Your cart</h2>
    <div class="cart__empty" v-if="cartProducts.length === 0">Your cart is currently empty</div>
    <div v-for="(product, index) in cartProducts" :key="index">
      <ProductCartTile :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductCartTile from './ProductCartTile.vue'

export default Vue.extend({
  name: 'Payment',
  components: {
    ProductCartTile
  },
  computed: {
    cartProducts() {
      return this.$store.state.cart
    },
    cartTotal() {
      return this.$store.getters.cartTotal
    }
  }
})
</script>

<style lang="scss" scoped>
.cart {
  text-align: center;
  margin: 1rem;

  &__title {
    border-top: 1px solid $white-bg;
    margin: 2.5rem 0 0;
    padding: 2.5rem 0 0;
    text-align-last: left;
  }

  &__empty {
    margin-top: 2rem;
  }
}
</style>
