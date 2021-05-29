<template>
  <div class="tile container">
    <img :src="productInfo.image" :alt="productInfo.name" />
    <div>{{ productInfo.name }}</div>
    <div>${{ selectedVariant.price }}</div>
    <p>{{ productInfo.description }}</p>
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
    <button @click="addToCart">add to cart</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import AttributeSelector from './AttributeSelector.vue'
import { variant, updateAttribute, attributeEnum, productToAdd } from '@/types'

export default Vue.extend({
  name: 'ProductTile',
  props: ['productInfo'],
  components: {
    AttributeSelector
  },
  data() {
    return {
      attributeEnum,
      sizeSelected: '',
      fabricSelected: ''
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
        name: this.productInfo.name,
        price: this.selectedVariant.price,
        productId: this.productInfo.id,
        variantId: this.selectedVariant.id
      }
      this.$store.commit('addToCart', productToAdd)
    }
  },
  created() {
    this.sizeSelected = this.productInfo.variants[this.defaultVariantIndex].attributes[0].value
    this.fabricSelected = this.productInfo.variants[this.defaultVariantIndex].attributes[1].value
  }
})
</script>

<style lang="scss" scoped>
.tile {
  margin-bottom: 1rem;
}

img {
  max-width: 100px;
}
</style>
