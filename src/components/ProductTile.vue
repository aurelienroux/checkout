<template>
  <div>
    {{ productInfo.name }}
    <div>selectedVariantId: {{ selectedVariantId }}</div>
    <!-- <div>currentSize {{ currentSize }}</div> -->
    <div>Price : ${{ currentPrice }}</div>
    <div>selected size {{ selectedSize }}</div>
    <div>selected fabric {{ selectedFabric }}</div>
    <!-- <div>possible Sizes {{ possibleSizes }}</div> -->
    <!-- <div>possible Fabrics {{ possibleFabrics }}</div> -->
    <!-- <AttributeSelector v-for="(variant, index) in possibleVariants" :key="index" :variant="variant" /> -->
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
    <hr />
  </div>
</template>

<script lang="ts">
import { variant } from '@/types'
import Vue from 'vue'
import AttributeSelector from './AttributeSelector'

export default Vue.extend({
  name: 'ProductTile',
  props: ['productInfo'],
  components: {
    AttributeSelector
  },
  data() {
    return {
      selectedVariantId: this.productInfo.defaultVariantId as string,
      selectedSize: 999,
      selectedFabric: 666
    }
  },
  computed: {
    currentPrice() {
      const selectedVariant = this.productInfo.variants.filter((variant: variant) => {
        return variant.id === this.selectedVariantId.toString()
      })
      return selectedVariant[0].price
    },
    currentSize() {
      const selectedVariant = this.productInfo.variants.filter((variant: variant) => {
        return variant.id === this.selectedVariantId.toString()
      })
      return selectedVariant[0].attributes[0].value
    },
    // possibleVariants() {
    //   const result = []

    //   this.productInfo.variants.forEach(({ attributes }) => {
    //     attributes.forEach(attribute => {
    //       const { name, value } = attribute
    //       const index = result.findIndex(el => el['name'] === name)

    //       if (index !== -1) {
    //         if (result[index].values.includes(value)) return

    //         result[index].values.push(value)
    //       } else {
    //         result.push({
    //           name: name,
    //           values: [value]
    //         })
    //       }
    //     })
    //   })

    //   return result
    // },
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
    updateData(data) {
      console.log(data)

      this[`selected${data.attribute}`] = data.value
    }
  }
})
</script>
