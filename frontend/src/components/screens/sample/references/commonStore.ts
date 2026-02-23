import { defineStore } from "pinia";
import { ref, computed } from "vue";

// ============ 타입 정의 ============
interface Breadcrumb {
  label: string;
  path?: string;
}

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

// ============ 스토어 정의 ============
export const useCommonStore = defineStore("common", () => {
  // ============ State ============
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const breadcrumbs = ref<Breadcrumb[]>([{ label: "홈", path: "/" }]);
  const notifications = ref<Notification[]>([]);
  const loadingCount = ref<number>(0); // 동시 요청을 위한 카운터
  let timer: ReturnType<typeof setTimeout> | null = null;

  // ============ Getters ============
  const isLoading = computed<boolean>(
    () => loading.value || loadingCount.value > 0,
  );
  const hasError = computed<boolean>(() => !!error.value);
  const currentBreadcrumbs = computed<Breadcrumb[]>(() => breadcrumbs.value);
  const activeNotifications = computed<Notification[]>(
    () => notifications.value,
  );

  // ============ Actions ============

  /**
   * 로딩 상태 설정
   * @param status - 로딩 상태 (true/false)
   */
  const setLoading = (status: boolean): void => {
    if (status) {
      // --- 로딩 시작 요청 시 ---
      // 이미 돌아가는 타이머가 있다면 중복 방지를 위해 제거
      if (timer) clearTimeout(timer);

      // 300ms 후에 로딩 카운트를 올리도록 타이머 참조 보관
      timer = setTimeout(() => {
        loadingCount.value++;
        timer = null; // 실행 완료 후 비우기
      }, 300);
    } else {
      // --- 로딩 종료 요청 시 ---
      if (timer) {
        clearTimeout(timer);
        timer = null;
      } else {
        // 이미 300ms가 지나서 카운트가 올라간 상태라면 카운트 감소
        loadingCount.value = Math.max(0, loadingCount.value - 1);
      }
      loading.value = false;
    }
  };

  /**
   * 로딩 상태 강제 초기화
   */
  const resetLoading = (): void => {
    if (timer) clearTimeout(timer);
    timer = null;
    loading.value = false;
    loadingCount.value = 0;
  };

  /**
   * 에러 메시지 설정
   * @param message - 에러 메시지
   */
  const setError = (message: string | null): void => {
    error.value = message;

    // 에러 발생 시 자동으로 알림 추가
    if (message) {
      addNotification({
        type: "error",
        message,
        duration: 5000,
      });
    }
  };

  /**
   * 에러 초기화
   */
  const clearError = (): void => {
    error.value = null;
  };

  /**
   * 브레드크럼블 설정
   * @param items - 브레드크럼블 아이템 배열
   *
   * 사용 예시:
   * commonStore.setBreadcrumbs([
   *   { label: '홈', path: '/' },
   *   { label: '강의 목록', path: '/courses' },
   *   { label: '강의 상세' }
   * ]);
   */
  const setBreadcrumbs = (items: Breadcrumb[]): void => {
    const defaultHome = { label: "홈", path: "/" };

    const hasHome =
      items.length > 0 && (items[0].label === "홈" || items[0].path === "/");

    if (hasHome) {
      breadcrumbs.value = items;
    } else {
      breadcrumbs.value = [defaultHome, ...items];
    }
  };

  /**
   * 브레드크럼블 추가
   * @param item - 추가할 브레드크럼블 아이템
   */
  const addBreadcrumb = (item: Breadcrumb): void => {
    breadcrumbs.value.push(item);
  };

  /**
   * 브레드크럼블 초기화
   */
  const clearBreadcrumbs = (): void => {
    breadcrumbs.value = [{ label: "홈", path: "/" }];
  };

  /**
   * 알림 추가
   * @param notification - 알림 정보
   *
   * 사용 예시:
   * commonStore.addNotification({
   *   type: 'success',
   *   message: '저장되었습니다.',
   *   duration: 3000
   * });
   */
  const addNotification = (notification: Omit<Notification, "id">): string => {
    const id = `notification_${Date.now()}_${Math.random()}`;
    const newNotification: Notification = {
      id,
      type: notification.type,
      message: notification.message,
      duration: notification.duration || 3000,
    };

    notifications.value.push(newNotification);

    // 자동 제거
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  /**
   * 알림 제거
   * @param id - 제거할 알림 ID
   */
  const removeNotification = (id: string): void => {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  };

  /**
   * 모든 알림 제거
   */
  const clearAllNotifications = (): void => {
    notifications.value = [];
  };

  /**
   * 성공 알림 표시 (단축 메서드)
   * @param message - 알림 메시지
   * @param duration - 표시 시간 (기본: 3000ms)
   */
  const showSuccess = (message: string, duration = 3000): string => {
    return addNotification({ type: "success", message, duration });
  };

  /**
   * 에러 알림 표시 (단축 메서드)
   * @param message - 알림 메시지
   * @param duration - 표시 시간 (기본: 5000ms)
   */
  const showError = (message: string, duration = 5000): string => {
    return addNotification({ type: "error", message, duration });
  };

  /**
   * 경고 알림 표시 (단축 메서드)
   * @param message - 알림 메시지
   * @param duration - 표시 시간 (기본: 4000ms)
   */
  const showWarning = (message: string, duration = 4000): string => {
    return addNotification({ type: "warning", message, duration });
  };

  /**
   * 정보 알림 표시 (단축 메서드)
   * @param message - 알림 메시지
   * @param duration - 표시 시간 (기본: 3000ms)
   */
  const showInfo = (message: string, duration = 3000): string => {
    return addNotification({ type: "info", message, duration });
  };

  /**
   * 스토어 초기화 (로그아웃 시 사용)
   */
  const resetStore = (): void => {
    loading.value = false;
    loadingCount.value = 0;
    error.value = null;
    breadcrumbs.value = [{ label: "홈", path: "/" }];
    notifications.value = [];
  };

  return {
    // ▶ State
    // 1. 로딩 상태
    loading, // true/false
    // 사용 방법 예시: if (commonStore.loading) { ... }
    // 로딩 카운터 (동시 요청용)
    loadingCount, // 숫자

    // 2. 에러 메시지
    error, // string | null
    // 사용 방법 예시: if (commonStore.error) { alert(commonStore.error); }

    // 3. 브레드크럼블
    breadcrumbs, // Breadcrumb[]
    // 사용 방법 예시: commonStore.breadcrumbs.map(b => b.label)

    // 4. 알림 목록
    notifications, // Notification[]

    // ▶ Getters
    // 1. 로딩 상태 (카운터 포함)
    isLoading, // true/false
    // 사용 방법 예시: if (commonStore.isLoading) { ... }

    // 2. 에러 존재 여부
    hasError, // true/false

    // 3. 현재 브레드크럼블
    currentBreadcrumbs, // Breadcrumb[]

    // 4. 활성 알림 목록
    activeNotifications, // Notification[]

    // ▶ Actions
    // 1. 로딩 관리
    setLoading, // (status: boolean) => void
    resetLoading, // () => void

    // 2. 에러 관리
    setError, // (message: string | null) => void
    clearError, // () => void

    // 3. 브레드크럼블 관리
    setBreadcrumbs, // (items: Breadcrumb[]) => void
    addBreadcrumb, // (item: Breadcrumb) => void
    clearBreadcrumbs, // () => void

    // 4. 알림 관리
    addNotification, // (notification) => string (returns id)
    removeNotification, // (id: string) => void
    clearAllNotifications, // () => void

    // 5. 단축 알림 메서드
    showSuccess, // (message: string, duration?) => string
    showError, // (message: string, duration?) => string
    showWarning, // (message: string, duration?) => string
    showInfo, // (message: string, duration?) => string

    // 6. 스토어 초기화
    resetStore, // () => void
  };
});

// ============ Export Types ============
export type { Breadcrumb, Notification };
