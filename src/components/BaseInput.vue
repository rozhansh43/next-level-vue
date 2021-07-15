<template>
  <div>
    <label v-if="label">
      {{ label }}
    </label>
    <input type="text" placeholder="Add an event" @input="updateValue">
  </div>
</template>

<script>
export default {
  props: {
    label:   {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>