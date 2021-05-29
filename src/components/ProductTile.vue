<template>
  <div>
    <img :src="productInfo.image" :alt="productInfo.name" />
    <div>{{ productInfo.name }}</div>
    <div>${{ selectedVariant.price }}</div>
    <p>{{ productInfo.description }}</p>
    <AttributeSelector
      :attribute="attributeEnum.SIZE"
      :data="possibleSizes"
      :selectedValue="selectedSize"
      @updateAttribute="updateAttribute"
    />
    <AttributeSelector
      :attribute="attributeEnum.FABRIC"
      :data="possibleFabrics"
      :selectedValue="selectedFabric"
      @updateAttribute="updateAttribute"
    />
    <button>add to cart</button>
    <hr />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { variant, updateAttribute, attributeEnum } from '@/types'
import AttributeSelector from './AttributeSelector.vue'

export default Vue.extend({
  name: 'ProductTile',
  props: ['productInfo'],
  components: {
    AttributeSelector
  },
  data() {
    return {
      attributeEnum,
      selectedSize: '',
      selectedFabric: ''
    }
  },
  computed: {
    selectedVariant(): variant {
      const result = this.productInfo.variants.filter((variant: variant) => {
        return (
          variant.attributes[0].value === this.selectedSize &&
          variant.attributes[1].value === this.selectedFabric
        )
      })
      return result[0]
    },
    possibleSizes() {
      const result: string[] = []

      this.productInfo.variants.forEach((variant: variant) => {
        if (result.includes(variant.attributes[0].value)) return

        result.push(variant.attributes[0].value)
      })
      return result
    },
    possibleFabrics() {
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
      if (attribute === attributeEnum.SIZE) this.selectedSize = value
      if (attribute === attributeEnum.FABRIC) this.selectedFabric = value
    }
  },
  created() {
    this.selectedSize = this.productInfo.variants[this.defaultVariantIndex].attributes[0].value
    this.selectedFabric = this.productInfo.variants[this.defaultVariantIndex].attributes[1].value
  }
})
</script>

<style lang="scss" scoped>
img {
  max-width: 100px;
}
</style>
