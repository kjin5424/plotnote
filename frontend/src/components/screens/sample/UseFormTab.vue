<template>
  <div>
    <h2 class="section-title">useForm</h2>
    <p class="section-desc">
      Vee-Validate + Yup 기반의 폼 상태 관리 훅입니다. 검증 → API 호출 →
      성공/실패 처리까지의 플로우를 통합 제공하며, 템플릿에서는
      <code>v-model</code>과 에러 표시만 연결하면 됩니다.
    </p>

    <!-- ==================== 1. 기본 폼 데모 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">Live Demo — 기본 폼 검증</h3>

      <div class="demo-box">
        <form class="demo-form" @submit.prevent="handleDemo">
          <div class="form-row">
            <div class="form-field">
              <label class="field-label"
                >이메일 <span class="required">*</span></label
              >
              <input
                v-model="email"
                type="email"
                class="field-input"
                :class="{ error: emailError }"
                placeholder="hong@example.com"
                @blur="touchEmail"
              />
              <p v-if="emailError" class="field-error">{{ emailError }}</p>
            </div>
            <div class="form-field">
              <label class="field-label"
                >이름 <span class="required">*</span></label
              >
              <input
                v-model="name"
                type="text"
                class="field-input"
                :class="{ error: nameError }"
                placeholder="홍길동"
                @blur="touchName"
              />
              <p v-if="nameError" class="field-error">{{ nameError }}</p>
            </div>
          </div>
          <div class="form-field">
            <label class="field-label"
              >비밀번호 <span class="required">*</span></label
            >
            <input
              v-model="password"
              type="password"
              class="field-input"
              :class="{ error: passwordError }"
              placeholder="8자 이상"
              @blur="touchPassword"
            />
            <p v-if="passwordError" class="field-error">{{ passwordError }}</p>
          </div>

          <div v-if="serverError" class="server-error">
            ⚠️ {{ serverError }}
          </div>
          <div v-if="isSuccess" class="success-msg">✅ 제출 성공!</div>

          <div class="form-actions">
            <button type="button" class="btn btn-outline" @click="resetDemo">
              초기화
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? "처리 중..." : "제출" }}
            </button>
          </div>
        </form>
      </div>

      <div class="code-explanation">
        <h4>기본 사용법</h4>
        <pre v-pre><code>import { useForm } from '@/hooks/useForm';
import * as yup from 'yup';

// 1. Yup 스키마 정의
const schema = yup.object({
  email:    yup.string().email('이메일 형식이 아닙니다').required('필수 항목입니다'),
  name:     yup.string().min(2, '2자 이상 입력하세요').required('필수 항목입니다'),
  password: yup.string().min(8, '8자 이상 입력하세요').required('필수 항목입니다'),
});

// 2. 훅 초기화
const {
  values, errors,
  isSubmitting, isSuccess, isFailed, serverError,
  handleSubmit, resetForm,
} = useForm({
  initialValues: { email: '', name: '', password: '' },
  validationSchema: schema,
  onSubmit: async (values) => {
    await post('/api/users', values);   // 자동으로 try-catch 래핑됨
  },
  onSuccess: (values, response) => {
    router.push('/dashboard');
  },
  resetAfterSubmit: false,
});

// 3. 템플릿 연결
&lt;input v-model="values.email" /&gt;
&lt;span class="error"&gt;{{ errors.email }}&lt;/span&gt;
&lt;button @click="handleSubmit" :disabled="isSubmitting"&gt;제출&lt;/button&gt;</code></pre>
      </div>
    </section>

    <!-- ==================== 2. 반환값 레퍼런스 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">반환값 레퍼런스</h3>
      <div class="code-explanation">
        <div class="class-guide" style="margin-top: 0">
          <h5>상태 (State)</h5>
          <ul>
            <li><code>values</code> — 폼 필드 값 객체 (v-model로 바인딩)</li>
            <li>
              <code>errors</code> — 필드별 에러 메시지 객체
              <em>{ email: '...' }</em>
            </li>
            <li>
              <code>meta</code> — 폼 메타 정보 <em>(valid, dirty, touched)</em>
            </li>
            <li>
              <code>isSubmitting</code> <em>Ref&lt;boolean&gt;</em> — API 호출
              중 여부
            </li>
            <li>
              <code>isSuccess</code> <em>Ref&lt;boolean&gt;</em> — 마지막 제출
              성공 여부
            </li>
            <li>
              <code>isFailed</code> <em>Ref&lt;boolean&gt;</em> — 마지막 제출
              실패 여부
            </li>
            <li>
              <code>serverError</code> <em>Ref&lt;string&gt;</em> — 서버 에러
              메시지
            </li>
            <li><code>isValid</code> — 현재 폼 유효성 여부</li>
            <li><code>isDirty</code> — 초기값에서 변경됐는지 여부</li>
          </ul>
          <h5 style="margin-top: 12px">메서드 (Methods)</h5>
          <ul>
            <li>
              <code>handleSubmit()</code> — 검증 → onSubmit → 성공/실패 처리
              순으로 실행
            </li>
            <li><code>resetForm(values?)</code> — 폼 초기화 (값 지정 가능)</li>
            <li>
              <code>setFieldValue(field, value)</code> — 특정 필드 값 설정
            </li>
            <li><code>setFieldValues(fields)</code> — 여러 필드 한번에 설정</li>
            <li><code>setFieldError(field, message)</code> — 수동 에러 설정</li>
            <li>
              <code>setFieldErrors(fields)</code> — 서버 필드별 에러 일괄 설정
            </li>
            <li><code>validateForm()</code> — 수동 검증 실행</li>
            <li><code>clearServerError()</code> — serverError 초기화</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ==================== 3. 고급 패턴 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">고급 패턴</h3>
      <div class="code-explanation">
        <h4>수정 폼 — 기존 데이터 채우기</h4>
        <pre><code>const { setFieldValues, handleSubmit } = useForm({ ... });

onMounted(async () => {
  const res = await get(`/api/users/${id}`);
  setFieldValues(res.data);  // 폼 전체 채우기
});</code></pre>

        <h4>서버 필드별 에러 처리</h4>
        <pre><code>// 서버가 { errors: { email: '이미 사용중' } } 형태로 반환하는 경우
// axiosConfig 인터셉터가 자동 처리하지만, 직접 처리 시:
const { setFieldErrors } = useForm({ ... });

try { ... } catch (err) {
  if (err.response?.data?.errors) {
    setFieldErrors(err.response.data.errors);
  }
}</code></pre>

        <h4>useFormField — 개별 필드 관리</h4>
        <pre v-pre><code>import { useFormField } from '@/hooks/useForm';
import * as yup from 'yup';

// useForm 없이 단일 필드만 독립적으로 관리
const { value, errorMessage, handleBlur } = useFormField('email', {
  validation: yup.string().email('이메일 형식').required('필수'),
  initialValue: '',
});

&lt;input v-model="value" @blur="handleBlur" /&gt;
&lt;span&gt;{{ errorMessage }}&lt;/span&gt;</code></pre>

        <h4>useFieldArray — 동적 필드 배열</h4>
        <pre><code>import { useFieldArray } from '@/hooks/useForm';

// 연락처 여러 개, 파일 여러 개 등 동적 배열
const { fields, push, remove } = useFieldArray('contacts', {
  initialValue: [{ name: '', phone: '' }],
});

&lt;div v-for="(field, i) in fields" :key="i"&gt;
  &lt;input v-model="field.name" /&gt;
  &lt;button @click="remove(i)"&gt;삭제&lt;/button&gt;
&lt;/div&gt;
&lt;button @click="push({ name: '', phone: '' })"&gt;추가&lt;/button&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// ── 데모용 인라인 폼 상태 ─────────────────────────────────────────
const email = ref("");
const name = ref("");
const password = ref("");
const emailError = ref("");
const nameError = ref("");
const passwordError = ref("");
const isSubmitting = ref(false);
const isSuccess = ref(false);
const serverError = ref("");

const touchEmail = () => {
  if (!email.value) emailError.value = "필수 항목입니다";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
    emailError.value = "이메일 형식이 아닙니다";
  else emailError.value = "";
};
const touchName = () => {
  if (!name.value) nameError.value = "필수 항목입니다";
  else if (name.value.length < 2) nameError.value = "2자 이상 입력하세요";
  else nameError.value = "";
};
const touchPassword = () => {
  if (!password.value) passwordError.value = "필수 항목입니다";
  else if (password.value.length < 8)
    passwordError.value = "8자 이상 입력하세요";
  else passwordError.value = "";
};

const handleDemo = async () => {
  touchEmail();
  touchName();
  touchPassword();
  if (emailError.value || nameError.value || passwordError.value) return;

  isSubmitting.value = true;
  isSuccess.value = false;
  serverError.value = "";
  await new Promise((r) => setTimeout(r, 800)); // 서버 호출 시뮬레이션
  isSubmitting.value = false;
  isSuccess.value = true;
};

const resetDemo = () => {
  email.value = "";
  name.value = "";
  password.value = "";
  emailError.value = "";
  nameError.value = "";
  passwordError.value = "";
  isSuccess.value = false;
  serverError.value = "";
};
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

.demo-box {
  padding: $spacing-xl;
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  margin-bottom: $spacing-lg;
}

.demo-form {
  max-width: 560px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 0;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}
.field-label {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
}
.required {
  color: $color-danger;
  margin-left: 2px;
}
.field-input {
  padding: 9px 12px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  color: $color-text-primary;
  transition: border-color 0.15s;
  &:focus {
    outline: none;
    border-color: $color-primary;
    box-shadow: 0 0 0 2px rgba($color-primary, 0.1);
  }
  &.error {
    border-color: $color-danger;
    &:focus {
      box-shadow: 0 0 0 2px rgba($color-danger, 0.1);
    }
  }
}
.field-error {
  font-size: $font-size-xs;
  color: $color-danger;
  margin: 0;
}
.server-error {
  background: #fee2e2;
  color: #991b1b;
  padding: 10px 14px;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  margin-bottom: 16px;
}
.success-msg {
  background: #dcfce7;
  color: #166534;
  padding: 10px 14px;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  margin-bottom: 16px;
}
.form-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
.btn {
  padding: 9px 20px;
  border: none;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  cursor: pointer;
  transition: all 0.15s;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
.btn-primary {
  background: $color-primary;
  color: white;
  &:hover:not(:disabled) {
    background: $color-primary-dark;
  }
}
.btn-outline {
  background: white;
  color: $color-text-primary;
  border: 1px solid $color-border;
  &:hover {
    border-color: $color-primary;
    color: $color-primary;
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
