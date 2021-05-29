<template>
  <div id="app">
    <div class="grid">
      <div class="hero">hero</div>
      <div class="hero-text">hero text</div>
      <div class="cart">
        <ProductTile v-for="product in products" :key="product.id" :productInfo="product" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ProductTile from './components/ProductTile.vue'

export default Vue.extend({
  name: 'App',
  components: {
    ProductTile
  },
  computed: {
    products() {
      return this.$store.state.products
    }
  },
  mounted() {
    this.$store.dispatch('getProducts')
  }
})
</script>

<style lang="scss">
html {
  font-size: 15px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rebeccapurple;
}

.grid {
  display: grid;
  grid-template-columns: 1.5rem 1fr 1.5rem;
  grid-template-rows: 33rem 11rem auto;

  @include for-tablet-portrait-up {
    grid-template-columns: 3rem 1fr 3rem;
  }

  @include for-desktop-up {
    grid-template-columns: 1fr 80rem 1fr;
  }
}

.hero {
  background: green;
  grid-column: 1 / 4;
  grid-row: 1 / 3;
}

.hero-text {
  background: salmon;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.cart {
  background: rgb(3, 133, 143);
  grid-column: 2 / 3;
  grid-row: 2 / 4;
  padding-top: 1.5rem;
}
</style>
