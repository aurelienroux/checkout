<template>
  <div>
    {{ attribute }}
    <button
      :class="{ selected: value === selectedValue }"
      v-for="(value, index) in data"
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
  props: ['attribute', 'data', 'selectedValue'],
  methods: {
    updateAttribute(data: updateAttribute) {
      this.$emit('updateAttribute', data)
    }
  }
})
</script>

<style lang="scss" scoped>
div {
  border: 1px solid;
}

.selected {
  background: blueviolet;
}
</style>
