<template>
  <h2 class="section-title">Pagination Component Guide</h2>

  <!-- ========================================
         Basic Usage
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">1. Basic Usage</h3>
    <p class="subsection-description">
      페이지 네비게이션 컴포넌트입니다. 전체 아이템 수를 기반으로 자동으로
      페이지를 계산합니다.
    </p>

    <div class="example-box">
      <h4>Simple Pagination</h4>
      <Pagination
        :total-items="50"
        :items-per-page="10"
        @page-change="handleBasicPageChange"
      />

      <div class="result-display" v-if="basicCurrentPage">
        <strong>현재 페이지:</strong> {{ basicCurrentPage }}
      </div>

      <div class="code-example">
        <pre><code>&lt;template&gt;
  &lt;Pagination
    :total-items="50"
    :items-per-page="10"
    @page-change="handlePageChange"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
const handlePageChange = (page: number) => {
  console.log('현재 페이지:', page);
  // API 호출 또는 데이터 필터링
};
&lt;/script&gt;</code></pre>
      </div>

      <p class="note">
        💡 <code>total-items</code>와 <code>items-per-page</code>를 기반으로
        자동으로 총 페이지 수를 계산합니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Props Configuration
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">2. Props Configuration</h3>
    <p class="subsection-description">
      다양한 설정으로 페이지네이션을 커스터마이징할 수 있습니다.
    </p>

    <div class="example-box">
      <h4>Items Per Page</h4>
      <div class="config-demo">
        <label>Items per page:</label>
        <select v-model.number="itemsPerPage" class="config-select">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>

      <Pagination
        :total-items="100"
        :items-per-page="itemsPerPage"
        @page-change="handleItemsChange"
      />

      <div class="code-example">
        <pre><code>&lt;Pagination
  :total-items="100"
  :items-per-page="10"  &lt;!-- 기본값: 10 --&gt;
/&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Page Range (표시할 페이지 수)</h4>
      <div class="config-demo">
        <label>Page range:</label>
        <select v-model.number="pageRange" class="config-select">
          <option :value="3">3</option>
          <option :value="5">5 (기본)</option>
          <option :value="7">7</option>
          <option :value="10">10</option>
        </select>
      </div>

      <Pagination
        :total-items="200"
        :items-per-page="10"
        :page-range="pageRange"
        @page-change="handleRangeChange"
      />

      <div class="code-example">
        <pre><code>&lt;Pagination
  :total-items="200"
  :page-range="5"  &lt;!-- 기본값: 5 --&gt;
/&gt;

&lt;!-- page-range="3" --&gt;
‹ 1 2 3 ›  (3개만 표시)

&lt;!-- page-range="5" --&gt;
‹ 1 2 3 4 5 ›  (5개 표시)

&lt;!-- page-range="7" --&gt;
‹ 1 2 3 4 5 6 7 ›  (7개 표시)</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Margin Pages (앞뒤 고정 페이지)</h4>
      <div class="config-demo">
        <label>Margin pages:</label>
        <select v-model.number="marginPages" class="config-select">
          <option :value="0">0</option>
          <option :value="1">1 (기본)</option>
          <option :value="2">2</option>
        </select>
      </div>

      <Pagination
        :total-items="300"
        :items-per-page="10"
        :page-range="5"
        :margin-pages="marginPages"
        @page-change="handleMarginChange"
      />

      <div class="code-example">
        <pre><code>&lt;Pagination
  :total-items="300"
  :margin-pages="1"  &lt;!-- 기본값: 1 --&gt;
/&gt;

&lt;!-- margin-pages="1" --&gt;
« ‹ 1 ... 10 11 12 ... 30 ›  »

&lt;!-- margin-pages="2" --&gt;
« ‹ 1 2 ... 10 11 12 ... 29 30 ›  »

&lt;!-- margin-pages="0" --&gt;
« ‹ ... 10 11 12 ... ›  »</code></pre>
      </div>

      <p class="note">
        💡 <code>margin-pages</code>는 처음과 끝에 항상 표시되는 페이지
        수입니다. 사용자가 첫 페이지나 마지막 페이지로 빠르게 이동할 수 있게
        합니다.
      </p>
    </div>

    <div class="example-box">
      <h4>Initial Page (초기 페이지)</h4>
      <Pagination
        :total-items="100"
        :initial-page="5"
        @page-change="handleInitialChange"
      />

      <div class="code-example">
        <pre><code>&lt;Pagination
  :total-items="100"
  :initial-page="5"  &lt;!-- 5페이지부터 시작 --&gt;
/&gt;</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Navigation Buttons
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">3. Navigation Buttons</h3>
    <p class="subsection-description">
      페이지네이션은 4가지 네비게이션 버튼을 제공합니다.
    </p>

    <div class="example-box">
      <h4>Navigation Button Types</h4>

      <div class="nav-buttons-demo">
        <div class="nav-button-item">
          <div class="button-symbol">«</div>
          <div class="button-desc">
            <strong>맨 앞으로 (First)</strong>
            <br />1페이지로 이동 <br /><em
              >* 총 페이지 > pageRange일 때만 표시</em
            >
          </div>
        </div>

        <div class="nav-button-item">
          <div class="button-symbol">‹</div>
          <div class="button-desc">
            <strong>이전 (Previous)</strong>
            <br />이전 페이지로 이동 <br /><em>* 첫 페이지에서는 비활성화</em>
          </div>
        </div>

        <div class="nav-button-item">
          <div class="button-symbol">›</div>
          <div class="button-desc">
            <strong>다음 (Next)</strong>
            <br />다음 페이지로 이동 <br /><em
              >* 마지막 페이지에서는 비활성화</em
            >
          </div>
        </div>

        <div class="nav-button-item">
          <div class="button-symbol">»</div>
          <div class="button-desc">
            <strong>맨 뒤로 (Last)</strong>
            <br />마지막 페이지로 이동 <br /><em
              >* 총 페이지 > pageRange일 때만 표시</em
            >
          </div>
        </div>
      </div>

      <Pagination
        :total-items="200"
        :items-per-page="10"
        :page-range="5"
        @page-change="() => {}"
      />

      <p class="note">
        💡 «(맨 앞)과 »(맨 뒤) 버튼은 총 페이지 수가 <code>page-range</code>보다
        많을 때만 표시됩니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Exposed Methods
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">4. Exposed Methods</h3>
    <p class="subsection-description">
      외부에서 페이지네이션을 제어할 수 있는 메서드를 제공합니다.
    </p>

    <div class="example-box">
      <h4>Control from Parent</h4>

      <Pagination
        ref="paginationRef"
        :total-items="100"
        @page-change="handleMethodPage"
      />

      <div class="result-display" v-if="methodCurrentPage">
        <strong>현재 페이지:</strong> {{ methodCurrentPage }}
      </div>

      <div class="method-buttons">
        <button class="btn btn-primary btn-sm" @click="goToPage(5)">
          5페이지로 이동
        </button>
        <button class="btn btn-secondary btn-sm" @click="resetPage">
          1페이지로 리셋
        </button>
        <button class="btn btn-success btn-sm" @click="getCurrentPage">
          현재 페이지 가져오기
        </button>
      </div>

      <div class="code-example">
        <pre><code>&lt;template&gt;
  &lt;Pagination
    ref="paginationRef"
    :total-items="100"
  /&gt;
  
  &lt;button @click="goToPage(5)"&gt;5페이지로 이동&lt;/button&gt;
  &lt;button @click="resetPage"&gt;리셋&lt;/button&gt;
  &lt;button @click="getCurrentPage"&gt;현재 페이지 확인&lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
const paginationRef = ref(null);

// 특정 페이지로 이동
const goToPage = (page: number) => {
  paginationRef.value.setPage(page);
};

// 1페이지로 리셋
const resetPage = () => {
  paginationRef.value.reset();
};

// 현재 페이지 가져오기
const getCurrentPage = () => {
  const current = paginationRef.value.getCurrentPage();
  console.log('현재 페이지:', current);
};
&lt;/script&gt;</code></pre>
      </div>

      <p class="note">
        💡 <strong>Exposed 메서드:</strong> <br />• <code>setPage(page)</code> -
        특정 페이지로 이동 <br />• <code>reset()</code> - 1페이지로 리셋 <br />•
        <code>getCurrentPage()</code> - 현재 페이지 번호 반환
      </p>
    </div>
  </section>

  <!-- ========================================
         Responsive Design
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">5. Responsive Design</h3>
    <p class="subsection-description">
      모바일, 태블릿, 데스크톱 환경에 최적화되어 있습니다.
    </p>

    <div class="example-box">
      <h4>Desktop (> 768px)</h4>
      <div class="responsive-preview desktop">
        <Pagination :total-items="100" />
      </div>
      <ul class="feature-list">
        <li>버튼 크기: 40px × 40px</li>
        <li>글자 크기: 16px</li>
        <li>간격: 8px</li>
      </ul>
    </div>

    <div class="example-box">
      <h4>Tablet (≤ 768px)</h4>
      <div class="responsive-preview tablet">
        <Pagination :total-items="100" />
      </div>
      <ul class="feature-list">
        <li>버튼 크기: 36px × 36px</li>
        <li>글자 크기: 14px</li>
        <li>간격: 6px</li>
      </ul>
    </div>

    <div class="example-box">
      <h4>Mobile (≤ 576px)</h4>
      <div class="responsive-preview mobile">
        <Pagination :total-items="100" />
      </div>
      <ul class="feature-list">
        <li>버튼 크기: 32px × 32px</li>
        <li>글자 크기: 12px</li>
        <li>간격: 4px</li>
        <li>가로 스크롤 지원</li>
      </ul>

      <p class="note">
        💡 모바일에서는 페이지네이션이 화면 너비를 초과하면 가로 스크롤이
        활성화됩니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Styling & Animation
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">6. Styling & Animation</h3>
    <p class="subsection-description">
      페이지네이션은 호버, 활성화 상태에 대한 시각적 피드백을 제공합니다.
    </p>

    <div class="example-box">
      <h4>Interactive States</h4>

      <div class="states-demo">
        <div class="state-item">
          <div class="page-button normal">5</div>
          <span>일반 상태</span>
        </div>

        <div class="state-item">
          <div class="page-button hover">5</div>
          <span>Hover 상태<br />(그라데이션 + 상승)</span>
        </div>

        <div class="state-item">
          <div class="page-button active">5</div>
          <span>활성 상태<br />(Primary 색상 + 그림자)</span>
        </div>

        <div class="state-item">
          <div class="page-button disabled">5</div>
          <span>비활성 상태</span>
        </div>
      </div>

      <Pagination :total-items="50" />

      <div class="code-example">
        <pre><code>// Pagination.vue 스타일
.page-link {
  // 일반 상태
  background-color: $color-bg-white;
  border: 1px solid $color-border;
  
  // Hover
  &:hover {
    background: linear-gradient(135deg, 
      $color-primary-light, $color-primary);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba($color-primary, 0.25);
  }
  
  // 활성 상태
  &.active {
    background: $color-primary;
    color: white;
    box-shadow: 0 4px 12px rgba($color-primary, 0.3);
  }
  
  // 비활성 상태
  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Best Practices
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">7. Best Practices</h3>

    <div class="example-box">
      <h4>✅ 권장사항</h4>
      <ul class="best-practices-list">
        <li>
          <strong>적절한 items-per-page 설정</strong>
          <br />테이블: 10-20개, 카드: 12-24개, 리스트: 20-50개
        </li>
        <li>
          <strong>총 아이템 수 표시</strong>
          <br />페이지네이션 위에 "총 123개" 같은 정보 제공
        </li>
        <li>
          <strong>로딩 상태 처리</strong>
          <br />페이지 전환 중 로딩 인디케이터 표시
        </li>
        <li>
          <strong>URL 쿼리와 동기화</strong>
          <br />현재 페이지를 URL에 반영하여 북마크/공유 가능하게
        </li>
      </ul>
    </div>

    <div class="example-box">
      <h4>❌ 피해야 할 패턴</h4>
      <ul class="bad-practices-list">
        <li>
          <strong>너무 많은 페이지 표시</strong>
          <br />→ page-range를 10 이상으로 설정하면 모바일에서 보기 어려움
        </li>
        <li>
          <strong>페이지 번호 없이 사용</strong>
          <br />→ 사용자가 현재 위치를 파악하기 어려움
        </li>
        <li>
          <strong>로딩 없이 페이지 전환</strong>
          <br />→ 데이터가 로드 중임을 알려야 함
        </li>
      </ul>
    </div>
  </section>

  <!-- ========================================
         Integration Example
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">8. Complete Integration Example</h3>

    <div class="example-box">
      <div class="code-example">
        <pre v-pre><code>&lt;template&gt;
  &lt;div class="page-container"&gt;
    &lt;PageHeader title="사용자 목록" /&gt;

    &lt;div class="content-body"&gt;
      &lt;!-- 총 개수 표시 --&gt;
      &lt;div class="total-count"&gt;
        총 {{ totalItems }}명
      &lt;/div&gt;

      &lt;!-- 테이블 --&gt;
      &lt;table class="data-table"&gt;
        &lt;thead&gt;
          &lt;tr&gt;
            &lt;th&gt;이름&lt;/th&gt;
            &lt;th&gt;이메일&lt;/th&gt;
            &lt;th&gt;가입일&lt;/th&gt;
          &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;
          &lt;tr v-for="user in paginatedUsers" :key="user.id"&gt;
            &lt;td&gt;{{ user.name }}&lt;/td&gt;
            &lt;td&gt;{{ user.email }}&lt;/td&gt;
            &lt;td&gt;{{ user.createdAt }}&lt;/td&gt;
          &lt;/tr&gt;
        &lt;/tbody&gt;
      &lt;/table&gt;

      &lt;!-- 페이지네이션 --&gt;
      &lt;Pagination
        :total-items="totalItems"
        :items-per-page="itemsPerPage"
        @page-change="handlePageChange"
      /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, computed } from 'vue';
import Pagination from '@/components/Pagination.vue';

const users = ref([]);  // 전체 사용자 데이터
const currentPage = ref(1);
const itemsPerPage = ref(10);

const totalItems = computed(() => users.value.length);

// 현재 페이지의 데이터만 표시
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return users.value.slice(start, end);
});

const handlePageChange = async (page: number) => {
  currentPage.value = page;
  
  // 서버 페이지네이션인 경우
  // await fetchUsers(page, itemsPerPage.value);
  
  // 스크롤을 상단으로
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 초기 데이터 로드
onMounted(() => {
  fetchUsers();
});
&lt;/script&gt;</code></pre>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Pagination from "../Pagination.vue";

// Basic
const basicCurrentPage = ref(0);
const handleBasicPageChange = (page: number) => {
  basicCurrentPage.value = page;
};

// Config
const itemsPerPage = ref(10);
const pageRange = ref(5);
const marginPages = ref(1);

const handleItemsChange = () => {};
const handleRangeChange = () => {};
const handleMarginChange = () => {};
const handleInitialChange = () => {};

// Methods
const paginationRef = ref<any>(null);
const methodCurrentPage = ref(0);

const handleMethodPage = (page: number) => {
  methodCurrentPage.value = page;
};

const goToPage = (page: number) => {
  paginationRef.value?.setPage(page);
};

const resetPage = () => {
  paginationRef.value?.reset();
};

const getCurrentPage = () => {
  const current = paginationRef.value?.getCurrentPage();
  alert(`현재 페이지: ${current}`);
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

.result-display {
  background: $color-bg-light;
  padding: $spacing-md;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  margin-top: $spacing-md;
}

.config-demo {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin-bottom: $spacing-md;
  padding: $spacing-md;
  background: $color-bg-light;
  border-radius: $radius-sm;

  label {
    font-weight: $font-weight-medium;
    font-size: $font-size-sm;
  }

  .config-select {
    padding: $spacing-xs $spacing-sm;
    border: $border-width solid $color-border;
    border-radius: $radius-md;
    font-size: $font-size-sm;
  }
}

.nav-buttons-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
}

.nav-button-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  background: $color-bg-light;
  border-radius: $radius-sm;

  .button-symbol {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $color-primary;
    min-width: 40px;
    text-align: center;
  }

  .button-desc {
    font-size: $font-size-xs;
    line-height: 1.5;

    strong {
      display: block;
      margin-bottom: $spacing-xs;
      font-size: $font-size-sm;
    }

    em {
      color: $color-text-light;
      font-size: 11px;
    }
  }
}

.method-buttons {
  display: flex;
  gap: $spacing-sm;
  margin-top: $spacing-md;
  flex-wrap: wrap;
}

.responsive-preview {
  border: 2px solid $color-border-light;
  border-radius: $radius-md;
  padding: $spacing-md;
  background: $color-bg-white;
  margin-bottom: $spacing-md;
  overflow-x: auto;

  &.tablet {
    max-width: 768px;
    margin: 0 auto $spacing-md;
  }

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

.states-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
}

.state-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;

  span {
    font-size: $font-size-xs;
    text-align: center;
    color: $color-text-secondary;
    line-height: 1.4;
  }
}

.page-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $radius-md;
  font-weight: $font-weight-medium;
  transition: all $transition-base;

  &.normal {
    background: $color-bg-white;
    border: $border-width solid $color-border;
    color: $color-text-primary;
  }

  &.hover {
    background: linear-gradient(135deg, $color-primary-light, $color-primary);
    border: $border-width solid $color-primary;
    color: $color-text-white;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba($color-primary, 0.25);
  }

  &.active {
    background: $color-primary;
    border: $border-width solid $color-primary;
    color: $color-text-white;
    box-shadow: 0 4px 12px rgba($color-primary, 0.3);
  }

  &.disabled {
    background: $color-bg-gray;
    border: $border-width solid $color-border-light;
    color: $color-text-light;
    opacity: 0.6;
    cursor: not-allowed;
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
}

@media (max-width: $breakpoint-md) {
  .nav-buttons-demo {
    grid-template-columns: 1fr;
  }

  .states-demo {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
