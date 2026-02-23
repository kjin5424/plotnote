<template>
  <h2 class="section-title">SearchBar & SelectBar Component Guide</h2>

  <!-- ========================================
         Overview
         ======================================== -->
  <section class="button-section">
    <div class="info-box">
      <h3>📦 컴포넌트 구조</h3>
      <p>
        <strong>SearchBar</strong>는 검색 입력과 버튼을 포함하는 통합
        컴포넌트입니다. <strong>SelectBar</strong>는 검색 조건을 선택하는
        드롭다운으로, SearchBar 내부에서 옵션으로 사용됩니다.
      </p>
      <div class="component-structure">
        <div class="structure-box">
          <strong>SearchBar</strong> (부모)
          <ul>
            <li>SelectBar (선택적)</li>
            <li>Search Input</li>
            <li>Search Button</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================
         Basic Usage - SearchBar Only
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">1. Basic SearchBar (SelectBar 없이)</h3>
    <p class="subsection-description">
      가장 간단한 형태의 검색바입니다. SelectBar 옵션을 제공하지 않으면 입력창과
      버튼만 표시됩니다.
    </p>

    <div class="example-box">
      <h4>Simple Search</h4>
      <div class="search-demo">
        <SearchBar
          v-model:search-value="simpleSearch"
          placeholder="검색어를 입력하세요"
          button-text="검색"
          @search="handleSimpleSearch"
        />
      </div>

      <div class="result-display" v-if="simpleResult">
        <strong>검색 결과:</strong> {{ simpleResult }}
      </div>

      <div class="code-example">
        <pre><code>&lt;template&gt;
  &lt;SearchBar
    v-model:search-value="searchValue"
    placeholder="검색어를 입력하세요"
    button-text="검색"
    @search="handleSearch"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
const searchValue = ref('');

const handleSearch = ({ searchValue }) => {
  console.log('검색:', searchValue);
  // API 호출 또는 필터링 로직
};
&lt;/script&gt;</code></pre>
      </div>

      <p class="note">
        💡 <code>@search</code> 이벤트는
        <code>{ searchValue, searchType }</code>
        객체를 반환합니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         SearchBar with SelectBar
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">2. SearchBar with SelectBar</h3>
    <p class="subsection-description">
      SelectBar를 포함한 검색바입니다. 검색 조건을 선택할 수 있습니다.
    </p>

    <div class="example-box">
      <h4>Search with Type Selection</h4>
      <div class="search-demo">
        <SearchBar
          v-model:search-value="withSelectSearch"
          v-model:select-value="withSelectType"
          :select-options="searchOptions"
          placeholder="검색어를 입력하세요"
          @search="handleWithSelectSearch"
        />
      </div>

      <div class="result-display" v-if="withSelectResult">
        <strong>검색 결과:</strong><br />
        유형: {{ withSelectResult.type }}<br />
        검색어: {{ withSelectResult.value }}
      </div>

      <div class="code-example">
        <pre><code>&lt;script setup&gt;
const searchValue = ref('');
const searchType = ref('all');

const searchOptions = {
  defaultOption: { value: 'all', label: '전체' },
  options: [
    { value: 'title', label: '제목' },
    { value: 'content', label: '내용' },
    { value: 'author', label: '작성자' },
  ],
};

const handleSearch = ({ searchValue, searchType }) => {
  console.log('검색 유형:', searchType);
  console.log('검색어:', searchValue);
};
&lt;/script&gt;

&lt;template&gt;
  &lt;SearchBar
    v-model:search-value="searchValue"
    v-model:select-value="searchType"
    :select-options="searchOptions"
    @search="handleSearch"
  /&gt;
&lt;/template&gt;</code></pre>
      </div>

      <p class="note">
        💡 <code>select-options</code>를 제공하면 자동으로 SelectBar가
        표시됩니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         SelectBar Options
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">3. SelectBar Options</h3>
    <p class="subsection-description">
      SelectBar의 옵션 구조와 사용 예시입니다.
    </p>

    <div class="example-box">
      <h4>Option Structure</h4>

      <div class="code-example">
        <pre><code>const selectOptions = {
  // 기본 선택 옵션 (선택적)
  defaultOption: {
    value: 'all',
    label: '전체',
  },
  
  // 선택 가능한 옵션 목록
  options: [
    { value: 'title', label: '제목' },
    { value: 'content', label: '내용' },
    { value: 'author', label: '작성자' },
  ],
};</code></pre>
      </div>

      <p class="note">
        💡 <code>defaultOption</code>은 옵션 목록 맨 위에 표시됩니다.
      </p>
    </div>

    <div class="example-box">
      <h4>Various Use Cases</h4>

      <div class="use-cases-grid">
        <div class="use-case">
          <h5>게시판 검색</h5>
          <SearchBar
            v-model:search-value="boardSearch"
            v-model:select-value="boardType"
            :select-options="boardOptions"
            placeholder="게시글 검색"
          />
        </div>

        <div class="use-case">
          <h5>사용자 검색</h5>
          <SearchBar
            v-model:search-value="userSearch"
            v-model:select-value="userType"
            :select-options="userOptions"
            placeholder="사용자 검색"
          />
        </div>

        <div class="use-case">
          <h5>상품 검색</h5>
          <SearchBar
            v-model:search-value="productSearch"
            v-model:select-value="productType"
            :select-options="productOptions"
            placeholder="상품명 또는 카테고리"
          />
        </div>
      </div>

      <div class="code-example">
        <pre><code>// 게시판 검색 옵션
const boardOptions = {
  defaultOption: { value: 'all', label: '전체' },
  options: [
    { value: 'title', label: '제목' },
    { value: 'content', label: '내용' },
    { value: 'author', label: '작성자' },
  ],
};

// 사용자 검색 옵션
const userOptions = {
  defaultOption: { value: 'all', label: '전체' },
  options: [
    { value: 'name', label: '이름' },
    { value: 'email', label: '이메일' },
    { value: 'phone', label: '전화번호' },
  ],
};

// 상품 검색 옵션
const productOptions = {
  defaultOption: { value: 'all', label: '전체' },
  options: [
    { value: 'name', label: '상품명' },
    { value: 'category', label: '카테고리' },
    { value: 'brand', label: '브랜드' },
  ],
};</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Props & Events
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">4. Props & Events</h3>

    <div class="example-box">
      <h4>Props</h4>

      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>searchValue</code></td>
              <td>String</td>
              <td>""</td>
              <td>검색어 (v-model)</td>
            </tr>
            <tr>
              <td><code>selectValue</code></td>
              <td>String</td>
              <td>""</td>
              <td>선택된 검색 유형 (v-model)</td>
            </tr>
            <tr>
              <td><code>selectOptions</code></td>
              <td>Object</td>
              <td>null</td>
              <td>SelectBar 옵션 (제공 시 SelectBar 표시)</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td>String</td>
              <td>"검색어를 입력하세요"</td>
              <td>입력창 placeholder</td>
            </tr>
            <tr>
              <td><code>buttonText</code></td>
              <td>String</td>
              <td>"검색"</td>
              <td>검색 버튼 텍스트</td>
            </tr>
            <tr>
              <td><code>resetOnLeave</code></td>
              <td>Boolean</td>
              <td>true</td>
              <td>컴포넌트 unmount 시 검색 상태 리셋</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="example-box">
      <h4>Events</h4>

      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Payload</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>@search</code></td>
              <td><code>{ searchValue, searchType }</code></td>
              <td>검색 버튼 클릭 또는 Enter 키 입력 시 발생</td>
            </tr>
            <tr>
              <td><code>@update:searchValue</code></td>
              <td><code>string</code></td>
              <td>검색어가 변경될 때 발생</td>
            </tr>
            <tr>
              <td><code>@update:selectValue</code></td>
              <td><code>string</code></td>
              <td>검색 유형이 변경될 때 발생</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-example">
        <pre><code>&lt;SearchBar
  v-model:search-value="search"
  v-model:select-value="type"
  :select-options="options"
  placeholder="검색"
  button-text="찾기"
  :reset-on-leave="false"
  @search="handleSearch"
/&gt;</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         SearchStore Integration
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">5. SearchStore Integration</h3>
    <p class="subsection-description">
      SearchBar는 <code>searchStore</code>와 자동으로 연동되어 검색 상태를
      관리합니다.
    </p>

    <div class="example-box">
      <h4>Automatic State Management</h4>

      <div class="code-example">
        <pre><code>// searchStore.ts
export const useSearchStore = defineStore('search', {
  state: () => ({
    searchValue: '',
    searchType: '',
  }),
  
  actions: {
    setSearchState(value: string, type: string) {
      this.searchValue = value;
      this.searchType = type;
    },
    
    reset() {
      this.searchValue = '';
      this.searchType = '';
    },
  },
});

// SearchBar 내부에서 자동으로 처리
const handleSearch = () => {
  const value = localSearch.value.trim();
  
  if (!value) {
    modal.warning('검색어를 입력해주세요');
    return;
  }
  
  // 자동으로 searchStore에 저장
  searchStore.setSearchState(value, localSelect.value);
  emit('search', { searchValue: value, searchType: localSelect.value });
};</code></pre>
      </div>

      <p class="note">
        💡 SearchBar는 검색 상태를 자동으로 <code>searchStore</code>에
        저장하므로, 페이지를 벗어났다가 돌아와도 검색 조건이 유지됩니다.
      </p>
    </div>

    <div class="example-box">
      <h4>Reset on Leave</h4>

      <div class="code-example">
        <pre><code>&lt;!-- 페이지 이동 시 검색 상태 유지 --&gt;
&lt;SearchBar
  :reset-on-leave="false"
/&gt;

&lt;!-- 페이지 이동 시 검색 상태 리셋 (기본값) --&gt;
&lt;SearchBar
  :reset-on-leave="true"
/&gt;</code></pre>
      </div>

      <p class="note">
        💡 <code>:reset-on-leave="false"</code>로 설정하면 컴포넌트가 unmount될
        때 검색 상태가 유지됩니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Validation
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">6. Built-in Validation</h3>
    <p class="subsection-description">
      SearchBar는 기본적으로 빈 검색어를 검증합니다.
    </p>

    <div class="example-box">
      <h4>Empty Search Validation</h4>

      <div class="search-demo">
        <SearchBar
          v-model:search-value="validationSearch"
          placeholder="빈 검색어로 검색해보세요"
          @search="handleValidationSearch"
        />
      </div>

      <div class="code-example">
        <pre><code>// SearchBar.vue 내부
const handleSearch = () => {
  const value = localSearch.value.trim();
  
  if (!value) {
    const modal = useModalStore();
    modal.warning('검색어를 입력해주세요');
    return;
  }
  
  // 검색 실행
  emit('search', { searchValue: value, searchType: localSelect.value });
};</code></pre>
      </div>

      <p class="note warning">
        ⚠️ 빈 검색어로 검색 시 <code>modalStore.warning()</code>을 통해 경고
        메시지가 표시됩니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Styling & Width
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">7. Styling & Width</h3>
    <p class="subsection-description">
      SearchBar의 기본 너비는 <strong>40%</strong>입니다. 필요에 따라 CSS로
      조정할 수 있습니다.
    </p>

    <div class="example-box">
      <h4>Default Width (40%)</h4>
      <div class="search-demo">
        <SearchBar
          v-model:search-value="defaultWidth"
          placeholder="기본 너비 (40%)"
        />
      </div>
    </div>

    <div class="example-box">
      <h4>Custom Width</h4>
      <div class="search-demo">
        <SearchBar
          v-model:search-value="customWidth1"
          placeholder="전체 너비 (100%)"
          style="width: 100%"
        />
      </div>

      <div class="search-demo" style="margin-top: 1rem">
        <SearchBar
          v-model:search-value="customWidth2"
          placeholder="고정 너비 (600px)"
          style="width: 600px"
        />
      </div>

      <div class="code-example">
        <pre><code>&lt;!-- 전체 너비 --&gt;
&lt;SearchBar style="width: 100%" /&gt;

&lt;!-- 고정 너비 --&gt;
&lt;SearchBar style="width: 600px" /&gt;

&lt;!-- 최대 너비 --&gt;
&lt;SearchBar style="max-width: 800px" /&gt;</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Complete Example
         ======================================== -->
  <
  <section class="button-section">
    <h3 class="subsection-title">8. Complete Integration Example</h3>

    <div class="example-box">
      <div class="code-example">
        <pre v-pre><code>&lt;template&gt;
  &lt;div class="page-container"&gt;
    &lt;PageHeader title="게시글 목록" /&gt;

    &lt;div class="content-body"&gt;
      &lt;SearchBar
        v-model:search-value="searchQuery"
        v-model:select-value="searchType"
        :select-options="searchOptions"
        placeholder="검색어를 입력하세요"
        button-text="검색"
        @search="handleSearch"
      /&gt;

      &lt;div class="search-result" v-if="searchQuery"&gt;
        "{{ searchQuery }}" 검색 결과 ({{ searchType }})
      &lt;/div&gt;

      &lt;table class="data-table"&gt;
        &lt;thead&gt;
          &lt;tr&gt;
            &lt;th&gt;번호&lt;/th&gt;
            &lt;th&gt;제목&lt;/th&gt;
            &lt;th&gt;작성자&lt;/th&gt;
            &lt;th&gt;작성일&lt;/th&gt;
          &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;
          &lt;tr v-for="post in filteredPosts" :key="post.id"&gt;
            &lt;td&gt;{{ post.id }}&lt;/td&gt;
            &lt;td&gt;{{ post.title }}&lt;/td&gt;
            &lt;td&gt;{{ post.author }}&lt;/td&gt;
            &lt;td&gt;{{ post.createdAt }}&lt;/td&gt;
          &lt;/tr&gt;
        &lt;/tbody&gt;
      &lt;/table&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, computed } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import Pagination from '@/components/Pagination.vue';

const searchQuery = ref('');
const searchType = ref('all');
const posts = ref([]);

const searchOptions = {
  defaultOption: { value: 'all', label: '전체' },
  options: [
    { value: 'title', label: '제목' },
    { value: 'content', label: '내용' },
    { value: 'author', label: '작성자' },
  ],
};

const handleSearch = async ({ searchValue, searchType }) => {
  console.log('검색:', searchValue, searchType);
  
  // API 호출
  const response = await fetch(\`/api/posts?q=\${searchValue}&type=\${searchType}\`);
  posts.value = await response.json();
};

const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts.value;
  
  return posts.value.filter(post => {
    if (searchType.value === 'title') {
      return post.title.includes(searchQuery.value);
    } else if (searchType.value === 'content') {
      return post.content.includes(searchQuery.value);
    } else if (searchType.value === 'author') {
      return post.author.includes(searchQuery.value);
    }
    return true;  // 'all'
  });
});

const totalItems = computed(() => filteredPosts.value.length);
&lt;/script&gt;</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Best Practices
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">9. Best Practices</h3>

    <div class="example-box">
      <h4>✅ 권장사항</h4>
      <ul class="best-practices-list">
        <li>
          <strong>명확한 placeholder</strong>
          <br />사용자가 무엇을 검색할 수 있는지 명확히 표시
        </li>
        <li>
          <strong>적절한 검색 유형 제공</strong>
          <br />너무 많은 옵션(5개 이상)은 피하고 핵심만 제공
        </li>
        <li>
          <strong>검색 결과 표시</strong>
          <br />검색 후 "XX 검색 결과" 같은 피드백 제공
        </li>
        <li>
          <strong>Enter 키 지원</strong>
          <br />이미 내장되어 있으므로 별도 구현 불필요
        </li>
      </ul>
    </div>

    <div class="example-box">
      <h4>❌ 피해야 할 패턴</h4>
      <ul class="bad-practices-list">
        <li>
          <strong>빈 검색 허용</strong>
          <br />→ 이미 내장 검증이 있으므로 추가 검증 불필요
        </li>
        <li>
          <strong>너무 많은 검색 옵션</strong>
          <br />→ 5개 이상의 옵션은 사용자를 혼란스럽게 함
        </li>
        <li>
          <strong>검색 후 피드백 없음</strong>
          <br />→ 검색 결과나 "검색 중..." 표시 필수
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SearchBar from "../SearchBar.vue";

// Simple search
const simpleSearch = ref("");
const simpleResult = ref("");

const handleSimpleSearch = ({ searchValue }: any) => {
  simpleResult.value = searchValue;
};

// With select
const withSelectSearch = ref("");
const withSelectType = ref("all");
const withSelectResult = ref<any>(null);

const searchOptions = {
  defaultOption: { value: "all", label: "전체" },
  options: [
    { value: "title", label: "제목" },
    { value: "content", label: "내용" },
    { value: "author", label: "작성자" },
  ],
};

const handleWithSelectSearch = ({ searchValue, searchType }: any) => {
  withSelectResult.value = {
    type: searchType,
    value: searchValue,
  };
};

// Board search
const boardSearch = ref("");
const boardType = ref("all");
const boardOptions = {
  defaultOption: { value: "all", label: "전체" },
  options: [
    { value: "title", label: "제목" },
    { value: "content", label: "내용" },
    { value: "author", label: "작성자" },
  ],
};

// User search
const userSearch = ref("");
const userType = ref("all");
const userOptions = {
  defaultOption: { value: "all", label: "전체" },
  options: [
    { value: "name", label: "이름" },
    { value: "email", label: "이메일" },
    { value: "phone", label: "전화번호" },
  ],
};

// Product search
const productSearch = ref("");
const productType = ref("all");
const productOptions = {
  defaultOption: { value: "all", label: "전체" },
  options: [
    { value: "name", label: "상품명" },
    { value: "category", label: "카테고리" },
    { value: "brand", label: "브랜드" },
  ],
};

// Validation
const validationSearch = ref("");
const handleValidationSearch = () => {};

// Width
const defaultWidth = ref("");
const customWidth1 = ref("");
const customWidth2 = ref("");
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

.info-box {
  background: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: $radius-lg;
  padding: $spacing-xl;
  margin-bottom: $spacing-lg;

  h3 {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: #856404;
    margin-bottom: $spacing-md;
  }

  p {
    font-size: $font-size-sm;
    color: #856404;
    line-height: 1.6;
    margin-bottom: $spacing-md;
  }
}

.component-structure {
  margin-top: $spacing-md;
}

.structure-box {
  background: $color-bg-white;
  padding: $spacing-md;
  border-radius: $radius-md;
  border-left: 4px solid $color-primary;

  strong {
    display: block;
    margin-bottom: $spacing-sm;
    font-size: $font-size-md;
    color: $color-primary;
  }

  ul {
    list-style: none;
    padding-left: $spacing-md;

    li {
      font-size: $font-size-sm;
      color: $color-text-secondary;
      padding: $spacing-xs 0;

      &:before {
        content: "└─ ";
        color: $color-text-light;
      }
    }
  }
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

.example-box h5 {
  font-size: $font-size-md;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-sm;
}

.search-demo {
  margin-bottom: $spacing-md;
}

.result-display {
  background: $color-bg-light;
  padding: $spacing-md;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  margin-top: $spacing-md;
  line-height: 1.6;
}

.use-cases-grid {
  display: grid;
  gap: $spacing-lg;
}

.use-case {
  background: $color-bg-light;
  padding: $spacing-md;
  border-radius: $radius-sm;

  h5 {
    margin-bottom: $spacing-sm;
  }
}

.props-table {
  overflow-x: auto;
  margin-top: $spacing-md;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: $font-size-sm;

    th,
    td {
      padding: $spacing-sm;
      text-align: left;
      border-bottom: 1px solid $color-border-light;
    }

    th {
      background: $color-bg-light;
      font-weight: $font-weight-semibold;
      color: $color-text-primary;
    }

    td {
      color: $color-text-secondary;
    }

    code {
      background: rgba($color-primary, 0.1);
      padding: 2px 6px;
      border-radius: $radius-sm;
      font-size: $font-size-xs;
      color: $color-primary-dark;
    }
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
  .use-cases-grid {
    grid-template-columns: 1fr;
  }
}
</style>
