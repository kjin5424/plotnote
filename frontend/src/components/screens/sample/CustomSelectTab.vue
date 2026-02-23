<template>
  <h2 class="section-title">Select Components Guide</h2>

  <!-- ========================================
         CustomSelect
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">1. CustomSelect</h3>

    <div class="example-box">
      <h4>2.1 Basic CustomSelect</h4>
      <div class="select-demo">
        <CustomSelect
          v-model="customSelect1"
          :options="programmingLanguages"
          placeholder="최애 프로그래밍 언어"
        />
      </div>

      <div class="result-display">
        <strong>선택된 값:</strong> {{ customSelect1 || "(없음)" }}
      </div>

      <div class="code-example">
        <pre><code>&lt;script setup&gt;
import CustomSelect from '@/components/CustomSelect.vue';

const selectedValue = ref('');
const options = [
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'C#', value: 'csharp' },
  { label: 'C/C++', value: 'cpp' },
];
&lt;/script&gt;

&lt;template&gt;
  &lt;CustomSelect
    v-model="selectedValue"
    :options="options"
    placeholder="최애 프로그래밍 언어"
  /&gt;
&lt;/template&gt;</code></pre>
      </div>

      <p class="note success">
        ✅ CustomSelect 특징:
        <br />• 드롭다운에 <code>border-radius: $radius-lg</code> 적용 <br />•
        옵션 hover 시 primary 색상 배경 <br />• 선택된 옵션 강조 (semibold +
        primary 배경) <br />• 키보드 네비게이션 (↑↓ 화살표, Enter, Esc) <br />•
        접근성 (a11y) 완벽 지원
      </p>
    </div>

    <div class="example-box">
      <h4>2.2 Multiple CustomSelects</h4>
      <div class="select-grid">
        <div class="select-item">
          <label class="form-label">개발 언어</label>
          <CustomSelect
            v-model="language"
            :options="programmingLanguages"
            placeholder="언어 선택"
          />
        </div>

        <div class="select-item">
          <label class="form-label">프레임워크</label>
          <CustomSelect
            v-model="framework"
            :options="frameworks"
            placeholder="프레임워크 선택"
          />
        </div>

        <div class="select-item">
          <label class="form-label">데이터베이스</label>
          <CustomSelect
            v-model="database"
            :options="databases"
            placeholder="DB 선택"
          />
        </div>
      </div>

      <div class="result-display" style="margin-top: 1rem">
        <strong>선택 결과:</strong>
        <br />언어: {{ getLabel(language, programmingLanguages) }}
        <br />프레임워크: {{ getLabel(framework, frameworks) }} <br />DB:
        {{ getLabel(database, databases) }}
      </div>

      <div class="code-example">
        <pre><code>&lt;div class="select-grid"&gt;
  &lt;div class="select-item"&gt;
    &lt;label&gt;개발 언어&lt;/label&gt;
    &lt;CustomSelect v-model="language" :options="languages" /&gt;
  &lt;/div&gt;
  
  &lt;div class="select-item"&gt;
    &lt;label&gt;프레임워크&lt;/label&gt;
    &lt;CustomSelect v-model="framework" :options="frameworks" /&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>2.3 Disabled State</h4>
      <div class="select-demo">
        <CustomSelect
          v-model="disabledSelect"
          :options="programmingLanguages"
          placeholder="비활성화된 select"
          :disabled="true"
        />
      </div>

      <div class="code-example">
        <pre><code>&lt;CustomSelect
  v-model="selectedValue"
  :options="options"
  :disabled="true"
/&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>2.4 Form Integration</h4>
      <div class="form-demo">
        <div class="form-group">
          <label class="form-label">이름</label>
          <input
            type="text"
            class="form-control"
            v-model="formData.name"
            placeholder="이름 입력"
          />
        </div>

        <div class="form-group">
          <label class="form-label">직무</label>
          <CustomSelect
            v-model="formData.role"
            :options="roles"
            placeholder="직무 선택"
          />
        </div>

        <div class="form-group">
          <label class="form-label">부서</label>
          <CustomSelect
            v-model="formData.department"
            :options="departments"
            placeholder="부서 선택"
          />
        </div>

        <button class="btn btn-primary" @click="submitForm">제출</button>
      </div>

      <div class="result-display" v-if="formSubmitted">
        <strong>제출된 데이터:</strong>
        <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
      </div>

      <div class="code-example">
        <pre><code>&lt;form @submit.prevent="handleSubmit"&gt;
  &lt;div class="form-group"&gt;
    &lt;label&gt;이름&lt;/label&gt;
    &lt;input type="text" v-model="formData.name" /&gt;
  &lt;/div&gt;

  &lt;div class="form-group"&gt;
    &lt;label&gt;직무&lt;/label&gt;
    &lt;CustomSelect v-model="formData.role" :options="roles" /&gt;
  &lt;/div&gt;

  &lt;button type="submit"&gt;제출&lt;/button&gt;
&lt;/form&gt;</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Keyboard Navigation
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">3. Keyboard Navigation (CustomSelect)</h3>
    <p class="subsection-description">
      CustomSelect는 완전한 키보드 네비게이션을 지원합니다.
    </p>

    <div class="example-box">
      <h4>키보드 단축키</h4>
      <div class="keyboard-guide">
        <div class="key-item">
          <kbd>Tab</kbd>
          <span>포커스 이동</span>
        </div>
        <div class="key-item">
          <kbd>Enter</kbd> / <kbd>Space</kbd>
          <span>드롭다운 열기/닫기</span>
        </div>
        <div class="key-item">
          <kbd>↑</kbd> / <kbd>↓</kbd>
          <span>옵션 탐색</span>
        </div>
        <div class="key-item">
          <kbd>Enter</kbd>
          <span>옵션 선택</span>
        </div>
        <div class="key-item">
          <kbd>Esc</kbd>
          <span>드롭다운 닫기</span>
        </div>
      </div>

      <div class="select-demo" style="margin-top: 1.5rem">
        <p><strong>직접 테스트해보세요:</strong></p>
        <CustomSelect
          v-model="keyboardTest"
          :options="programmingLanguages"
          placeholder="Tab으로 포커스 후 Enter/Space를 눌러보세요"
        />
      </div>

      <p class="note">
        💡 CustomSelect는 WCAG 2.1 접근성 가이드라인을 준수합니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         스타일 비교
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">4. 스타일 비교: Native vs Custom</h3>

    <div class="example-box">
      <div class="comparison-grid">
        <div class="comparison-item">
          <h5>❌ Native Select</h5>
          <select class="native-select" v-model="compareNative">
            <option value="">선택하세요</option>
            <option value="1">옵션 1</option>
            <option value="2">옵션 2</option>
            <option value="3">옵션 3</option>
          </select>
          <div class="comparison-note">
            ✗ 드롭다운 스타일링 불가<br />
            ✗ 옵션 hover 커스텀 불가<br />
            ✗ 브라우저마다 다른 렌더링
          </div>
        </div>

        <div class="comparison-item">
          <h5>✅ CustomSelect</h5>
          <CustomSelect
            v-model="compareCustom"
            :options="[
              { label: '옵션 1', value: '1' },
              { label: '옵션 2', value: '2' },
              { label: '옵션 3', value: '3' },
            ]"
            placeholder="선택하세요"
          />
          <div class="comparison-note success">
            ✓ 완전한 스타일링 가능<br />
            ✓ 옵션 hover 커스텀<br />
            ✓ 일관된 렌더링
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================
         Best Practices
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">5. Best Practices</h3>

    <div class="example-box">
      <h4>✅ 권장사항</h4>
      <ul class="best-practices-list">
        <li>
          <strong>디자인 커스터마이징이 필요한 경우</strong>
          <br />→ <code>CustomSelect</code> 사용 (드롭다운 border-radius, hover
          효과 등)
        </li>
        <li>
          <strong>단순한 폼에서 빠른 구현이 필요한 경우</strong>
          <br />→ 네이티브 <code>&lt;select&gt;</code> 사용 (입력 필드
          스타일만으로 충분)
        </li>
        <li>
          <strong>접근성이 중요한 경우</strong>
          <br />→ <code>CustomSelect</code> 사용 (키보드 네비게이션, ARIA 속성
          포함)
        </li>
        <li>
          <strong>모바일 환경</strong>
          <br />→ 네이티브 <code>&lt;select&gt;</code> 권장 (모바일 OS의 기본
          picker UI 사용)
        </li>
      </ul>
    </div>

    <div class="example-box">
      <h4>❌ 피해야 할 패턴</h4>
      <ul class="bad-practices-list">
        <li>
          <strong>네이티브 select 옵션에 CSS 적용 시도</strong>
          <br />→ 작동하지 않으며 브라우저마다 다르게 렌더링됩니다.
        </li>
        <li>
          <strong>중요한 선택 필드에 placeholder 미제공</strong>
          <br />→ 항상 명확한 placeholder나 label을 제공하세요.
        </li>
        <li>
          <strong>disabled 상태 시각적 표시 부족</strong>
          <br />→ opacity, cursor 등으로 명확히 표시해야 합니다.
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CustomSelect from "@/features/common/CustomSelect.vue";

// Native selects
const nativeSelect1 = ref("");

// CustomSelect options
const programmingLanguages = [
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "JavaScript", value: "javascript" },
  { label: "C#", value: "csharp" },
  { label: "C/C++", value: "cpp" },
];

const frameworks = [
  { label: "Vue.js", value: "vue" },
  { label: "React", value: "react" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
];

const databases = [
  { label: "MySQL", value: "mysql" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "MongoDB", value: "mongodb" },
  { label: "Redis", value: "redis" },
];

const roles = [
  { label: "프론트엔드 개발자", value: "frontend" },
  { label: "백엔드 개발자", value: "backend" },
  { label: "풀스택 개발자", value: "fullstack" },
  { label: "DevOps 엔지니어", value: "devops" },
];

const departments = [
  { label: "개발팀", value: "dev" },
  { label: "디자인팀", value: "design" },
  { label: "기획팀", value: "planning" },
  { label: "마케팅팀", value: "marketing" },
];

// CustomSelect values
const customSelect1 = ref("");
const language = ref("");
const framework = ref("");
const database = ref("");
const disabledSelect = ref("java");
const keyboardTest = ref("");
const compareNative = ref("");
const compareCustom = ref("");

// Form
const formData = ref({
  name: "",
  role: "",
  department: "",
});
const formSubmitted = ref(false);

const submitForm = () => {
  if (
    !formData.value.name ||
    !formData.value.role ||
    !formData.value.department
  ) {
    alert("모든 필드를 입력해주세요.");
    return;
  }
  formSubmitted.value = true;
  setTimeout(() => {
    formSubmitted.value = false;
  }, 5000);
};

// Helper
const getLabel = (value: string, options: any[]) => {
  if (!value) return "(선택 안됨)";
  const found = options.find((opt) => opt.value === value);
  return found ? found.label : value;
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

.example-box h5 {
  font-size: $font-size-md;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-sm;
}

// Info box
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
}

.info-content {
  display: grid;
  gap: $spacing-md;
}

.info-item {
  background: $color-bg-white;
  padding: $spacing-md;
  border-radius: $radius-md;
  border-left: 4px solid $color-gray-400;

  &.success {
    border-left-color: $color-success;
    background: rgba($color-success, 0.05);
  }

  strong {
    display: block;
    margin-bottom: $spacing-xs;
    color: $color-text-primary;
    font-size: $font-size-md;
  }

  p {
    margin: 0;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    line-height: 1.6;
  }
}

// Select demos
.select-demo {
  margin-bottom: $spacing-md;
}

.native-select {
  width: 100%;
  max-width: 400px;
}

.select-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: $spacing-md;
}

.select-item {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.result-display {
  background: $color-bg-light;
  padding: $spacing-md;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  margin-top: $spacing-md;

  pre {
    margin-top: $spacing-sm;
    background: $color-bg-white;
    padding: $spacing-sm;
    border-radius: $radius-sm;
    overflow-x: auto;
    font-size: $font-size-xs;
  }
}

// Form demo
.form-demo {
  max-width: 400px;
}

.form-group {
  margin-bottom: $spacing-lg;
}

.form-label {
  display: block;
  margin-bottom: $spacing-xs;
  font-weight: $font-weight-medium;
  color: $color-text-primary;
  font-size: $font-size-sm;
}

.form-control {
  width: 100%;
  padding: $spacing-xs $spacing-md;
  border: $border-width solid $color-border;
  border-radius: $radius-lg;
  font-size: $font-size-sm;
  transition: all $transition-base;

  &:focus {
    outline: none;
    border-color: $color-primary;
    box-shadow: 0 0 0 3px rgba($color-primary, 0.15);
  }

  &:hover:not(:disabled) {
    border-color: $color-primary;
    background-color: rgba($color-primary, 0.04);
  }
}

// Keyboard guide
.keyboard-guide {
  display: grid;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.key-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-sm $spacing-md;
  background: $color-bg-light;
  border-radius: $radius-sm;

  kbd {
    display: inline-block;
    padding: 2px 8px;
    background: $color-gray-600;
    color: $color-text-white;
    border-radius: $radius-sm;
    font-family: monospace;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    min-width: 60px;
    text-align: center;
  }

  span {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }
}

// Comparison
.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: $spacing-xl;
}

.comparison-item {
  padding: $spacing-md;
  border: 2px solid $color-border-light;
  border-radius: $radius-md;
  background: $color-bg-light;

  h5 {
    margin-bottom: $spacing-md;
  }
}

.comparison-note {
  margin-top: $spacing-md;
  padding: $spacing-sm;
  background: rgba($color-danger, 0.1);
  border-left: 3px solid $color-danger;
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  line-height: 1.6;
  color: $color-text-secondary;

  &.success {
    background: rgba($color-success, 0.1);
    border-left-color: $color-success;
  }
}

// Best practices
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

// Code example
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

// Note
.note {
  background: #e3f2fd;
  border-left: 4px solid $color-primary;
  padding: $spacing-sm $spacing-md;
  margin-top: $spacing-md;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  color: #1976d2;

  &.warning {
    background: #fff3cd;
    border-left-color: #ffc107;
    color: #856404;
  }

  &.success {
    background: #d4edda;
    border-left-color: $color-success;
    color: #155724;
  }
}

@media (max-width: $breakpoint-md) {
  .select-grid,
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>
