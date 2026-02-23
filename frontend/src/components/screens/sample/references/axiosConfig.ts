import axios from 'axios';
import type {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { useCommonStore } from '@/stores/commonStore';
import Swal from 'sweetalert2';
import { ERROR_MESSAGES } from '@/constants/ERROR_MESSAGES';

// ========================================
// Axios 인스턴스 생성
// ========================================

const apiClient: AxiosInstance = axios.create({
  baseURL: '/', // 프록시 사용 (vite.config.ts에서 설정)
  timeout: 30000,
  withCredentials: true, // 쿠키/세션 전송 허용
});

// ========================================
// Request 인터셉터
// ========================================

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    // 🎯 모든 API 호출 전에 자동 실행!
    const commonStore = useCommonStore();

    // 로딩 시작
    commonStore.setLoading(true);

    // 세션 기반 인증 사용 (withCredentials: true로 쿠키 자동 전송)
    // Authorization 헤더는 필요 없음

    // FormData인 경우 Content-Type 자동 설정
    if (config.data instanceof FormData && config.headers) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (error: AxiosError) => {
    const commonStore = useCommonStore();
    commonStore.setLoading(false);
    return Promise.reject(error);
  },
);

// ========================================
// Response 인터셉터
// ========================================

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // 🎯 성공 시 자동 실행!
    const commonStore = useCommonStore();
    commonStore.setLoading(false);

    // return response.data;
    return response;
  },
  async (error: AxiosError): Promise<any> => {
    // 에러를 사용자에게 알럿을 띄우지 않고 내부적으로 처리하고 싶거나
    // 에러 자체가 하나의 정보인 경우 config에 커스텀옵션 넣기
    const config = error.config as any;
    if (config?.skipAlert) {
      return Promise.reject(error);
    }
    // apiClient.get('/check-id', { skipAlert: true } as any);

    // 🎯 에러 시 자동 실행!
    const commonStore = useCommonStore();
    const authStore = useAuthStore();
    commonStore.setLoading(false);

    // 에러 응답이 없는 경우 (네트워크 오류 등)
    if (!error.response) {
      await Swal.fire({
        icon: 'error',
        title: '네트워크 오류',
        text: ERROR_MESSAGES.NETWORK_ERROR,
        confirmButtonText: '확인',
        confirmButtonColor: '#4a90e2',
      });
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // HTTP 상태 코드별 처리
    switch (status) {
      case 400:
        // Bad Request - 유효성 검사 실패 등
        commonStore.setError(data.message || ERROR_MESSAGES.BAD_REQUEST);
        await Swal.fire({
          icon: 'warning',
          title: '잘못된 요청',
          text: data.message || ERROR_MESSAGES.BAD_REQUEST,
          confirmButtonText: '확인',
          confirmButtonColor: '#4a90e2',
        });
        break;

      case 401:
        // Unauthorized - 인증 실패
        commonStore.setError(ERROR_MESSAGES.UNAUTHORIZED);

        // 로그아웃 처리
        await authStore.logout();

        await Swal.fire({
          icon: 'warning',
          title: '인증 만료',
          text: ERROR_MESSAGES.UNAUTHORIZED,
          confirmButtonText: '확인',
          confirmButtonColor: '#4a90e2',
        });

        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
        break;

      case 403:
        // Forbidden - 권한 없음
        commonStore.setError(ERROR_MESSAGES.FORBIDDEN);
        await Swal.fire({
          icon: 'error',
          title: '접근 거부',
          text: ERROR_MESSAGES.FORBIDDEN,
          confirmButtonText: '확인',
          confirmButtonColor: '#4a90e2',
        });
        break;

      case 404:
        // Not Found
        commonStore.setError(data.message || ERROR_MESSAGES.NOT_FOUND);
        await Swal.fire({
          icon: 'error',
          title: '리소스를 찾을 수 없음',
          text: data.message || ERROR_MESSAGES.NOT_FOUND,
          confirmButtonText: '확인',
          confirmButtonColor: '#4a90e2',
        });
        break;

      case 409:
        // Conflict - 중복 데이터 등
        commonStore.setError(data.message || ERROR_MESSAGES.CONFLICT);
        await Swal.fire({
          icon: 'warning',
          title: '충돌 발생',
          text: data.message || ERROR_MESSAGES.CONFLICT,
          confirmButtonText: '확인',
          confirmButtonColor: '#4a90e2',
        });
        break;

      case 500:
        // Internal Server Error
        commonStore.setError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        await Swal.fire({
          icon: 'error',
          title: '서버 오류',
          text: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          confirmButtonText: '확인',
          confirmButtonColor: '#4a90e2',
        });
        break;

      case 503:
        // Service Unavailable
        commonStore.setError(ERROR_MESSAGES.SERVICE_UNAVAILABLE);
        await Swal.fire({
          icon: 'error',
          title: '서비스 이용 불가',
          text: ERROR_MESSAGES.SERVICE_UNAVAILABLE,
          confirmButtonText: '확인',
          confirmButtonColor: '#4a90e2',
        });
        break;

      default:
        // 기타 에러
        commonStore.setError(data.message || ERROR_MESSAGES.UNKNOWN_ERROR);
        await Swal.fire({
          icon: 'error',
          title: '오류 발생',
          text: data.message || ERROR_MESSAGES.UNKNOWN_ERROR,
          confirmButtonText: '확인',
          confirmButtonColor: '#4a90e2',
        });
    }

    return Promise.reject(error);
  },
);

// ========================================
// API 타입 정의
// ========================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  size: number;
  sort?: string;
  direction?: 'asc' | 'desc';
}

export interface PaginationResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// ========================================
// API 유틸리티 함수
// ========================================

/**
 * GET 요청
 */
export const get = <T = any>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return apiClient.get<T>(url, config);
};

/**
 * POST 요청
 */
export const post = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return apiClient.post<T>(url, data, config);
};

/**
 * PUT 요청
 */
export const put = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return apiClient.put<T>(url, data, config);
};

/**
 * PATCH 요청
 */
export const patch = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return apiClient.patch<T>(url, data, config);
};

/**
 * DELETE 요청
 */
export const del = <T = any>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return apiClient.delete<T>(url, config);
};

/**
 * 파일 업로드 (FormData)
 */
export const uploadFile = <T = any>(
  url: string,
  formData: FormData,
  onUploadProgress?: (progressEvent: any) => void,
): Promise<AxiosResponse<T>> => {
  return apiClient.post<T>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};

/**
 * 파일 다운로드
 */
export const downloadFile = async (
  url: string,
  filename?: string,
): Promise<void> => {
  try {
    const response = await apiClient.get(url, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = downloadUrl;
    link.download = filename || 'download';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('File download failed:', error);
    throw error;
  }
};

/**
 * 페이지네이션이 포함된 GET 요청
 */
export const getPaginated = <T = any>(
  url: string,
  params: PaginationParams,
  additionalParams?: Record<string, any>,
): Promise<AxiosResponse<PaginationResponse<T>>> => {
  return apiClient.get<PaginationResponse<T>>(url, {
    params: {
      page: params.page,
      size: params.size,
      sort: params.sort,
      direction: params.direction || 'asc',
      ...additionalParams,
    },
  });
};

/**
 * 여러 요청을 동시에 수행
 */
export const all = <T = any>(
  requests: Promise<AxiosResponse<T>>[],
): Promise<AxiosResponse<T>[]> => {
  return Promise.all(requests);
};

// ========================================
// Export
// ========================================

export default apiClient;

export { apiClient };
