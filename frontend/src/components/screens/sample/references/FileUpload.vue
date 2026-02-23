<template>
  <div class="file-upload">
    <div class="file-upload__input-wrapper">
      <input
        type="text"
        :class="[
          'file-upload__input',
          `file-upload__input--${buttonSize}`,
          { 'has-file': hasFile, error: error },
        ]"
        :value="displayText"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
      />
      <button
        v-if="hasFile && !disabled"
        type="button"
        class="file-upload__clear"
        @click="clearFile"
        aria-label="파일 삭제"
      >
        ×
      </button>
    </div>

    <button
      type="button"
      :class="[
        'btn',
        `btn-${buttonVariant}`,
        `btn-${buttonSize}`,
        { disabled: disabled },
      ]"
      :disabled="disabled"
      @click="triggerFileInput"
    >
      {{ buttonText }}
    </button>

    <input
      ref="fileInputRef"
      type="file"
      class="file-upload__hidden-input"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="handleFileChange"
    />

    <p v-if="error" class="file-upload__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

/**
 * FileUpload 컴포넌트
 *
 * @component
 * @example
 * ```vue
 * <FileUpload
 *   v-model="file"
 *   accept="image/*,.pdf"
 *   :max-size="5"
 *   button-text="이미지 선택"
 *   button-variant="primary"
 *   @change="handleFileChange"
 *   @error="handleError"
 * />
 * ```
 */

interface Props {
  /** 선택된 파일 (v-model) */
  modelValue?: File | File[] | null;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** 버튼 텍스트 */
  buttonText?: string;
  /** 버튼 색상 (primary | secondary | success | danger | warning) */
  buttonVariant?: "primary" | "secondary" | "success" | "danger" | "warning";
  /** 버튼 크기 (sm | md | lg) */
  buttonSize?: "sm" | "md" | "lg";
  /** 허용할 파일 타입 (예: "image/*", ".pdf,.doc", "image/png,image/jpeg") */
  accept?: string;
  /** 다중 파일 선택 허용 */
  multiple?: boolean;
  /** 최대 파일 크기 (MB) */
  maxSize?: number;
  /** 비활성화 상태 */
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  placeholder: "선택된 파일이 없습니다.",
  buttonText: "파일 선택",
  buttonVariant: "primary",
  buttonSize: "md", // sm | md | lg
  accept: "",
  multiple: false,
  maxSize: 0,
  disabled: false,
});

interface Emits {
  /** 파일이 변경될 때 발생 */
  (e: "update:modelValue", value: File | File[] | null): void;
  /** 파일이 선택될 때 발생 */
  (e: "change", value: File | File[] | null): void;
  /** 에러가 발생할 때 발생 */
  (e: "error", message: string): void;
}

const emit = defineEmits<Emits>();

const fileInputRef = ref<HTMLInputElement | null>(null);
const error = ref<string>("");

/** 파일이 선택되었는지 여부 */
const hasFile = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0;
  }
  return props.modelValue !== null;
});

/** 화면에 표시될 텍스트 */
const displayText = computed(() => {
  if (!hasFile.value) return "";

  if (props.multiple && Array.isArray(props.modelValue)) {
    const fileCount = props.modelValue.length;
    if (fileCount === 1) {
      return props.modelValue[0].name;
    }
    return `${props.modelValue[0].name} 외 ${fileCount - 1}개`;
  }

  return props.modelValue instanceof File ? props.modelValue.name : "";
});

/**
 * 파일 input을 트리거
 */
const triggerFileInput = () => {
  if (props.disabled) return;
  fileInputRef.value?.click();
};

/**
 * 파일 크기 검증
 */
const validateFileSize = (file: File): boolean => {
  if (props.maxSize <= 0) return true;

  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > props.maxSize) {
    error.value = `파일 크기는 ${props.maxSize}MB 이하여야 합니다. (현재: ${fileSizeMB.toFixed(2)}MB)`;
    emit("error", error.value);
    return false;
  }

  return true;
};

/**
 * 파일 변경 핸들러
 */
const handleFileChange = (event: Event) => {
  error.value = "";
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (!files || files.length === 0) {
    clearFile();
    return;
  }

  // 파일 크기 검증
  const filesArray = Array.from(files);
  const invalidFile = filesArray.find((file) => !validateFileSize(file));

  if (invalidFile) {
    // 에러 발생시 input 초기화
    if (fileInputRef.value) {
      fileInputRef.value.value = "";
    }
    return;
  }

  // 파일 선택 성공
  const selectedValue = props.multiple ? filesArray : filesArray[0];
  emit("update:modelValue", selectedValue);
  emit("change", selectedValue);
};

/**
 * 파일 삭제
 */
const clearFile = () => {
  error.value = "";
  emit("update:modelValue", null);
  emit("change", null);

  // input 초기화
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
};

/**
 * 외부에서 파일을 직접 설정할 수 있는 메서드
 */
const setFile = (file: File | File[] | null) => {
  emit("update:modelValue", file);
  emit("change", file);
};

defineExpose({
  clearFile,
  setFile,
});
</script>

<style scoped lang="scss">
.file-upload {
  display: flex;
  align-items: center;
  gap: $spacing-xl;
  width: 100%;

  &__input-wrapper {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
  }

  &__input {
    width: 100%;
    padding: $spacing-sm $spacing-md;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    color: $color-text-primary;
    background-color: $color-bg-white;
    transition: all 0.2s ease;

    &::placeholder {
      color: $color-text-secondary;
    }

    &:focus {
      outline: none;
      border-color: $color-primary;
      box-shadow: 0 0 0 3px rgba($color-primary, 0.1);
    }

    &.has-file {
      padding-right: 40px; // x 버튼 공간 확보
      color: $color-text-primary;
    }

    &.error {
      border-color: $color-danger;

      &:focus {
        box-shadow: 0 0 0 3px rgba($color-danger, 0.1);
      }
    }

    &:disabled {
      background-color: $color-gray-100;
      cursor: not-allowed;
      opacity: 0.6;
    }

    // 버튼 크기에 맞춘 input 크기
    &--sm {
      height: 32px;
      font-size: $font-size-sm;
    }

    &--md {
      height: 40px;
      font-size: $font-size-base;
    }

    &--lg {
      height: 48px;
      font-size: $font-size-lg;
    }

    &--lg {
      height: 48px;
      font-size: $font-size-xl;
    }
  }

  &__clear {
    position: absolute;
    right: $spacing-sm;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    background: transparent;
    color: $color-text-secondary;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: $color-danger;
    }

    &:focus {
      outline: none;
      color: $color-danger;
    }
  }

  &__hidden-input {
    display: none;
  }

  &__error {
    width: 100%;
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    color: $color-danger;
  }
}

// 버튼 스타일은 기존 _button.scss 사용
</style>
