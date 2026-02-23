<template>
  <div>
    <h2 class="section-title">Axios Config</h2>
    <p class="section-desc">
      프로젝트 전역 HTTP 클라이언트 설정입니다. 모든 API 요청은 이 인스턴스를
      통해 처리되며, 요청/응답 인터셉터로 로딩 상태 관리, 에러 알림, 인증 처리가
      자동으로 이루어집니다.
    </p>

    <!-- ==================== 1. 기본 사용 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">기본 사용법</h3>
      <p class="description">
        개별 HTTP 메서드 함수를 import해서 사용합니다. 직접 <code>axios</code>를
        import하지 말고 항상 이 함수들을 사용하세요.
      </p>

      <div class="code-explanation">
        <pre><code>import { get, post, put, patch, del } from '@/config/axiosConfig';

// GET
const response = await get('/api/users');
const data = response.data;

// POST
const response = await post('/api/users', { name: '홍길동', email: 'hong@test.com' });

// PUT (전체 수정)
const response = await put('/api/users/1', updatedUser);

// PATCH (부분 수정)
const response = await patch('/api/users/1', { name: '김철수' });

// DELETE (del - delete는 예약어라 del 사용)
const response = await del('/api/users/1');</code></pre>
      </div>
    </section>

    <!-- ==================== 2. 인터셉터 자동 처리 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">인터셉터 자동 처리</h3>
      <p class="description">
        모든 API 요청에 아래 동작이 자동으로 실행됩니다. 별도 처리 없이
        사용하세요.
      </p>

      <div class="demo-box">
        <div class="flow-diagram">
          <div class="flow-step flow-step--request">
            <div class="flow-icon">📤</div>
            <div class="flow-content">
              <strong>Request 인터셉터</strong>
              <ul>
                <li>로딩 시작 <code>commonStore.setLoading(true)</code></li>
                <li>세션 쿠키 자동 전송 <code>withCredentials: true</code></li>
                <li>FormData 감지 시 Content-Type 자동 설정</li>
              </ul>
            </div>
          </div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step flow-step--server">
            <div class="flow-icon">🖥️</div>
            <div class="flow-content">
              <strong>API 서버</strong>
              <span>baseURL: <code>/</code> (Vite 프록시)</span>
            </div>
          </div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step flow-step--response">
            <div class="flow-icon">📥</div>
            <div class="flow-content">
              <strong>Response 인터셉터 (성공)</strong>
              <ul>
                <li>로딩 종료 <code>commonStore.setLoading(false)</code></li>
                <li><code>response</code> 객체 그대로 반환</li>
              </ul>
            </div>
          </div>
          <div class="flow-arrow">↓ (에러 시)</div>
          <div class="flow-step flow-step--error">
            <div class="flow-icon">⚠️</div>
            <div class="flow-content">
              <strong>Response 인터셉터 (에러)</strong>
              <ul>
                <li>로딩 종료</li>
                <li>HTTP 상태 코드별 SweetAlert2 알림 자동 표시</li>
                <li>401 — 자동 로그아웃 + 로그인 페이지 이동</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== 3. 에러 상태코드 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">에러 상태코드 자동 처리</h3>
      <p class="description">
        에러 응답은 상태 코드별로 자동 처리됩니다. 별도로 try-catch를 구성하지
        않아도 사용자에게 알림이 표시됩니다.
      </p>

      <div class="demo-box">
        <table class="table table-grid table-sm">
          <thead>
            <tr>
              <th class="align-center" style="width: 80px">상태코드</th>
              <th class="align-center" style="width: 100px">아이콘</th>
              <th>타이틀</th>
              <th>처리 내용</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="err in errorCodes" :key="err.code">
              <td class="align-center">
                <span class="badge" :class="err.badgeClass">{{
                  err.code
                }}</span>
              </td>
              <td class="align-center">{{ err.icon }}</td>
              <td>{{ err.title }}</td>
              <td>{{ err.desc }}</td>
            </tr>
            <tr>
              <td class="align-center">
                <span class="badge badge-gray">네트워크</span>
              </td>
              <td class="align-center">🔴</td>
              <td>네트워크 오류</td>
              <td>응답 없음 — 네트워크 오류 알림</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-explanation">
        <h4>에러 처리가 필요 없는 경우 — skipAlert 옵션</h4>
        <p style="font-size: 13px; color: #6b7280; margin-bottom: 8px">
          에러를 직접 핸들링하거나, 에러 자체가 정보인 경우(예: 중복 ID 체크)
          config에 <code>skipAlert: true</code>를 넣으면 자동 알림을 건너뜁니다.
        </p>
        <pre><code>// 중복 체크 등 — 404를 "사용 가능"으로 해석하는 경우
try {
  await get('/api/check-id', { skipAlert: true } as any);
} catch (error: any) {
  if (error.response?.status === 404) {
    console.log('사용 가능한 ID');
  }
}</code></pre>
      </div>
    </section>

    <!-- ==================== 4. 특수 유틸리티 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">특수 유틸리티 함수</h3>

      <div class="code-explanation">
        <h4>파일 업로드</h4>
        <pre><code>import { uploadFile } from '@/config/axiosConfig';

const formData = new FormData();
formData.append('file', file);
formData.append('category', 'profile');

const response = await uploadFile('/api/upload', formData, (progress) => {
  console.log(`진행률: ${Math.round(progress.loaded / progress.total * 100)}%`);
});</code></pre>

        <h4>파일 다운로드</h4>
        <pre><code>import { downloadFile } from '@/config/axiosConfig';

// Blob으로 받아서 자동으로 브라우저 다운로드 실행
await downloadFile('/api/files/123/download', '보고서.pdf');</code></pre>

        <h4>페이지네이션 GET</h4>
        <pre><code>import { getPaginated } from '@/config/axiosConfig';
import type { PaginationParams } from '@/config/axiosConfig';

const params: PaginationParams = { page: 1, size: 10, sort: 'createdAt', direction: 'desc' };
const response = await getPaginated('/api/users', params, { role: 'STUDENT' });
// response.data → { content: [...], totalElements: 100, totalPages: 10, ... }</code></pre>

        <h4>병렬 요청</h4>
        <pre><code>import { all, get } from '@/config/axiosConfig';

const [usersRes, coursesRes] = await all([
  get('/api/users'),
  get('/api/courses'),
]);</code></pre>
      </div>
    </section>

    <!-- ==================== 5. 타입 레퍼런스 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">타입 레퍼런스</h3>
      <div class="code-explanation">
        <pre><code>import type { ApiResponse, PaginationParams, PaginationResponse } from '@/config/axiosConfig';

// ApiResponse — 공통 응답 래퍼
interface ApiResponse&lt;T = any&gt; {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// PaginationParams — 페이지네이션 요청 파라미터
interface PaginationParams {
  page: number;
  size: number;
  sort?: string;
  direction?: 'asc' | 'desc';
}

// PaginationResponse — 페이지네이션 응답
interface PaginationResponse&lt;T&gt; {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}</code></pre>
      </div>
    </section>

    <!-- ==================== 6. 설정 정보 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">인스턴스 설정</h3>
      <div class="demo-box">
        <div class="config-grid">
          <div class="config-item">
            <span class="config-key">baseURL</span>
            <span class="config-value"><code>/</code> (Vite 프록시 사용)</span>
          </div>
          <div class="config-item">
            <span class="config-key">timeout</span>
            <span class="config-value">30,000ms (30초)</span>
          </div>
          <div class="config-item">
            <span class="config-key">withCredentials</span>
            <span class="config-value"
              ><code>true</code> — 세션 쿠키 자동 전송</span
            >
          </div>
          <div class="config-item">
            <span class="config-key">인증 방식</span>
            <span class="config-value"
              >세션 기반 (Authorization 헤더 없음)</span
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const errorCodes = [
  {
    code: 400,
    icon: "⚠️",
    title: "잘못된 요청",
    desc: "Bad Request — 서버 메시지 또는 기본 메시지 표시",
    badgeClass: "badge-warning",
  },
  {
    code: 401,
    icon: "🔐",
    title: "인증 만료",
    desc: "자동 로그아웃 + /login으로 이동",
    badgeClass: "badge-danger",
  },
  {
    code: 403,
    icon: "🚫",
    title: "접근 거부",
    desc: "Forbidden — 권한 없음 알림",
    badgeClass: "badge-danger",
  },
  {
    code: 404,
    icon: "🔍",
    title: "리소스 없음",
    desc: "Not Found — 서버 메시지 또는 기본 메시지 표시",
    badgeClass: "badge-gray",
  },
  {
    code: 409,
    icon: "💥",
    title: "충돌 발생",
    desc: "Conflict — 중복 데이터 등",
    badgeClass: "badge-warning",
  },
  {
    code: 500,
    icon: "🔥",
    title: "서버 오류",
    desc: "Internal Server Error 알림",
    badgeClass: "badge-danger",
  },
  {
    code: 503,
    icon: "🛑",
    title: "서비스 불가",
    desc: "Service Unavailable 알림",
    badgeClass: "badge-danger",
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
.code-explanation {
  background: $color-bg-light;
  border-radius: $radius-md;
  padding: $spacing-lg;
  border-left: 4px solid $color-primary;
  h4 {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin: $spacing-lg 0 $spacing-sm 0;
    &:first-child {
      margin-top: 0;
    }
  }
  p {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin-bottom: 8px;
  }
  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: $spacing-md;
    border-radius: $radius-sm;
    overflow-x: auto;
    margin: $spacing-sm 0 $spacing-lg 0;
    font-size: $font-size-sm;
    line-height: 1.6;
    code {
      font-family: "Consolas", monospace;
      white-space: pre;
    }
  }
}

// 플로우 다이어그램
.flow-diagram {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 640px;
}
.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  strong {
    display: block;
    margin-bottom: 4px;
    font-size: $font-size-sm;
  }
  ul {
    margin: 0;
    padding-left: 16px;
    li {
      font-size: $font-size-sm;
      color: $color-text-secondary;
    }
  }
  span {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }
  code {
    background: #e3f2fd;
    color: #1565c0;
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 11px;
    font-family: monospace;
  }
  &--request {
    background: #eff6ff;
    border-color: #bfdbfe;
  }
  &--server {
    background: #f0fdf4;
    border-color: #bbf7d0;
    align-items: center;
  }
  &--response {
    background: #eff6ff;
    border-color: #bfdbfe;
  }
  &--error {
    background: #fff7ed;
    border-color: #fed7aa;
  }
}
.flow-icon {
  font-size: 20px;
  flex-shrink: 0;
}
.flow-content {
  flex: 1;
}
.flow-arrow {
  text-align: center;
  font-size: $font-size-sm;
  color: $color-text-light;
  padding: 2px 0;
}

// 에러 테이블
.table {
  width: 100%;
  border-collapse: collapse;
}
.table-grid thead tr {
  background: $color-bg-light;
}
.table-grid th,
.table-grid td {
  padding: 10px 12px;
  border-bottom: 1px solid $color-border-light;
  font-size: $font-size-sm;
  text-align: left;
}
.table-grid th {
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
}
.table-grid td {
  color: $color-text-secondary;
}
.table-sm th,
.table-sm td {
  padding: 8px 12px;
}
.align-center {
  text-align: center !important;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
}
.badge-warning {
  background: #fef3c7;
  color: #92400e;
}
.badge-danger {
  background: #fee2e2;
  color: #991b1b;
}
.badge-gray {
  background: $color-bg-gray;
  color: $color-text-secondary;
}

// 설정 그리드
.config-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.config-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 12px;
  background: $color-bg-light;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
}
.config-key {
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  min-width: 120px;
  flex-shrink: 0;
}
.config-value {
  color: $color-text-secondary;
  code {
    background: #e3f2fd;
    color: #1565c0;
    padding: 1px 6px;
    border-radius: 3px;
    font-size: 11px;
    font-family: monospace;
  }
}
</style>
