<template>
  <div>
    <h2 class="section-title">Calendar</h2>
    <p class="section-desc">
      월별 일정을 시각적으로 표시하는 캘린더 컴포넌트 모음입니다.
      <code>Calendar.vue</code>가 <code>CalendarHeader</code>,
      <code>CalendarGrid</code>, <code>CalendarEvent</code>를 조합하며, 제네릭
      타입으로 다양한 이벤트 데이터를 지원합니다.
    </p>

    <!-- ==================== 1. Live Demo ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">Live Demo</h3>
      <p class="description">
        실제 동작하는 캘린더입니다. 이전/다음 달 이동, 오늘 버튼, 이벤트 필터
        토글을 사용해보세요.
      </p>

      <div class="demo-box demo-calendar-wrap">
        <!-- CalendarHeader -->
        <div class="calendar-header">
          <div class="calendar-nav">
            <button class="calendar-nav-btn" @click="prevMonth">◀</button>
            <h3 class="calendar-title">
              {{ currentYear }}년 {{ currentMonth }}월
            </h3>
            <button class="calendar-nav-btn" @click="nextMonth">▶</button>
            <button class="calendar-today-btn" @click="goToday">오늘</button>
          </div>
          <div class="calendar-filters">
            <div class="calendar-filter-item">
              <label class="toggle-button">
                <span
                  class="toggle-switch"
                  :class="{ checked: showExams }"
                  @click="showExams = !showExams"
                >
                  <span class="toggle-circle"></span>
                </span>
                <span class="toggle-label">시험</span>
              </label>
            </div>
            <div class="calendar-filter-item">
              <label class="toggle-button">
                <span
                  class="toggle-switch"
                  :class="{ checked: showClassrooms }"
                  @click="showClassrooms = !showClassrooms"
                >
                  <span class="toggle-circle"></span>
                </span>
                <span class="toggle-label">강의실</span>
              </label>
            </div>
          </div>
        </div>

        <!-- CalendarGrid -->
        <div class="calendar-grid">
          <div class="calendar-weekdays">
            <div
              v-for="(day, i) in weekdays"
              :key="day"
              class="calendar-weekday"
              :class="{ weekend: i === 0 || i === 6 }"
            >
              {{ day }}
            </div>
          </div>

          <div class="calendar-days">
            <div
              v-for="(cell, idx) in calendarCells"
              :key="idx"
              class="calendar-day"
              :class="{
                weekend: cell.isWeekend,
                today: cell.isToday,
                'other-month': cell.isOtherMonth,
              }"
            >
              <div class="calendar-day-number">{{ cell.day }}</div>
              <div v-if="cell.events.length" class="calendar-events">
                <template
                  v-for="ev in cell.events.slice(0, 2)"
                  :key="ev.title + ev.date"
                >
                  <div
                    v-if="
                      (ev.type === 'exam' && showExams) ||
                      (ev.type === 'classroom' && showClassrooms)
                    "
                    class="calendar-event"
                    :class="`calendar-event-${ev.type}`"
                    :title="ev.title"
                  >
                    <div class="calendar-event-title">{{ ev.title }}</div>
                    <div v-if="ev.subtitle" class="calendar-event-subtitle">
                      {{ ev.subtitle }}
                    </div>
                    <div v-if="ev.startTime" class="calendar-event-time">
                      {{ ev.startTime }}-{{ ev.endTime }}
                    </div>
                  </div>
                </template>
                <div
                  v-if="getVisibleCount(cell.events) > 2"
                  class="calendar-more"
                >
                  +{{ getVisibleCount(cell.events) - 2 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="code-explanation">
        <h4>기본 사용법</h4>
        <pre><code>&lt;!-- 가장 간단한 사용 --&gt;
&lt;Calendar /&gt;

&lt;!-- 초기 년/월 지정 --&gt;
&lt;Calendar :initial-year="2025" :initial-month="3" /&gt;</code></pre>
        <div class="class-guide">
          <h5>Calendar.vue Props</h5>
          <ul>
            <li>
              <code>initialYear</code> <em>number?</em> — 초기 년도 (기본값:
              현재 연도)
            </li>
            <li>
              <code>initialMonth</code> <em>number?</em> — 초기 월 1-12 (기본값:
              현재 월)
            </li>
          </ul>
          <h5 style="margin-top: 12px">내부 동작</h5>
          <ul>
            <li>마운트 시 <code>loadEvents()</code>로 이벤트 자동 로드</li>
            <li>
              이벤트 클릭 시 <code>router.push(event.link)</code>로 라우팅
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ==================== 2. CalendarHeader ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">CalendarHeader</h3>
      <p class="description">
        네비게이션(이전/다음/오늘)과 이벤트 타입 필터 토글을 제공하는 헤더
        컴포넌트입니다.
        <code>showFilters</code> prop으로 필터 영역 자체를 숨길 수 있습니다.
      </p>

      <div
        class="demo-box"
        style="display: flex; flex-direction: column; gap: 16px"
      >
        <!-- 필터 있는 헤더 -->
        <div>
          <p class="demo-label">showFilters: true (기본값)</p>
          <div
            class="calendar-header"
            style="border-radius: 8px; border: 1px solid #e5e7eb"
          >
            <div class="calendar-nav">
              <button class="calendar-nav-btn">◀</button>
              <h3 class="calendar-title">2025년 6월</h3>
              <button class="calendar-nav-btn">▶</button>
              <button class="calendar-today-btn">오늘</button>
            </div>
            <div class="calendar-filters">
              <div class="calendar-filter-item">
                <label class="toggle-button">
                  <span class="toggle-switch checked"
                    ><span class="toggle-circle"></span
                  ></span>
                  <span class="toggle-label">시험</span>
                </label>
              </div>
              <div class="calendar-filter-item">
                <label class="toggle-button">
                  <span class="toggle-switch"
                    ><span class="toggle-circle"></span
                  ></span>
                  <span class="toggle-label">강의실</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- 필터 없는 헤더 -->
        <div>
          <p class="demo-label">showFilters: false</p>
          <div
            class="calendar-header"
            style="border-radius: 8px; border: 1px solid #e5e7eb"
          >
            <div class="calendar-nav">
              <button class="calendar-nav-btn">◀</button>
              <h3 class="calendar-title">2025년 6월</h3>
              <button class="calendar-nav-btn">▶</button>
              <button class="calendar-today-btn">오늘</button>
            </div>
          </div>
        </div>
      </div>

      <div class="code-explanation">
        <pre><code>&lt;CalendarHeader
  :year="currentYear"
  :month="currentMonth"
  :show-exams="showExams"
  :show-classrooms="showClassrooms"
  :show-filters="true"
  @prev-month="handlePrevMonth"
  @next-month="handleNextMonth"
  @go-today="handleGoToday"
  @update:show-exams="showExams = $event"
  @update:show-classrooms="showClassrooms = $event"
/&gt;</code></pre>
        <div class="class-guide">
          <h5>Props</h5>
          <ul>
            <li><code>year</code> <em>number</em> — 현재 년도 (필수)</li>
            <li><code>month</code> <em>number</em> — 현재 월 1-12 (필수)</li>
            <li>
              <code>showExams</code> <em>boolean?</em> — 시험 필터 상태 (기본:
              true)
            </li>
            <li>
              <code>showClassrooms</code> <em>boolean?</em> — 강의실 필터 상태
              (기본: true)
            </li>
            <li>
              <code>showFilters</code> <em>boolean?</em> — 필터 영역 표시 여부
              (기본: true)
            </li>
          </ul>
          <h5 style="margin-top: 12px">Emits</h5>
          <ul>
            <li><code>prev-month</code> — 이전 달 버튼 클릭</li>
            <li><code>next-month</code> — 다음 달 버튼 클릭</li>
            <li><code>go-today</code> — 오늘 버튼 클릭</li>
            <li>
              <code>update:show-exams</code> <em>(value: boolean)</em> — 시험
              필터 토글
            </li>
            <li>
              <code>update:show-classrooms</code> <em>(value: boolean)</em> —
              강의실 필터 토글
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ==================== 3. CalendarGrid ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">CalendarGrid (Generic)</h3>
      <p class="description">
        날짜 그리드를 렌더링하는 컴포넌트입니다. 제네릭 타입 <code>T</code>로
        이벤트 데이터 구조를 유연하게 지정할 수 있습니다.
        <code>maxDisplayEvents</code>로 셀당 최대 표시 개수를 제한하고, 초과분은
        <code>+N</code>으로 표시합니다.
      </p>

      <div class="demo-box">
        <p class="demo-label">loading: true 상태</p>
        <div
          class="calendar-grid"
          style="height: 120px; border: 1px solid #e5e7eb; border-radius: 8px"
        >
          <div class="calendar-loading">
            <div class="calendar-loading-spinner"></div>
          </div>
        </div>
      </div>

      <div class="code-explanation">
        <pre><code>&lt;CalendarGrid
  :year="currentYear"
  :month="currentMonth"
  :events="events"
  :loading="loading"
  :max-display-events="2"
  @day-click="handleDayClick"
  @event-click="handleEventClick"
/&gt;</code></pre>
        <div class="class-guide">
          <h5>Generic Type 제약</h5>
          <pre
            style="
              background: #f3f4f6;
              color: #1f2937;
              padding: 10px;
              border-radius: 6px;
              font-size: 12px;
              margin: 8px 0;
            "
          >
T extends {
  type: 'exam' | 'classroom';
  title: string;
  subtitle?: string;
  startTime?: string;
  endTime?: string;
  date: string; // 'YYYY-MM-DD' 형식
}</pre
          >
          <h5>Props</h5>
          <ul>
            <li><code>year</code> <em>number</em> — 현재 년도 (필수)</li>
            <li><code>month</code> <em>number</em> — 현재 월 1-12 (필수)</li>
            <li><code>events</code> <em>T[]</em> — 이벤트 목록 (필수)</li>
            <li>
              <code>loading</code> <em>boolean?</em> — 로딩 상태 (기본: false)
            </li>
            <li>
              <code>maxDisplayEvents</code> <em>number?</em> — 셀당 최대 표시 수
              (기본: 2)
            </li>
          </ul>
          <h5 style="margin-top: 12px">Emits</h5>
          <ul>
            <li>
              <code>day-click</code> <em>(date: Date)</em> — 날짜 셀 클릭 (다른
              달 셀 제외)
            </li>
            <li><code>event-click</code> <em>(event: T)</em> — 이벤트 클릭</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ==================== 4. CalendarEvent ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">CalendarEvent (Generic)</h3>
      <p class="description">
        개별 이벤트 배지를 렌더링합니다. <code>type</code>에 따라 색상이
        자동으로 지정됩니다. <code>exam</code>은 파란색,
        <code>classroom</code>은 초록색입니다.
      </p>

      <div
        class="demo-box"
        style="
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 320px;
        "
      >
        <!-- exam 타입들 -->
        <div>
          <p class="demo-label">type: "exam" (시험)</p>
          <div style="display: flex; flex-direction: column; gap: 4px">
            <div
              class="calendar-event calendar-event-exam"
              style="max-width: 220px"
            >
              <div class="calendar-event-title">중간고사</div>
            </div>
            <div
              class="calendar-event calendar-event-exam"
              style="max-width: 220px"
            >
              <div class="calendar-event-title">Java 기말시험</div>
              <div class="calendar-event-subtitle">3학년 A반</div>
              <div class="calendar-event-time">09:00-11:00</div>
            </div>
          </div>
        </div>

        <!-- classroom 타입들 -->
        <div>
          <p class="demo-label">type: "classroom" (강의실)</p>
          <div style="display: flex; flex-direction: column; gap: 4px">
            <div
              class="calendar-event calendar-event-classroom"
              style="max-width: 220px"
            >
              <div class="calendar-event-title">Spring Boot 강의</div>
            </div>
            <div
              class="calendar-event calendar-event-classroom"
              style="max-width: 220px"
            >
              <div class="calendar-event-title">Vue.js 실습</div>
              <div class="calendar-event-subtitle">201호</div>
              <div class="calendar-event-time">13:00-16:00</div>
            </div>
          </div>
        </div>
      </div>

      <div class="code-explanation">
        <pre><code>&lt;CalendarEvent
  :event="event"
  @click="handleEventClick"
/&gt;

&lt;!-- 이벤트 데이터 예시 --&gt;
const examEvent = {
  type: 'exam',
  title: 'Java 기말시험',
  subtitle: '3학년 A반',
  startTime: '09:00',
  endTime: '11:00',
  date: '2025-06-15',
  link: '/exam/123',        // Calendar.vue 라우팅에 사용
};

const classroomEvent = {
  type: 'classroom',
  title: 'Spring Boot 강의',
  subtitle: '201호',
  startTime: '13:00',
  endTime: '16:00',
  date: '2025-06-10',
  link: '/classroom/456',
};</code></pre>
        <div class="class-guide">
          <h5>CSS 클래스 (자동 적용)</h5>
          <ul>
            <li>
              <code>.calendar-event-exam</code> — 파란색 배경 (Primary color)
            </li>
            <li>
              <code>.calendar-event-classroom</code> — 초록색 배경 (Success
              color)
            </li>
          </ul>
          <h5 style="margin-top: 12px">표시 조건</h5>
          <ul>
            <li><code>title</code> — 항상 표시</li>
            <li><code>subtitle</code> — 값이 있을 때만 표시</li>
            <li><code>startTime + endTime</code> — 둘 다 있을 때만 표시</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ==================== 5. 이벤트 데이터 연동 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">이벤트 데이터 연동 패턴</h3>
      <p class="description">
        <code>Calendar.vue</code>는 내부적으로 API를 호출해 이벤트를 로드합니다.
        커스텀 이벤트 타입이 필요하면 <code>CalendarGrid</code>와
        <code>CalendarEvent</code>를 직접 조합하세요.
      </p>

      <div class="code-explanation">
        <h4>기본 연동 (Calendar.vue 사용)</h4>
        <pre><code>&lt;!-- Calendar.vue가 내부적으로 fetchAllCalendarEvents() 호출 --&gt;
&lt;Calendar :initial-year="2025" :initial-month="6" /&gt;</code></pre>

        <h4 style="margin-top: 16px">커스텀 이벤트 타입 연동 (직접 조합)</h4>
        <pre><code>&lt;!-- 부모 컴포넌트 --&gt;
&lt;script setup lang="ts"&gt;
interface MyEvent {
  type: 'exam' | 'classroom';
  title: string;
  subtitle?: string;
  startTime?: string;
  endTime?: string;
  date: string;        // 'YYYY-MM-DD'
  link: string;        // 클릭 시 이동 경로
  score?: number;      // 추가 커스텀 필드
}

const events = ref&lt;MyEvent[]&gt;([]);

onMounted(async () =&gt; {
  events.value = await myApi.getEvents({ year, month });
});
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="calendar-container"&gt;
    &lt;CalendarHeader ... /&gt;
    &lt;CalendarGrid
      :year="year"
      :month="month"
      :events="events"
      @event-click="router.push($event.link)"
    /&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>

        <div class="class-guide">
          <h5>주의사항</h5>
          <ul>
            <li>
              <code>date</code> 필드는 반드시 <code>'YYYY-MM-DD'</code> 형식
              (formatDateISO 활용)
            </li>
            <li>
              <code>type</code>은 <code>'exam'</code> |
              <code>'classroom'</code> 중 하나여야 스타일 자동 적용
            </li>
            <li>
              CalendarGrid는
              <code>event.date === formatDateISO(cellDate)</code>로 날짜 매칭
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ==================== 6. CalendarStore ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">CalendarStore</h3>
      <p class="description">
        Pinia 기반의 캘린더 전역 상태 스토어입니다. <code>dayjs</code>를 사용해
        날짜를 관리합니다. 독립 컴포넌트(<code>Calendar.vue</code>)가 아닌 전역
        상태가 필요한 경우에 사용합니다.
      </p>

      <div class="code-explanation">
        <pre><code>import { useCalendarStore } from '@/stores/calendarStore';

const calendarStore = useCalendarStore();

// State 접근
calendarStore.viewDate      // dayjs 객체 (현재 표시 월)
calendarStore.events        // 이벤트 배열

// Actions
calendarStore.nextMonth()   // 다음 달로 이동
calendarStore.prevMonth()   // 이전 달로 이동
calendarStore.setToday()    // 오늘 날짜로 초기화

// Getter (daysInMonth 직접 구현 필요)
calendarStore.daysInMonth   // 현재 달의 날짜 배열</code></pre>

        <div class="class-guide">
          <h5>State</h5>
          <ul>
            <li>
              <code>viewDate</code> <em>Dayjs</em> — 현재 표시 중인 년/월 (dayjs
              객체)
            </li>
            <li><code>events</code> <em>any[]</em> — 캘린더 이벤트 배열</li>
          </ul>
          <h5 style="margin-top: 12px">Actions</h5>
          <ul>
            <li><code>nextMonth()</code> — viewDate를 1달 앞으로 이동</li>
            <li><code>prevMonth()</code> — viewDate를 1달 전으로 이동</li>
            <li><code>setToday()</code> — viewDate를 오늘로 초기화</li>
          </ul>
          <h5 style="margin-top: 12px">daysInMonth getter 구현 예시</h5>
          <pre
            style="
              background: #f3f4f6;
              color: #1f2937;
              padding: 10px;
              border-radius: 6px;
              font-size: 12px;
            "
          >
daysInMonth: (state) => {
  const year = state.viewDate.year();
  const month = state.viewDate.month() + 1; // dayjs는 0-based
  return getCalendarDates(year, month);     // calendarUtils 활용
}</pre
          >
        </div>
      </div>
    </section>

    <!-- ==================== 7. CalendarUtils ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">CalendarUtils</h3>
      <p class="description">
        캘린더 그리드 생성과 날짜 판별을 위한 순수 유틸리티 함수 모음입니다.
        <code>@/utils/calendarUtils</code>에서 import하여 사용합니다.
      </p>

      <!-- 함수 데모 -->
      <div class="demo-box">
        <p class="demo-label">유틸 함수 결과 미리보기</p>
        <div class="util-result-grid">
          <div class="util-result-item">
            <span class="util-fn">getCalendarDates(2025, 6)</span>
            <span class="util-result">42개 Date 배열 반환</span>
          </div>
          <div class="util-result-item">
            <span class="util-fn">getFirstDayOfMonth(2025, 6)</span>
            <span class="util-result">Sun Jun 01 2025</span>
          </div>
          <div class="util-result-item">
            <span class="util-fn">getLastDayOfMonth(2025, 6)</span>
            <span class="util-result">Mon Jun 30 2025</span>
          </div>
          <div class="util-result-item">
            <span class="util-fn">isToday(new Date())</span>
            <span class="util-result util-result--true">true</span>
          </div>
          <div class="util-result-item">
            <span class="util-fn">isWeekend(new Date('2025-06-07'))</span>
            <span class="util-result util-result--true">true (토요일)</span>
          </div>
          <div class="util-result-item">
            <span class="util-fn">WEEKDAY_NAMES</span>
            <span class="util-result"
              >['일','월','화','수','목','금','토']</span
            >
          </div>
        </div>
      </div>

      <div class="code-explanation">
        <pre><code>import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getCalendarDates,
  isSameDay,
  isToday,
  isWeekend,
  WEEKDAY_NAMES,
  getWeekdayName,
} from '@/utils/calendarUtils';

// 특정 월의 첫날
const firstDay = getFirstDayOfMonth(2025, 6);   // Date: 2025-06-01

// 특정 월의 마지막 날
const lastDay = getLastDayOfMonth(2025, 6);      // Date: 2025-06-30

// 캘린더 그리드용 42일 배열 (이전달 + 현재달 + 다음달)
const dates = getCalendarDates(2025, 6);         // Date[] (length: 42)

// 두 날짜가 같은 날인지
isSameDay(new Date(), new Date());               // true

// 오늘인지
isToday(new Date('2025-06-15'));                 // false

// 주말인지 (토요일 = 6, 일요일 = 0)
isWeekend(new Date('2025-06-07'));              // true

// 요일 이름
const name = getWeekdayName(new Date());        // '목' (예시)

// 요일 이름 배열 (readonly)
WEEKDAY_NAMES;  // ['일', '월', '화', '수', '목', '금', '토']</code></pre>

        <div class="class-guide">
          <h5>함수 레퍼런스</h5>
          <ul>
            <li>
              <code>getFirstDayOfMonth(year, month)</code>
              — 해당 월 첫 날 <em>Date</em> 반환. month는 1-based(1~12)
            </li>
            <li>
              <code>getLastDayOfMonth(year, month)</code>
              — 해당 월 마지막 날 <em>Date</em> 반환. month는 1-based
            </li>
            <li>
              <code>getCalendarDates(year, month)</code>
              — 6주×7일 = 42개 <em>Date[]</em> 반환. 이전달/다음달 날짜 포함
            </li>
            <li>
              <code>isSameDay(date1, date2)</code>
              — 년/월/일 모두 같으면 <em>true</em>
            </li>
            <li>
              <code>isToday(date)</code>
              — 오늘 날짜이면 <em>true</em>
            </li>
            <li>
              <code>isWeekend(date)</code>
              — 토요일(6) 또는 일요일(0)이면 <em>true</em>
            </li>
            <li>
              <code>getWeekdayName(date)</code>
              — 요일 이름 문자열 반환 ('일'~'토')
            </li>
            <li>
              <code>WEEKDAY_NAMES</code>
              — <em>readonly</em> 요일 이름 배열
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ==================== 8. 파일 구조 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">관련 파일 구조</h3>
      <div class="code-explanation">
        <pre><code>src/
├── components/
│   ├── Calendar.vue          # 메인 컴포넌트 (Header + Grid 조합)
│   ├── CalendarHeader.vue    # 네비게이션 + 필터 헤더
│   ├── CalendarGrid.vue      # 날짜 그리드 (Generic)
│   └── CalendarEvent.vue     # 이벤트 배지 (Generic)
│
├── stores/
│   └── calendarStore.ts      # Pinia 전역 상태 (선택적)
│
├── utils/
│   └── calendarUtils.ts      # 순수 날짜 유틸 함수
│
└── assets/styles/
    └── calendar.scss         # 캘린더 전용 스타일</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import "@/features/common/calendar/Calendar.vue";
import "@/features/common/calendar/CalendarEvent.vue";
import "@/features/common/calendar/CalendarGrid.vue";
import "@/features/common/calendar/CalendarHeader.vue";

// ── 캘린더 유틸 인라인 (데모용) ──────────────────────────────────
const weekdays = ["일", "월", "화", "수", "목", "금", "토"] as const;

function getCalendarDates(year: number, month: number): Date[] {
  const dates: Date[] = [];
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const firstDayOfWeek = firstDay.getDay();
  const prevMonthLastDay = new Date(year, month - 1, 0).getDate();

  for (let i = firstDayOfWeek - 1; i >= 0; i--)
    dates.push(new Date(year, month - 2, prevMonthLastDay - i));
  for (let d = 1; d <= lastDay.getDate(); d++)
    dates.push(new Date(year, month - 1, d));
  const remaining = 42 - dates.length;
  for (let d = 1; d <= remaining; d++) dates.push(new Date(year, month, d));
  return dates;
}

function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isTodayFn(date: Date): boolean {
  const t = new Date();
  return (
    date.getFullYear() === t.getFullYear() &&
    date.getMonth() === t.getMonth() &&
    date.getDate() === t.getDate()
  );
}

// ── 데모 상태 ─────────────────────────────────────────────────────
const now = new Date();
const currentYear = ref(now.getFullYear());
const currentMonth = ref(now.getMonth() + 1);
const showExams = ref(true);
const showClassrooms = ref(true);

// 샘플 이벤트
const makeDate = (y: number, m: number, d: number) =>
  `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const sampleEvents = computed(() => {
  const y = currentYear.value;
  const m = currentMonth.value;
  return [
    {
      type: "exam" as const,
      title: "Java 기말시험",
      subtitle: "3학년 A반",
      startTime: "09:00",
      endTime: "11:00",
      date: makeDate(y, m, 3),
    },
    {
      type: "classroom" as const,
      title: "Vue.js 실습",
      subtitle: "201호",
      startTime: "13:00",
      endTime: "16:00",
      date: makeDate(y, m, 10),
    },
    {
      type: "classroom" as const,
      title: "Spring Boot",
      date: makeDate(y, m, 10),
    },
    { type: "exam" as const, title: "중간고사", date: makeDate(y, m, 15) },
    {
      type: "exam" as const,
      title: "DB 시험",
      subtitle: "2학년",
      date: makeDate(y, m, 15),
    },
    { type: "exam" as const, title: "네트워크", date: makeDate(y, m, 15) },
    {
      type: "classroom" as const,
      title: "React 강의",
      date: makeDate(y, m, 22),
    },
  ];
});

const calendarCells = computed(() => {
  return getCalendarDates(currentYear.value, currentMonth.value).map((date) => {
    const dateStr = formatDateISO(date);
    return {
      date,
      day: date.getDate(),
      isToday: isTodayFn(date),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      isOtherMonth: date.getMonth() + 1 !== currentMonth.value,
      events: sampleEvents.value.filter((e) => e.date === dateStr),
    };
  });
});

function getVisibleCount(events: typeof sampleEvents.value) {
  return events.filter(
    (e) =>
      (e.type === "exam" && showExams.value) ||
      (e.type === "classroom" && showClassrooms.value),
  ).length;
}

function prevMonth() {
  if (currentMonth.value === 1) {
    currentYear.value--;
    currentMonth.value = 12;
  } else currentMonth.value--;
}
function nextMonth() {
  if (currentMonth.value === 12) {
    currentYear.value++;
    currentMonth.value = 1;
  } else currentMonth.value++;
}
function goToday() {
  const t = new Date();
  currentYear.value = t.getFullYear();
  currentMonth.value = t.getMonth() + 1;
}
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
    font-family: "Consolas", monospace;
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
    font-family: "Consolas", monospace;
  }
}

.demo-box {
  padding: $spacing-xl;
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  margin-bottom: $spacing-lg;
}

.demo-label {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $color-text-secondary;
  margin-bottom: $spacing-sm;
}

// ── Live Demo 캘린더 ─────────────────────────────────────
.demo-calendar-wrap {
  padding: 0;
  overflow: hidden;
  height: 520px;
  display: flex;
  flex-direction: column;
}

// ── 코드 설명 박스 ────────────────────────────────────────
.code-explanation {
  background: $color-bg-light;
  border-radius: $radius-md;
  padding: $spacing-lg;
  border-left: 4px solid $color-primary;

  h4 {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $spacing-md;
  }

  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: $spacing-md;
    border-radius: $radius-sm;
    overflow-x: auto;
    margin: $spacing-md 0;
    font-size: $font-size-sm;
    line-height: 1.6;
    code {
      font-family: "Consolas", "Monaco", "Courier New", monospace;
      white-space: pre;
    }
  }
}

.class-guide {
  margin-top: $spacing-lg;
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
      em {
        color: $color-text-light;
        font-style: normal;
        margin-left: 2px;
      }
      code {
        background: #e3f2fd;
        color: #1976d2;
        padding: 2px 7px;
        border-radius: $radius-sm;
        font-size: $font-size-xs;
        font-weight: $font-weight-semibold;
        font-family: "Consolas", monospace;
        margin-right: $spacing-xs;
      }
    }
  }

  pre {
    background: #f3f4f6;
    color: #1f2937;
    padding: 10px;
    border-radius: 6px;
    font-size: 12px;
    margin: 8px 0;
    font-family: "Consolas", monospace;
    overflow-x: auto;
  }
}

// ── 유틸 결과 그리드 ──────────────────────────────────────
.util-result-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.util-result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: $color-bg-light;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
}

.util-fn {
  font-family: "Consolas", monospace;
  color: #1976d2;
  flex-shrink: 0;
  font-size: 12px;
}

.util-result {
  color: $color-text-secondary;
  font-size: $font-size-sm;
  &--true {
    color: $color-success;
    font-weight: $font-weight-semibold;
  }
}

// ── 캘린더 스타일 (DesignSample용 로컬 복사) ─────────────
.calendar-container {
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: white;
  border-bottom: 1px solid $color-border-light;
  height: 48px;
  flex-shrink: 0;
}

.calendar-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.calendar-nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  background: white;
  color: $color-text-primary;
  cursor: pointer;
  font-size: $font-size-sm;
  transition: all 0.15s;
  &:hover {
    background: $color-bg-light;
    border-color: $color-primary;
    color: $color-primary;
  }
}

.calendar-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin: 0;
}

.calendar-today-btn {
  padding: 4px 8px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  background: white;
  color: $color-text-primary;
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    background: $color-primary;
    border-color: $color-primary;
    color: white;
  }
}

.calendar-filters {
  display: flex;
  align-items: center;
  gap: 16px;
}

.calendar-filter-item {
  display: flex;
  align-items: center;
}

.toggle-button {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  background: $color-border;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s;
  &.checked {
    background: $color-primary;
  }
}

.toggle-circle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  .toggle-switch.checked & {
    transform: translateX(16px);
  }
}

.toggle-label {
  font-size: $font-size-sm;
  color: $color-text-primary;
}

.calendar-grid {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: $color-bg-light;
  border-bottom: 1px solid $color-border-light;
  flex-shrink: 0;
}

.calendar-weekday {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  &.weekend {
    color: $color-danger;
  }
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  flex: 1;
  overflow: hidden;
}

.calendar-day {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-right: 1px solid $color-border-light;
  border-bottom: 1px solid $color-border-light;
  background: white;
  cursor: pointer;
  overflow: hidden;
  transition: background 0.15s;
  &:nth-child(7n) {
    border-right: none;
  }
  &:hover {
    background: $color-bg-light;
  }
  &.weekend {
    background: rgba(248, 250, 252, 0.8);
  }
  &.other-month {
    background: $color-bg-light;
    .calendar-day-number {
      color: $color-text-light;
    }
  }
  &.today {
    background: rgba($color-primary, 0.08);
    .calendar-day-number {
      background: $color-primary;
      color: white;
    }
  }
}

.calendar-day-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
  color: $color-text-primary;
  border-radius: 50%;
  margin-bottom: 2px;
  flex-shrink: 0;
}

.calendar-events {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
  flex: 1;
}

.calendar-event {
  display: flex;
  flex-direction: column;
  padding: 2px 4px;
  min-height: 18px;
  font-size: 10px;
  line-height: 1.2;
  border-radius: $radius-sm;
  cursor: pointer;
  transition: all 0.15s;
  overflow: hidden;
  flex-shrink: 0;
  &:hover {
    transform: translateX(1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }
}

.calendar-event-exam {
  background: $color-primary;
  color: white;
  &:hover {
    background: $color-primary-dark;
  }
}

.calendar-event-classroom {
  background: $color-success;
  color: white;
  &:hover {
    background: $color-success-dark;
  }
}

.calendar-event-title {
  font-weight: $font-weight-semibold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.calendar-event-subtitle {
  font-size: 9px;
  opacity: 0.9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.calendar-event-time {
  font-size: 9px;
  opacity: 0.85;
  margin-top: 1px;
}

.calendar-more {
  font-size: 9px;
  color: $color-text-secondary;
  text-align: center;
  padding: 2px;
  background: $color-bg-gray;
  border-radius: $radius-sm;
  cursor: pointer;
  margin-top: 2px;
  flex-shrink: 0;
  &:hover {
    background: $color-primary;
    color: white;
  }
}

.calendar-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 100px;
}

.calendar-loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid $color-border-light;
  border-top-color: $color-primary;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
