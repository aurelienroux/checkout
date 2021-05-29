<template>
  <div id="app">
    <div class="grid">
      <div class="hero__banner"></div>
      <header class="hero__text">hero text</header>
      <main>
        <div class="products">
          <ProductTile v-for="product in products" :key="product.id" :productInfo="product" />
        </div>
        <Cart class="cart" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Cart from './components/Cart.vue'
import ProductTile from './components/ProductTile.vue'
import { product } from './types'

export default Vue.extend({
  name: 'App',
  components: {
    Cart,
    ProductTile
  },
  computed: {
    products(): product[] {
      return this.$store.state.products
    }
  },
  mounted() {
    this.$store.dispatch('getProducts')
  }
})
</script>

<style lang="scss">
@import '@/styles/global.scss';

#app {
  background: $white-bg;
}

.grid {
  display: grid;
  grid-template-columns: 1.5rem 1fr 1.5rem;
  grid-template-rows: 33rem 11rem auto;

  @include for-tablet-portrait-up {
    grid-template-columns: 3rem 1fr 3rem;
  }

  @include for-desktop-up {
    grid-template-columns: 1fr 120rem 1fr;
  }
}

.hero {
  &__banner {
    background: url('https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    grid-column: 1 / 4;
    grid-row: 1 / 3;
  }

  &__text {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
}

main {
  display: flex;
  grid-column: 2 / 3;
  grid-row: 2 / 4;

  .products {
    flex: 2;
    margin: 1rem;
  }

  .cart {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 1rem;
  }
}
</style>
