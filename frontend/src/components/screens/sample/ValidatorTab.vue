<template>
  <div>
    <h2 class="section-title">validator</h2>
    <p class="section-desc">
      폼 검증 유틸리티입니다. 단독으로 쓸 수 있는 검증 함수와,
      <code>useForm</code>의 <code>validationSchema</code>에 바로 연결할 수 있는
      사전 정의 Yup 스키마를 제공합니다.
    </p>

    <!-- ==================== 1. 검증 함수 데모 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">기본 검증 함수 — Live Demo</h3>

      <div class="demo-box">
        <div class="validator-grid">
          <div v-for="v in validators" :key="v.label" class="validator-item">
            <label class="v-label">{{ v.label }}</label>
            <input
              v-model="v.value"
              :type="v.inputType || 'text'"
              class="v-input"
              :placeholder="v.placeholder"
            />
            <div
              class="v-result"
              :class="v.valid(v.value) ? 'v-pass' : 'v-fail'"
            >
              {{ v.valid(v.value) ? "✅ 유효" : "❌ " + v.failMsg }}
            </div>
          </div>
        </div>
      </div>

      <div class="code-explanation">
        <pre v-pre><code>import {
  isValidEmail, isValidPassword, isValidPhone,
  isValidUrl, isInRange, isValidRedirect,
} from '@/utils/validator';

isValidEmail('test@example.com')    // true
isValidEmail('invalid-email')       // false

isValidPassword('pass123word')      // true  (8자 이상 + 영문 + 숫자)
isValidPassword('abc123')           // false (7자)

isValidPhone('010-1234-5678')       // true
isValidPhone('02-1234-5678')        // true

isValidUrl('https://example.com')   // true
isValidUrl('not-a-url')             // false

isInRange(75, 0, 100)               // true
isInRange(150, 0, 100)              // false

isValidRedirect('/dashboard')       // true
isValidRedirect('//evil.com')       // false</code></pre>
      </div>
    </section>

    <!-- ==================== 2. 사전 정의 Yup 스키마 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">사전 정의 Yup 스키마</h3>
      <p class="description">
        자주 쓰는 폼의 스키마를 미리 정의했습니다. <code>useForm</code>의
        <code>validationSchema</code>에 바로 전달하세요. 새 폼에 맞게 커스텀이
        필요하면 스키마를 직접 작성하거나 <code>.concat()</code>으로 확장하세요.
      </p>

      <div class="schema-grid">
        <div
          v-for="schema in schemaList"
          :key="schema.name"
          class="schema-card"
        >
          <div class="schema-header">
            <span class="schema-icon">{{ schema.icon }}</span>
            <div>
              <p class="schema-name">{{ schema.name }}</p>
              <p class="schema-import">{{ schema.import }}</p>
            </div>
          </div>
          <ul class="schema-fields">
            <li v-for="field in schema.fields" :key="field.name">
              <code>{{ field.name }}</code>
              <span>{{ field.rule }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="code-explanation">
        <h4>useForm과 연동</h4>
        <pre v-pre><code>import { useForm } from '@/hooks/useForm';
import { authSchemas } from '@/utils/validator';

// 로그인 폼 — 스키마 바로 사용
const { values, errors, handleSubmit } = useForm({
  initialValues: { email: '', password: '' },
  validationSchema: authSchemas.login,
  onSubmit: async (values) => {
    await post('/api/auth/login', values);
  },
});

// 회원가입 폼
const { values, errors, handleSubmit } = useForm({
  initialValues: { email: '', password: '', passwordConfirm: '', name: '' },
  validationSchema: authSchemas.register,
});

// 비밀번호 변경 폼
const { values, errors, handleSubmit } = useForm({
  initialValues: { currentPassword: '', newPassword: '', newPasswordConfirm: '' },
  validationSchema: authSchemas.changePassword,
});</code></pre>

        <h4>커스텀 스키마 작성</h4>
        <pre v-pre><code>import * as yup from 'yup';
import { isValidPhone } from '@/utils/validator';
import { useForm } from '@/hooks/useForm';

// 기존 스키마에 없는 폼은 직접 작성
const mySchema = yup.object({
  title:    yup.string().required('필수').max(100, '100자 이하'),
  content:  yup.string().required('필수').min(10, '10자 이상'),
  phone:    yup.string()
    .test('phone', '올바른 전화번호 형식', v => v ? isValidPhone(v) : true),
  dueDate:  yup.date().required('필수').min(new Date(), '오늘 이후'),
  maxScore: yup.number().required('필수').integer('정수').min(1).max(1000),
});

const { values, errors, handleSubmit } = useForm({
  initialValues: { title: '', content: '', phone: '', dueDate: null, maxScore: 100 },
  validationSchema: mySchema,
});</code></pre>
      </div>
    </section>

    <!-- ==================== 3. fileSchemas & fileRules ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">파일 검증 스키마 / 규칙</h3>
      <p class="description">
        파일 업로드 필드 검증에 사용합니다. <code>fileSchemas</code>는 Yup
        스키마, <code>fileRules</code>는 Vee-Validate 규칙 형식입니다.
      </p>

      <div class="code-explanation">
        <h4>fileSchemas — Yup 파일 스키마</h4>
        <pre v-pre><code>import { fileSchemas } from '@/utils/validator';

// 단일 이미지 (최대 5MB, image/* MIME 타입만)
const imageUploadSchema = yup.object({
  profileImage: fileSchemas.image,
});

// 문서 파일 (최대 20MB, image + document MIME 타입)
const assignmentSchema = yup.object({
  content:    yup.string().required(),
  attachment: fileSchemas.document,  // 선택사항 — .nullable() 추가 필요 시 명시
});</code></pre>

        <h4>fileRules — 직접 검증 (useFileUpload 내부에서 사용)</h4>
        <pre v-pre><code>import { fileRules } from '@/utils/validator';

// Boolean 반환 — useFileUpload 내부 로직에서 사용
fileRules.isValidSize(file, 5 * 1024 * 1024)   // 5MB 이하인지
fileRules.isValidType(file, ['image/jpeg', 'image/png'])  // 타입 허용 여부</code></pre>

        <h4>validateWithSchema — 폼 밖에서 Yup 검증</h4>
        <pre
          v-pre
        ><code>import { validateWithSchema, authSchemas, getFieldErrors } from '@/utils/validator';

// useForm 없이 수동으로 Yup 스키마 검증
const result = await validateWithSchema(authSchemas.login, { email: 'abc', password: '' });
// { isValid: false, errors: [{ field: 'email', message: '...' }, { field: 'password', message: '...' }] }

// 필드별 에러 객체로 변환
const fieldErrors = getFieldErrors(result.errors);
// { email: '올바른 이메일 형식이 아닙니다', password: '비밀번호를 입력해주세요' }</code></pre>
      </div>
    </section>

    <!-- ==================== 4. customRules ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">customRules — Vee-Validate 커스텀 규칙</h3>
      <p class="description">
        Vee-Validate의 <code>defineRule</code>에 등록하거나,
        <code>useField</code>의 <code>validation</code> 옵션에 직접 전달할 수
        있습니다. 반환값이 <code>true</code>면 통과, 문자열이면 에러
        메시지입니다.
      </p>

      <div class="code-explanation">
        <pre v-pre><code>import { customRules } from '@/utils/validator';

// useFormField 개별 필드에서 직접 사용
import { useFormField } from '@/hooks/useForm';

const { value, errorMessage } = useFormField('phone', {
  validation: customRules.validPhone,
});

// 사용 가능한 규칙 목록
customRules.validEmail(value)           // true | '올바른 이메일 형식이 아닙니다'
customRules.validPassword(value)        // true | '비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다'
customRules.validPhone(value)           // true | '올바른 전화번호 형식이 아닙니다'
customRules.validUrl(value)             // true | '올바른 URL 형식이 아닙니다'
customRules.validRedirect(value)        // true | '올바른 경로 형식이 아닙니다'
customRules.inRange(0, 100)(value)      // true | '0에서 100 사이의 값을 입력해주세요'</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

// ── 검증 함수 데모 ─────────────────────────────────────────────────
const validators = reactive([
  {
    label: "isValidEmail",
    value: ref("test@example.com"),
    inputType: "text",
    placeholder: "test@example.com",
    failMsg: "이메일 형식 불일치",
    valid(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    },
  },
  {
    label: "isValidPassword",
    value: ref("password123"),
    inputType: "text",
    placeholder: "8자+영문+숫자",
    failMsg: "8자 이상, 영문+숫자 필요",
    valid(v) {
      return v?.length >= 8 && /[A-Za-z]/.test(v) && /\d/.test(v);
    },
  },
  {
    label: "isValidPhone",
    value: ref("010-1234-5678"),
    inputType: "text",
    placeholder: "010-1234-5678",
    failMsg: "한국 전화번호 형식 아님",
    valid(v) {
      return /^(01[0-9]|02|0[3-9][0-9])-?([0-9]{3,4})-?([0-9]{4})$/.test(v);
    },
  },
  {
    label: "isValidUrl",
    value: ref("https://example.com"),
    inputType: "text",
    placeholder: "https://...",
    failMsg: "유효한 URL 아님",
    valid(v) {
      try {
        new URL(v);
        return true;
      } catch {
        return false;
      }
    },
  },
  {
    label: "isValidRedirect",
    value: ref("/dashboard"),
    inputType: "text",
    placeholder: "/path",
    failMsg: "//로 시작하거나 /로 시작 안 함",
    valid(v) {
      return v?.startsWith("/") && !v?.startsWith("//");
    },
  },
]);

// ── 스키마 목록 ────────────────────────────────────────────────────
const schemaList = [
  {
    name: "authSchemas.login",
    import: "import { authSchemas } from '@/utils/validator'",
    icon: "🔐",
    fields: [
      { name: "email", rule: "required, 이메일 형식" },
      { name: "password", rule: "required" },
    ],
  },
  {
    name: "authSchemas.register",
    import: "authSchemas.register",
    icon: "📝",
    fields: [
      { name: "email", rule: "required, 이메일 형식" },
      { name: "password", rule: "required, 8자+, 영문+숫자" },
      { name: "passwordConfirm", rule: "required, password와 일치" },
      { name: "name", rule: "required, 2~50자" },
    ],
  },
  {
    name: "authSchemas.changePassword",
    import: "authSchemas.changePassword",
    icon: "🔑",
    fields: [
      { name: "currentPassword", rule: "required" },
      {
        name: "newPassword",
        rule: "required, 8자+, 영문+숫자, 현재와 달라야 함",
      },
      { name: "newPasswordConfirm", rule: "required, newPassword와 일치" },
    ],
  },
  {
    name: "profileSchemas.update",
    import: "import { profileSchemas } from '@/utils/validator'",
    icon: "👤",
    fields: [
      { name: "name", rule: "required, 2~50자" },
      { name: "phone", rule: "선택, 한국 전화번호 형식" },
      { name: "bio", rule: "선택, 최대 500자" },
    ],
  },
  {
    name: "courseSchemas.createOrUpdate",
    import: "import { courseSchemas } from '@/utils/validator'",
    icon: "📚",
    fields: [
      { name: "title", rule: "required, 2~100자" },
      { name: "description", rule: "required, 10~2000자" },
      { name: "startDate", rule: "required, 오늘 이후" },
      { name: "endDate", rule: "required, startDate 이후" },
      { name: "maxStudents", rule: "required, 정수, 1~1000" },
    ],
  },
  {
    name: "assignmentSchemas.createOrUpdate",
    import: "import { assignmentSchemas } from '@/utils/validator'",
    icon: "📋",
    fields: [
      { name: "title", rule: "required, 2~100자" },
      { name: "content", rule: "required, 10자+" },
      { name: "dueDate", rule: "required, 현재 이후" },
      { name: "maxScore", rule: "required, 정수, 1~1000" },
    ],
  },
  {
    name: "qnaSchemas.createQuestion",
    import: "import { qnaSchemas } from '@/utils/validator'",
    icon: "❓",
    fields: [
      { name: "title", rule: "required, 5~100자" },
      { name: "content", rule: "required, 10자+" },
      { name: "category", rule: "required" },
    ],
  },
  {
    name: "surveySchemas.create",
    import: "import { surveySchemas } from '@/utils/validator'",
    icon: "📊",
    fields: [
      { name: "title", rule: "required, 5~100자" },
      { name: "description", rule: "선택, 최대 500자" },
      { name: "startDate", rule: "required, 현재 이후" },
      { name: "endDate", rule: "required, startDate 이후" },
    ],
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

// 검증 함수 데모
.validator-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: $spacing-md;
}
.validator-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.v-label {
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  color: $color-primary;
  font-family: monospace;
}
.v-input {
  padding: 7px 10px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  color: $color-text-primary;
  &:focus {
    outline: none;
    border-color: $color-primary;
  }
}
.v-result {
  padding: 5px 10px;
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
}
.v-pass {
  background: #dcfce7;
  color: #15803d;
}
.v-fail {
  background: #fee2e2;
  color: #dc2626;
}

// 스키마 그리드
.schema-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
}
.schema-card {
  padding: $spacing-md;
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  box-shadow: $shadow-sm;
}
.schema-header {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
}
.schema-icon {
  font-size: 24px;
  flex-shrink: 0;
}
.schema-name {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  font-family: monospace;
  margin-bottom: 2px;
}
.schema-import {
  font-size: $font-size-xs;
  color: $color-text-light;
  font-family: monospace;
}
.schema-fields {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  li {
    display: flex;
    align-items: baseline;
    gap: 6px;
    font-size: $font-size-xs;
    color: $color-text-secondary;
    code {
      background: #eff6ff;
      color: #1d4ed8;
      padding: 1px 6px;
      border-radius: $radius-sm;
      font-family: monospace;
      flex-shrink: 0;
    }
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
</style>
