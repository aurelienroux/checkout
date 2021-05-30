<template>
  <div id="app">
    <div class="grid">
      <div class="grid__hero-banner"></div>
      <Header class="grid__hero-text" />
      <main>
        <div class="grid__products">
          <ProductTile v-for="product in products" :key="product.id" :productInfo="product" />
        </div>
        <div class="grid__cart">
          <Cart />
          <p>powered by <strong>acquire</strong></p>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Cart from './components/Cart.vue'
import Header from './components/Header.vue'
import ProductTile from './components/ProductTile.vue'
import { product } from './types'

export default Vue.extend({
  name: 'App',
  components: {
    Cart,
    Header,
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
@import '@/scss/global.scss';

#app {
  background: $white-bg;
}
</style>

<style lang="scss" scoped>
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

  &__hero-banner {
    background: url('https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    grid-column: 1 / 4;
    grid-row: 1 / 3;
  }

  &__hero-text {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  main {
    display: flex;
    grid-column: 2 / 3;
    grid-row: 2 / 4;
    flex-direction: column;

    @include for-tablet-landscape-up {
      align-items: flex-start;
      flex-direction: row;
    }
  }

  &__products {
    flex: 2;
    margin: 1rem 1rem 0;

    @include for-tablet-landscape-up {
      margin: 1rem;
    }
  }

  &__cart {
    display: flex;
    flex-direction: column;
    flex: 1;

    p {
      text-align: center;
    }
  }
}
</style>
