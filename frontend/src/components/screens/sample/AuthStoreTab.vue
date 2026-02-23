<template>
  <div>
    <h2 class="section-title">authStore</h2>
    <p class="section-desc">
      인증·세션·권한을 전담하는 전역 스토어입니다. 로그인 정보는
      <code>sessionStorage</code>에 유지되므로 페이지 새로고침 후에도
      <code>loadSession()</code>으로 복원됩니다.
    </p>

    <!-- 1. 흐름 -->
    <section class="style-section">
      <h3 class="subsection-title">로그인 / 로그아웃 흐름</h3>
      <div class="flow-box">
        <div class="flow-step" v-for="s in steps" :key="s.num">
          <div class="flow-num">{{ s.num }}</div>
          <div>
            <p class="flow-title">{{ s.title }}</p>
            <p class="flow-desc" v-html="s.desc"></p>
          </div>
          <div class="flow-arrow" v-if="s.num < 3">→</div>
        </div>
      </div>

      <div class="code-block">
        <pre><code>import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();

// 로그인
const result = await authStore.login('user01', 'pass1234');
if (!result.success) alert(result.msg);

// 로그아웃
await authStore.logout();

// 라우터 가드에서
const ok = authStore.checkAuth();   // loadSession() + isLoggedIn 반환
if (!ok) router.push('/login');</code></pre>
      </div>
    </section>

    <!-- 2. State / Getters -->
    <section class="style-section">
      <h3 class="subsection-title">State & Getters</h3>
      <div class="table-wrap">
        <table class="ref-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>타입</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            <tr class="group-row">
              <td colspan="3">State</td>
            </tr>
            <tr v-for="r in stateRows" :key="r.name">
              <td>
                <code>{{ r.name }}</code>
              </td>
              <td>
                <code class="type">{{ r.type }}</code>
              </td>
              <td>{{ r.desc }}</td>
            </tr>
            <tr class="group-row">
              <td colspan="3">Getters</td>
            </tr>
            <tr v-for="r in getterRows" :key="r.name">
              <td>
                <code>{{ r.name }}</code>
              </td>
              <td>
                <code class="type">{{ r.type }}</code>
              </td>
              <td>{{ r.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 3. 역할 매핑 -->
    <section class="style-section">
      <h3 class="subsection-title">userType → userRole 매핑 (USER_ROLES)</h3>
      <div class="role-grid">
        <div
          v-for="r in roles"
          :key="r.key"
          class="role-card"
          :class="`role-${r.role}`"
        >
          <span class="role-key">{{ r.key }}</span>
          <span class="role-arrow">→</span>
          <span class="role-value">'{{ r.role }}'</span>
          <span class="role-flag">{{ r.flag }}</span>
        </div>
      </div>

      <div class="code-block">
        <pre><code>// template
&lt;div v-if="authStore.isAdmin"&gt;관리자 메뉴&lt;/div&gt;

// ROUTE_CONFIG와 연동
import { getDefaultDashboard } from '@/constants/ROUTE_CONFIG';
const path = getDefaultDashboard(authStore.user?.userType);
// 'A' → '/dashboard/admin/dashboard'
// 'I' → '/dashboard/inst/my-page'
// 'S' → '/dashboard/stu/my-page'</code></pre>
      </div>
    </section>

    <!-- 4. 메뉴 / 세션 -->
    <section class="style-section">
      <h3 class="subsection-title">메뉴 목록 / 세션 구조</h3>
      <div class="code-block">
        <pre><code>// formattedMenuList — .do 제거, /dashboard 접두어 추가
// 원본: { mnu_nm: '강의 목록', mnu_url: '/courseManagement.do' }
// 변환: { ..., processedUrl: '/dashboard/courseManagement' }

// sessionStorage 저장 키
// 'loginInfo' → user 전체 응답
// 'userMenu'  → usrMnuAtrt 배열

// App.vue / 라우터 가드에서 세션 복원
authStore.loadSession();</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const steps = [
  {
    num: 1,
    title: "login(userId, password)",
    desc: "URLSearchParams → POST /loginProc.do<br>성공 시 user·menuList + sessionStorage 저장",
  },
  {
    num: 2,
    title: "loadSession() / checkAuth()",
    desc: "페이지 진입 시 sessionStorage → store 복원<br>checkAuth()는 boolean 반환",
  },
  {
    num: 3,
    title: "logout()",
    desc: "POST /loginOut.do → user 초기화<br>sessionStorage.clear()",
  },
];

const stateRows = [
  {
    name: "user",
    type: "UserInfo | null",
    desc: "로그인 응답 원본 (loginId, userNm, userType, usrMnuAtrt 포함)",
  },
  { name: "loading", type: "boolean", desc: "로그인 API 호출 중" },
  { name: "menuList", type: "MenuItem[]", desc: "서버에서 받은 메뉴 원본" },
];
const getterRows = [
  { name: "isLoggedIn", type: "boolean", desc: "user !== null" },
  {
    name: "loginId",
    type: "string",
    desc: "loginId → userId → id 폴백, 없으면 Guest",
  },
  { name: "loginNm", type: "string", desc: "userNm → name → userName 폴백" },
  {
    name: "userRole",
    type: "'admin'|'teacher'|'student'|'guest'",
    desc: "userType(A/I/S/G) → USER_ROLES 매핑",
  },
  {
    name: "isAdmin / isTeacher / isStudent",
    type: "boolean",
    desc: "userRole 비교 편의 플래그",
  },
  {
    name: "formattedMenuList",
    type: "FormattedMenuItem[]",
    desc: ".do 제거 + /dashboard 접두어가 붙은 processedUrl 포함",
  },
];

const roles = [
  { key: "A", role: "admin", flag: "isAdmin = true" },
  { key: "I", role: "teacher", flag: "isTeacher = true" },
  { key: "S", role: "student", flag: "isStudent = true" },
  { key: "G", role: "guest", flag: "(로그인 전 기본값)" },
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

.flow-box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
}
.flow-step {
  padding: $spacing-md;
  background: white;
  border: 1px solid $color-border-light;
  border-radius: $radius-md;
  position: relative;
  display: flex;
  gap: 10px;
}
.flow-num {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: $color-primary;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-xs;
  font-weight: $font-weight-bold;
  flex-shrink: 0;
}
.flow-title {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: 4px;
  font-family: monospace;
}
.flow-desc {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  line-height: 1.6;
}
.flow-arrow {
  display: none;
}

.table-wrap {
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  overflow: hidden;
  margin-bottom: $spacing-lg;
}
.ref-table {
  width: 100%;
  border-collapse: collapse;
  th {
    padding: 9px 14px;
    background: $color-bg-light;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text-secondary;
    text-align: left;
    border-bottom: 1px solid $color-border-light;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  td {
    padding: 8px 14px;
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
    padding: 2px 7px;
    border-radius: $radius-sm;
    font-size: $font-size-xs;
    font-family: monospace;
    white-space: nowrap;
  }
  .type {
    background: #f0fdf4;
    color: #15803d;
  }
  .group-row td {
    background: $color-bg-light;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text-light;
    padding: 5px 14px;
    letter-spacing: 0.05em;
  }
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
}
.role-card {
  padding: $spacing-md;
  border-radius: $radius-md;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid transparent;
}
.role-key {
  font-size: 22px;
  font-weight: $font-weight-bold;
  font-family: monospace;
}
.role-arrow {
  font-size: $font-size-xs;
  color: $color-text-light;
}
.role-value {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  font-family: monospace;
}
.role-flag {
  font-size: $font-size-xs;
  color: $color-text-light;
  margin-top: 2px;
}
.role-admin {
  background: #fef3c7;
  border-color: #fde68a;
  .role-key {
    color: #92400e;
  }
  .role-value {
    color: #b45309;
  }
}
.role-teacher {
  background: #f0fdf4;
  border-color: #86efac;
  .role-key {
    color: #15803d;
  }
  .role-value {
    color: #16a34a;
  }
}
.role-student {
  background: #eff6ff;
  border-color: #93c5fd;
  .role-key {
    color: #1d4ed8;
  }
  .role-value {
    color: #2563eb;
  }
}
.role-guest {
  background: $color-bg-light;
  border-color: $color-border;
  .role-key {
    color: $color-text-light;
  }
  .role-value {
    color: $color-text-light;
  }
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
    }
  }
}
</style>
