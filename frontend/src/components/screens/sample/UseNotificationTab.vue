<template>
  <div>
    <h2 class="section-title">useNotification</h2>
    <p class="section-desc">
      SweetAlert2를 래핑한 알림 훅입니다. 프로젝트 전체에서 확인 다이얼로그가
      필요할 때
      <code>Swal.fire()</code>를 직접 쓰지 말고 이 훅을 사용하세요.
    </p>

    <section class="style-section">
      <h3 class="subsection-title">confirm — 확인/취소 다이얼로그</h3>
      <p class="description">
        사용자 확인이 필요한 작업(삭제, 초기화 등)에 사용합니다. 확인 버튼을
        누르면 <code>true</code>, 취소하면 <code>false</code>를 반환합니다.
      </p>

      <div class="demo-box demo-center">
        <button class="btn btn-danger" @click="runConfirm">
          삭제 확인 데모 실행
        </button>
        <p
          v-if="confirmResult !== null"
          class="demo-result"
          :class="confirmResult ? 'result--true' : 'result--false'"
        >
          결과: {{ confirmResult ? "✅ 확인 (삭제 진행)" : "❌ 취소" }}
        </p>
      </div>

      <div class="code-explanation">
        <pre><code>import { useNotification } from '@/hooks/useNotification';

const { confirm } = useNotification();

// 기본 사용
const handleDelete = async (id: number) => {
  const ok = await confirm({
    title: '정말 삭제하시겠습니까?',
    text: '삭제 후 복구가 불가능합니다.',
    icon: 'warning',
  });

  if (!ok) return;
  await del(`/api/items/${id}`);
};

// icon 종류: 'warning' | 'error' | 'success' | 'info'
// title, text, icon 모두 선택사항 (기본값: '확인', undefined, 'warning')</code></pre>
        <div class="class-guide">
          <h5>반환값</h5>
          <ul>
            <li><code>true</code> — 확인 버튼 클릭</li>
            <li><code>false</code> — 취소 버튼 클릭 또는 외부 클릭으로 닫기</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Swal from "sweetalert2";

const confirmResult = ref<boolean | null>(null);

const runConfirm = async () => {
  const result = await Swal.fire({
    title: "정말 삭제하시겠습니까?",
    text: "삭제 후 복구가 불가능합니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "확인",
    cancelButtonText: "취소",
  });
  confirmResult.value = result.isConfirmed;
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
.demo-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-md;
}
.demo-result {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  padding: 8px 16px;
  border-radius: $radius-md;
}
.result--true {
  background: #dcfce7;
  color: #166534;
}
.result--false {
  background: #fee2e2;
  color: #991b1b;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: $radius-md;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  cursor: pointer;
}
.btn-danger {
  background: $color-danger;
  color: white;
  &:hover {
    opacity: 0.9;
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
    margin: 0 0 $spacing-sm 0;
    font-size: $font-size-sm;
    line-height: 1.6;
    code {
      font-family: "Consolas", monospace;
      white-space: pre;
    }
  }
}
.class-guide {
  margin-top: $spacing-md;
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
