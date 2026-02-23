<template>
  <h2 class="section-title">Modal Component Guide</h2>

  <!-- ========================================
         Basic Usage
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">1. Basic Usage</h3>
    <p class="subsection-description">
      모달 컴포넌트는 <code>jenesius-vue-modal</code> 라이브러리를 기반으로
      만들어졌습니다. <code>openModal()</code> 함수로 모달을 열 수 있습니다.
    </p>

    <div class="example-box">
      <h4>Simple Modal</h4>
      <button class="btn btn-primary" @click="openBasicModal">
        기본 모달 열기
      </button>

      <div class="code-example">
        <pre v-pre><code>&lt;script setup&gt;
import { openModal } from 'jenesius-vue-modal';
import Modal from '@/components/Modal.vue';

const openBasicModal = () => {
  openModal(Modal, {
    title: '기본 모달',
    // 모달 내용은 default slot으로 전달
  });
};
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="openBasicModal"&gt;모달 열기&lt;/button&gt;
&lt;/template&gt;</code></pre>
      </div>

      <p class="note">
        💡 <code>openModal()</code>은 Promise를 반환하므로 모달이 닫힐 때의
        결과를 받을 수 있습니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Modal Sizes
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">2. Modal Sizes</h3>
    <p class="subsection-description">
      <code>size</code> 속성으로 모달 크기를 조정할 수 있습니다: sm, md, lg, xl,
      full
    </p>

    <div class="example-box">
      <h4>Size Variants</h4>
      <div class="modal-demo-grid">
        <button class="btn btn-primary btn-sm" @click="openModal('sm')">
          Small (400px)
        </button>
        <button class="btn btn-primary btn-sm" @click="openModal('md')">
          Medium (600px) - 기본
        </button>
        <button class="btn btn-primary btn-sm" @click="openModal('lg')">
          Large (800px)
        </button>
        <button class="btn btn-primary btn-sm" @click="openModal('xl')">
          XLarge (1000px)
        </button>
        <button class="btn btn-primary btn-sm" @click="openModal('full')">
          Full (95vw)
        </button>
      </div>

      <div class="code-example">
        <pre v-pre><code>openModal(Modal, {
  title: '큰 모달',
  size: 'lg',  // sm | md | lg | xl | full
});</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Modal with Content
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">3. Modal with Content</h3>
    <p class="subsection-description">
      커스텀 컴포넌트를 모달로 열 수 있습니다.
    </p>

    <div class="example-box">
      <h4>Dynamic Content Modal</h4>
      <button class="btn btn-success" @click="openContentModal">
        컨텐츠 모달 열기
      </button>

      <div class="code-example">
        <pre v-pre><code>&lt;!-- MyModalContent.vue --&gt;
&lt;template&gt;
  &lt;Modal
    title="사용자 정보"
    :show-cancel-button="true"
    :show-confirm-button="true"
    confirm-text="저장"
    @confirm="handleSave"
    @cancel="handleCancel"
  &gt;
    &lt;div class="modal-content"&gt;
      &lt;div class="form-group"&gt;
        &lt;label&gt;이름&lt;/label&gt;
        &lt;input v-model="name" type="text" /&gt;
      &lt;/div&gt;
      &lt;div class="form-group"&gt;
        &lt;label&gt;이메일&lt;/label&gt;
        &lt;input v-model="email" type="email" /&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/Modal&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';
import { closeModal } from 'jenesius-vue-modal';
import Modal from '@/components/Modal.vue';

const name = ref('');
const email = ref('');

const handleSave = () => {
  console.log('저장:', { name: name.value, email: email.value });
  closeModal();
};

const handleCancel = () => {
  console.log('취소됨');
};
&lt;/script&gt;

&lt;!-- 모달 열기 --&gt;
&lt;script setup&gt;
import { openModal } from 'jenesius-vue-modal';
import MyModalContent from './MyModalContent.vue';

const openContentModal = () => {
  openModal(MyModalContent);
};
&lt;/script&gt;</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Confirm/Cancel Buttons
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">4. Confirm/Cancel Buttons</h3>
    <p class="subsection-description">
      모달 하단의 버튼을 커스터마이징할 수 있습니다.
    </p>

    <div class="example-box">
      <h4>Button Customization</h4>
      <div class="modal-demo-grid">
        <button class="btn btn-primary" @click="openConfirmModal">
          확인 모달
        </button>
        <button class="btn btn-danger" @click="openDeleteModal">
          삭제 확인 모달
        </button>
        <button class="btn btn-success" @click="openSaveModal">
          저장 모달
        </button>
        <button class="btn btn-secondary" @click="openNoButtonsModal">
          버튼 없는 모달
        </button>
      </div>

      <div class="code-example">
        <pre v-pre><code>&lt;!-- 기본 확인/취소 --&gt;
openModal(Modal, {
  title: '확인',
  showCancelButton: true,
  showConfirmButton: true,
  cancelText: '취소',
  confirmText: '확인',
  confirmType: 'primary',  // primary | success | danger
});

&lt;!-- 삭제 확인 (빨간 버튼) --&gt;
openModal(Modal, {
  title: '정말 삭제하시겠습니까?',
  confirmType: 'danger',
  confirmText: '삭제',
});

&lt;!-- 버튼 숨기기 --&gt;
openModal(Modal, {
  title: '안내',
  showCancelButton: false,
  showConfirmButton: false,
});</code></pre>
      </div>

      <p class="note">
        💡 <code>confirmType</code>: primary (파란색), success (초록색), danger
        (빨간색)
      </p>
    </div>

    <div class="example-box">
      <h4>Disabled Confirm Button</h4>
      <button class="btn btn-primary" @click="openDisabledModal">
        비활성화된 확인 버튼
      </button>

      <div class="code-example">
        <pre v-pre><code>&lt;Modal
  :confirm-disabled="!isValid"
  @confirm="handleConfirm"
&gt;
  &lt;input v-model="text" placeholder="최소 3글자 입력" /&gt;
&lt;/Modal&gt;

&lt;script setup&gt;
const text = ref('');
const isValid = computed(() => text.value.length >= 3);
&lt;/script&gt;</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Modal Events
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">5. Modal Events</h3>
    <p class="subsection-description">
      모달은 <code>@confirm</code>, <code>@cancel</code>,
      <code>@close</code> 이벤트를 제공합니다.
    </p>

    <div class="example-box">
      <h4>Event Handling</h4>
      <button class="btn btn-primary" @click="openEventModal">
        이벤트 모달 열기
      </button>

      <div class="event-log" v-if="modalEventLog.length > 0">
        <strong>이벤트 로그:</strong>
        <ul>
          <li v-for="(log, index) in modalEventLog" :key="index">{{ log }}</li>
        </ul>
      </div>

      <div class="code-example">
        <pre v-pre><code>&lt;Modal
  title="이벤트 테스트"
  @confirm="handleConfirm"
  @cancel="handleCancel"
  @close="handleClose"
&gt;
  모달 내용
&lt;/Modal&gt;

&lt;script setup&gt;
const handleConfirm = () => {
  console.log('확인 버튼 클릭');
  // closeModal()은 자동으로 호출되지 않음
  // 필요시 수동으로 호출
};

const handleCancel = () => {
  console.log('취소 버튼 클릭');
  // closeModal()이 자동으로 호출됨
};

const handleClose = () => {
  console.log('모달 닫힘 (X 버튼 또는 오버레이 클릭)');
  // closeModal()이 자동으로 호출됨
};
&lt;/script&gt;</code></pre>
      </div>

      <p class="note warning">
        ⚠️ <strong>중요:</strong> <code>@confirm</code> 이벤트에서는
        <code>closeModal()</code>이 자동으로 호출되지 않습니다. 유효성 검사 후
        수동으로 닫아야 합니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Custom Slots
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">6. Custom Slots</h3>
    <p class="subsection-description">
      헤더와 푸터를 커스터마이징할 수 있습니다.
    </p>

    <div class="example-box">
      <h4>Custom Header</h4>
      <button class="btn btn-primary" @click="openCustomHeaderModal">
        커스텀 헤더 모달
      </button>

      <div class="code-example">
        <pre v-pre><code>&lt;Modal&gt;
  &lt;template #header&gt;
    &lt;div class="custom-header"&gt;
      &lt;i class="fas fa-star"&gt;&lt;/i&gt;
      &lt;h3&gt;특별한 제목&lt;/h3&gt;
    &lt;/div&gt;
  &lt;/template&gt;

  모달 내용
&lt;/Modal&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Custom Footer</h4>
      <button class="btn btn-primary" @click="openCustomFooterModal">
        커스텀 푸터 모달
      </button>

      <div class="code-example">
        <pre v-pre><code>&lt;Modal title="커스텀 푸터"&gt;
  모달 내용

  &lt;template #footer&gt;
    &lt;div class="custom-footer"&gt;
      &lt;button class="btn btn-secondary"&gt;나중에&lt;/button&gt;
      &lt;button class="btn btn-primary"&gt;지금 하기&lt;/button&gt;
      &lt;button class="btn btn-success"&gt;완료&lt;/button&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/Modal&gt;</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Modal Options
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">7. Modal Options</h3>
    <p class="subsection-description">
      다양한 옵션으로 모달 동작을 제어할 수 있습니다.
    </p>

    <div class="example-box">
      <h4>Close Options</h4>
      <div class="modal-demo-grid">
        <button class="btn btn-secondary" @click="openNoCloseButton">
          닫기 버튼 없음
        </button>
        <button class="btn btn-secondary" @click="openNoOverlayClose">
          오버레이 클릭 무시
        </button>
        <button class="btn btn-secondary" @click="openNoEscClose">
          ESC 키 무시 (일반적으로 항상 작동)
        </button>
      </div>

      <div class="code-example">
        <pre v-pre><code>&lt;!-- 닫기 버튼(X) 숨기기 --&gt;
&lt;Modal
  :show-close="false"
&gt;

&lt;!-- 오버레이 클릭으로 닫기 비활성화 --&gt;
&lt;Modal
  :close-on-overlay="false"
&gt;

&lt;!-- ESC 키는 기본적으로 활성화되어 있음 --&gt;
&lt;!-- 비활성화하려면 컴포넌트 수정 필요 --&gt;</code></pre>
      </div>

      <p class="note">
        💡 <code>:close-on-overlay="false"</code>를 사용하면 사용자가 실수로
        모달을 닫는 것을 방지할 수 있습니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Best Practices
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">8. Best Practices</h3>

    <div class="example-box">
      <h4>✅ 권장사항</h4>
      <ul class="best-practices-list">
        <li>
          <strong>적절한 크기 사용</strong>
          <br />간단한 확인: sm, 폼: md, 상세 정보: lg, 복잡한 UI: xl
        </li>
        <li>
          <strong>명확한 버튼 텍스트</strong>
          <br />"확인" 대신 "저장", "삭제", "전송" 등 구체적인 동작 표시
        </li>
        <li>
          <strong>위험한 동작에는 danger 타입</strong>
          <br />삭제, 취소 불가능한 동작에는 빨간색 버튼 사용
        </li>
        <li>
          <strong>모달 중첩 최소화</strong>
          <br />모달 위에 모달은 사용자 경험을 해칠 수 있음
        </li>
      </ul>
    </div>

    <div class="example-box">
      <h4>❌ 피해야 할 패턴</h4>
      <ul class="bad-practices-list">
        <li>
          <strong>너무 많은 내용</strong>
          <br />→ 스크롤이 길어지면 별도 페이지 고려
        </li>
        <li>
          <strong>모호한 버튼 텍스트</strong>
          <br />→ "OK", "Yes", "No" 대신 구체적인 동작 명시
        </li>
        <li>
          <strong>중요한 정보를 모달로만 표시</strong>
          <br />→ 모달은 보조적인 수단으로 사용
        </li>
      </ul>
    </div>
  </section>

  <!-- ========================================
         Advanced: Modal with Form Validation
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">9. Advanced: Form Validation</h3>

    <div class="example-box">
      <h4>Form Validation Example</h4>
      <button class="btn btn-success" @click="openFormModal">
        폼 검증 모달
      </button>

      <div class="code-example">
        <pre v-pre><code>&lt;template&gt;
  &lt;Modal
    title="사용자 등록"
    :confirm-disabled="!isFormValid"
    confirm-text="등록"
    @confirm="handleSubmit"
  &gt;
    &lt;div class="form-group"&gt;
      &lt;label&gt;이름 *&lt;/label&gt;
      &lt;input v-model="form.name" type="text" /&gt;
      &lt;span v-if="errors.name" class="error"&gt;{{ errors.name }}&lt;/span&gt;
    &lt;/div&gt;

    &lt;div class="form-group"&gt;
      &lt;label&gt;이메일 *&lt;/label&gt;
      &lt;input v-model="form.email" type="email" /&gt;
      &lt;span v-if="errors.email" class="error"&gt;{{ errors.email }}&lt;/span&gt;
    &lt;/div&gt;
  &lt;/Modal&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, computed } from 'vue';
import { closeModal } from 'jenesius-vue-modal';

const form = ref({
  name: '',
  email: '',
});

const errors = ref({
  name: '',
  email: '',
});

const isFormValid = computed(() => {
  return form.value.name.length >= 2 && 
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email);
});

const handleSubmit = () => {
  if (!isFormValid.value) return;
  
  console.log('제출:', form.value);
  closeModal();
};
&lt;/script&gt;</code></pre>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { openModal } from "jenesius-vue-modal";
import Modal from "../Modal.vue";

const modalEventLog = ref<string[]>([]);

const openBasicModal = () => {
  openModal(Modal, {
    title: "기본 모달",
  });
};

const openModal = (size: string) => {
  openModal(Modal, {
    title: `${size.toUpperCase()} 크기 모달`,
    size: size as any,
  });
};

const openContentModal = () => {
  openModal(Modal, {
    title: "컨텐츠 모달",
    size: "md",
  });
};

const openConfirmModal = () => {
  openModal(Modal, {
    title: "확인하시겠습니까?",
    showCancelButton: true,
    showConfirmButton: true,
  });
};

const openDeleteModal = () => {
  openModal(Modal, {
    title: "정말 삭제하시겠습니까?",
    confirmType: "danger",
    confirmText: "삭제",
  });
};

const openSaveModal = () => {
  openModal(Modal, {
    title: "저장하시겠습니까?",
    confirmType: "success",
    confirmText: "저장",
  });
};

const openNoButtonsModal = () => {
  openModal(Modal, {
    title: "버튼 없는 모달",
    showCancelButton: false,
    showConfirmButton: false,
  });
};

const openDisabledModal = () => {
  openModal(Modal, {
    title: "비활성화 테스트",
    confirmDisabled: true,
  });
};

const openEventModal = () => {
  modalEventLog.value = [];
  openModal(Modal, {
    title: "이벤트 테스트",
  }).then(() => {
    modalEventLog.value.push("모달이 닫혔습니다");
  });
};

const openCustomHeaderModal = () => {
  openModal(Modal, {
    title: "커스텀 헤더",
  });
};

const openCustomFooterModal = () => {
  openModal(Modal, {
    title: "커스텀 푸터",
  });
};

const openNoCloseButton = () => {
  openModal(Modal, {
    title: "닫기 버튼 없음",
    showClose: false,
  });
};

const openNoOverlayClose = () => {
  openModal(Modal, {
    title: "오버레이 클릭 무시",
    closeOnOverlay: false,
  });
};

const openNoEscClose = () => {
  openModal(Modal, {
    title: "ESC 키 작동 (기본)",
  });
};

const openFormModal = () => {
  openModal(Modal, {
    title: "폼 검증 모달",
    size: "md",
  });
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

.modal-demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.event-log {
  background: $color-bg-light;
  padding: $spacing-md;
  border-radius: $radius-sm;
  margin-top: $spacing-md;

  ul {
    list-style: none;
    padding: 0;
    margin-top: $spacing-xs;
  }

  li {
    font-size: $font-size-xs;
    padding: $spacing-xs 0;
    border-bottom: 1px solid $color-border-light;

    &:last-child {
      border-bottom: none;
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
  .modal-demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
