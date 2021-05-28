<template>
  <div>
    {{ productInfo.name }}
    <div>selectedVariantId: {{ selectedVariantId }}</div>
    <div>Price : ${{ currentPrice }}</div>
    <!-- <div>laSoluce: {{ possibleVariants }}</div> -->
    <AttributeSelector v-for="(variant, index) in possibleVariants" :key="index" :variant="variant" />
    <hr />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AttributeSelector from './AttributeSelector'

export default Vue.extend({
  name: 'ProductTile',
  props: ['productInfo'],
  components: {
    AttributeSelector
  },
  computed: {
    selectedVariantId() {
      return this.productInfo.defaultVariantId
    },
    currentPrice() {
      const selectedVariant = this.productInfo.variants.filter(variant => {
        return variant.id === this.selectedVariantId
      })
      return selectedVariant[0].price
    },
    possibleVariants() {
      const result = []

      this.productInfo.variants.forEach(({ attributes }) => {
        attributes.forEach(attribute => {
          const { name, value } = attribute
          const index = result.findIndex(el => el['name'] === name)

          if (index !== -1) {
            if (result[index].values.includes(value)) return

            result[index].values.push(value)
          } else {
            result.push({
              name: name,
              values: [value]
            })
          }
        })
      })

      return result
    }
  }
})
</script>
