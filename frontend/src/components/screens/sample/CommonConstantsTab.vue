<template>
  <div>
    <h2 class="section-title">Constants 레퍼런스</h2>
    <p class="section-desc">
      프로젝트 전반에서 사용하는 상수 모음입니다. 모두 <code>as const</code>로
      선언되어 TypeScript 타입 추론이 가능합니다. 탭을 선택해 확인하세요.
    </p>

    <!-- 탭 -->
    <div class="tab-nav">
      <button
        v-for="t in tabs"
        :key="t.id"
        class="tab-btn"
        :class="{ active: activeTab === t.id }"
        @click="activeTab = t.id"
      >
        {{ t.label }}
      </button>
    </div>

    <!-- ===================== Common ===================== -->
    <div v-if="activeTab === 'common'">
      <section class="const-section">
        <h3 class="const-title">USER_ROLES</h3>
        <p class="const-path">@/constants/USER_ROLES</p>
        <div class="kv-grid">
          <div v-for="r in userRoles" :key="r.k" class="kv-row">
            <code class="kv-key">{{ r.k }}</code
            ><span class="kv-arrow">→</span
            ><code class="kv-val">'{{ r.v }}'</code
            ><span class="kv-desc">{{ r.d }}</span>
          </div>
        </div>
        <div class="code-block">
          <pre><code>import { USER_ROLES, type UserRole } from '@/constants/USER_ROLES';
// UserRole = 'admin' | 'teacher' | 'student' | 'guest'
const role: UserRole = USER_ROLES.A;  // 'admin'</code></pre>
        </div>
      </section>

      <section class="const-section">
        <h3 class="const-title">API_ENDPOINTS</h3>
        <p class="const-path">@/constants/API_ENDPOINTS</p>
        <div class="endpoint-grid">
          <div
            v-for="group in apiEndpoints"
            :key="group.name"
            class="endpoint-group"
          >
            <p class="ep-group-name">{{ group.name }}</p>
            <div v-for="ep in group.items" :key="ep.key" class="ep-row">
              <code class="ep-key">{{ ep.key }}</code>
              <code class="ep-val">{{ ep.val }}</code>
            </div>
          </div>
        </div>
        <div class="code-block">
          <pre><code>import { API_ENDPOINTS } from '@/constants/API_ENDPOINTS';
const { data } = await axios.get(API_ENDPOINTS.STUDENT.COURSES);</code></pre>
        </div>
      </section>

      <section class="const-section">
        <h3 class="const-title">ROUTE_CONFIG</h3>
        <p class="const-path">@/constants/ROUTE_CONFIG</p>
        <div class="kv-grid">
          <div class="kv-row">
            <code class="kv-key">A</code><span class="kv-arrow">→</span
            ><code class="kv-val">'/dashboard/admin/dashboard'</code>
          </div>
          <div class="kv-row">
            <code class="kv-key">I</code><span class="kv-arrow">→</span
            ><code class="kv-val">'/dashboard/inst/my-page'</code>
          </div>
          <div class="kv-row">
            <code class="kv-key">S</code><span class="kv-arrow">→</span
            ><code class="kv-val">'/dashboard/stu/my-page'</code>
          </div>
          <div class="kv-row">
            <code class="kv-key">(없음)</code><span class="kv-arrow">→</span
            ><code class="kv-val">'/login'</code>
          </div>
        </div>
        <div class="code-block">
          <pre><code>import { getDefaultDashboard } from '@/constants/ROUTE_CONFIG';
const path = getDefaultDashboard(authStore.user?.userType);
router.push(path);</code></pre>
        </div>
      </section>

      <div class="small-const-grid">
        <section class="small-const">
          <h3 class="const-title">PAGINATION</h3>
          <p class="const-path">@/constants/PAGINATION</p>
          <div class="kv-grid">
            <div class="kv-row">
              <code class="kv-key">DEFAULT_PAGE</code
              ><code class="kv-val">1</code>
            </div>
            <div class="kv-row">
              <code class="kv-key">DEFAULT_SIZE</code
              ><code class="kv-val">10</code>
            </div>
            <div class="kv-row">
              <code class="kv-key">SIZE_OPTIONS</code
              ><code class="kv-val">[10, 20, 30, 50, 100]</code>
            </div>
            <div class="kv-row">
              <code class="kv-key">MAX_VISIBLE_PAGES</code
              ><code class="kv-val">5</code>
            </div>
          </div>
        </section>

        <section class="small-const">
          <h3 class="const-title">SORT_DIRECTION</h3>
          <p class="const-path">@/constants/SORT_DIRECTION</p>
          <div class="kv-grid">
            <div class="kv-row">
              <code class="kv-key">ASC</code><code class="kv-val">'asc'</code>
            </div>
            <div class="kv-row">
              <code class="kv-key">DESC</code><code class="kv-val">'desc'</code>
            </div>
          </div>
          <p class="const-note">
            타입: <code>SortDirection = 'asc' | 'desc'</code>
          </p>
        </section>

        <section class="small-const">
          <h3 class="const-title">DATE_FORMATS</h3>
          <p class="const-path">@/constants/DATE_FORMATS</p>
          <div class="kv-grid">
            <div v-for="f in dateFormats" :key="f.k" class="kv-row">
              <code class="kv-key">{{ f.k }}</code
              ><code class="kv-val">{{ f.v }}</code>
            </div>
          </div>
        </section>
      </div>

      <section class="const-section">
        <h3 class="const-title">REGEX</h3>
        <p class="const-path">@/constants/REGEX</p>
        <div class="table-wrap">
          <table class="ref-table">
            <thead>
              <tr>
                <th>키</th>
                <th>패턴</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in regexRows" :key="r.k">
                <td>
                  <code>{{ r.k }}</code>
                </td>
                <td>
                  <code class="pattern">{{ r.p }}</code>
                </td>
                <td>{{ r.d }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="code-block">
          <pre><code>import { REGEX } from '@/constants/REGEX';
REGEX.EMAIL.test('user@example.com')  // true
REGEX.PHONE.test('01012345678')       // true</code></pre>
        </div>
      </section>

      <section class="const-section">
        <h3 class="const-title">FILE_CONSTANTS</h3>
        <p class="const-path">@/constants/FILE_CONSTANTS</p>
        <div class="small-const-grid">
          <div class="small-const">
            <p class="const-sub">FILE_SIZE (bytes)</p>
            <div class="kv-grid">
              <div class="kv-row">
                <code class="kv-key">MIN</code><code class="kv-val">0</code>
              </div>
              <div class="kv-row">
                <code class="kv-key">MAX_5MB</code
                ><code class="kv-val">5 * 1024 * 1024</code>
              </div>
              <div class="kv-row">
                <code class="kv-key">MAX_10MB</code
                ><code class="kv-val">10 * 1024 * 1024</code>
              </div>
              <div class="kv-row">
                <code class="kv-key">MAX_20MB</code
                ><code class="kv-val">20 * 1024 * 1024</code>
              </div>
            </div>
          </div>
          <div class="small-const">
            <p class="const-sub">FILE_TYPE (MIME)</p>
            <div class="kv-grid">
              <div class="kv-row">
                <code class="kv-key">IMAGE</code
                ><span class="kv-desc">jpeg, png, gif, webp</span>
              </div>
              <div class="kv-row">
                <code class="kv-key">DOCUMENT</code
                ><span class="kv-desc">pdf, doc/docx, xls/xlsx</span>
              </div>
              <div class="kv-row">
                <code class="kv-key">ARCHIVE</code
                ><span class="kv-desc">zip, 7z</span>
              </div>
            </div>
          </div>
          <div class="small-const">
            <p class="const-sub">FILE_ERROR_MSG</p>
            <div class="kv-grid">
              <div class="kv-row">
                <code class="kv-key">TOO_LARGE(mb)</code
                ><span class="kv-desc">함수 — "최대 {mb}MB 초과"</span>
              </div>
              <div class="kv-row">
                <code class="kv-key">INVALID_TYPE</code
                ><span class="kv-desc">"지원하지 않는 형식"</span>
              </div>
              <div class="kv-row">
                <code class="kv-key">EMPTY_FILE</code
                ><span class="kv-desc">"파일이 비어있습니다"</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ===================== Messages ===================== -->
    <div v-if="activeTab === 'messages'">
      <section
        v-for="msg in messageGroups"
        :key="msg.title"
        class="const-section"
      >
        <h3 class="const-title">{{ msg.title }}</h3>
        <p class="const-path">{{ msg.path }}</p>
        <div class="table-wrap">
          <table class="ref-table">
            <thead>
              <tr>
                <th>키</th>
                <th>메시지</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in msg.rows" :key="r.k">
                <td>
                  <code>{{ r.k }}</code>
                </td>
                <td class="msg-val">{{ r.v }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="code-block">
          <pre><code>{{ msg.example }}</code></pre>
        </div>
      </section>
    </div>

    <!-- ===================== Types ===================== -->
    <div v-if="activeTab === 'types'">
      <section v-for="tg in typeGroups" :key="tg.title" class="const-section">
        <h3 class="const-title">{{ tg.title }}</h3>
        <p class="const-path">{{ tg.path }}</p>
        <div class="type-grid">
          <div class="table-wrap" style="flex: 1">
            <table class="ref-table">
              <thead>
                <tr>
                  <th>키</th>
                  <th>값</th>
                  <th v-if="tg.hasLabel">라벨</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in tg.rows" :key="r.k">
                  <td>
                    <code>{{ r.k }}</code>
                  </td>
                  <td>
                    <code class="kv-val-inline">{{ r.v }}</code>
                  </td>
                  <td v-if="tg.hasLabel">{{ r.label }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="code-block">
          <pre><code>{{ tg.example }}</code></pre>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref("common");
const tabs = [
  { id: "common", label: "⚙️ Common" },
  { id: "messages", label: "💬 Messages" },
  { id: "types", label: "🏷️ Types" },
];

// ── USER_ROLES ─────────────────────────────────────────────────────
const userRoles = [
  { k: "A", v: "admin", d: "isAdmin = true" },
  { k: "I", v: "teacher", d: "isTeacher = true" },
  { k: "S", v: "student", d: "isStudent = true" },
  { k: "G", v: "guest", d: "로그인 전 기본값" },
];

// ── API_ENDPOINTS ──────────────────────────────────────────────────
const apiEndpoints = [
  {
    name: "COMMON",
    items: [
      { key: "LOGIN", val: "/login" },
      { key: "DASHBOARD", val: "/dashboard" },
      { key: "DESIGN_SAMPLE", val: "/designSample" },
    ],
  },
  {
    name: "ADMIN",
    items: [
      { key: "DASHBOARD", val: "/admin/dashboard" },
      { key: "COURSE", val: "/admin/courseManagement" },
      { key: "STUDENTS", val: "/admin/stu" },
      { key: "TEACHERS", val: "/admin/inst" },
      { key: "QNA", val: "/admin/qna" },
      { key: "EXAM_SCHEDULE", val: "/admin/exam/schedule" },
      { key: "NOTICES", val: "/admin/notices" },
    ],
  },
  {
    name: "INSTRUCTOR",
    items: [
      { key: "COURSE_LIST", val: "/inst/course-list" },
      { key: "ATTENDANCE", val: "/inst/attendance" },
      { key: "EXAMS", val: "/inst/exams" },
      { key: "ASSIGNMENTS", val: "/inst/assignments" },
      { key: "QNA", val: "/inst/qna" },
      { key: "MY_PAGE", val: "/inst/my-page" },
    ],
  },
  {
    name: "STUDENT",
    items: [
      { key: "COURSES", val: "/stu/courses" },
      { key: "MY_COURSES", val: "/stu/my-courses" },
      { key: "ASSIGNMENTS", val: "/stu/assignments" },
      { key: "EXAMS", val: "/stu/exams" },
      { key: "QNA", val: "/stu/qna" },
      { key: "MY_PAGE", val: "/stu/my-page" },
    ],
  },
];

// ── DATE_FORMATS ───────────────────────────────────────────────────
const dateFormats = [
  { k: "DATE", v: "YYYY-MM-DD" },
  { k: "DATETIME", v: "YYYY-MM-DD HH:mm:ss" },
  { k: "TIME", v: "HH:mm:ss" },
  { k: "DATE_KR", v: "YYYY년 MM월 DD일" },
  { k: "DATETIME_KR", v: "YYYY년 MM월 DD일 HH시 mm분" },
  { k: "DATE_DISPLAY", v: "YYYY.MM.DD" },
  { k: "DATETIME_DISPLAY", v: "YYYY.MM.DD HH:mm" },
];

// ── REGEX ──────────────────────────────────────────────────────────
const regexRows = [
  {
    k: "EMAIL",
    p: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/",
    d: "이메일",
  },
  {
    k: "PASSWORD",
    p: "/^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])...{8,}$/",
    d: "8자+, 영문+숫자+특수문자",
  },
  { k: "PHONE", p: "/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/", d: "핸드폰 번호" },
  { k: "NUMBER", p: "/^[0-9]+$/", d: "숫자만" },
  { k: "KOREAN", p: "/^[가-힣]+$/", d: "한글만" },
  { k: "ENGLISH", p: "/^[a-zA-Z]+$/", d: "영문만" },
  { k: "ALPHANUMERIC", p: "/^[a-zA-Z0-9]+$/", d: "영문+숫자" },
];

// ── Messages ───────────────────────────────────────────────────────
const messageGroups = [
  {
    title: "CONFIRM_MESSAGES",
    path: "@/constants/CONFIRM_MESSAGES",
    rows: [
      { k: "DELETE", v: "정말로 삭제하시겠습니까?" },
      { k: "SAVE", v: "저장하시겠습니까?" },
      { k: "CANCEL", v: "작업을 취소하시겠습니까?" },
      { k: "LOGOUT", v: "로그아웃 하시겠습니까?" },
      { k: "CHANGE_ROLE", v: "사용자 권한을 변경하시겠습니까?" },
      { k: "SUBMIT", v: "제출 후에는 수정이 불가능합니다. 계속하시겠습니까?" },
      {
        k: "UNSAVED_CHANGES",
        v: "저장되지 않은 변경사항이 있습니다. 페이지를 벗어나시겠습니까?",
      },
    ],
    example: `import { CONFIRM_MESSAGES } from '@/constants/CONFIRM_MESSAGES';
const ok = await modalStore.confirm(CONFIRM_MESSAGES.DELETE);`,
  },
  {
    title: "SUCCESS_MESSAGES",
    path: "@/constants/SUCCESS_MESSAGES",
    rows: [
      { k: "LOGIN_SUCCESS", v: "로그인되었습니다." },
      { k: "LOGOUT_SUCCESS", v: "로그아웃되었습니다." },
      { k: "REGISTER_SUCCESS", v: "등록되었습니다." },
      { k: "UPDATE_SUCCESS", v: "수정되었습니다." },
      { k: "DELETE_SUCCESS", v: "삭제되었습니다." },
      { k: "SAVE_SUCCESS", v: "저장되었습니다." },
      { k: "SUBMIT_SUCCESS", v: "제출되었습니다." },
      { k: "UPLOAD_SUCCESS", v: "업로드되었습니다." },
      { k: "SEND_SUCCESS", v: "전송되었습니다." },
    ],
    example: `import { SUCCESS_MESSAGES } from '@/constants/SUCCESS_MESSAGES';
commonStore.showSuccess(SUCCESS_MESSAGES.SAVE_SUCCESS);`,
  },
  {
    title: "ERROR_MESSAGES",
    path: "@/constants/ERROR_MESSAGES",
    rows: [
      { k: "NETWORK_ERROR", v: "네트워크 연결을 확인해주세요." },
      { k: "UNAUTHORIZED", v: "로그인이 필요합니다." },
      { k: "FORBIDDEN", v: "접근 권한이 없습니다." },
      { k: "NOT_FOUND", v: "요청한 데이터를 찾을 수 없습니다." },
      { k: "CONFLICT", v: "이미 존재하는 데이터입니다." },
      {
        k: "INTERNAL_SERVER_ERROR",
        v: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      { k: "LOGIN_FAILED", v: "아이디 또는 비밀번호가 일치하지 않습니다." },
      { k: "INVALID_EMAIL", v: "올바른 이메일 주소를 입력해주세요." },
      {
        k: "INVALID_PASSWORD",
        v: "비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다.",
      },
      { k: "FILE_SIZE_EXCEEDED", v: "파일 크기가 너무 큽니다." },
      { k: "NO_DATA", v: "조회된 데이터가 없습니다." },
    ],
    example: `import { ERROR_MESSAGES } from '@/constants/ERROR_MESSAGES';
// axiosConfig에서 자동 사용, 직접 참조도 가능
commonStore.showError(ERROR_MESSAGES.FORBIDDEN);`,
  },
];

// ── Types ──────────────────────────────────────────────────────────
const typeGroups = [
  {
    title: "ATTENDANCE_STATUS",
    path: "@/constants/ATTENDANCE_STATUS",
    hasLabel: true,
    rows: [
      { k: "ABSENT", v: "'absent'", label: "결석" },
      { k: "PRESENT", v: "'present'", label: "출석" },
      { k: "LATE", v: "'late'", label: "지각" },
      { k: "EARLY", v: "'early'", label: "조퇴" },
      { k: "OUT", v: "'out'", label: "외출" },
    ],
    example: `import { ATTENDANCE_STATUS, ATTENDANCE_LABELS, type AttendanceStatus } from '@/constants/ATTENDANCE_STATUS';
// AttendanceStatus = 'absent' | 'present' | 'late' | 'early' | 'out'
const label = ATTENDANCE_LABELS[ATTENDANCE_STATUS.PRESENT];  // '출석'`,
  },
  {
    title: "QNA_CATEGORIES",
    path: "@/constants/QNA_CATEGORIES",
    hasLabel: true,
    rows: [
      { k: "ACCOUNT", v: "'account'", label: "계정/로그인" },
      { k: "ENROLL", v: "'enroll'", label: "수강관련" },
      { k: "LECTURE", v: "'lecture'", label: "강의내용" },
      { k: "SYSTEM", v: "'system'", label: "시스템오류" },
      { k: "ETC", v: "'etc'", label: "기타" },
    ],
    example: `import { QNA_CATEGORIES, QNA_CATEGORY_LABELS, type QnACategory } from '@/constants/QNA_CATEGORIES';
// QnACategory = 'account' | 'enroll' | 'lecture' | 'system' | 'etc'
const label = QNA_CATEGORY_LABELS[QNA_CATEGORIES.LECTURE];  // '강의내용'`,
  },
  {
    title: "STATUS_TYPES",
    path: "@/constants/STATUS_TYPES",
    hasLabel: true,
    rows: [
      {
        k: "ACTIVE / INACTIVE / PENDING",
        v: "'active' / 'inactive' / 'pending'",
        label: "활성 / 비활성 / 대기중",
      },
      {
        k: "COMPLETED / CANCELLED",
        v: "'completed' / 'cancelled'",
        label: "완료 / 취소",
      },
      {
        k: "SCHEDULED / IN_PROGRESS / ENDED",
        v: "'scheduled' / 'in_progress' / 'ended'",
        label: "예정 / 진행중 / 종료",
      },
      {
        k: "NOT_STARTED / SUBMITTED / GRADED",
        v: "'not_started' / 'submitted' / 'graded'",
        label: "미시작 / 제출완료 / 채점완료",
      },
      {
        k: "UNANSWERED / ANSWERED",
        v: "'unanswered' / 'answered'",
        label: "미답변 / 답변완료",
      },
      {
        k: "APPROVED / REJECTED / WAITING",
        v: "'approved' / 'rejected' / 'waiting'",
        label: "승인 / 반려 / 승인대기",
      },
    ],
    example: `import { STATUS_TYPES, STATUS_LABELS, type StatusType } from '@/constants/STATUS_TYPES';
// StatusType = 'active' | 'inactive' | ... (전체 유니온)
const label = STATUS_LABELS[STATUS_TYPES.IN_PROGRESS];  // '진행중'

// 강의 상태 배지 예시
const courseStatus: StatusType = STATUS_TYPES.SCHEDULED;`,
  },
];
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
  margin-bottom: $spacing-xl;
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

// 탭 내비게이션
.tab-nav {
  display: flex;
  gap: 4px;
  margin-bottom: $spacing-xl;
  border-bottom: 2px solid $color-border-light;
}
.tab-btn {
  padding: 8px 20px;
  border: none;
  border-radius: $radius-sm $radius-sm 0 0;
  background: $color-bg-light;
  color: $color-text-secondary;
  font-size: $font-size-sm;
  cursor: pointer;
  font-weight: $font-weight-medium;
  transition: all 0.15s;
  &:hover {
    background: white;
    color: $color-primary;
  }
  &.active {
    background: white;
    color: $color-primary;
    border: 1px solid $color-border-light;
    border-bottom: 2px solid white;
    font-weight: $font-weight-semibold;
    margin-bottom: -2px;
  }
}

.const-section {
  margin-bottom: $spacing-3xl;
}
.const-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: 2px;
  font-family: monospace;
}
.const-path {
  font-size: $font-size-xs;
  color: $color-text-light;
  font-family: monospace;
  margin-bottom: $spacing-md;
}
.const-sub {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-text-secondary;
  margin-bottom: 6px;
}
.const-note {
  font-size: $font-size-xs;
  color: $color-text-light;
  margin-top: 6px;
  code {
    background: #e3f2fd;
    color: #1565c0;
    padding: 1px 5px;
    border-radius: 3px;
    font-family: monospace;
  }
}

// kv 그리드
.kv-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: $spacing-md;
}
.kv-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: white;
  border: 1px solid $color-border-light;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
}
.kv-key {
  background: #eff6ff;
  color: #1d4ed8;
  padding: 2px 8px;
  border-radius: $radius-sm;
  font-family: monospace;
  font-size: $font-size-xs;
  white-space: nowrap;
}
.kv-arrow {
  color: $color-text-light;
  flex-shrink: 0;
}
.kv-val {
  background: #f0fdf4;
  color: #15803d;
  padding: 2px 8px;
  border-radius: $radius-sm;
  font-family: monospace;
  font-size: $font-size-xs;
}
.kv-desc {
  color: $color-text-light;
  font-size: $font-size-xs;
  margin-left: 4px;
}

// API endpoint
.endpoint-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-md;
  margin-bottom: $spacing-md;
}
.endpoint-group {
  background: white;
  border: 1px solid $color-border-light;
  border-radius: $radius-md;
  overflow: hidden;
}
.ep-group-name {
  padding: 7px 10px;
  background: $color-bg-light;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  color: $color-text-secondary;
  letter-spacing: 0.05em;
  border-bottom: 1px solid $color-border-light;
}
.ep-row {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 6px 10px;
  border-bottom: 1px solid $color-border-light;
  &:last-child {
    border-bottom: none;
  }
}
.ep-key {
  font-size: $font-size-xs;
  color: #1d4ed8;
  font-family: monospace;
}
.ep-val {
  font-size: $font-size-xs;
  color: $color-text-light;
  font-family: monospace;
}

// 소형 상수 3열 그리드
.small-const-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  margin-bottom: $spacing-md;
}
.small-const {
  background: white;
  border: 1px solid $color-border-light;
  border-radius: $radius-md;
  padding: $spacing-md;
}

// 레퍼런스 테이블
.table-wrap {
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  overflow: hidden;
  margin-bottom: $spacing-md;
}
.ref-table {
  width: 100%;
  border-collapse: collapse;
  th {
    padding: 8px 12px;
    background: $color-bg-light;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text-secondary;
    text-align: left;
    border-bottom: 1px solid $color-border-light;
    letter-spacing: 0.05em;
  }
  td {
    padding: 7px 12px;
    border-bottom: 1px solid $color-border-light;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    vertical-align: middle;
  }
  tr:last-child td {
    border-bottom: none;
  }
  code {
    background: #eff6ff;
    color: #1d4ed8;
    padding: 2px 6px;
    border-radius: $radius-sm;
    font-size: $font-size-xs;
    font-family: monospace;
    white-space: nowrap;
  }
  .pattern {
    background: $color-bg-light;
    color: $color-text-primary;
    font-size: 11px;
  }
  .msg-val {
    color: $color-text-primary;
  }
  .kv-val-inline {
    background: #f0fdf4;
    color: #15803d;
  }
}

.type-grid {
  display: flex;
  gap: $spacing-md;
  margin-bottom: $spacing-md;
}

.code-block {
  background: $color-bg-light;
  border-radius: $radius-md;
  border-left: 4px solid $color-primary;
  overflow: hidden;
  margin-top: $spacing-md;
  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: $spacing-md;
    margin: 0;
    font-size: $font-size-sm;
    line-height: 1.6;
    overflow-x: auto;
    code {
      font-family: "Consolas", monospace;
      white-space: pre;
      background: none;
      color: inherit;
      padding: 0;
    }
  }
}
</style>
