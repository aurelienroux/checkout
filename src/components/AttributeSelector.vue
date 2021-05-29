<template>
  <div class="selector">
    <span class="selector__name">
      {{ attribute }}
    </span>
    <button
      data-cy="btn-variant"
      class="button button--grey"
      :class="{ 'button--selected': value === selectedValue }"
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
  props: {
    attribute: {
      type: String,
      required: true
    },
    attrOptions: {
      type: Array,
      required: true
    },
    selectedValue: {
      type: String,
      required: true
    }
  },
  methods: {
    updateAttribute(attributePayload: updateAttribute) {
      this.$emit('updateAttribute', attributePayload)
    }
  }
})
</script>

<style lang="scss" scoped>
.selector {
  align-items: center;
  display: flex;
  margin-bottom: 1rem;

  &__name {
    color: $text-color;
    flex: 1;
    font-size: 1.1rem;
  }
}
</style>
