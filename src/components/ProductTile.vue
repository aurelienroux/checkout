<template>
  <div class="tile container">
    <div class="tile__image">
      <img :src="productInfo.image" :alt="productInfo.name" />
    </div>
    <div class="tile__content">
      <header>
        <h2>{{ productInfo.name }}</h2>
        <div data-cy="product-price" class="price">${{ selectedVariant.price }}</div>
      </header>
      <p>{{ productInfo.description }}</p>
      <div class="attributes">
        <AttributeSelector
          :attribute="attributeEnum.SIZE"
          :attrOptions="sizeOptions"
          :selectedValue="sizeSelected"
          @updateAttribute="updateAttribute"
        />
        <AttributeSelector
          :attribute="attributeEnum.FABRIC"
          :attrOptions="fabricOptions"
          :selectedValue="fabricSelected"
          @updateAttribute="updateAttribute"
        />
      </div>
      <button data-cy="add-to-cart" class="button button--purple" @click="addToCart">add to cart</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import AttributeSelector from './AttributeSelector.vue'
import { variant, updateAttribute, attributeEnum, productToAdd } from '@/types'

export default Vue.extend({
  name: 'ProductTile',
  props: {
    productInfo: {
      type: Object,
      required: true
    }
  },
  components: {
    AttributeSelector
  },
  data() {
    return {
      attributeEnum,
      fabricSelected: '',
      sizeSelected: ''
    }
  },
  computed: {
    selectedVariant(): variant {
      return this.productInfo.variants.filter((variant: variant) => {
        return (
          variant.attributes[0].value === this.sizeSelected &&
          variant.attributes[1].value === this.fabricSelected
        )
      })[0]
    },
    sizeOptions() {
      const result: string[] = []

      this.productInfo.variants.forEach((variant: variant) => {
        if (result.includes(variant.attributes[0].value)) return

        result.push(variant.attributes[0].value)
      })
      return result
    },
    fabricOptions() {
      const result: string[] = []

      this.productInfo.variants.forEach((variant: variant) => {
        if (result.includes(variant.attributes[1].value)) return

        result.push(variant.attributes[1].value)
      })
      return result
    },
    defaultVariantIndex(): number {
      return this.productInfo.variants.findIndex((variant: variant) => {
        return variant.id === this.productInfo.defaultVariantId
      })
    }
  },
  methods: {
    updateAttribute({ attribute, value }: updateAttribute): void {
      if (attribute === attributeEnum.SIZE) this.sizeSelected = value
      if (attribute === attributeEnum.FABRIC) this.fabricSelected = value
    },
    addToCart() {
      const productToAdd: productToAdd = {
        description: this.selectedVariant.name,
        image: this.productInfo.image,
        name: this.productInfo.name,
        price: this.selectedVariant.price,
        productId: this.productInfo.id,
        variantId: this.selectedVariant.id
      }
      this.$store.commit('addToCart', productToAdd)
    }
  },
  created() {
    const index = this.defaultVariantIndex
    if (!this.productInfo.variants[index]) return

    this.sizeSelected = this.productInfo.variants[index].attributes[0].value
    this.fabricSelected = this.productInfo.variants[index].attributes[1].value
  }
})
</script>

<style lang="scss" scoped>
.tile {
  margin-bottom: 1rem;

  @include for-tablet-landscape-up {
    display: flex;
  }

  &__image {
    background: $image-bg;
    margin-bottom: 1rem;
    text-align: center;

    @include for-tablet-landscape-up {
      margin-bottom: 0;
    }

    img {
      max-width: 10rem;

      @include for-tablet-portrait-up {
        max-width: 20rem;
      }

      @include for-desktop-up {
        max-width: 30rem;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;

    @include for-tablet-landscape-up {
      padding-left: 1.5rem;
    }

    header {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    .price {
      color: $purple;
      font-weight: 900;
    }

    p {
      margin-bottom: 4rem;
    }

    .attributes {
      flex: 1;
    }

    .button {
      align-self: flex-end;
    }
  }
}
</style>
