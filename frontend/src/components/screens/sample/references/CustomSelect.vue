<template>
  <div
    class="custom-select"
    :class="{ open: isOpen, disabled }"
    v-click-outside="close"
  >
    <div
      class="select-trigger"
      @click="toggle"
      :tabindex="disabled ? -1 : 0"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
      @keydown.escape="close"
      @keydown.down.prevent="navigateOptions(1)"
      @keydown.up.prevent="navigateOptions(-1)"
    >
      <span class="select-value">{{ displayValue }}</span>
      <span class="select-arrow">▼</span>
    </div>

    <Transition name="dropdown">
      <div v-if="isOpen" class="select-dropdown">
        <div class="select-options">
          <div
            v-for="(option, index) in options"
            :key="option.value"
            class="select-option"
            :class="{
              selected: option.value === modelValue,
              highlighted: index === highlightedIndex,
            }"
            @click="selectOption(option)"
            @mouseenter="highlightedIndex = index"
          >
            {{ option.label }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface SelectOption {
  label: string;
  value: string | number;
}

interface Props {
  modelValue: string | number;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "선택하세요",
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  change: [value: string | number];
}>();

const isOpen = ref(false);
const highlightedIndex = ref(-1);

const displayValue = computed(() => {
  const selected = props.options.find((opt) => opt.value === props.modelValue);
  return selected?.label || props.placeholder;
});

const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    highlightedIndex.value = props.options.findIndex(
      (opt) => opt.value === props.modelValue,
    );
  }
};

const close = () => {
  isOpen.value = false;
  highlightedIndex.value = -1;
};

const selectOption = (option: SelectOption) => {
  emit("update:modelValue", option.value);
  emit("change", option.value);
  close();
};

const navigateOptions = (direction: number) => {
  if (!isOpen.value) {
    isOpen.value = true;
    return;
  }

  highlightedIndex.value += direction;
  if (highlightedIndex.value < 0)
    highlightedIndex.value = props.options.length - 1;
  if (highlightedIndex.value >= props.options.length)
    highlightedIndex.value = 0;
};

const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    el.__clickOutsideHandler__ = (event: MouseEvent) => {
      if (!el.contains(event.target as Node)) {
        binding.value();
      }
    };
    document.addEventListener("click", el.__clickOutsideHandler__);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener("click", el.__clickOutsideHandler__);
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.custom-select {
  position: relative;
  width: 100%;
  min-width: 200px;
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-xs $spacing-md;
  background: $color-bg-white;
  border: $border-width solid $color-border;
  border-radius: $radius-lg;
  cursor: pointer;
  transition: all $transition-base;
  font-size: $font-size-sm;
  color: $color-text-primary;
  outline: none;

  &:hover:not(.disabled *) {
    background-color: rgba($color-primary, 0.04);
    border-color: $color-primary;
  }

  &:focus {
    border-color: $color-primary;
    box-shadow: 0 0 0 3px rgba($color-primary, 0.15);
  }

  .custom-select.disabled & {
    background-color: $color-bg-gray;
    border-color: $color-border-light;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .custom-select.open & {
    border-color: $color-primary;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.select-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-arrow {
  margin-left: $spacing-sm;
  font-size: 10px;
  color: $color-primary;
  transition: transform $transition-base;

  .custom-select.open & {
    transform: rotate(180deg);
  }

  .custom-select.disabled & {
    color: $color-text-light;
  }
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: $z-dropdown;
  background: $color-bg-white;
  border: $border-width solid $color-primary;
  border-top: none;
  border-radius: 0 0 $radius-lg $radius-lg;
  box-shadow: $shadow-md;
  max-height: 240px;
  overflow: hidden;
}

.select-options {
  overflow-y: auto;
  max-height: 240px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: $color-bg-light;
  }

  &::-webkit-scrollbar-thumb {
    background: $color-gray-400;
    border-radius: $radius-full;
  }
}

.select-option {
  padding: $spacing-sm $spacing-md;
  cursor: pointer;
  transition: all $transition-fast;
  font-size: $font-size-sm;
  color: $color-text-primary;

  &:hover,
  &.highlighted {
    background-color: rgba($color-primary, 0.08);
    color: $color-primary-dark;
  }

  &.selected {
    background-color: rgba($color-primary, 0.15);
    color: $color-primary;
    font-weight: $font-weight-semibold;
  }

  &:first-child {
    margin-top: 4px;
  }

  &:last-child {
    margin-bottom: 4px;
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
  transform-origin: top;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.8);
}
</style>
