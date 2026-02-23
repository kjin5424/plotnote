import { ref, computed, type Ref } from "vue";
import axios, { type AxiosProgressEvent } from "axios";
import { fileRules } from "@/utils/validator";
import { downloadFile as downloadFileHelper } from "@/utils/fileHelper";

/**
 * 업로드된 파일 정보
 */
export interface UploadedFile {
  /** 고유 ID */
  id: string;
  /** 원본 File 객체 */
  file: File;
  /** 파일명 */
  name: string;
  /** 파일 크기 (bytes) */
  size: number;
  /** MIME 타입 */
  type: string;
  /** 미리보기 URL (이미지/PDF의 경우) */
  preview?: string;
  /** 업로드 진행률 (0-100) */
  progress?: number;
  /** 업로드 상태 */
  status: "pending" | "uploading" | "success" | "error";
  /** 에러 메시지 */
  error?: string;
  /** 서버 응답 (업로드 성공 시) */
  response?: any;
}

/**
 * 파일 업로드 옵션
 */
export interface FileUploadOptions {
  /** 허용할 MIME 타입 (예: ['image/*', 'application/pdf']) */
  accept?: string[];
  /** 최대 파일 크기 (MB) */
  maxSize?: number;
  /** 다중 파일 업로드 허용 여부 */
  multiple?: boolean;
  /** 최대 파일 개수 (multiple이 true일 때) */
  maxFiles?: number;
  /** 업로드 API 엔드포인트 */
  uploadUrl?: string;
  /** 추가 전송할 데이터 */
  additionalData?: Record<string, any>;
  /** 자동 업로드 여부 (파일 선택 시 즉시 업로드) */
  autoUpload?: boolean;
  /** 업로드 성공 콜백 */
  onSuccess?: (file: UploadedFile, response: any) => void;
  /** 업로드 실패 콜백 */
  onError?: (file: UploadedFile, error: any) => void;
  /** 업로드 진행 콜백 */
  onProgress?: (file: UploadedFile, progress: number) => void;
  /** 파일 추가 전 검증 콜백 */
  onValidate?: (file: File) => boolean | string;
}

/**
 * 파일 업로드를 관리하는 Composable
 *
 * @description
 * - 파일 선택 및 검증
 * - 이미지/PDF 미리보기 생성
 * - 진행률 추적
 * - 단일/다중 파일 업로드
 * - 드래그 앤 드롭 지원
 *
 * @example
 * ```typescript
 * const {
 *   files,
 *   previews,
 *   isUploading,
 *   progress,
 *   addFiles,
 *   removeFile,
 *   uploadFiles
 * } = useFileUpload({
 *   accept: ['image/*', 'application/pdf'],
 *   maxSize: 5,
 *   multiple: true,
 *   uploadUrl: '/api/upload',
 *   onSuccess: (file, response) => {
 *     console.log('업로드 성공:', response);
 *   }
 * });
 *
 * // 파일 선택
 * <input type="file" @change="addFiles($event.target.files)" />
 *
 * // 드래그 앤 드롭
 * <div @drop.prevent="addFiles($event.dataTransfer.files)">
 *   파일을 드래그하세요
 * </div>
 * ```
 *
 * @param options - 파일 업로드 옵션
 */
export function useFileUpload(options: FileUploadOptions = {}) {
  const {
    accept = [],
    maxSize = 10,
    multiple = false,
    maxFiles = 10,
    uploadUrl = "/api/upload",
    additionalData = {},
    autoUpload = false,
    onSuccess,
    onError,
    onProgress,
    onValidate,
  } = options;

  // ========== 상태 관리 ==========

  /** 업로드할 파일 목록 */
  const files = ref<UploadedFile[]>([]);

  /** 전체 업로드 중 여부 */
  const isUploading = ref(false);

  // ========== 계산된 속성 ==========

  /**
   * 미리보기 URL 목록
   */
  const previews = computed(() => {
    return files.value
      .filter((f) => f.preview)
      .map((f) => ({ id: f.id, url: f.preview!, name: f.name }));
  });

  /**
   * 전체 업로드 진행률 (평균)
   */
  const progress = computed(() => {
    if (files.value.length === 0) return 0;
    const total = files.value.reduce((sum, f) => sum + (f.progress || 0), 0);
    return Math.round(total / files.value.length);
  });

  /**
   * 업로드 대기 중인 파일 개수
   */
  const pendingCount = computed(() => {
    return files.value.filter((f) => f.status === "pending").length;
  });

  /**
   * 업로드 성공한 파일 개수
   */
  const successCount = computed(() => {
    return files.value.filter((f) => f.status === "success").length;
  });

  /**
   * 업로드 실패한 파일 개수
   */
  const errorCount = computed(() => {
    return files.value.filter((f) => f.status === "error").length;
  });

  /**
   * 모든 파일이 업로드 완료되었는지 여부
   */
  const isAllCompleted = computed(() => {
    return (
      files.value.length > 0 &&
      files.value.every((f) => f.status === "success" || f.status === "error")
    );
  });

  // ========== 메서드 ==========

  /**
   * 파일 추가
   *
   * @param fileList - FileList 또는 File 배열
   */
  async function addFiles(fileList: FileList | File[] | null) {
    if (!fileList || fileList.length === 0) return;

    const newFiles = Array.from(fileList);

    // 최대 파일 개수 체크
    if (!multiple && files.value.length > 0) {
      files.value = []; // 단일 파일 모드면 기존 파일 제거
    }

    if (multiple && files.value.length + newFiles.length > maxFiles) {
      alert(`최대 ${maxFiles}개까지 업로드 가능합니다.`);
      return;
    }

    // 각 파일 검증 및 추가
    for (const file of newFiles) {
      const validation = validateFile(file);

      if (validation !== true) {
        alert(validation);
        continue;
      }

      // 커스텀 검증
      if (onValidate) {
        const customValidation = onValidate(file);
        if (customValidation !== true) {
          alert(
            typeof customValidation === "string"
              ? customValidation
              : "파일 검증 실패",
          );
          continue;
        }
      }

      const uploadedFile: UploadedFile = {
        id: generateId(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "pending",
        progress: 0,
      };

      // 미리보기 생성 (이미지 또는 PDF)
      if (file.type.startsWith("image/") || file.type === "application/pdf") {
        uploadedFile.preview = await createPreview(file);
      }

      files.value.push(uploadedFile);
    }

    // 자동 업로드
    if (autoUpload) {
      await uploadFiles();
    }
  }

  /**
   * 파일 제거
   *
   * @param fileId - 제거할 파일 ID
   */
  function removeFile(fileId: string) {
    const index = files.value.findIndex((f) => f.id === fileId);
    if (index === -1) return;

    const file = files.value[index];

    // 미리보기 URL 해제
    if (file.preview && file.preview.startsWith("blob:")) {
      URL.revokeObjectURL(file.preview);
    }

    files.value.splice(index, 1);
  }

  /**
   * 모든 파일 제거
   */
  function clearFiles() {
    // 미리보기 URL 모두 해제
    files.value.forEach((file) => {
      if (file.preview && file.preview.startsWith("blob:")) {
        URL.revokeObjectURL(file.preview);
      }
    });

    files.value = [];
  }

  /**
   * 파일 업로드 실행
   *
   * @param fileIds - 업로드할 파일 ID 배열 (생략 시 대기 중인 모든 파일)
   */
  async function uploadFiles(fileIds?: string[]) {
    const targetFiles = fileIds
      ? files.value.filter(
          (f) => fileIds.includes(f.id) && f.status === "pending",
        )
      : files.value.filter((f) => f.status === "pending");

    if (targetFiles.length === 0) return;

    isUploading.value = true;

    // 각 파일 개별 업로드
    const uploadPromises = targetFiles.map((file) => uploadSingleFile(file));

    await Promise.allSettled(uploadPromises);

    isUploading.value = false;
  }

  /**
   * 단일 파일 업로드
   *
   * @param uploadedFile - 업로드할 파일 정보
   */
  async function uploadSingleFile(uploadedFile: UploadedFile) {
    uploadedFile.status = "uploading";
    uploadedFile.progress = 0;

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile.file);

      // 추가 데이터 첨부
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });

      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            uploadedFile.progress = percentCompleted;

            if (onProgress) {
              onProgress(uploadedFile, percentCompleted);
            }
          }
        },
      });

      // 성공 처리
      uploadedFile.status = "success";
      uploadedFile.progress = 100;
      uploadedFile.response = response.data;

      if (onSuccess) {
        onSuccess(uploadedFile, response.data);
      }

      return response.data;
    } catch (error: any) {
      // 실패 처리
      uploadedFile.status = "error";
      uploadedFile.error =
        error.response?.data?.message || error.message || "업로드 실패";

      if (onError) {
        onError(uploadedFile, error);
      }

      throw error;
    }
  }

  /**
   * 파일 재업로드 (실패한 파일)
   *
   * @param fileId - 재업로드할 파일 ID
   */
  async function retryUpload(fileId: string) {
    const file = files.value.find((f) => f.id === fileId);
    if (!file || file.status !== "error") return;

    file.status = "pending";
    file.error = undefined;

    await uploadSingleFile(file);
  }

  /**
   * 파일 다운로드
   *
   * @param fileId - 다운로드할 파일 ID
   */
  function downloadFile(fileId: string) {
    const file = files.value.find((f) => f.id === fileId);
    if (!file) return;

    // 서버에서 받은 URL이 있으면 그걸로 다운로드
    if (file.response?.url) {
      downloadFileHelper(file.response.url, file.name);
    } else {
      // 아니면 로컬 파일을 다운로드
      const url = URL.createObjectURL(file.file);
      downloadFileHelper(url, file.name);
      URL.revokeObjectURL(url);
    }
  }

  /**
   * 특정 파일 가져오기
   *
   * @param fileId - 파일 ID
   */
  function getFile(fileId: string): UploadedFile | undefined {
    return files.value.find((f) => f.id === fileId);
  }

  /**
   * 드래그 앤 드롭 핸들러
   */
  function handleDrop(event: DragEvent) {
    event.preventDefault();
    const droppedFiles = event.dataTransfer?.files;
    if (droppedFiles) {
      addFiles(droppedFiles);
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // ========== 헬퍼 함수 ==========

  /**
   * 파일 검증
   */
  function validateFile(file: File): true | string {
    // 크기 검증
    if (!fileRules.isValidSize(file, maxSize)) {
      return `파일 크기는 ${maxSize}MB 이하여야 합니다.`;
    }

    // 타입 검증
    if (accept.length > 0 && !fileRules.isValidType(file, accept)) {
      return `허용되지 않는 파일 형식입니다. (${accept.join(", ")})`;
    }

    return true;
  }

  /**
   * 미리보기 생성
   */
  function createPreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      // PDF는 첫 페이지만 미리보기
      if (file.type === "application/pdf") {
        reader.readAsDataURL(file);
      } else {
        reader.readAsDataURL(file);
      }
    });
  }

  /**
   * 고유 ID 생성
   */
  function generateId(): string {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 초기화
   */
  function reset() {
    clearFiles();
    isUploading.value = false;
  }

  return {
    // 상태
    files,
    isUploading,

    // 계산된 속성
    previews,
    progress,
    pendingCount,
    successCount,
    errorCount,
    isAllCompleted,

    // 메서드
    addFiles,
    removeFile,
    clearFiles,
    uploadFiles,
    retryUpload,
    downloadFile,
    getFile,
    reset,

    // 드래그 앤 드롭
    handleDrop,
    handleDragOver,
  };
}

/**
 * 이미지 크롭/리사이즈 헬퍼
 *
 * @description
 * 이미지 파일을 리사이즈하거나 크롭합니다.
 *
 * @example
 * ```typescript
 * const { resizeImage } = useImageProcessor();
 *
 * const resized = await resizeImage(file, {
 *   maxWidth: 800,
 *   maxHeight: 600,
 *   quality: 0.8
 * });
 * ```
 */
export function useImageProcessor() {
  /**
   * 이미지 리사이즈
   *
   * @param file - 원본 이미지 파일
   * @param options - 리사이즈 옵션
   */
  async function resizeImage(
    file: File,
    options: {
      maxWidth?: number;
      maxHeight?: number;
      quality?: number;
    } = {},
  ): Promise<File> {
    const { maxWidth = 1920, maxHeight = 1080, quality = 0.9 } = options;

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // 비율 유지하며 리사이즈
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                resolve(resizedFile);
              } else {
                reject(new Error("이미지 리사이즈 실패"));
              }
            },
            file.type,
            quality,
          );
        };

        img.onerror = () => reject(new Error("이미지 로드 실패"));
      };

      reader.onerror = () => reject(new Error("파일 읽기 실패"));
    });
  }

  return {
    resizeImage,
  };
}
