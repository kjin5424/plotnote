/**
 * timestamp(ms)를 한국 날짜 형식으로 변환
 * @param ms - 타임스탬프 (밀리초)
 * @returns 한국 날짜 형식 문자열 (YYYY. MM. DD.)
 * @example
 * formatDate(1707350400000) // '2025. 02. 08.'
 */
export const formatDate = (ms: number): string => {
  if (!ms) return "";
  return new Date(ms).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

/**
 * Date 객체를 YYYY-MM-DD 형식으로 변환
 * @param date - 변환할 Date 객체
 * @returns YYYY-MM-DD 형식의 문자열
 * @example
 * formatDateISO(new Date('2025-02-08')) // '2025-02-08'
 */
export const formatDateISO = (
  date: Date | string | null | undefined,
): string => {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Date 객체를 YYYY-MM-DD HH:mm:ss 형식으로 변환
 * @param date - 변환할 Date 객체
 * @returns YYYY-MM-DD HH:mm:ss 형식의 문자열
 * @example
 * formatDateTime(new Date('2025-02-08 14:30:00')) // '2025-02-08 14:30:00'
 */
export const formatDateTime = (
  date: Date | string | null | undefined,
): string => {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Date 객체를 HH:mm 형식으로 변환
 * @param date - 변환할 Date 객체
 * @returns HH:mm 형식의 문자열
 * @example
 * formatTime(new Date('2025-02-08 14:30:00')) // '14:30'
 */
export const formatTime = (date: Date | string | null | undefined): string => {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "";

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

/**
 * Date 객체를 HH:mm:ss 형식으로 변환
 * @param date - 변환할 Date 객체
 * @returns HH:mm:ss 형식의 문자열
 * @example
 * formatTimeWithSeconds(new Date('2025-02-08 14:30:45')) // '14:30:45'
 */
export const formatTimeWithSeconds = (
  date: Date | string | null | undefined,
): string => {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "";

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

/**
 * YYYY-MM-DD 형식의 문자열을 Date 객체로 변환
 * @param dateString - YYYY-MM-DD 형식의 문자열
 * @returns Date 객체 또는 null
 * @example
 * parseDate('2025-02-08') // Date 객체
 */
export const parseDate = (
  dateString: string | null | undefined,
): Date | null => {
  if (!dateString) return null;

  const d = new Date(dateString);

  return isNaN(d.getTime()) ? null : d;
};

/**
 * Date 객체를 YYYY년 MM월 DD일 형식으로 변환
 * @param date - 변환할 Date 객체
 * @returns YYYY년 MM월 DD일 형식의 문자열
 * @example
 * formatDateKorean(new Date('2025-02-08')) // '2025년 02월 08일'
 */
export const formatDateKorean = (
  date: Date | string | null | undefined,
): string => {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일`;
};

/**
 * Date 객체를 YYYY년 MM월 DD일 HH시 mm분 형식으로 변환
 * @param date - 변환할 Date 객체
 * @returns YYYY년 MM월 DD일 HH시 mm분 형식의 문자열
 * @example
 * formatDateTimeKorean(new Date('2025-02-08 14:30:00')) // '2025년 02월 08일 14시 30분'
 */
export const formatDateTimeKorean = (
  date: Date | string | null | undefined,
): string => {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
};

/**
 * 두 날짜 사이의 일수 차이 계산
 * @param date1 - 시작 날짜
 * @param date2 - 종료 날짜
 * @returns 일수 차이
 * @example
 * getDaysDifference(new Date('2025-02-08'), new Date('2025-02-10')) // 2
 */
export const getDaysDifference = (
  date1: Date | string,
  date2: Date | string,
): number => {
  const d1 = typeof date1 === "string" ? new Date(date1) : date1;
  const d2 = typeof date2 === "string" ? new Date(date2) : date2;

  const timeDiff = Math.abs(d2.getTime() - d1.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
};

/**
 * 현재 날짜가 두 날짜 사이에 있는지 확인
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @param targetDate - 확인할 날짜 (기본값: 현재 날짜)
 * @returns 날짜가 범위 내에 있으면 true
 * @example
 * isDateInRange(new Date('2025-02-01'), new Date('2025-02-10')) // true or false
 */
export const isDateInRange = (
  startDate: Date | string,
  endDate: Date | string,
  targetDate: Date | string = new Date(),
): boolean => {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  const target =
    typeof targetDate === "string" ? new Date(targetDate) : targetDate;

  return target >= start && target <= end;
};

/**
 * 상대적 시간 표현으로 변환 (방금 전, N분 전, N시간 전, N일 전)
 * @param date - 변환할 날짜
 * @returns 상대적 시간 표현
 * @example
 * getRelativeTime(new Date(Date.now() - 60000)) // '1분 전'
 */
export const getRelativeTime = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;

  return formatDate(d);
};

/**
 * 날짜에 일수를 더함
 * @param date - 기준 날짜
 * @param days - 더할 일수
 * @returns 새로운 Date 객체
 * @example
 * addDays(new Date('2025-02-08'), 5) // 2025-02-13
 */
export const addDays = (date: Date | string, days: number): Date => {
  const d = typeof date === "string" ? new Date(date) : new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

/**
 * 날짜에 월수를 더함
 * @param date - 기준 날짜
 * @param months - 더할 월수
 * @returns 새로운 Date 객체
 * @example
 * addMonths(new Date('2025-02-08'), 3) // 2025-05-08
 */
export const addMonths = (date: Date | string, months: number): Date => {
  const d = typeof date === "string" ? new Date(date) : new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

/**
 * 해당 월의 마지막 날짜 반환
 * @param date - 기준 날짜
 * @returns 해당 월의 마지막 날짜
 * @example
 * getLastDayOfMonth(new Date('2025-02-08')) // 28
 */
export const getLastDayOfMonth = (date: Date | string): number => {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
};

/**
 * 요일을 한글로 반환
 * @param date - 기준 날짜
 * @returns 요일 (월~일)
 * @example
 * getDayOfWeekKorean(new Date('2025-02-08')) // '토'
 */
export const getDayOfWeekKorean = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[d.getDay()];
};

/**
 * Date 객체를 ISO 8601 형식으로 변환 (UTC 기준)
 * @param date - 변환할 Date 객체
 * @returns ISO 8601 형식의 문자열
 * @example
 * toISOString(new Date('2025-02-08')) // '2025-02-08T00:00:00.000Z'
 */
export const toISOString = (date: Date | string | null | undefined): string => {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "";

  return d.toISOString();
};
