<template>
  <select
    :value="selectValue"
    @change="$emit('update:selectValue', $event.target.value)"
    class="select-bar"
  >
    <option v-show="defaultOption" :value="defaultOption.value">
      {{ defaultOption.label }}
    </option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  selectValue: [String, Number],
  options: {
    type: Array,
    default: () => [],
  },
  defaultOption: {
    type: Object,
    default: () => ({ value: "", label: "선택하세요" }),
  },
});
defineEmits(["update:selectValue"]);
</script>
<style lang="scss" scoped>
.select-bar {
  width: fit-content;
  padding-right: calc($input-padding-x * 3.5);
}
</style>
