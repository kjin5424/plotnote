<template>
  <div>
    <h2 class="section-title">useTables</h2>
    <p class="section-desc">
      테이블 정렬, 페이지네이션, 행 선택, 검색을 통합 관리하는 고급 훅입니다.
      <code>usePagination</code>보다 기능이 많으며, 컬럼 정의 기반의 정렬/필터를
      제공합니다.
    </p>

    <!-- ==================== Live Demo ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">Live Demo</h3>
      <p class="description">
        컬럼 헤더 클릭으로 정렬, 체크박스로 행 선택, 검색어 입력으로 필터링을
        테스트해보세요.
      </p>

      <div class="demo-box">
        <div class="demo-toolbar">
          <input
            v-model="searchTerm"
            class="demo-input"
            placeholder="검색어 입력 (이름, 이메일, 역할)"
            @input="setSearchTerm(searchTerm)"
          />
          <span class="demo-count"
            >{{ selectedRows.length }}개 선택 / 총
            {{ sortedData.length }}건</span
          >
          <button
            v-if="selectedRows.length"
            class="btn btn-sm btn-danger"
            @click="clearSelection"
          >
            선택 해제
          </button>
        </div>

        <table class="demo-table">
          <thead>
            <tr>
              <th class="align-center" style="width: 44px">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  :indeterminate="isSomeSelected"
                  @change="selectAll()"
                />
              </th>
              <th
                v-for="col in columns"
                :key="String(col.key)"
                :class="[
                  'col-header',
                  col.sortable && 'sortable',
                  sortKey === col.key && 'sort-active',
                ]"
                @click="col.sortable && handleSort(col.key)"
              >
                {{ col.label }}
                <span v-if="col.sortable" class="sort-icon">
                  {{
                    sortKey === col.key
                      ? sortDirection === "asc"
                        ? "▲"
                        : "▼"
                      : "⇅"
                  }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="displayedData.length === 0">
              <td :colspan="columns.length + 1" class="table-empty">
                검색 결과가 없습니다.
              </td>
            </tr>
            <tr
              v-for="user in displayedData"
              :key="user.id"
              :class="{ selected: isRowSelected(user) }"
              @click="selectRow(user)"
            >
              <td class="align-center">
                <input
                  type="checkbox"
                  :checked="isRowSelected(user)"
                  @click.stop="selectRow(user)"
                />
              </td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td class="align-center">
                <span class="badge" :class="roleBadge(user.role)">{{
                  user.role
                }}</span>
              </td>
              <td class="align-center">{{ user.score }}점</td>
            </tr>
          </tbody>
        </table>

        <div class="demo-pagination">
          <button
            class="page-btn"
            :disabled="currentPage === 1"
            @click="handlePageChange(currentPage - 1)"
          >
            ◀
          </button>
          <button
            v-for="p in totalPages"
            :key="p"
            class="page-btn"
            :class="{ active: p === currentPage }"
            @click="handlePageChange(p)"
          >
            {{ p }}
          </button>
          <button
            class="page-btn"
            :disabled="currentPage >= totalPages"
            @click="handlePageChange(currentPage + 1)"
          >
            ▶
          </button>
        </div>
      </div>

      <div class="code-explanation">
        <pre><code>import { useTable, type TableColumn } from '@/hooks/useTables';
import { ref } from 'vue';

interface User { id: number; name: string; email: string; role: string; score: number; }

const users = ref&lt;User[]&gt;([...]);

// 컬럼 정의
const columns: TableColumn&lt;User&gt;[] = [
  { key: 'name',  label: '이름',   sortable: true },
  { key: 'email', label: '이메일', sortable: true },
  { key: 'role',  label: '역할',   sortable: true,
    filterFn: (item, term) => item.role.includes(term) },  // 커스텀 필터
  { key: 'score', label: '점수',   sortable: true,
    sortFn: (a, b) => b.score - a.score },                 // 커스텀 정렬 (내림차순)
];

const {
  sortKey, sortDirection, currentPage, searchTerm,
  selectedRows, displayedData, sortedData, totalPages,
  isAllSelected, isSomeSelected,
  handleSort, handlePageChange,
  selectRow, selectAll, clearSelection,
  setSearchTerm, isRowSelected, reset,
} = useTable(users, columns, {
  itemsPerPage: 5,
  initialSortKey: 'name',
  initialSortDirection: 'asc',
  multiSelect: true,          // false면 단일 선택
});</code></pre>
        <div class="class-guide">
          <h5>TableColumn 옵션</h5>
          <ul>
            <li><code>key</code> <em>keyof T</em> — 데이터 필드명 (필수)</li>
            <li><code>label</code> <em>string</em> — 헤더 표시명 (필수)</li>
            <li><code>sortable</code> <em>boolean?</em> — 정렬 가능 여부</li>
            <li>
              <code>sortFn</code> <em>(a,b)=&gt;number?</em> — 커스텀 정렬 함수
            </li>
            <li>
              <code>filterFn</code> <em>(item, term)=&gt;boolean?</em> — 커스텀
              검색 필터
            </li>
          </ul>
          <h5 style="margin-top: 12px">usePagination과 차이점</h5>
          <ul>
            <li>컬럼 정의 기반 → 커스텀 sortFn / filterFn 지정 가능</li>
            <li>오름차순/내림차순 토글 지원 (<code>sortDirection</code>)</li>
            <li>행 선택 기능 내장 (단일/다중, 전체 선택)</li>
            <li>검색 시 정의된 컬럼만 검색 (불필요한 필드 노출 방지)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ==================== 선택 기능 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">행 선택 패턴</h3>
      <div class="code-explanation">
        <pre><code>&lt;!-- 전체 선택 체크박스 (indeterminate 상태 지원) --&gt;
&lt;input
  type="checkbox"
  :checked="isAllSelected"
  :indeterminate="isSomeSelected"
  @change="selectAll()"
/&gt;

&lt;!-- 행 선택 --&gt;
&lt;tr :class="{ selected: isRowSelected(item) }" @click="selectRow(item)"&gt;
  &lt;td&gt;&lt;input type="checkbox" :checked="isRowSelected(item)" @click.stop="selectRow(item)" /&gt;&lt;/td&gt;
&lt;/tr&gt;

&lt;!-- 선택된 항목 일괄 처리 --&gt;
&lt;button @click="handleBulkDelete"&gt;선택 삭제 ({{ selectedRows.length }}건)&lt;/button&gt;

const handleBulkDelete = async () => {
  const ids = selectedRows.value.map(row => row.id);
  await del('/api/users/bulk', { data: { ids } });
  clearSelection();
};</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  score: number;
}

const allUsers = ref<User[]>([
  { id: 1, name: "김철수", email: "kim@test.com", role: "학생", score: 88 },
  { id: 2, name: "이영희", email: "lee@test.com", role: "강사", score: 95 },
  { id: 3, name: "박민준", email: "park@test.com", role: "학생", score: 72 },
  { id: 4, name: "최지우", email: "choi@test.com", role: "관리자", score: 100 },
  { id: 5, name: "정하준", email: "jung@test.com", role: "학생", score: 61 },
  { id: 6, name: "강서연", email: "kang@test.com", role: "강사", score: 90 },
  { id: 7, name: "조현우", email: "jo@test.com", role: "학생", score: 55 },
  { id: 8, name: "윤수아", email: "yoon@test.com", role: "학생", score: 78 },
]);

const columns = [
  { key: "name" as keyof User, label: "이름", sortable: true },
  { key: "email" as keyof User, label: "이메일", sortable: true },
  { key: "role" as keyof User, label: "역할", sortable: true },
  { key: "score" as keyof User, label: "점수", sortable: true },
];

const ITEMS = 5;
const sortKey = ref<keyof User | "">("");
const sortDirection = ref<"asc" | "desc">("asc");
const currentPage = ref(1);
const searchTerm = ref("");
const selectedRows = ref<User[]>([]);

const filteredData = computed(() => {
  if (!searchTerm.value.trim()) return allUsers.value;
  const t = searchTerm.value.toLowerCase();
  return allUsers.value.filter((u) =>
    columns.some((c) => String(u[c.key]).toLowerCase().includes(t)),
  );
});

const sortedData = computed(() => {
  if (!sortKey.value) return filteredData.value;
  const sorted = [...filteredData.value];
  sorted.sort((a, b) => {
    const av = a[sortKey.value as keyof User],
      bv = b[sortKey.value as keyof User];
    if (av === bv) return 0;
    const cmp =
      typeof av === "number" && typeof bv === "number"
        ? av - bv
        : String(av).localeCompare(String(bv), "ko-KR");
    return sortDirection.value === "asc" ? cmp : -cmp;
  });
  return sorted;
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(sortedData.value.length / ITEMS)),
);
const displayedData = computed(() => {
  const s = (currentPage.value - 1) * ITEMS;
  return sortedData.value.slice(s, s + ITEMS);
});

const isAllSelected = computed(
  () =>
    displayedData.value.length > 0 &&
    displayedData.value.every((i) => selectedRows.value.includes(i)),
);
const isSomeSelected = computed(
  () =>
    selectedRows.value.length > 0 &&
    !isAllSelected.value &&
    displayedData.value.some((i) => selectedRows.value.includes(i)),
);
const isRowSelected = (item: User) => selectedRows.value.includes(item);

const handleSort = (key: keyof User) => {
  if (sortKey.value === key)
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  else {
    sortKey.value = key;
    sortDirection.value = "asc";
  }
  currentPage.value = 1;
};
const handlePageChange = (p: number) => {
  if (p >= 1 && p <= totalPages.value) currentPage.value = p;
};
const selectRow = (item: User) => {
  const i = selectedRows.value.indexOf(item);
  if (i === -1) selectedRows.value.push(item);
  else selectedRows.value.splice(i, 1);
};
const selectAll = () => {
  if (isAllSelected.value)
    selectedRows.value = selectedRows.value.filter(
      (r) => !displayedData.value.includes(r),
    );
  else
    displayedData.value.forEach((i) => {
      if (!selectedRows.value.includes(i)) selectedRows.value.push(i);
    });
};
const clearSelection = () => {
  selectedRows.value = [];
};
const setSearchTerm = (t: string) => {
  searchTerm.value = t;
  currentPage.value = 1;
};

const roleBadge = (role: string) =>
  role === "관리자"
    ? "badge-danger"
    : role === "강사"
      ? "badge-primary"
      : "badge-gray";
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
}
.demo-box {
  padding: $spacing-xl;
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  margin-bottom: $spacing-lg;
}
.demo-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: $spacing-md;
}
.demo-input {
  flex: 1;
  padding: 7px 12px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
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
.btn {
  padding: 6px 14px;
  border: none;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  cursor: pointer;
}
.btn-sm {
  padding: 4px 10px;
  font-size: $font-size-xs;
}
.btn-danger {
  background: $color-danger;
  color: white;
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
  tr.selected td {
    background: rgba($color-primary, 0.06);
  }
  .align-center {
    text-align: center;
  }
  .col-header {
    white-space: nowrap;
  }
  .sortable {
    cursor: pointer;
    user-select: none;
    &:hover {
      color: $color-primary;
    }
  }
  .sort-active {
    color: $color-primary;
  }
  .sort-icon {
    font-size: 10px;
    margin-left: 4px;
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
.badge-danger {
  background: $color-danger;
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
  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: $spacing-md;
    border-radius: $radius-sm;
    overflow-x: auto;
    margin: 0;
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
