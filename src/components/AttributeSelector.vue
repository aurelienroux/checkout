<template>
  <div>
    {{ variant.name }}

    <button v-for="(value, index) in variant.values" :key="index">{{ value }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AttributeSelector',
  props: ['variant']
})
</script>
