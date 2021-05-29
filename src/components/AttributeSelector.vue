<template>
  <div>
    {{ attribute }}
    <button
      :class="{ selected: value === selectedValue }"
      v-for="(value, index) in attrOptions"
      :key="index"
      @click="updateAttribute({ attribute, value })"
    >
      {{ value }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { updateAttribute } from '@/types'

export default Vue.extend({
  name: 'AttributeSelector',
  props: ['attribute', 'attrOptions', 'selectedValue'],
  methods: {
    updateAttribute(attributePayload: updateAttribute) {
      this.$emit('updateAttribute', attributePayload)
    }
  }
})
</script>

<style lang="scss" scoped>
.selected {
  background: blueviolet;
}
</style>
