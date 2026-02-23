<template>
  <div>
    <h2 class="section-title">usePagination</h2>
    <p class="section-desc">
      클라이언트 사이드 페이지네이션, 검색 필터, 정렬을 통합 관리하는 훅입니다.
      전체 데이터를 한 번에 받아온 뒤 프론트에서 페이징/검색/정렬을 처리할 때
      사용합니다.
    </p>

    <!-- ==================== 1. Live Demo ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">Live Demo</h3>

      <div class="demo-box">
        <!-- 검색 -->
        <div class="demo-search-row">
          <select v-model="searchParams.type" class="demo-select">
            <option value="all">전체</option>
            <option value="name">이름</option>
            <option value="role">역할</option>
          </select>
          <input
            v-model="searchParams.keyword"
            class="demo-input"
            placeholder="검색어 입력..."
          />
          <span class="demo-count">총 {{ totalItems }}건</span>
        </div>

        <!-- 테이블 -->
        <table class="demo-table">
          <thead>
            <tr>
              <th class="align-center" style="width: 60px">번호</th>
              <th
                @click="sortKey = sortKey === 'name' ? '' : 'name'"
                class="sortable"
              >
                이름 {{ sortKey === "name" ? "▲" : "" }}
              </th>
              <th>이메일</th>
              <th class="align-center">역할</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="paginatedData.length === 0">
              <td colspan="4" class="table-empty">검색 결과가 없습니다.</td>
            </tr>
            <tr v-for="(user, i) in paginatedData" :key="user.id">
              <td class="align-center">{{ (currentPage - 1) * 5 + i + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td class="align-center">
                <span
                  class="badge"
                  :class="
                    user.role === '관리자' ? 'badge-primary' : 'badge-gray'
                  "
                >
                  {{ user.role }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 페이지네이션 -->
        <div class="demo-pagination">
          <button
            class="page-btn"
            :disabled="currentPage === 1"
            @click="handlePageChange(currentPage - 1)"
          >
            ◀
          </button>
          <button
            v-for="p in pageNumbers"
            :key="p"
            class="page-btn"
            :class="{ active: p === currentPage }"
            @click="handlePageChange(p)"
          >
            {{ p }}
          </button>
          <button
            class="page-btn"
            :disabled="currentPage >= Math.ceil(totalItems / 5)"
            @click="handlePageChange(currentPage + 1)"
          >
            ▶
          </button>
        </div>
      </div>

      <div class="code-explanation">
        <pre><code>import { usePagination } from '@/hooks/usePagination';
import { ref } from 'vue';

const users = ref([...]);  // 전체 데이터 (API에서 한 번에 받아옴)

const {
  currentPage,
  searchParams,   // { type: 'all', keyword: '' }
  sortKey,
  totalItems,
  paginatedData,  // 현재 페이지에 표시할 데이터
  handlePageChange,
} = usePagination(users, { itemsPerPage: 10 });</code></pre>
        <div class="class-guide">
          <h5>반환값</h5>
          <ul>
            <li>
              <code>currentPage</code> <em>Ref&lt;number&gt;</em> — 현재 페이지
              (1-based)
            </li>
            <li>
              <code>searchParams</code> <em>Ref&lt;{type, keyword}&gt;</em> —
              검색 타입과 키워드. 변경 시 1페이지로 자동 초기화
            </li>
            <li>
              <code>sortKey</code> <em>Ref&lt;string&gt;</em> — 정렬 기준
              필드명. 빈 문자열이면 정렬 없음
            </li>
            <li>
              <code>totalItems</code> <em>ComputedRef&lt;number&gt;</em> — 필터
              적용 후 총 건수
            </li>
            <li>
              <code>paginatedData</code> <em>ComputedRef&lt;T[]&gt;</em> — 현재
              페이지 데이터 슬라이스
            </li>
            <li><code>handlePageChange(page)</code> — 페이지 이동</li>
          </ul>
          <h5 style="margin-top: 12px">검색 type 옵션</h5>
          <ul>
            <li>
              <code>"all"</code> — 모든 필드 검색 (id, img, file, file_id 제외)
            </li>
            <li>
              <code>"fieldName"</code> — 해당 필드만 검색 (예:
              <code>"name"</code>, <code>"email"</code>)
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ==================== 2. 실전 패턴 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">실전 사용 패턴</h3>
      <div class="code-explanation">
        <h4>검색 바와 연동</h4>
        <pre><code>&lt;!-- 검색 타입 선택 + 키워드 입력 --&gt;
&lt;select v-model="searchParams.type"&gt;
  &lt;option value="all"&gt;전체&lt;/option&gt;
  &lt;option value="name"&gt;이름&lt;/option&gt;
&lt;/select&gt;
&lt;input v-model="searchParams.keyword" placeholder="검색어" /&gt;

&lt;!-- 총 건수 표시 --&gt;
&lt;span&gt;총 {{ totalItems }}건&lt;/span&gt;</code></pre>

        <h4>vuejs-paginate-next와 연동</h4>
        <pre><code>&lt;VuePaginate
  v-model="currentPage"
  :page-count="Math.ceil(totalItems / itemsPerPage)"
  :click-handler="handlePageChange"
  prev-text="이전"
  next-text="다음"
  container-class="pagination"
  page-class="page-item"
/&gt;</code></pre>

        <h4>정렬 컬럼 헤더 연동</h4>
        <pre><code>&lt;th @click="sortKey = 'name'"&gt;이름&lt;/th&gt;
&lt;th @click="sortKey = 'createdAt'"&gt;등록일&lt;/th&gt;
&lt;th @click="sortKey = ''"&gt;정렬 초기화&lt;/th&gt;

&lt;!-- 주의: usePagination의 sortKey는 오름차순 고정.
     오름차순/내림차순 토글이 필요하면 useTables를 사용하세요. --&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

// ── 샘플 데이터 ──────────────────────────────────────────────────
const allUsers = ref([
  { id: 1, name: "김철수", email: "kim@test.com", role: "학생" },
  { id: 2, name: "이영희", email: "lee@test.com", role: "강사" },
  { id: 3, name: "박민준", email: "park@test.com", role: "학생" },
  { id: 4, name: "최지우", email: "choi@test.com", role: "관리자" },
  { id: 5, name: "정하준", email: "jung@test.com", role: "학생" },
  { id: 6, name: "강서연", email: "kang@test.com", role: "강사" },
  { id: 7, name: "조현우", email: "jo@test.com", role: "학생" },
  { id: 8, name: "윤수아", email: "yoon@test.com", role: "학생" },
  { id: 9, name: "임도현", email: "lim@test.com", role: "강사" },
  { id: 10, name: "한지민", email: "han@test.com", role: "학생" },
  { id: 11, name: "오세훈", email: "oh@test.com", role: "학생" },
  { id: 12, name: "신예은", email: "shin@test.com", role: "학생" },
]);

// ── usePagination 인라인 구현 (데모용) ───────────────────────────
const ITEMS_PER_PAGE = 5;
const currentPage = ref(1);
const searchParams = ref({ type: "all", keyword: "" });
const sortKey = ref("");

const filteredData = computed(() => {
  let data = [...allUsers.value];
  const { type, keyword } = searchParams.value;
  const lk = keyword.toLowerCase().trim();
  const excludeKeys = ["id", "img", "file", "file_id"];

  if (lk) {
    data = data.filter((item: any) => {
      if (type === "all") {
        return Object.entries(item).some(
          ([k, v]) =>
            !excludeKeys.includes(k) && String(v).toLowerCase().includes(lk),
        );
      }
      return item[type]?.toLowerCase().includes(lk);
    });
  }
  if (sortKey.value) {
    data.sort((a: any, b: any) =>
      a[sortKey.value] > b[sortKey.value] ? 1 : -1,
    );
  }
  return data;
});

const totalItems = computed(() => filteredData.value.length);
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
  return filteredData.value.slice(start, start + ITEMS_PER_PAGE);
});
const handlePageChange = (page: number) => {
  currentPage.value = page;
};
watch(
  searchParams,
  () => {
    currentPage.value = 1;
  },
  { deep: true },
);

const totalPages = computed(() => Math.ceil(totalItems.value / ITEMS_PER_PAGE));
const pageNumbers = computed(() =>
  Array.from({ length: totalPages.value }, (_, i) => i + 1),
);
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

.demo-box {
  padding: $spacing-xl;
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  margin-bottom: $spacing-lg;
}
.demo-search-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: $spacing-md;
}
.demo-select {
  padding: 7px 10px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  background: white;
  color: $color-text-primary;
  cursor: pointer;
}
.demo-input {
  flex: 1;
  padding: 7px 12px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  color: $color-text-primary;
  &:focus {
    outline: none;
    border-color: $color-primary;
  }
}
.demo-count {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  white-space: nowrap;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: $spacing-md;
  thead tr {
    background: $color-bg-light;
  }
  th,
  td {
    padding: 10px 12px;
    border-bottom: 1px solid $color-border-light;
    font-size: $font-size-sm;
    text-align: left;
  }
  th {
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
  }
  td {
    color: $color-text-secondary;
  }
  .sortable {
    cursor: pointer;
    user-select: none;
    &:hover {
      color: $color-primary;
    }
  }
  .align-center {
    text-align: center;
  }
  .table-empty {
    text-align: center;
    color: $color-text-light;
    padding: $spacing-xl;
  }
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
}
.badge-primary {
  background: $color-primary;
  color: white;
}
.badge-gray {
  background: $color-bg-gray;
  color: $color-text-secondary;
}

.demo-pagination {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: $spacing-md;
}
.page-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  background: white;
  color: $color-text-primary;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.15s;
  &:hover:not(:disabled) {
    border-color: $color-primary;
    color: $color-primary;
  }
  &.active {
    background: $color-primary;
    border-color: $color-primary;
    color: white;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.code-explanation {
  background: $color-bg-light;
  border-radius: $radius-md;
  padding: $spacing-lg;
  border-left: 4px solid $color-primary;
  h4 {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin: $spacing-lg 0 $spacing-sm 0;
    &:first-child {
      margin-top: 0;
    }
  }
  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: $spacing-md;
    border-radius: $radius-sm;
    overflow-x: auto;
    margin: $spacing-sm 0;
    font-size: $font-size-sm;
    line-height: 1.6;
    code {
      font-family: "Consolas", monospace;
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
      }
      code {
        background: #e3f2fd;
        color: #1976d2;
        padding: 2px 7px;
        border-radius: $radius-sm;
        font-size: $font-size-xs;
        font-weight: $font-weight-semibold;
        font-family: monospace;
        margin-right: 4px;
      }
    }
  }
}
</style>
