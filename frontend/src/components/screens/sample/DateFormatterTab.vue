<template>
  <div>
    <h2 class="section-title">dateFormatter</h2>
    <p class="section-desc">
      날짜/시간 포맷 변환 유틸리티입니다. 모든 함수는
      <code>Date | string | null | undefined</code>를 받으며 잘못된 값은 빈
      문자열을 반환합니다. 아래 데모는 현재 시각을 기준으로 동작합니다.
    </p>

    <!-- ==================== 1. 포맷 함수 데모 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">포맷 함수 레퍼런스</h3>

      <div class="demo-box">
        <div class="date-control-row">
          <label class="ctrl-label">기준 날짜:</label>
          <input
            type="datetime-local"
            v-model="inputDateStr"
            class="date-input"
          />
          <button class="btn-today" @click="resetToNow">지금으로</button>
        </div>

        <table class="format-table">
          <thead>
            <tr>
              <th>함수</th>
              <th>결과</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in formatResults" :key="f.fn">
              <td>
                <code class="fn-code">{{ f.fn }}</code>
              </td>
              <td>
                <code class="result-code">{{ f.result }}</code>
              </td>
              <td class="fn-desc">{{ f.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-explanation">
        <pre><code>import {
  formatDate, formatDateISO, formatDateTime,
  formatTime, formatTimeWithSeconds,
  formatDateKorean, formatDateTimeKorean,
  parseDate, toISOString,
} from '@/utils/dateFormatter';

const d = new Date('2025-06-15 14:30:45');

formatDate(d.getTime())          // '2025. 06. 15.'      ← timestamp(ms) 입력
formatDateISO(d)                 // '2025-06-15'
formatDateTime(d)                // '2025-06-15 14:30:45'
formatTime(d)                    // '14:30'
formatTimeWithSeconds(d)         // '14:30:45'
formatDateKorean(d)              // '2025년 06월 15일'
formatDateTimeKorean(d)          // '2025년 06월 15일 14시 30분'
toISOString(d)                   // '2025-06-15T05:30:45.000Z'

// string도 바로 입력 가능
formatDateISO('2025-06-15')      // '2025-06-15'
parseDate('2025-06-15')          // Date 객체 (실패 시 null)</code></pre>
      </div>
    </section>

    <!-- ==================== 2. 날짜 계산 함수 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">날짜 계산 / 비교 함수</h3>

      <div class="demo-box">
        <div class="calc-grid">
          <div class="calc-item">
            <p class="calc-label">getDaysDifference</p>
            <div class="calc-inputs">
              <input type="date" v-model="diffDate1" class="date-input-sm" />
              <span>~</span>
              <input type="date" v-model="diffDate2" class="date-input-sm" />
            </div>
            <p class="calc-result">
              → <strong>{{ daysDiff }}</strong
              >일 차이
            </p>
          </div>
          <div class="calc-item">
            <p class="calc-label">addDays / addMonths</p>
            <div class="calc-inputs">
              <input type="date" v-model="addBaseDate" class="date-input-sm" />
            </div>
            <p class="calc-result">
              +7일 → <strong>{{ addDaysResult }}</strong>
            </p>
            <p class="calc-result">
              +3개월 → <strong>{{ addMonthsResult }}</strong>
            </p>
          </div>
          <div class="calc-item">
            <p class="calc-label">getRelativeTime</p>
            <div class="calc-inputs">
              <select v-model="relTimeOffset" class="date-input-sm">
                <option :value="30">30초 전</option>
                <option :value="5 * 60">5분 전</option>
                <option :value="3 * 60 * 60">3시간 전</option>
                <option :value="2 * 24 * 60 * 60">2일 전</option>
                <option :value="10 * 24 * 60 * 60">10일 전</option>
              </select>
            </div>
            <p class="calc-result">
              → <strong>{{ relTimeResult }}</strong>
            </p>
          </div>
        </div>
      </div>

      <div class="code-explanation">
        <pre><code>import {
  getDaysDifference, isDateInRange,
  addDays, addMonths, getLastDayOfMonth,
  getDayOfWeekKorean, getRelativeTime,
} from '@/utils/dateFormatter';

// 날짜 차이
getDaysDifference('2025-01-01', '2025-06-15')  // 165

// 범위 내 여부 (targetDate 생략 시 오늘)
isDateInRange('2025-01-01', '2025-12-31')      // 오늘이 범위 내면 true

// 날짜 더하기
addDays('2025-06-15', 7)     // 2025-06-22 Date 객체
addMonths('2025-06-15', 3)   // 2025-09-15 Date 객체

// 해당 월 마지막 날
getLastDayOfMonth('2025-02-01')  // 28

// 요일 한글
getDayOfWeekKorean('2025-06-15') // '일'

// 상대 시간 표현
getRelativeTime(new Date(Date.now() - 60000)) // '1분 전'
getRelativeTime(new Date(Date.now() - 3600000)) // '1시간 전'
// 7일 이상 경과 시 → formatDate로 날짜 반환</code></pre>
      </div>
    </section>

    <!-- ==================== 3. calendarUtils 부록 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">📅 calendarUtils — 날짜 판별 유틸리티</h3>
      <p class="description">
        캘린더 컴포넌트 전용이지만 날짜 비교/판별이 필요한 곳에서 유용하게
        활용할 수 있습니다. 경로: <code>@/utils/calendarUtils</code>
      </p>

      <div class="demo-box">
        <div class="calendar-demo-grid">
          <div
            v-for="d in calendarDemoItems"
            :key="d.label"
            class="calendar-demo-item"
          >
            <span class="cal-label">{{ d.label }}</span>
            <span
              class="cal-result"
              :class="d.boolResult ? 'result-true' : 'result-false'"
            >
              {{ d.result }}
            </span>
          </div>
        </div>
      </div>

      <div class="code-explanation">
        <pre><code>import {
  isSameDay, isToday, isWeekend,
  getWeekdayName, WEEKDAY_NAMES,
  getFirstDayOfMonth, getLastDayOfMonth, getCalendarDates,
} from '@/utils/calendarUtils';

const today = new Date();

// 날짜 판별
isToday(today)                    // true
isWeekend(new Date('2025-06-15')) // true (일요일)
isSameDay(today, new Date())      // true

// 요일
getWeekdayName(today)             // '목' (WEEKDAY_NAMES 배열 기반)
WEEKDAY_NAMES                     // ['일','월','화','수','목','금','토']

// 월 정보
getFirstDayOfMonth(2025, 6)       // 2025-06-01 Date 객체
getLastDayOfMonth(2025, 6)        // 2025-06-30 Date 객체

// 캘린더 그리드용 42일 배열 (이전달 + 현재달 + 다음달)
const dates = getCalendarDates(2025, 6);   // Date[42]
// → 캘린더 그리드에서 6*7 = 42칸에 바로 사용 가능</code></pre>

        <div class="class-guide">
          <h5>dateFormatter vs calendarUtils 선택 기준</h5>
          <ul>
            <li>
              <code>dateFormatter</code> — 날짜를 문자열로 표시하거나,
              계산/비교할 때
            </li>
            <li>
              <code>calendarUtils</code> — 캘린더 그리드 생성, 오늘/주말 판별,
              요일 표시 등 캘린더 UI 관련 로직
            </li>
            <li>두 유틸리티는 독립적이므로 필요에 따라 혼용 가능</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// ── 기준 날짜 ──────────────────────────────────────────────────────
const now = new Date();
const toLocalDateTimeStr = (d: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const inputDateStr = ref(toLocalDateTimeStr(now));
const resetToNow = () => {
  inputDateStr.value = toLocalDateTimeStr(new Date());
};
const inputDate = computed(() => new Date(inputDateStr.value));

// ── 포맷 함수들 인라인 구현 (데모용) ─────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0");
const fmtISO = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fmtDateTime = (d: Date) =>
  `${fmtISO(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
const fmtTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const fmtTimeS = (d: Date) =>
  `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
const fmtKo = (d: Date) =>
  `${d.getFullYear()}년 ${pad(d.getMonth() + 1)}월 ${pad(d.getDate())}일`;
const fmtKoT = (d: Date) =>
  `${fmtKo(d)} ${pad(d.getHours())}시 ${pad(d.getMinutes())}분`;
const fmtLocale = (ms: number) =>
  new Date(ms).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const formatResults = computed(() => {
  const d = inputDate.value;
  return [
    {
      fn: "formatDate(ms)",
      result: fmtLocale(d.getTime()),
      desc: "타임스탬프(ms) → 한국 날짜 (YYYY. MM. DD.)",
    },
    { fn: "formatDateISO(date)", result: fmtISO(d), desc: "YYYY-MM-DD" },
    {
      fn: "formatDateTime(date)",
      result: fmtDateTime(d),
      desc: "YYYY-MM-DD HH:mm:ss",
    },
    { fn: "formatTime(date)", result: fmtTime(d), desc: "HH:mm" },
    {
      fn: "formatTimeWithSeconds(date)",
      result: fmtTimeS(d),
      desc: "HH:mm:ss",
    },
    {
      fn: "formatDateKorean(date)",
      result: fmtKo(d),
      desc: "YYYY년 MM월 DD일",
    },
    {
      fn: "formatDateTimeKorean(date)",
      result: fmtKoT(d),
      desc: "YYYY년 MM월 DD일 HH시 mm분",
    },
    {
      fn: "toISOString(date)",
      result: d.toISOString(),
      desc: "ISO 8601 UTC 기준",
    },
  ];
});

// ── 계산 함수 데모 ─────────────────────────────────────────────────
const today = new Date();
const fmt = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const diffDate1 = ref(fmt(today));
const diffDate2 = ref(fmt(new Date(today.getTime() + 10 * 24 * 3600 * 1000)));
const addBaseDate = ref(fmt(today));
const relTimeOffset = ref(5 * 60);

const daysDiff = computed(() => {
  const d1 = new Date(diffDate1.value),
    d2 = new Date(diffDate2.value);
  return Math.ceil(
    Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24),
  );
});
const addDaysResult = computed(() => {
  const d = new Date(addBaseDate.value);
  d.setDate(d.getDate() + 7);
  return fmt(d);
});
const addMonthsResult = computed(() => {
  const d = new Date(addBaseDate.value);
  d.setMonth(d.getMonth() + 3);
  return fmt(d);
});
const relTimeResult = computed(() => {
  const d = new Date(Date.now() - relTimeOffset.value * 1000);
  const sec = relTimeOffset.value;
  if (sec < 60) return "방금 전";
  if (sec < 3600) return `${Math.floor(sec / 60)}분 전`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}시간 전`;
  if (sec < 7 * 86400) return `${Math.floor(sec / 86400)}일 전`;
  return fmtLocale(d.getTime());
});

// ── calendarUtils 데모 ─────────────────────────────────────────────
const calToday = new Date();
const sunday = new Date("2025-06-15"); // 일요일
const monday = new Date("2025-06-16"); // 월요일
const WEEKDAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

const calendarDemoItems = computed(() => [
  { label: `isToday(오늘)`, result: "true", boolResult: true },
  { label: `isToday(어제)`, result: "false", boolResult: false },
  { label: `isWeekend(2025-06-15)`, result: "true (일)", boolResult: true },
  { label: `isWeekend(2025-06-16)`, result: "false (월)", boolResult: false },
  { label: `isSameDay(오늘, 오늘)`, result: "true", boolResult: true },
  {
    label: `getWeekdayName(오늘)`,
    result: WEEKDAY_NAMES[calToday.getDay()],
    boolResult: true,
  },
  { label: `getCalendarDates(2025,6).length`, result: "42", boolResult: true },
  {
    label: `WEEKDAY_NAMES`,
    result: "['일','월','화','수','목','금','토']",
    boolResult: true,
  },
]);
</script>

<style scoped lang="scss">
.section-title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-sm;
  padding-bottom: $spacing-lg;
  border-bottom: 2px solid $color-primary;
}
.section-desc {
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin-bottom: $spacing-3xl;
  line-height: 1.7;
  code {
    background: #e3f2fd;
    color: #1565c0;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: $font-size-sm;
    font-family: monospace;
  }
}
.style-section {
  margin-bottom: $spacing-3xl;
}
.subsection-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-md;
}
.description {
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin-bottom: $spacing-lg;
  line-height: 1.6;
  code {
    background: #e3f2fd;
    color: #1565c0;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: $font-size-sm;
    font-family: monospace;
  }
}
.demo-box {
  padding: $spacing-xl;
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  margin-bottom: $spacing-lg;
}

// 날짜 입력 제어
.date-control-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: $spacing-lg;
}
.ctrl-label {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  white-space: nowrap;
}
.date-input {
  padding: 7px 10px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  color: $color-text-primary;
}
.date-input-sm {
  padding: 5px 8px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
}
.btn-today {
  padding: 6px 14px;
  border: 1px solid $color-primary;
  border-radius: $radius-sm;
  background: white;
  color: $color-primary;
  font-size: $font-size-sm;
  cursor: pointer;
  &:hover {
    background: $color-primary;
    color: white;
  }
}

// 포맷 테이블
.format-table {
  width: 100%;
  border-collapse: collapse;
  th {
    padding: 9px 12px;
    background: $color-bg-light;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text-secondary;
    text-align: left;
    border-bottom: 1px solid $color-border-light;
  }
  td {
    padding: 9px 12px;
    border-bottom: 1px solid $color-border-light;
    vertical-align: middle;
  }
  tr:last-child td {
    border-bottom: none;
  }
  .fn-code {
    background: #eff6ff;
    color: #1d4ed8;
    padding: 2px 7px;
    border-radius: $radius-sm;
    font-size: $font-size-xs;
    font-family: monospace;
    white-space: nowrap;
  }
  .result-code {
    background: #f0fdf4;
    color: #15803d;
    padding: 2px 8px;
    border-radius: $radius-sm;
    font-size: $font-size-sm;
    font-family: monospace;
  }
  .fn-desc {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }
}

// 계산 함수 데모
.calc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;
}
.calc-item {
  padding: $spacing-md;
  background: $color-bg-light;
  border-radius: $radius-md;
}
.calc-label {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-primary;
  margin-bottom: 8px;
}
.calc-inputs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 8px;
  span {
    font-size: $font-size-xs;
    color: $color-text-light;
  }
}
.calc-result {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  margin-top: 4px;
  strong {
    color: $color-text-primary;
    font-family: monospace;
  }
}

// calendarUtils 데모
.calendar-demo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
.calendar-demo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: $color-bg-light;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
}
.cal-label {
  color: $color-text-secondary;
  font-family: monospace;
  font-size: $font-size-xs;
}
.cal-result {
  font-weight: $font-weight-semibold;
  font-family: monospace;
  font-size: $font-size-sm;
  padding: 2px 8px;
  border-radius: $radius-sm;
}
.result-true {
  background: #dcfce7;
  color: #15803d;
}
.result-false {
  background: #fee2e2;
  color: #dc2626;
}

.code-explanation {
  background: $color-bg-light;
  border-radius: $radius-md;
  padding: $spacing-lg;
  border-left: 4px solid $color-primary;
  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: $spacing-md;
    border-radius: $radius-sm;
    overflow-x: auto;
    margin: 0 0 $spacing-sm 0;
    font-size: $font-size-sm;
    line-height: 1.6;
    code {
      font-family: "Consolas", monospace;
      white-space: pre;
    }
  }
}
.class-guide {
  margin-top: $spacing-md;
  padding: $spacing-md;
  background: white;
  border-radius: $radius-sm;
  h5 {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $spacing-sm;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: $spacing-xs 0;
      font-size: $font-size-sm;
      color: $color-text-secondary;
      line-height: 1.6;
      code {
        background: #e3f2fd;
        color: #1976d2;
        padding: 2px 7px;
        border-radius: $radius-sm;
        font-size: $font-size-xs;
        font-family: monospace;
        margin-right: 4px;
      }
    }
  }
}
</style>
