<template>
  <div class="tile">
    <div class="tile__image">
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="tile__content">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="tile__qty">
        <button class="button button--plain" @click="adjustQty(cartActionEnum.REMOVE, product)">-</button>
        <span class="qty">{{ product.qty }}</span>
        <button class="button button--plain" @click="adjustQty(cartActionEnum.ADD, product)">+</button>
        <span class="price">${{ product.price }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { productInCart, cartActionEnum } from '@/types'

export default Vue.extend({
  name: 'ProductCartTile',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cartActionEnum
    }
  },
  methods: {
    adjustQty(action: string, product: productInCart) {
      this.$store.commit('adjustQty', { action, product })
    }
  }
})
</script>

<style lang="scss" scoped>
.tile {
  display: flex;
  margin-top: 2rem;

  &__image {
    align-items: center;
    background: $image-bg;
    border-radius: 0.5rem;
    display: flex;

    img {
      max-width: 6rem;
    }
  }

  &__content {
    flex: 1;
    padding-left: 1rem;
    text-align: left;

    p {
      font-size: 1.1rem;
      margin: 0;
    }
  }

  &__qty {
    align-items: center;
    display: flex;
    font-weight: 800;
  }

  .qty {
    padding: 0.6rem;
  }

  .price {
    flex: 1;
    text-align: right;
  }
}
</style>
