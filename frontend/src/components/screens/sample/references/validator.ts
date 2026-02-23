/**
 * @fileoverview 폼 검증 유틸리티
 * @description Vee-Validate와 Yup을 활용한 검증 함수 및 스키마 정의
 */

import * as yup from "yup";
import {
  FILE_SIZE,
  FILE_TYPE,
  FILE_ERROR_MSG,
} from "@/constants/FILE_CONSTANTS";

// ============================================================================
// 기본 검증 함수
// ============================================================================

/**
 * 리다이렉트 경로 유효성 검증
 * @param path - 검증할 경로
 * @returns 유효한 경로 여부
 * @example
 * isValidRedirect('/dashboard') // true
 * isValidRedirect('//evil.com') // false
 */
export const isValidRedirect = (path: string): boolean => {
  return path.startsWith("/") && !path.startsWith("//");
};

/**
 * 이메일 유효성 검증
 * @param email - 검증할 이메일 주소
 * @returns 유효한 이메일 여부
 * @example
 * isValidEmail('test@example.com') // true
 * isValidEmail('invalid-email') // false
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * 비밀번호 강도 검증 (8자 이상, 영문+숫자)
 * @param password - 검증할 비밀번호
 * @returns 유효한 비밀번호 여부
 * @example
 * isValidPassword('password123') // true
 * isValidPassword('abc123') // false (너무 짧음)
 */
export function isValidPassword(password: string): boolean {
  return (
    password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password)
  );
}

/**
 * 전화번호 유효성 검증 (한국 형식)
 * @param phone - 검증할 전화번호
 * @returns 유효한 전화번호 여부
 * @example
 * isValidPhone('010-1234-5678') // true
 * isValidPhone('02-1234-5678') // true
 */
export function isValidPhone(phone: string): boolean {
  const regex = /^(01[0-9]|02|0[3-9][0-9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return regex.test(phone);
}

/**
 * URL 유효성 검증
 * @param url - 검증할 URL
 * @returns 유효한 URL 여부
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 숫자 범위 검증
 * @param value - 검증할 값
 * @param min - 최소값
 * @param max - 최대값
 * @returns 범위 내 포함 여부
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * 파일 사이즈 유효성 검증
 * @param size - 파일 사이즈 (byte)
 * @param maxSize - 허용 최대 사이즈 (byte)
 * @returns 유효 여부
 */
export const isValidFileSize = (size: number, maxSize: number): boolean => {
  return size > FILE_SIZE.MIN && size <= maxSize;
};

/**
 * 파일 타입(MIME) 유효성 검증
 * @param type - 파일의 MIME Type
 * @param allowedTypes - 허용된 MIME Type 배열
 * @returns 유효 여부
 */
export const isValidFileType = (
  type: string,
  allowedTypes: readonly string[],
): boolean => {
  return allowedTypes.includes(type);
};

// ============================================================================
// Yup 스키마 정의
// ============================================================================

/**
 * 인증 관련 스키마
 */
export const authSchemas = {
  /**
   * 로그인 폼 스키마
   */
  login: yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("올바른 이메일 형식이 아닙니다")
      .test("valid-email", "올바른 이메일 형식이 아닙니다", (value) =>
        value ? isValidEmail(value) : false,
      ),
    password: yup.string().required("비밀번호를 입력해주세요"),
  }),

  /**
   * 회원가입 폼 스키마
   */
  register: yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("올바른 이메일 형식이 아닙니다")
      .test("valid-email", "올바른 이메일 형식이 아닙니다", (value) =>
        value ? isValidEmail(value) : false,
      ),
    password: yup
      .string()
      .required("비밀번호를 입력해주세요")
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .test(
        "valid-password",
        "비밀번호는 영문과 숫자를 포함해야 합니다",
        (value) => (value ? isValidPassword(value) : false),
      ),
    passwordConfirm: yup
      .string()
      .required("비밀번호 확인을 입력해주세요")
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
    name: yup
      .string()
      .required("이름을 입력해주세요")
      .min(2, "이름은 최소 2자 이상이어야 합니다")
      .max(50, "이름은 최대 50자까지 입력 가능합니다"),
  }),

  /**
   * 비밀번호 변경 폼 스키마
   */
  changePassword: yup.object({
    currentPassword: yup.string().required("현재 비밀번호를 입력해주세요"),
    newPassword: yup
      .string()
      .required("새 비밀번호를 입력해주세요")
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .test(
        "valid-password",
        "비밀번호는 영문과 숫자를 포함해야 합니다",
        (value) => (value ? isValidPassword(value) : false),
      )
      .notOneOf(
        [yup.ref("currentPassword")],
        "새 비밀번호는 현재 비밀번호와 달라야 합니다",
      ),
    newPasswordConfirm: yup
      .string()
      .required("새 비밀번호 확인을 입력해주세요")
      .oneOf([yup.ref("newPassword")], "비밀번호가 일치하지 않습니다"),
  }),
};

/**
 * 사용자 프로필 관련 스키마
 */
export const profileSchemas = {
  /**
   * 프로필 수정 스키마
   */
  update: yup.object({
    name: yup
      .string()
      .required("이름을 입력해주세요")
      .min(2, "이름은 최소 2자 이상이어야 합니다")
      .max(50, "이름은 최대 50자까지 입력 가능합니다"),
    phone: yup
      .string()
      .test("valid-phone", "올바른 전화번호 형식이 아닙니다", (value) =>
        value ? isValidPhone(value) : true,
      ),
    bio: yup.string().max(500, "소개는 최대 500자까지 입력 가능합니다"),
  }),
};

/**
 * 강의 관련 스키마
 */
export const courseSchemas = {
  /**
   * 강의 생성/수정 스키마
   */
  createOrUpdate: yup.object({
    title: yup
      .string()
      .required("강의 제목을 입력해주세요")
      .min(2, "제목은 최소 2자 이상이어야 합니다")
      .max(100, "제목은 최대 100자까지 입력 가능합니다"),
    description: yup
      .string()
      .required("강의 설명을 입력해주세요")
      .min(10, "설명은 최소 10자 이상이어야 합니다")
      .max(2000, "설명은 최대 2000자까지 입력 가능합니다"),
    startDate: yup
      .date()
      .required("시작일을 선택해주세요")
      .min(new Date(), "시작일은 오늘 이후여야 합니다"),
    endDate: yup
      .date()
      .required("종료일을 선택해주세요")
      .min(yup.ref("startDate"), "종료일은 시작일 이후여야 합니다"),
    maxStudents: yup
      .number()
      .required("최대 수강 인원을 입력해주세요")
      .min(1, "최소 1명 이상이어야 합니다")
      .max(1000, "최대 1000명까지 가능합니다")
      .integer("정수로 입력해주세요"),
  }),
};

/**
 * 과제 관련 스키마
 */
export const assignmentSchemas = {
  /**
   * 과제 생성/수정 스키마
   */
  createOrUpdate: yup.object({
    title: yup
      .string()
      .required("과제 제목을 입력해주세요")
      .min(2, "제목은 최소 2자 이상이어야 합니다")
      .max(100, "제목은 최대 100자까지 입력 가능합니다"),
    content: yup
      .string()
      .required("과제 내용을 입력해주세요")
      .min(10, "내용은 최소 10자 이상이어야 합니다"),
    dueDate: yup
      .date()
      .required("제출 기한을 선택해주세요")
      .min(new Date(), "제출 기한은 현재 시각 이후여야 합니다"),
    maxScore: yup
      .number()
      .required("배점을 입력해주세요")
      .min(1, "최소 1점 이상이어야 합니다")
      .max(1000, "최대 1000점까지 가능합니다")
      .integer("정수로 입력해주세요"),
  }),

  /**
   * 과제 제출 스키마
   */
  submit: yup.object({
    content: yup
      .string()
      .required("제출 내용을 입력해주세요")
      .min(10, "내용은 최소 10자 이상이어야 합니다"),
    fileUrl: yup
      .string()
      .test("valid-url", "올바른 URL 형식이 아닙니다", (value) =>
        value ? isValidUrl(value) : true,
      ),
  }),
};

/**
 * Q&A 게시판 관련 스키마
 */
export const qnaSchemas = {
  /**
   * 질문 작성 스키마
   */
  createQuestion: yup.object({
    title: yup
      .string()
      .required("제목을 입력해주세요")
      .min(5, "제목은 최소 5자 이상이어야 합니다")
      .max(100, "제목은 최대 100자까지 입력 가능합니다"),
    content: yup
      .string()
      .required("내용을 입력해주세요")
      .min(10, "내용은 최소 10자 이상이어야 합니다"),
    category: yup.string().required("카테고리를 선택해주세요"),
  }),

  /**
   * 답변 작성 스키마
   */
  createAnswer: yup.object({
    content: yup
      .string()
      .required("답변 내용을 입력해주세요")
      .min(10, "답변은 최소 10자 이상이어야 합니다"),
  }),
};

/**
 * 설문 조사 관련 스키마
 */
export const surveySchemas = {
  /**
   * 설문 생성 스키마
   */
  create: yup.object({
    title: yup
      .string()
      .required("설문 제목을 입력해주세요")
      .min(5, "제목은 최소 5자 이상이어야 합니다")
      .max(100, "제목은 최대 100자까지 입력 가능합니다"),
    description: yup.string().max(500, "설명은 최대 500자까지 입력 가능합니다"),
    startDate: yup
      .date()
      .required("시작일을 선택해주세요")
      .min(new Date(), "시작일은 현재 시각 이후여야 합니다"),
    endDate: yup
      .date()
      .required("종료일을 선택해주세요")
      .min(yup.ref("startDate"), "종료일은 시작일 이후여야 합니다"),
  }),
};

/**
 * 파일 업로드 관련 스키마 (예시: 과제 제출 시 활용)
 */
export const fileSchemas = {
  /**
   * 단일 이미지 업로드 스키마
   */
  image: yup
    .mixed<File>()
    .required(FILE_ERROR_MSG.EMPTY_FILE)
    .test("fileSize", FILE_ERROR_MSG.TOO_LARGE(5), (value) => {
      if (!value) return false;
      return isValidFileSize(value.size, FILE_SIZE.MAX_5MB);
    })
    .test("fileType", FILE_ERROR_MSG.INVALID_TYPE, (value) => {
      if (!value) return false;
      return isValidFileType(value.type, FILE_TYPE.IMAGE);
    }),

  /**
   * 문서 파일 업로드 스키마 (최대 20MB)
   */
  document: yup
    .mixed<File>()
    .required(FILE_ERROR_MSG.EMPTY_FILE)
    .test("fileSize", FILE_ERROR_MSG.TOO_LARGE(20), (value) => {
      if (!value) return false;
      return isValidFileSize(value.size, FILE_SIZE.MAX_20MB);
    })
    .test("fileType", FILE_ERROR_MSG.INVALID_TYPE, (value) => {
      if (!value) return false;
      return isValidFileType(value.type, [
        ...FILE_TYPE.IMAGE,
        ...FILE_TYPE.DOCUMENT,
      ]);
    }),
};

// ============================================================================
// Vee-Validate 커스텀 규칙
// ============================================================================

/**
 * Vee-Validate에서 사용할 수 있는 커스텀 검증 규칙
 */
export const customRules = {
  /**
   * 리다이렉트 경로 검증 규칙
   */
  validRedirect: (value: string) => {
    if (!value) return true;
    return isValidRedirect(value) || "올바른 경로 형식이 아닙니다";
  },

  /**
   * 이메일 검증 규칙
   */
  validEmail: (value: string) => {
    if (!value) return true;
    return isValidEmail(value) || "올바른 이메일 형식이 아닙니다";
  },

  /**
   * 비밀번호 강도 검증 규칙
   */
  validPassword: (value: string) => {
    if (!value) return true;
    return (
      isValidPassword(value) ||
      "비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다"
    );
  },

  /**
   * 전화번호 검증 규칙
   */
  validPhone: (value: string) => {
    if (!value) return true;
    return isValidPhone(value) || "올바른 전화번호 형식이 아닙니다";
  },

  /**
   * URL 검증 규칙
   */
  validUrl: (value: string) => {
    if (!value) return true;
    return isValidUrl(value) || "올바른 URL 형식이 아닙니다";
  },

  /**
   * 숫자 범위 검증 규칙
   */
  inRange: (min: number, max: number) => (value: number) => {
    if (!value && value !== 0) return true;
    return (
      isInRange(value, min, max) || `${min}에서 ${max} 사이의 값을 입력해주세요`
    );
  },
};

export const fileRules = {
  /**
   * 파일 사이즈 규칙 (Vee-Validate용)
   * usage: rules="fileSize:20" (MB 단위 입력)
   */
  fileSize: (value: File, [maxMb]: [number]) => {
    if (!value) return true;
    const maxByte = maxMb * 1024 * 1024;
    return (
      isValidFileSize(value.size, maxByte) || FILE_ERROR_MSG.TOO_LARGE(maxMb)
    );
  },

  /**
   * [Boolean 반환] 파일 사이즈 유효성 체크
   */
  isValidSize: (value: File | null, maxByte: number): boolean => {
    if (!value) return true;
    return value.size > FILE_SIZE.MIN && value.size <= maxByte;
  },

  /**
   * 파일 타입 규칙 (Vee-Validate용)
   * usage: rules="fileType:image"
   */
  fileType: (value: File, [group]: [keyof typeof FILE_TYPE]) => {
    if (!value) return true;
    const allowed = FILE_TYPE[group];
    return isValidFileType(value.type, allowed) || FILE_ERROR_MSG.INVALID_TYPE;
  },

  /**
   * [Boolean 반환] 파일 타입 유효성 체크
   */
  isValidType: (
    value: File | null,
    allowedTypes: readonly string[],
  ): boolean => {
    if (!value) return true;
    return allowedTypes.includes(value.type);
  },
};

// ============================================================================
// 타입 정의
// ============================================================================

/**
 * 검증 에러 타입
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * 검증 결과 타입
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// ============================================================================
// 유틸리티 함수
// ============================================================================

/**
 * Yup 스키마로 데이터 검증
 * @param schema - Yup 스키마
 * @param data - 검증할 데이터
 * @returns 검증 결과
 */
export async function validateWithSchema<T>(
  schema: yup.ObjectSchema<any>,
  data: T,
): Promise<ValidationResult> {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: ValidationError[] = error.inner.map((err) => ({
        field: err.path || "",
        message: err.message,
      }));
      return { isValid: false, errors };
    }
    return { isValid: false, errors: [] };
  }
}

/**
 * 필드별 에러 메시지 추출
 * @param errors - 검증 에러 배열
 * @returns 필드명을 키로 하는 에러 메시지 객체
 */
export function getFieldErrors(
  errors: ValidationError[],
): Record<string, string> {
  return errors.reduce(
    (acc, error) => {
      acc[error.field] = error.message;
      return acc;
    },
    {} as Record<string, string>,
  );
}

export default {
  // 기본 검증 함수
  isValidRedirect,
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isValidUrl,
  isInRange,

  // Yup 스키마
  authSchemas,
  profileSchemas,
  courseSchemas,
  assignmentSchemas,
  qnaSchemas,
  surveySchemas,

  // 커스텀 규칙
  customRules,

  // 유틸리티
  validateWithSchema,
  getFieldErrors,
};
