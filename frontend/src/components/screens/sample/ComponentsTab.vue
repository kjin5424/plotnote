<template>
  <div>
    <h2 class="section-title">Form Components</h2>

    <!-- 상태 전환 탭 -->
    <div class="state-tabs">
      <button
        v-for="state in formStates"
        :key="state.value"
        :class="['state-tab', { active: currentState === state.value }]"
        @click="currentState = state.value"
      >
        {{ state.label }}
      </button>
    </div>

    <!-- Form Inputs -->
    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('form-inputs')"
      >
        Form Inputs
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="form-demo">
        <!-- Text Input -->
        <div class="form-group">
          <label class="form-label">Text Input</label>
          <input
            type="text"
            placeholder="텍스트를 입력하세요"
            :disabled="currentState === 'disabled'"
            :readonly="currentState === 'readonly'"
            :class="{
              'is-error': currentState === 'error',
              'is-success': currentState === 'success',
            }"
            :value="getStateValue('text')"
          />
        </div>

        <!-- Email Input -->
        <div class="form-group">
          <label class="form-label">Email Input</label>
          <input
            type="email"
            placeholder="example@email.com"
            :disabled="currentState === 'disabled'"
            :readonly="currentState === 'readonly'"
            :class="{
              'is-error': currentState === 'error',
              'is-success': currentState === 'success',
            }"
            :value="getStateValue('email')"
          />
        </div>

        <!-- Password Input -->
        <div class="form-group">
          <label class="form-label">Password Input</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            :disabled="currentState === 'disabled'"
            :readonly="currentState === 'readonly'"
            :class="{
              'is-error': currentState === 'error',
              'is-success': currentState === 'success',
            }"
            :value="getStateValue('password')"
          />
        </div>

        <!-- Number Input -->
        <div class="form-group">
          <label class="form-label">Number Input</label>
          <input
            type="number"
            placeholder="숫자를 입력하세요"
            :disabled="currentState === 'disabled'"
            :readonly="currentState === 'readonly'"
            :class="{
              'is-error': currentState === 'error',
              'is-success': currentState === 'success',
            }"
            :value="getStateValue('number')"
          />
        </div>

        <!-- Date Input -->
        <div class="form-group">
          <label class="form-label">Date Input</label>
          <input
            type="date"
            :disabled="currentState === 'disabled'"
            :readonly="currentState === 'readonly'"
            :class="{
              'is-error': currentState === 'error',
              'is-success': currentState === 'success',
            }"
            :value="getStateValue('date')"
          />
        </div>

        <!-- Time Input -->
        <div class="form-group">
          <label class="form-label">Time Input</label>
          <input
            type="time"
            :disabled="currentState === 'disabled'"
            :readonly="currentState === 'readonly'"
            :class="{
              'is-error': currentState === 'error',
              'is-success': currentState === 'success',
            }"
            :value="getStateValue('time')"
          />
        </div>

        <!-- File Input -->
        <div class="form-group">
          <label class="form-label">File Input</label>
          <input
            type="file"
            :disabled="currentState === 'disabled'"
            :class="{
              'is-error': currentState === 'error',
              'is-success': currentState === 'success',
            }"
          />
        </div>

        <!-- Select -->
        <div class="form-group">
          <label class="form-label">Select</label>
          <select
            :disabled="currentState === 'disabled'"
            :class="{
              'is-error': currentState === 'error',
              'is-success': currentState === 'success',
            }"
          >
            <option value="">선택하세요</option>
            <option value="1">옵션 1</option>
            <option value="2">옵션 2</option>
            <option value="3">옵션 3</option>
          </select>
        </div>

        <!-- Textarea -->
        <div class="form-group">
          <label class="form-label">Textarea</label>
          <textarea
            placeholder="여러 줄 텍스트 입력"
            rows="4"
            :disabled="currentState === 'disabled'"
            :readonly="currentState === 'readonly'"
            :class="{
              'is-error': currentState === 'error',
              'is-success': currentState === 'success',
            }"
            :value="getStateValue('textarea')"
          ></textarea>
        </div>

        <!-- Checkbox -->
        <div class="form-group">
          <label class="checkbox-label">
            <input
              type="checkbox"
              :disabled="currentState === 'disabled'"
              :checked="
                currentState === 'checked' || currentState === 'success'
              "
            />
            체크박스
          </label>
        </div>

        <!-- Radio -->
        <div class="form-group">
          <label class="radio-label">
            <input
              type="radio"
              name="radio-demo"
              :disabled="currentState === 'disabled'"
              :checked="
                currentState === 'checked' || currentState === 'success'
              "
            />
            라디오 버튼
          </label>
        </div>

        <!-- Switch (Checkbox styled as switch) -->
        <div class="form-group">
          <label class="switch-label">
            <input
              type="checkbox"
              class="switch-input"
              :disabled="currentState === 'disabled'"
              :checked="
                currentState === 'checked' || currentState === 'success'
              "
            />
            <span class="switch-slider"></span>
            <span class="switch-text">스위치</span>
          </label>
        </div>
      </div>
    </section>

    <!-- Form Groups -->
    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('form-groups')"
      >
        Form Groups
        <span class="example-badge">예시 보기</span>
        <span class="info-text"
          >레이블, 입력 필드, 도움말을 하나의 그룹으로 묶는 구조</span
        >
      </h3>
      <div class="form-demo">
        <!-- 기본 Form Group -->
        <div class="form-group">
          <label class="form-label">기본 그룹</label>
          <input type="text" placeholder="기본 입력 필드" />
          <span class="form-help">도움말 텍스트를 여기에 표시합니다.</span>
        </div>

        <!-- 필수 항목 Form Group -->
        <div class="form-group">
          <label class="form-label required">필수 항목</label>
          <input type="text" placeholder="필수 입력 필드" />
          <span class="form-help">이 항목은 반드시 입력해야 합니다.</span>
        </div>

        <!-- Error 상태 Form Group -->
        <div class="form-group">
          <label class="form-label required">에러 상태</label>
          <input
            type="text"
            class="is-error"
            placeholder="잘못된 입력"
            value="invalid@"
          />
          <span class="form-error">올바른 이메일 형식이 아닙니다.</span>
        </div>

        <!-- Success 상태 Form Group -->
        <div class="form-group">
          <label class="form-label">성공 상태</label>
          <input
            type="text"
            class="is-success"
            placeholder="올바른 입력"
            value="valid@email.com"
          />
          <span class="form-success">올바른 형식입니다.</span>
        </div>

        <!-- Disabled Form Group -->
        <div class="form-group">
          <label class="form-label">비활성화 상태</label>
          <input
            type="text"
            placeholder="비활성화된 필드"
            value="수정 불가"
            disabled
          />
          <span class="form-help">이 필드는 현재 수정할 수 없습니다.</span>
        </div>
      </div>
    </section>

    <!-- Input Groups -->
    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('input-groups')"
      >
        Input Groups
        <span class="example-badge">예시 보기</span>
        <span class="info-text"
          >입력 필드에 텍스트나 버튼을 앞뒤로 붙이는 구조</span
        >
      </h3>
      <div class="form-demo">
        <!-- Prepend Text -->
        <div class="form-group">
          <label class="form-label">URL 입력</label>
          <div class="input-group">
            <span class="input-group-text">https://</span>
            <input type="text" placeholder="example.com" />
          </div>
        </div>

        <!-- Append Text -->
        <div class="form-group">
          <label class="form-label">가격 입력</label>
          <div class="input-group">
            <input type="number" placeholder="0" />
            <span class="input-group-text">원</span>
          </div>
        </div>

        <!-- Both Prepend & Append -->
        <div class="form-group">
          <label class="form-label">이메일 도메인</label>
          <div class="input-group">
            <input type="text" placeholder="username" />
            <span class="input-group-text">@</span>
            <input type="text" placeholder="domain.com" />
          </div>
        </div>

        <!-- With Button -->
        <div class="form-group">
          <label class="form-label">검색</label>
          <div class="input-group">
            <input type="text" placeholder="검색어를 입력하세요" />
            <button type="button" class="btn btn-primary">검색</button>
          </div>
        </div>

        <!-- Multiple Buttons -->
        <div class="form-group">
          <label class="form-label">파일 업로드</label>
          <div class="input-group">
            <input type="text" placeholder="파일 선택" readonly />
            <button type="button" class="btn btn-secondary">찾아보기</button>
            <button type="button" class="btn btn-danger">삭제</button>
          </div>
        </div>

        <!-- With Icon -->
        <div class="form-group">
          <label class="form-label">검색 (아이콘)</label>
          <div class="input-group">
            <span class="input-group-icon">🔍</span>
            <input type="text" placeholder="검색..." />
          </div>
        </div>
      </div>
    </section>

    <!-- Validation Icons -->
    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('validation-icons')"
      >
        Validation Icons
        <span class="example-badge">예시 보기</span>
        <span class="info-text">입력 필드 검증 상태를 아이콘으로 표시</span>
      </h3>
      <div class="form-demo">
        <!-- Success with Icon -->
        <div class="form-group">
          <label class="form-label">이메일 (성공)</label>
          <div class="input-with-icon">
            <input
              type="email"
              class="is-success"
              value="valid@email.com"
              placeholder="이메일"
            />
            <span class="validation-icon success">✓</span>
          </div>
          <span class="form-success">올바른 이메일 형식입니다.</span>
        </div>

        <!-- Error with Icon -->
        <div class="form-group">
          <label class="form-label">비밀번호 (에러)</label>
          <div class="input-with-icon">
            <input
              type="password"
              class="is-error"
              value="123"
              placeholder="비밀번호"
            />
            <span class="validation-icon error">✕</span>
          </div>
          <span class="form-error">비밀번호는 최소 8자 이상이어야 합니다.</span>
        </div>

        <!-- Warning with Icon -->
        <div class="form-group">
          <label class="form-label">사용자명 (경고)</label>
          <div class="input-with-icon">
            <input
              type="text"
              class="is-warning"
              value="user"
              placeholder="사용자명"
            />
            <span class="validation-icon warning">⚠</span>
          </div>
          <span class="form-warning"
            >이 사용자명은 이미 존재할 수 있습니다.</span
          >
        </div>

        <!-- Loading with Icon -->
        <div class="form-group">
          <label class="form-label">닉네임 (확인 중)</label>
          <div class="input-with-icon">
            <input type="text" value="checking..." placeholder="닉네임" />
            <span class="validation-icon loading">⟳</span>
          </div>
          <span class="form-help">중복 확인 중...</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Swal from "sweetalert2";

/**
 * 폼 상태 타입
 */
type FormState =
  | "default"
  | "disabled"
  | "readonly"
  | "checked"
  | "error"
  | "success";

/**
 * 현재 선택된 폼 상태
 */
const currentState = ref<FormState>("default");

/**
 * 폼 상태 목록
 */
const formStates = [
  { label: "기본", value: "default" as FormState },
  { label: "비활성화", value: "disabled" as FormState },
  { label: "읽기전용", value: "readonly" as FormState },
  { label: "체크됨", value: "checked" as FormState },
  { label: "에러", value: "error" as FormState },
  { label: "성공", value: "success" as FormState },
];

/**
 * 상태에 따른 입력 값 반환
 */
const getStateValue = (type: string): string => {
  if (currentState.value === "default") return "";
  if (currentState.value === "disabled") return "비활성화된 값";
  if (currentState.value === "readonly") return "읽기 전용 값";
  if (currentState.value === "error") {
    return type === "email"
      ? "invalid@"
      : type === "number"
        ? "-1"
        : "잘못된 값";
  }
  if (currentState.value === "success") {
    return type === "email"
      ? "valid@email.com"
      : type === "number"
        ? "100"
        : type === "date"
          ? "2025-02-09"
          : type === "time"
            ? "14:30"
            : "올바른 값";
  }
  return "";
};

/**
 * 예시 코드 보기
 */
const showExample = async (type: string) => {
  const examples: Record<string, string> = {
    "form-inputs": getFormInputsExample(),
    "form-groups": getFormGroupsExample(),
    "input-groups": getInputGroupsExample(),
    "validation-icons": getValidationIconsExample(),
  };

  const code = examples[type] || "예시 코드가 없습니다.";

  await Swal.fire({
    title: `${getTitleByType(type)} 코드 예시`,
    html: `<pre style="text-align: left; max-height: 500px; overflow-y: auto; background: #f5f5f5; padding: 16px; border-radius: 8px; font-size: 13px; line-height: 1.6;"><code>${escapeHtml(code)}</code></pre>`,
    width: "900px",
    confirmButtonText: "클립보드에 복사",
    showCancelButton: true,
    cancelButtonText: "닫기",
    confirmButtonColor: "#4a90e2",
    cancelButtonColor: "#95a5a6",
  }).then((result) => {
    if (result.isConfirmed) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "복사 완료!",
            text: "코드가 클립보드에 복사되었습니다.",
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: "top-end",
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "복사 실패",
            text: "클립보드 복사에 실패했습니다.",
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: "top-end",
          });
        });
    }
  });
};

/**
 * Form Inputs 예시 코드 (현재 상태 반영)
 */
const getFormInputsExample = (): string => {
  const stateClass =
    currentState.value === "error"
      ? ' class="is-error"'
      : currentState.value === "success"
        ? ' class="is-success"'
        : "";
  const disabledAttr = currentState.value === "disabled" ? " disabled" : "";
  const readonlyAttr = currentState.value === "readonly" ? " readonly" : "";
  const checkedAttr =
    currentState.value === "checked" || currentState.value === "success"
      ? " checked"
      : "";

  return `<!-- ${formStates.find((s) => s.value === currentState.value)?.label} 상태 -->

<!-- Text Input -->
<input type="text" placeholder="텍스트"${stateClass}${disabledAttr}${readonlyAttr} />

<!-- Email Input -->
<input type="email" placeholder="이메일"${stateClass}${disabledAttr}${readonlyAttr} />

<!-- Password Input -->
<input type="password" placeholder="비밀번호"${stateClass}${disabledAttr}${readonlyAttr} />

<!-- Number Input -->
<input type="number" placeholder="숫자"${stateClass}${disabledAttr}${readonlyAttr} />

<!-- Date Input -->
<input type="date"${stateClass}${disabledAttr}${readonlyAttr} />

<!-- Time Input -->
<input type="time"${stateClass}${disabledAttr}${readonlyAttr} />

<!-- File Input -->
<input type="file"${stateClass}${disabledAttr} />

<!-- Select -->
<select${stateClass}${disabledAttr}>
  <option value="">선택하세요</option>
  <option value="1">옵션 1</option>
</select>

<!-- Textarea -->
<textarea placeholder="여러 줄 텍스트" rows="4"${stateClass}${disabledAttr}${readonlyAttr}></textarea>

<!-- Checkbox -->
<label class="checkbox-label">
  <input type="checkbox"${checkedAttr}${disabledAttr} />
  체크박스
</label>

<!-- Radio -->
<label class="radio-label">
  <input type="radio" name="option"${checkedAttr}${disabledAttr} />
  라디오
</label>

<!-- Switch -->
<label class="switch-label">
  <input type="checkbox" class="switch-input"${checkedAttr}${disabledAttr} />
  <span class="switch-slider"></span>
  <span class="switch-text">스위치</span>
</label>

/* SCSS - 모든 Input 기본 스타일 */
input, select, textarea {
  width: 100%;
  height: $input-height; // 36px
  padding: $input-padding-y $input-padding-x; // 8px 12px
  font-size: $font-size-base; // 14px
  line-height: $line-height-base; // 1.5
  color: $color-text-primary; // #2c3e50
  background-color: $color-bg-white; // #ffffff
  border: 1px solid $color-border; // #dcdfe6
  border-radius: $radius-md; // 4px
  transition: $transition-base; // all 0.3s ease
  
  &::placeholder {
    color: $color-text-secondary; // #95a5a6
  }
  
  &:hover {
    border-color: $color-border-dark; // #c0c4cc
  }
  
  &:focus {
    outline: none;
    border-color: $color-primary; // #4a90e2
    box-shadow: 0 0 0 2px rgba($color-primary, 0.1);
  }
  
  &:disabled {
    background-color: $color-bg-light; // #f5f7fa
    color: $color-disabled-text; // #c0c4cc
    cursor: not-allowed;
    border-color: $color-border-light; // #e4e7ed
  }
  
  &:read-only {
    background-color: $color-bg-light;
    cursor: default;
  }
  
  &.is-error {
    border-color: $color-danger; // #e74c3c
    
    &:focus {
      box-shadow: 0 0 0 2px rgba($color-danger, 0.1);
    }
  }
  
  &.is-success {
    border-color: $color-success; // #27ae60
    
    &:focus {
      box-shadow: 0 0 0 2px rgba($color-success, 0.1);
    }
  }
}

/* Select 드롭다운 화살표 */
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right $input-padding-x center;
  padding-right: calc($input-padding-x * 2.5); // 30px
}

/* Textarea 높이 자동 조절 */
textarea {
  height: auto;
  min-height: 80px;
  resize: vertical;
}

/* Checkbox & Radio 공통 스타일 */
input[type="checkbox"],
input[type="radio"] {
  width: 18px;
  height: 18px;
  border: 2px solid $color-border;
  background: white;
  appearance: none;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

/* Checkbox 체크 표시 */
input[type="checkbox"] {
  border-radius: $radius-sm; // 2px
  
  &:checked {
    background: $color-primary;
    border-color: $color-primary;
    
    &::after {
      content: "";
      position: absolute;
      left: 5px;
      top: 2px;
      width: 5px;
      height: 9px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
}

/* Radio 선택 표시 */
input[type="radio"] {
  border-radius: 50%;
  
  &:checked {
    border-color: $color-primary;
    
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: $color-primary;
    }
  }
}

/* Switch 스타일 */
.switch-label {
  display: flex;
  align-items: center;
  gap: $spacing-sm; // 8px
  cursor: pointer;
  
  .switch-input {
    display: none;
    
    &:checked + .switch-slider {
      background-color: $color-primary;
      
      &::before {
        transform: translateX(20px);
      }
    }
    
    &:disabled + .switch-slider {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .switch-slider {
    position: relative;
    width: 44px;
    height: 24px;
    background-color: $color-border-dark; // #c0c4cc
    border-radius: $radius-full; // 9999px
    transition: $transition-base;
    
    &::before {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background-color: white;
      border-radius: 50%;
      transition: $transition-base;
    }
  }
}`;
};

/**
 * Form Groups 예시 코드
 */
const getFormGroupsExample = (): string => {
  return `<!-- Form Groups: 레이블 + 입력 필드 + 도움말/에러 메시지 -->

<!-- 기본 Form Group -->
<div class="form-group">
  <label class="form-label">레이블</label>
  <input type="text" placeholder="입력하세요" />
  <span class="form-help">도움말 텍스트</span>
</div>

<!-- 필수 항목 (별표 표시) -->
<div class="form-group">
  <label class="form-label required">필수 항목</label>
  <input type="text" placeholder="필수 입력" />
</div>

<!-- Error 상태 -->
<div class="form-group">
  <label class="form-label required">에러 상태</label>
  <input type="text" class="is-error" value="invalid" />
  <span class="form-error">에러 메시지</span>
</div>

<!-- Success 상태 -->
<div class="form-group">
  <label class="form-label">성공 상태</label>
  <input type="text" class="is-success" value="valid" />
  <span class="form-success">성공 메시지</span>
</div>

/* SCSS - Form Group 구조 */
.form-group {
  margin-bottom: $spacing-lg; // 16px - 각 폼 그룹 간 간격
  
  &:last-child {
    margin-bottom: 0; // 마지막 그룹은 하단 여백 제거
  }
}

/* 레이블 스타일 */
.form-label {
  display: block; // 블록 요소로 만들어 줄바꿈
  margin-bottom: $spacing-sm; // 8px - 레이블과 입력 필드 간격
  font-size: $font-size-sm; // 13px
  font-weight: $font-weight-medium; // 500
  color: $color-text-primary; // #2c3e50
  line-height: $line-height-tight; // 1.25
  
  &.required::after {
    content: " *"; // 필수 표시 별표
    color: $color-danger; // #e74c3c
    margin-left: 2px;
  }
}

/* 도움말 텍스트 */
.form-help {
  display: block;
  margin-top: $spacing-xs; // 4px - 입력 필드와 도움말 간격
  font-size: $font-size-xs; // 12px
  color: $color-text-secondary; // #95a5a6
  line-height: $line-height-base; // 1.5
}

/* 에러 메시지 */
.form-error {
  display: block;
  margin-top: $spacing-xs; // 4px
  font-size: $font-size-xs; // 12px
  color: $color-danger; // #e74c3c
  line-height: $line-height-base; // 1.5
}

/* 성공 메시지 */
.form-success {
  display: block;
  margin-top: $spacing-xs; // 4px
  font-size: $font-size-xs; // 12px
  color: $color-success; // #27ae60
  line-height: $line-height-base; // 1.5
}

/* 경고 메시지 */
.form-warning {
  display: block;
  margin-top: $spacing-xs; // 4px
  font-size: $font-size-xs; // 12px
  color: $color-warning; // #f39c12
  line-height: $line-height-base; // 1.5
}`;
};

/**
 * Input Groups 예시 코드
 */
const getInputGroupsExample = (): string => {
  return `<!-- Input Groups: 입력 필드에 텍스트나 버튼 결합 -->

<!-- 앞에 텍스트 추가 (Prepend) -->
<div class="input-group">
  <span class="input-group-text">https://</span>
  <input type="text" placeholder="example.com" />
</div>

<!-- 뒤에 텍스트 추가 (Append) -->
<div class="input-group">
  <input type="number" placeholder="0" />
  <span class="input-group-text">원</span>
</div>

<!-- 양쪽에 텍스트 (Both) -->
<div class="input-group">
  <input type="text" placeholder="username" />
  <span class="input-group-text">@</span>
  <input type="text" placeholder="domain.com" />
</div>

<!-- 버튼 결합 -->
<div class="input-group">
  <input type="text" placeholder="검색어" />
  <button type="button" class="btn btn-primary">검색</button>
</div>

<!-- 여러 버튼 -->
<div class="input-group">
  <input type="text" placeholder="파일 선택" readonly />
  <button type="button" class="btn btn-secondary">찾아보기</button>
  <button type="button" class="btn btn-danger">삭제</button>
</div>

<!-- 아이콘 추가 -->
<div class="input-group">
  <span class="input-group-icon">🔍</span>
  <input type="text" placeholder="검색..." />
</div>

/* SCSS - Input Group 구조 */
.input-group {
  display: flex; // Flexbox로 요소들을 가로로 배치
  align-items: stretch; // 높이를 동일하게 맞춤
  width: 100%;
  
  /* 내부 input, button, span 공통 스타일 */
  input,
  button,
  .input-group-text,
  .input-group-icon {
    margin: 0; // 요소 간 간격 제거
    border-radius: 0; // 중간 요소는 둥근 모서리 제거
    
    &:first-child {
      border-top-left-radius: $radius-md; // 4px - 첫 요소 왼쪽 모서리
      border-bottom-left-radius: $radius-md;
    }
    
    &:last-child {
      border-top-right-radius: $radius-md; // 마지막 요소 오른쪽 모서리
      border-bottom-right-radius: $radius-md;
    }
  }
  
  /* input 스타일 조정 */
  input {
    flex: 1; // 남은 공간 모두 차지
    border-right: none; // 연결된 느낌을 위해 오른쪽 테두리 제거
    
    &:last-child {
      border-right: 1px solid $color-border; // 마지막이면 테두리 복원
    }
    
    &:focus {
      z-index: 1; // focus 시 위로 올려서 테두리가 보이도록
    }
  }
  
  /* 버튼 스타일 */
  button {
    flex-shrink: 0; // 버튼 크기 고정
    white-space: nowrap; // 텍스트 줄바꿈 방지
  }
}

/* Input Group Text - 텍스트 요소 */
.input-group-text {
  display: flex;
  align-items: center; // 세로 가운데 정렬
  padding: $input-padding-y $input-padding-x; // 8px 12px - input과 동일
  font-size: $font-size-base; // 14px
  font-weight: $font-weight-normal; // 400
  line-height: $line-height-base; // 1.5
  color: $color-text-secondary; // #95a5a6
  background-color: $color-bg-light; // #f5f7fa
  border: 1px solid $color-border; // #dcdfe6
  border-right: none; // 오른쪽 테두리 제거
  white-space: nowrap; // 텍스트 줄바꿈 방지
  
  &:last-child {
    border-right: 1px solid $color-border; // 마지막이면 테두리 복원
    border-left: none; // 왼쪽 테두리 제거
  }
}

/* Input Group Icon - 아이콘 요소 */
.input-group-icon {
  display: flex;
  align-items: center; // 세로 가운데 정렬
  justify-content: center; // 가로 가운데 정렬
  width: 40px; // 고정 너비
  padding: $input-padding-y; // 8px
  font-size: $font-size-lg; // 16px
  color: $color-text-secondary; // #95a5a6
  background-color: $color-bg-white; // #ffffff
  border: 1px solid $color-border; // #dcdfe6
  border-right: none; // 오른쪽 테두리 제거
  
  + input {
    padding-left: $spacing-xs; // 4px - 아이콘 다음 input 왼쪽 패딩 줄임
  }
}

/* 인접한 요소들의 테두리 겹침 처리 */
.input-group > * + * {
  margin-left: -1px; // 테두리 겹치게 해서 두껍게 보이지 않도록
}`;
};

/**
 * Validation Icons 예시 코드
 */
const getValidationIconsExample = (): string => {
  return `<!-- Validation Icons: 입력 검증 상태를 아이콘으로 표시 -->

<!-- 성공 상태 -->
<div class="input-with-icon">
  <input type="email" class="is-success" value="valid@email.com" />
  <span class="validation-icon success">✓</span>
</div>
<span class="form-success">올바른 형식입니다.</span>

<!-- 에러 상태 -->
<div class="input-with-icon">
  <input type="password" class="is-error" value="123" />
  <span class="validation-icon error">✕</span>
</div>
<span class="form-error">비밀번호는 최소 8자 이상이어야 합니다.</span>

<!-- 경고 상태 -->
<div class="input-with-icon">
  <input type="text" class="is-warning" value="user" />
  <span class="validation-icon warning">⚠</span>
</div>
<span class="form-warning">이미 존재할 수 있습니다.</span>

<!-- 로딩 상태 -->
<div class="input-with-icon">
  <input type="text" value="checking..." />
  <span class="validation-icon loading">⟳</span>
</div>
<span class="form-help">확인 중...</span>

/* SCSS - Validation Icons 구조 */
.input-with-icon {
  position: relative; // 아이콘을 절대 위치로 배치하기 위한 부모 요소
  display: flex;
  align-items: center;
  
  input {
    width: 100%;
    padding-right: 40px; // 오른쪽에 아이콘 공간 확보
  }
  
  .validation-icon {
    position: absolute; // 절대 위치로 input 위에 배치
    right: $input-padding-x; // 12px - input 오른쪽 패딩과 동일
    top: 50%; // 세로 가운데
    transform: translateY(-50%); // 정확한 가운데 정렬
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: $font-size-base; // 14px
    font-weight: $font-weight-bold; // 700
    pointer-events: none; // 클릭 이벤트 무시 (input 클릭 방해 안 함)
    
    /* 성공 아이콘 */
    &.success {
      color: $color-success; // #27ae60
    }
    
    /* 에러 아이콘 */
    &.error {
      color: $color-danger; // #e74c3c
    }
    
    /* 경고 아이콘 */
    &.warning {
      color: $color-warning; // #f39c12
    }
    
    /* 로딩 아이콘 (회전 애니메이션) */
    &.loading {
      color: $color-text-light; // #3498db
      animation: spin 1s linear infinite; // 1초마다 360도 회전
    }
  }
}

/* 로딩 회전 애니메이션 */
@keyframes spin {
  from {
    transform: translateY(-50%) rotate(0deg);
  }
  to {
    transform: translateY(-50%) rotate(360deg);
  }
}

/* Warning 상태 input 스타일 */
input.is-warning {
  border-color: $color-warning; // #f39c12
  
  &:focus {
    box-shadow: 0 0 0 2px rgba($color-warning, 0.1);
  }
}`;
};

const escapeHtml = (text: string): string => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

const getTitleByType = (type: string): string => {
  const titles: Record<string, string> = {
    "form-inputs": "Form Inputs",
    "form-groups": "Form Groups",
    "input-groups": "Input Groups",
    "validation-icons": "Validation Icons",
  };
  return titles[type] || type;
};
</script>

<style scoped lang="scss">
.section-title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-3xl;
  padding-bottom: $spacing-lg;
  border-bottom: 2px solid $color-primary;
}

/* 상태 전환 탭 */
.state-tabs {
  display: flex;
  gap: $spacing-sm;
  margin-bottom: $spacing-2xl;
  padding: $spacing-md;
  background: $color-bg-light;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  flex-wrap: wrap;
}

.state-tab {
  padding: $spacing-sm $spacing-lg;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $color-text-secondary;
  background: white;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  cursor: pointer;
  transition: $transition-base;

  &:hover {
    color: $color-primary;
    border-color: $color-primary;
  }

  &.active {
    color: white;
    background: $color-primary;
    border-color: $color-primary;
    font-weight: $font-weight-semibold;
  }
}

.subsection-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-lg;
  display: flex;
  align-items: center;
  gap: $spacing-md;
  flex-wrap: wrap;

  &.clickable {
    cursor: pointer;
    transition: $transition-base;

    &:hover {
      color: $color-primary;

      .example-badge {
        background: $color-primary;
        color: white;
      }
    }
  }
}

.example-badge {
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
  background: $color-primary-light;
  color: white;
  padding: 4px 12px;
  border-radius: $radius-full;
  transition: $transition-base;
}

.info-text {
  font-size: $font-size-sm;
  font-weight: $font-weight-normal;
  color: $color-text-secondary;
  font-style: italic;
}

.style-section {
  margin-bottom: $spacing-3xl;
}

.form-demo {
  padding: $spacing-xl;
  background: $color-bg-light;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;

  .form-group {
    margin-bottom: $spacing-lg;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .form-label {
    display: block;
    margin-bottom: $spacing-sm;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-primary;

    &.required::after {
      content: " *";
      color: $color-danger;
    }
  }

  .form-help {
    display: block;
    margin-top: $spacing-xs;
    font-size: $font-size-xs;
    color: $color-text-secondary;
  }

  .form-error {
    display: block;
    margin-top: $spacing-xs;
    font-size: $font-size-xs;
    color: $color-danger;
  }

  .form-success {
    display: block;
    margin-top: $spacing-xs;
    font-size: $font-size-xs;
    color: $color-success;
  }

  .form-warning {
    display: block;
    margin-top: $spacing-xs;
    font-size: $font-size-xs;
    color: $color-warning;
  }

  input,
  select,
  textarea {
    border: 1px solid $color-border !important;
    background: white;

    &:disabled {
      background-color: $color-bg-light !important;
      color: $color-disabled-text;
      cursor: not-allowed;
    }

    &:read-only {
      background-color: $color-bg-light !important;
      cursor: default;
    }

    &.is-error {
      border-color: $color-danger !important;
    }

    &.is-success {
      border-color: $color-success !important;
    }

    &.is-warning {
      border-color: $color-warning !important;
    }
  }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right $input-padding-x center;
    padding-right: calc($input-padding-x * 2.5);
  }

  input[type="checkbox"],
  input[type="radio"] {
    width: 18px;
    height: 18px;
    border: 2px solid $color-border !important;
    background: white !important;
    appearance: none;
    cursor: pointer;
    position: relative;
    flex-shrink: 0;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  input[type="checkbox"] {
    border-radius: $radius-sm;

    &:checked {
      background: $color-primary !important;
      border-color: $color-primary !important;

      &::after {
        content: "";
        position: absolute;
        left: 5px;
        top: 2px;
        width: 5px;
        height: 9px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }

  input[type="radio"] {
    border-radius: 50%;

    &:checked {
      border-color: $color-primary !important;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: $color-primary;
      }
    }
  }

  .checkbox-label,
  .radio-label {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    cursor: pointer;
    font-size: $font-size-base;
    color: $color-text-primary;
  }

  /* Switch */
  .switch-label {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    cursor: pointer;

    .switch-input {
      display: none;

      &:checked + .switch-slider {
        background-color: $color-primary;

        &::before {
          transform: translateX(20px);
        }
      }

      &:disabled + .switch-slider {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .switch-slider {
      position: relative;
      width: 44px;
      height: 24px;
      background-color: $color-border-dark;
      border-radius: $radius-full;
      transition: $transition-base;
      flex-shrink: 0;

      &::before {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        background-color: white;
        border-radius: 50%;
        transition: $transition-base;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
    }

    .switch-text {
      font-size: $font-size-base;
      color: $color-text-primary;
    }
  }

  /* Input Groups */
  .input-group {
    display: flex;
    align-items: stretch;
    width: 100%;

    input,
    button,
    .input-group-text,
    .input-group-icon {
      margin: 0;
      border-radius: 0;

      &:first-child {
        border-top-left-radius: $radius-md;
        border-bottom-left-radius: $radius-md;
      }

      &:last-child {
        border-top-right-radius: $radius-md;
        border-bottom-right-radius: $radius-md;
      }
    }

    input {
      flex: 1;
      border-right: none !important;

      &:last-child {
        border-right: 1px solid $color-border !important;
      }

      &:focus {
        z-index: 1;
      }
    }

    button {
      flex-shrink: 0;
      white-space: nowrap;
    }

    > * + * {
      margin-left: -1px;
    }
  }

  .input-group-text {
    display: flex;
    align-items: center;
    padding: $input-padding-y $input-padding-x;
    font-size: $font-size-base;
    color: $color-text-secondary;
    background-color: $color-bg-light;
    border: 1px solid $color-border !important;
    border-right: none !important;
    white-space: nowrap;

    &:last-child {
      border-right: 1px solid $color-border !important;
      border-left: none !important;
    }
  }

  .input-group-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    padding: $input-padding-y;
    font-size: $font-size-lg;
    color: $color-text-secondary;
    background-color: white;
    border: 1px solid $color-border !important;
    border-right: none !important;

    + input {
      padding-left: $spacing-xs;
    }
  }

  /* Validation Icons */
  .input-with-icon {
    position: relative;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      padding-right: 40px;
    }

    .validation-icon {
      position: absolute;
      right: $input-padding-x;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
      pointer-events: none;

      &.success {
        color: $color-success;
      }

      &.error {
        color: $color-danger;
      }

      &.warning {
        color: $color-warning;
      }

      &.loading {
        color: $color-text-light;
        animation: spin 1s linear infinite;
      }
    }
  }
}

@keyframes spin {
  from {
    transform: translateY(-50%) rotate(0deg);
  }
  to {
    transform: translateY(-50%) rotate(360deg);
  }
}
</style>
