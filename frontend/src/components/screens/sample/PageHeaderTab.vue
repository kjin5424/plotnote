<template>
  <h2 class="section-title">PageHeader Component Guide</h2>

  <!-- ========================================
         Basic Usage
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">1. Basic Usage</h3>
    <p class="subsection-description">
      페이지 상단에 표시되는 헤더 컴포넌트입니다. 제목, 브레드크럼, 새로고침
      버튼을 포함합니다.
    </p>

    <div class="example-box">
      <h4>Simple Header</h4>
      <div class="header-preview">
        <PageHeader title="제출된 과제 목록" />
      </div>

      <div class="code-example">
        <pre><code>&lt;template&gt;
  &lt;PageHeader title="제출된 과제 목록" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import PageHeader from '@/components/PageHeader.vue';
&lt;/script&gt;</code></pre>
      </div>

      <p class="note">💡 <code>title</code> 속성은 필수입니다.</p>
    </div>

    <div class="example-box">
      <h4>With Refresh Button</h4>
      <div class="header-preview">
        <PageHeader
          title="사용자 관리"
          :show-refresh="true"
          @refresh="handleRefresh"
        />
      </div>

      <div class="code-example">
        <pre><code>&lt;PageHeader
  title="사용자 관리"
  :show-refresh="true"
  @refresh="handleRefresh"
/&gt;

&lt;script setup&gt;
const handleRefresh = () => {
  console.log('새로고침');
  // 데이터 다시 불러오기
};
&lt;/script&gt;</code></pre>
      </div>

      <p class="note warning">
        ⚠️ <code>@refresh</code> 이벤트 후
        <code>window.location.reload()</code>가 자동으로 호출됩니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Breadcrumbs
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">2. Breadcrumbs (자동)</h3>
    <p class="subsection-description">
      브레드크럼은 <code>commonStore</code>에서 자동으로 관리됩니다. 현재 라우트
      경로를 기반으로 표시됩니다.
    </p>

    <div class="example-box">
      <h4>Breadcrumb Examples</h4>

      <div class="breadcrumb-examples">
        <div class="breadcrumb-item">
          <div class="breadcrumb-display">
            <span class="home-icon">🏠</span>
            <span class="separator">/</span>
            <span>대시보드</span>
          </div>
          <div class="breadcrumb-desc">Home → 대시보드</div>
        </div>

        <div class="breadcrumb-item">
          <div class="breadcrumb-display">
            <span class="home-icon">🏠</span>
            <span class="separator">/</span>
            <span class="link">관리자</span>
            <span class="separator">/</span>
            <span class="current">사용자 관리</span>
          </div>
          <div class="breadcrumb-desc">Home → 관리자 → 사용자 관리</div>
        </div>

        <div class="breadcrumb-item">
          <div class="breadcrumb-display">
            <span class="home-icon">🏠</span>
            <span class="separator">/</span>
            <span class="link">과정</span>
            <span class="separator">/</span>
            <span class="link">과정 관리</span>
            <span class="separator">/</span>
            <span class="current">과정 상세</span>
          </div>
          <div class="breadcrumb-desc">Home → 과정 → 과정 관리 → 과정 상세</div>
        </div>
      </div>

      <div class="code-example">
        <pre><code>// commonStore.ts
export const useCommonStore = defineStore('common', {
  state: () => ({
    currentBreadcrumbs: [
      { label: 'Home', path: '/' },
      { label: '관리자', path: '/admin' },
      { label: '사용자 관리', path: null },  // 현재 페이지
    ],
  }),
});</code></pre>
      </div>

      <p class="note">
        💡 마지막 항목은 <code>path: null</code>로 설정하여 현재 페이지임을
        표시합니다.
      </p>
    </div>

    <div class="example-box">
      <h4>Setting Breadcrumbs in Router</h4>

      <div class="code-example">
        <pre><code>// router/index.ts
{
  path: '/admin/users',
  component: UsersPage,
  meta: {
    breadcrumb: [
      { label: 'Home', path: '/' },
      { label: '관리자', path: '/admin' },
      { label: '사용자 관리', path: null },
    ],
  },
}

// 라우터 가드에서 자동 설정
router.beforeEach((to, from, next) => {
  const commonStore = useCommonStore();
  if (to.meta.breadcrumb) {
    commonStore.currentBreadcrumbs = to.meta.breadcrumb;
  }
  next();
});</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Refresh Button
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">3. Refresh Button</h3>
    <p class="subsection-description">
      새로고침 버튼의 동작과 커스터마이징 방법입니다.
    </p>

    <div class="example-box">
      <h4>Refresh Options</h4>

      <div class="refresh-demo-grid">
        <div class="demo-item">
          <div class="header-preview">
            <PageHeader title="새로고침 활성화" :show-refresh="true" />
          </div>
          <code>:show-refresh="true"</code>
        </div>

        <div class="demo-item">
          <div class="header-preview">
            <PageHeader title="새로고침 비활성화" :show-refresh="false" />
          </div>
          <code>:show-refresh="false"</code>
        </div>

        <div class="demo-item">
          <div class="header-preview">
            <PageHeader
              title="커스텀 툴팁"
              :show-refresh="true"
              refresh-title="데이터 다시 불러오기"
            />
          </div>
          <code>refresh-title="데이터 다시 불러오기"</code>
        </div>
      </div>

      <div class="code-example">
        <pre><code>&lt;!-- 기본 새로고침 (title: "새로고침") --&gt;
&lt;PageHeader
  title="페이지 제목"
  :show-refresh="true"
/&gt;

&lt;!-- 새로고침 비활성화 --&gt;
&lt;PageHeader
  title="페이지 제목"
  :show-refresh="false"
/&gt;

&lt;!-- 커스텀 툴팁 --&gt;
&lt;PageHeader
  title="페이지 제목"
  :show-refresh="true"
  refresh-title="데이터 다시 불러오기"
/&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Refresh Event Handling</h4>

      <button class="btn btn-primary btn-sm" @click="simulateRefresh">
        새로고침 시뮬레이션
      </button>

      <div class="code-example">
        <pre><code>&lt;PageHeader
  title="사용자 목록"
  :show-refresh="true"
  @refresh="handleRefresh"
/&gt;

&lt;script setup&gt;
const handleRefresh = async () => {
  console.log('새로고침 시작');
  
  // 데이터 다시 불러오기
  await fetchUsers();
  
  // 참고: handleRefresh 후 window.location.reload()가 자동 호출됨
};
&lt;/script&gt;</code></pre>
      </div>

      <p class="note warning">
        ⚠️ 현재 구현에서는 <code>@refresh</code> 이벤트 후
        <code>window.location.reload()</code>가 자동으로 호출됩니다. 부분
        새로고침만 원한다면 컴포넌트 수정이 필요합니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Styling & Responsive
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">4. Styling & Responsive</h3>
    <p class="subsection-description">
      PageHeader는 반응형으로 디자인되어 모바일에서도 잘 작동합니다.
    </p>

    <div class="example-box">
      <h4>Desktop View</h4>
      <div class="responsive-preview desktop">
        <PageHeader title="데스크톱 화면" />
      </div>
      <ul class="feature-list">
        <li>제목: 4xl 크기 (36px)</li>
        <li>브레드크럼: sm 크기 (14px)</li>
        <li>새로고침 버튼: 30px × 30px</li>
      </ul>
    </div>

    <div class="example-box">
      <h4>Mobile View (768px 이하)</h4>
      <div class="responsive-preview mobile">
        <PageHeader title="모바일 화면" />
      </div>
      <ul class="feature-list">
        <li>제목: xl 크기 (24px)</li>
        <li>브레드크럼: xs 크기 (12px)</li>
        <li>새로고침 버튼: 36px × 36px</li>
        <li>패딩 축소</li>
      </ul>
    </div>

    <div class="code-example">
      <pre><code>// PageHeader.vue 반응형 스타일
@media (max-width: $breakpoint-md) {
  .page-header {
    padding: 16px 20px;
  }

  .page-title {
    font-size: $font-size-xl;  // 36px → 24px
  }

  .breadcrumb {
    font-size: $font-size-xs;  // 14px → 12px
  }

  .refresh-btn {
    width: 36px;   // 30px → 36px (터치 영역 확대)
    height: 36px;
  }
}</code></pre>
    </div>
  </section>

  <!-- ========================================
         Integration Examples
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">5. Integration Examples</h3>

    <div class="example-box">
      <h4>Complete Page Example</h4>

      <div class="code-example">
        <pre><code>&lt;template&gt;
  &lt;div class="page-container"&gt;
    &lt;PageHeader
      title="사용자 관리"
      :show-refresh="true"
      @refresh="handleRefresh"
    /&gt;

    &lt;div class="content-body"&gt;
      &lt;!-- 검색바 --&gt;
      &lt;SearchBar
        v-model:search-value="searchQuery"
        @search="handleSearch"
      /&gt;

      &lt;!-- 테이블 --&gt;
      &lt;table class="data-table"&gt;
        &lt;!-- ... --&gt;
      &lt;/table&gt;

      &lt;!-- 페이지네이션 --&gt;
      &lt;Pagination
        :total-items="totalUsers"
        @page-change="handlePageChange"
      /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import PageHeader from '@/components/PageHeader.vue';
import SearchBar from '@/components/SearchBar.vue';
import Pagination from '@/components/Pagination.vue';

const searchQuery = ref('');
const totalUsers = ref(100);

const handleRefresh = () => {
  // 데이터 다시 불러오기
  fetchUsers();
};

const handleSearch = () => {
  // 검색 실행
};

const handlePageChange = (page: number) => {
  // 페이지 변경
};
&lt;/script&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>With Router Meta</h4>

      <div class="code-example">
        <pre><code>// router/index.ts
const routes = [
  {
    path: '/admin',
    children: [
      {
        path: 'users',
        component: UsersPage,
        meta: {
          title: '사용자 관리',
          breadcrumb: [
            { label: 'Home', path: '/' },
            { label: '관리자', path: '/admin' },
            { label: '사용자 관리', path: null },
          ],
        },
      },
    ],
  },
];

// UsersPage.vue
&lt;template&gt;
  &lt;PageHeader :title="$route.meta.title" /&gt;
  &lt;!-- ... --&gt;
&lt;/template&gt;</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Best Practices
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">6. Best Practices</h3>

    <div class="example-box">
      <h4>✅ 권장사항</h4>
      <ul class="best-practices-list">
        <li>
          <strong>명확한 페이지 제목</strong>
          <br />사용자가 현재 위치를 명확히 알 수 있도록 구체적인 제목 사용
        </li>
        <li>
          <strong>브레드크럼 일관성</strong>
          <br />모든 페이지에서 동일한 구조와 깊이의 브레드크럼 유지
        </li>
        <li>
          <strong>새로고침 버튼 적절히 사용</strong>
          <br />실시간 데이터가 중요한 페이지에만 새로고침 버튼 표시
        </li>
        <li>
          <strong>제목 길이 제한</strong>
          <br />너무 긴 제목은 말줄임(...) 처리됨을 고려하여 간결하게 작성
        </li>
      </ul>
    </div>

    <div class="example-box">
      <h4>❌ 피해야 할 패턴</h4>
      <ul class="bad-practices-list">
        <li>
          <strong>불필요한 새로고침 버튼</strong>
          <br />→ 정적 페이지에는 새로고침 버튼 불필요
        </li>
        <li>
          <strong>브레드크럼 없이 사용</strong>
          <br />→ 깊은 페이지에서는 브레드크럼으로 네비게이션 제공 필수
        </li>
        <li>
          <strong>너무 긴 제목</strong>
          <br />→ 모바일에서 잘릴 수 있으므로 20자 이내 권장
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageHeader from "../PageHeader.vue";

const handleRefresh = () => {
  console.log("새로고침 핸들러 호출됨");
};

const simulateRefresh = () => {
  alert("새로고침 버튼을 클릭하면 window.location.reload()가 호출됩니다.");
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss" as *;

.section-title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-3xl;
  padding-bottom: $spacing-lg;
  border-bottom: 2px solid $color-primary;
}

.button-section {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: $color-bg-light;
  border-radius: $radius-lg;
}

.subsection-title {
  font-size: $font-size-2xl;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-sm;
  padding-bottom: $spacing-sm;
  border-bottom: 2px solid $color-border-light;
}

.subsection-description {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  margin-bottom: $spacing-lg;
}

.example-box {
  background: $color-bg-white;
  padding: $spacing-xl;
  border-radius: $radius-md;
  margin-bottom: $spacing-lg;
  box-shadow: $shadow-sm;
}

.example-box h4 {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-md;
}

.header-preview {
  border: 2px solid $color-border-light;
  border-radius: $radius-md;
  padding: $spacing-md;
  background: $color-bg-white;
  margin-bottom: $spacing-md;
}

.breadcrumb-examples {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.breadcrumb-item {
  background: $color-bg-light;
  padding: $spacing-md;
  border-radius: $radius-sm;
}

.breadcrumb-display {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  font-size: $font-size-sm;
  margin-bottom: $spacing-xs;

  .home-icon {
    font-size: $font-size-md;
  }

  .separator {
    color: $color-text-light;
  }

  .link {
    color: $color-text-light;
    cursor: pointer;

    &:hover {
      color: $color-primary;
      text-decoration: underline;
    }
  }

  .current {
    color: $color-text-secondary;
    font-weight: $font-weight-medium;
  }
}

.breadcrumb-desc {
  font-size: $font-size-xs;
  color: $color-text-light;
  margin-top: $spacing-xs;
}

.refresh-demo-grid {
  display: grid;
  gap: $spacing-lg;
}

.demo-item {
  code {
    display: block;
    margin-top: $spacing-sm;
    padding: $spacing-xs $spacing-sm;
    background: $color-bg-light;
    border-radius: $radius-sm;
    font-size: $font-size-xs;
  }
}

.responsive-preview {
  border: 2px solid $color-border-light;
  border-radius: $radius-md;
  padding: $spacing-md;
  background: $color-bg-white;
  margin-bottom: $spacing-md;

  &.mobile {
    max-width: 375px;
    margin: 0 auto $spacing-md;
  }
}

.feature-list {
  list-style: disc;
  padding-left: $spacing-lg;
  font-size: $font-size-sm;
  color: $color-text-secondary;

  li {
    margin-bottom: $spacing-xs;
  }
}

.best-practices-list,
.bad-practices-list {
  list-style: none;
  padding: 0;

  li {
    padding: $spacing-md;
    margin-bottom: $spacing-sm;
    border-radius: $radius-sm;
    font-size: $font-size-sm;
    line-height: 1.6;

    strong {
      display: block;
      margin-bottom: $spacing-xs;
      font-size: $font-size-md;
    }
  }
}

.best-practices-list li {
  background: rgba($color-success, 0.05);
  border-left: 4px solid $color-success;
}

.bad-practices-list li {
  background: rgba($color-danger, 0.05);
  border-left: 4px solid $color-danger;
}

.code-example {
  background: $color-bg-light;
  border-left: 4px solid $color-primary;
  padding: $spacing-md;
  border-radius: $radius-sm;
  margin-top: $spacing-md;
  overflow-x: auto;
}

.code-example pre {
  margin: 0;
  font-family: "Courier New", monospace;
  font-size: $font-size-xs;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.code-example code {
  color: $color-text-primary;
}

.note {
  background: #e3f2fd;
  border-left: 4px solid $color-primary;
  padding: $spacing-sm $spacing-md;
  margin-top: $spacing-md;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  color: #1976d2;
  line-height: 1.6;

  &.warning {
    background: #fff3cd;
    border-left-color: #ffc107;
    color: #856404;
  }
}

@media (max-width: $breakpoint-md) {
  .refresh-demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
