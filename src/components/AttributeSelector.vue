<template>
  <div>
    {{ attribute }}
    <button
      :class="{ selected: value === selected }"
      v-for="(value, index) in data"
      :key="index"
      @click="updateData({ attribute, value })"
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
  props: ['attribute', 'data', 'selected'],
  methods: {
    updateData(data: updateAttribute) {
      this.$emit('updateData', data)
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
