<template>
  <div>
    <img :src="productInfo.image" :alt="productInfo.name" />
    <div>{{ productInfo.name }}</div>
    <div>${{ selectedVariant.price }}</div>
    <p>{{ productInfo.description }}</p>
    <AttributeSelector
      attribute="Size"
      :data="possibleSizes"
      :selected="selectedSize"
      @updateData="updateData"
    />
    <AttributeSelector
      attribute="Fabric"
      :data="possibleFabrics"
      :selected="selectedFabric"
      @updateData="updateData"
    />
    <button>add to cart</button>
    <hr />
  </div>
</template>

<script lang="ts">
import { variant, updateAttribute } from '@/types'
import Vue from 'vue'
import AttributeSelector from './AttributeSelector.vue'

export default Vue.extend({
  name: 'ProductTile',
  props: ['productInfo'],
  components: {
    AttributeSelector
  },
  data() {
    return {
      selectedVariantId: this.productInfo.defaultVariantId as string,
      selectedSize: '',
      selectedFabric: ''
    }
  },
  computed: {
    defaultVariantIndex() {
      return this.productInfo.variants.findIndex((variant: variant) => {
        return variant.id === this.productInfo.defaultVariantId
      })
    },
    selectedVariant() {
      const result = this.productInfo.variants.filter((variant: variant) => {
        return (
          variant.attributes[0].value === this.selectedSize &&
          variant.attributes[1].value === this.selectedFabric
        )
      })
      return result[0]
    },
    selectedVariantIndex() {
      return this.productInfo.variants.findIndex((variant: variant) => {
        return (
          variant.attributes[0].value === this.selectedSize &&
          variant.attributes[1].value === this.selectedFabric
        )
      })
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
    }
  },
  methods: {
    updateData({ attribute, value }: updateAttribute) {
      this[`selected${attribute}`] = value
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
