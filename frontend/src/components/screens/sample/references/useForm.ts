import { ref, computed, type Ref } from "vue";
import {
  useForm as useVeeForm,
  useField,
  type FieldContext,
} from "vee-validate";
import * as yup from "yup";
import type { ObjectSchema, AnyObject } from "yup";

/**
 * 폼 필드 정의
 */
export interface FormField<T = any> {
  /** 필드명 */
  name: keyof T;
  /** 초기값 */
  initialValue?: any;
  /** 검증 규칙 (Yup 스키마 또는 함수) */
  validation?: any;
  /** 필드 라벨 */
  label?: string;
}

/**
 * 폼 옵션
 */
export interface FormOptions<T = any> {
  /** 초기값 객체 */
  initialValues?: Partial<T>;
  /** Yup 검증 스키마 */
  validationSchema?: ObjectSchema<any>;
  /** 제출 핸들러 */
  onSubmit?: (values: T) => void | Promise<void>;
  /** 제출 성공 핸들러 */
  onSuccess?: (values: T, response?: any) => void;
  /** 제출 실패 핸들러 */
  onError?: (error: any) => void;
  /** 제출 후 초기화 여부 */
  resetAfterSubmit?: boolean;
}

/**
 * 폼 상태 및 검증을 관리하는 Composable
 *
 * @description
 * - Vee-Validate 통합으로 검증 자동화
 * - Yup 스키마 기반 검증
 * - 폼 상태 관리 (로딩, 에러, 더티 상태)
 * - 제출 플로우 통합 (검증 → API 호출 → 성공/실패 처리)
 *
 * @example
 * ```typescript
 * // 1. Yup 스키마 정의
 * const schema = yup.object({
 *   email: yup.string().email('이메일 형식이 아닙니다').required('필수 항목입니다'),
 *   password: yup.string().min(8, '8자 이상 입력하세요').required('필수 항목입니다')
 * });
 *
 * // 2. Composable 사용
 * const {
 *   values,
 *   errors,
 *   handleSubmit,
 *   isSubmitting
 * } = useForm({
 *   initialValues: { email: '', password: '' },
 *   validationSchema: schema,
 *   onSubmit: async (values) => {
 *     await api.post('/login', values);
 *   }
 * });
 *
 * // 3. 템플릿에서 사용
 * <input v-model="values.email" />
 * <span class="error">{{ errors.email }}</span>
 * <button @click="handleSubmit" :disabled="isSubmitting">로그인</button>
 * ```
 *
 * @param options - 폼 옵션
 */
export function useForm<T extends Record<string, any>>(
  options: FormOptions<T> = {},
) {
  const {
    initialValues = {} as T,
    validationSchema,
    onSubmit,
    onSuccess,
    onError,
    resetAfterSubmit = false,
  } = options;

  // ========== Vee-Validate 폼 설정 ==========

  const {
    values,
    errors,
    meta,
    validate,
    resetForm: veeResetForm,
    setFieldValue: veeSetFieldValue,
    setFieldError,
    setErrors,
    setValues,
  } = useVeeForm<T>({
    initialValues: initialValues as any,
    validationSchema: validationSchema as any,
  });

  // ========== 추가 상태 관리 ==========

  /** 제출 중 여부 */
  const isSubmitting = ref(false);

  /** 제출 성공 여부 */
  const isSuccess = ref(false);

  /** 제출 실패 여부 */
  const isFailed = ref(false);

  /** 서버 에러 메시지 */
  const serverError = ref("");

  // ========== 계산된 속성 ==========

  /**
   * 폼이 유효한지 여부
   */
  const isValid = computed(() => meta.value.valid);

  /**
   * 폼이 수정되었는지 여부
   */
  const isDirty = computed(() => meta.value.dirty);

  /**
   * 폼이 건드려졌는지 여부
   */
  const isTouched = computed(() => meta.value.touched);

  /**
   * 에러가 있는지 여부
   */
  const hasErrors = computed(() => {
    return Object.keys(errors.value).length > 0 || !!serverError.value;
  });

  // ========== 메서드 ==========

  /**
   * 폼 제출 처리
   * 1. 검증 실행
   * 2. 검증 통과 시 onSubmit 실행
   * 3. 성공/실패 핸들러 호출
   *
   * @returns 제출 결과 (성공 시 response, 실패 시 undefined)
   */
  async function handleSubmit(): Promise<any> {
    // 상태 초기화
    isSuccess.value = false;
    isFailed.value = false;
    serverError.value = "";

    // 1. 검증
    const { valid } = await validate();
    if (!valid) {
      return;
    }

    // 2. 제출
    isSubmitting.value = true;

    try {
      let response;
      if (onSubmit) {
        response = await onSubmit(values as T);
      }

      // 3. 성공 처리
      isSuccess.value = true;

      if (onSuccess) {
        onSuccess(values as T, response);
      }

      if (resetAfterSubmit) {
        resetForm();
      }

      return response;
    } catch (error: any) {
      // 4. 실패 처리
      isFailed.value = true;

      // 서버 에러 메시지 처리
      if (error.response?.data?.message) {
        serverError.value = error.response.data.message;
      } else if (error.message) {
        serverError.value = error.message;
      } else {
        serverError.value = "알 수 없는 오류가 발생했습니다.";
      }

      // 필드별 에러 처리 (서버에서 필드별 에러를 반환하는 경우)
      if (error.response?.data?.errors) {
        const fieldErrors = error.response.data.errors;
        Object.keys(fieldErrors).forEach((field) => {
          setFieldError(field, fieldErrors[field]);
        });
      }

      if (onError) {
        onError(error);
      }

      throw error;
    } finally {
      isSubmitting.value = false;
    }
  }

  /**
   * 폼 초기화
   *
   * @param values - 초기화할 값 (생략 시 초기값 사용)
   */
  function resetForm(values?: Partial<T>) {
    veeResetForm({
      values: values || (initialValues as any),
    });
    isSuccess.value = false;
    isFailed.value = false;
    serverError.value = "";
  }

  /**
   * 필드 값 설정
   *
   * @param field - 필드명
   * @param value - 설정할 값
   */
  function setFieldValue<K extends keyof T>(field: K, value: T[K]) {
    veeSetFieldValue(field as string, value);
  }

  /**
   * 여러 필드 값 한번에 설정
   *
   * @param fields - 필드-값 객체
   */
  function setFieldValues(fields: Partial<T>) {
    setValues(fields as any);
  }

  /**
   * 필드 에러 설정
   *
   * @param field - 필드명
   * @param message - 에러 메시지
   */
  function setFieldErrorMessage<K extends keyof T>(field: K, message: string) {
    setFieldError(field as string, message);
  }

  /**
   * 여러 필드 에러 한번에 설정
   *
   * @param fieldErrors - 필드-에러 객체
   */
  function setFieldErrors(fieldErrors: Partial<Record<keyof T, string>>) {
    setErrors(fieldErrors as any);
  }

  /**
   * 특정 필드의 값 가져오기
   *
   * @param field - 필드명
   */
  function getFieldValue<K extends keyof T>(field: K): T[K] {
    return values[field] as T[K];
  }

  /**
   * 특정 필드의 에러 가져오기
   *
   * @param field - 필드명
   */
  function getFieldError<K extends keyof T>(field: K): string | undefined {
    return errors.value[field as string];
  }

  /**
   * 폼 전체 검증
   */
  async function validateForm() {
    return await validate();
  }

  /**
   * 서버 에러 초기화
   */
  function clearServerError() {
    serverError.value = "";
  }

  return {
    // 폼 데이터
    values,
    errors,
    meta,

    // 상태
    isSubmitting,
    isSuccess,
    isFailed,
    isValid,
    isDirty,
    isTouched,
    hasErrors,
    serverError,

    // 메서드
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldValues,
    setFieldError: setFieldErrorMessage,
    setFieldErrors,
    getFieldValue,
    getFieldError,
    validateForm,
    clearServerError,
  };
}

/**
 * 개별 필드를 관리하는 Composable
 *
 * @description
 * 특정 필드의 값, 에러, 메타 정보를 관리합니다.
 * useForm과 함께 사용하거나 독립적으로 사용 가능합니다.
 *
 * @example
 * ```typescript
 * const { value, errorMessage, meta } = useFormField('email', {
 *   validation: yup.string().email().required()
 * });
 *
 * <input v-model="value" />
 * <span class="error">{{ errorMessage }}</span>
 * ```
 *
 * @param name - 필드명
 * @param options - 필드 옵션
 */
export function useFormField<T = any>(
  name: string,
  options: {
    initialValue?: T;
    validation?: any;
  } = {},
) {
  const { initialValue, validation } = options;

  const field = useField(name, validation, {
    initialValue,
  });

  return {
    /** 필드 값 */
    value: field.value as Ref<T>,
    /** 에러 메시지 */
    errorMessage: field.errorMessage,
    /** 필드 메타 정보 */
    meta: field.meta,
    /** 필드 핸들러 (blur, change, input) */
    handleBlur: field.handleBlur,
    handleChange: field.handleChange,
    handleInput: field.handleInput,
    /** 필드 값 설정 */
    setValue: field.setValue,
    /** 필드 에러 설정 */
    setError: field.setErrors,
    /** 필드 초기화 */
    resetField: field.resetField,
  };
}

/**
 * 동적 폼 필드 배열 관리 Composable
 *
 * @description
 * 동적으로 추가/삭제 가능한 필드 배열을 관리합니다.
 * (예: 연락처 여러 개, 파일 여러 개 등)
 *
 * @example
 * ```typescript
 * const { fields, push, remove, insert } = useFieldArray('contacts', {
 *   initialValue: [{ name: '', phone: '' }]
 * });
 *
 * // 필드 추가
 * push({ name: '', phone: '' });
 *
 * // 필드 제거
 * remove(0);
 * ```
 *
 * @param name - 필드 배열명
 * @param options - 옵션
 */
export function useFieldArray<T = any>(
  name: string,
  options: {
    initialValue?: T[];
  } = {},
) {
  const { initialValue = [] } = options;

  const fields = ref<T[]>([...initialValue]) as Ref<T[]>;

  /**
   * 필드 추가
   */
  function push(value: T) {
    fields.value.push(value);
  }

  /**
   * 필드 제거
   */
  function remove(index: number) {
    if (index >= 0 && index < fields.value.length) {
      fields.value.splice(index, 1);
    }
  }

  /**
   * 특정 위치에 필드 삽입
   */
  function insert(index: number, value: T) {
    if (index >= 0 && index <= fields.value.length) {
      fields.value.splice(index, 0, value);
    }
  }

  /**
   * 필드 이동
   */
  function move(from: number, to: number) {
    if (
      from >= 0 &&
      from < fields.value.length &&
      to >= 0 &&
      to < fields.value.length
    ) {
      const item = fields.value.splice(from, 1)[0];
      fields.value.splice(to, 0, item);
    }
  }

  /**
   * 모든 필드 제거
   */
  function clear() {
    fields.value = [];
  }

  /**
   * 필드 배열 초기화
   */
  function reset() {
    fields.value = [...initialValue];
  }

  return {
    fields,
    push,
    remove,
    insert,
    move,
    clear,
    reset,
  };
}
