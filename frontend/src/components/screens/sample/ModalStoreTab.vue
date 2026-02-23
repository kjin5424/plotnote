<template>
  <div>
    <h2 class="section-title">modalStore</h2>
    <p class="section-desc">
      <strong>modalStore</strong>는 SweetAlert2 다이얼로그의 Pinia 래퍼입니다.
    </p>
    <section class="style-section">
      <h3 class="subsection-title">modalStore — SweetAlert2 래퍼</h3>

      <!-- 라이브 데모 -->
      <div class="demo-box">
        <p class="demo-label">Live Demo — 실제 다이얼로그 확인</p>
        <div class="modal-demo-grid">
          <button
            v-for="btn in demoButtons"
            :key="btn.label"
            class="btn"
            :class="btn.cls"
            @click="runDemo(btn)"
          >
            {{ btn.label }}
          </button>
        </div>
        <div v-if="demoResult" class="demo-result">
          결과: <strong>{{ demoResult }}</strong>
        </div>
      </div>

      <!-- 메서드 레퍼런스 -->
      <div class="table-wrap">
        <table class="ref-table">
          <thead>
            <tr>
              <th>메서드</th>
              <th>반환</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in modalRows" :key="r.name">
              <td>
                <code>{{ r.name }}</code>
              </td>
              <td>
                <code class="type">{{ r.ret }}</code>
              </td>
              <td>{{ r.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ==================== modalStore 사용 패턴 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">modalStore 사용 패턴</h3>

      <div class="pattern-grid">
        <div v-for="p in patterns" :key="p.title" class="pattern-card">
          <div class="pattern-header">
            <span class="pattern-icon">{{ p.icon }}</span>
            <span class="pattern-title">{{ p.title }}</span>
          </div>
          <div class="code-block-sm">
            <pre><code>{{ p.code }}</code></pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Swal from "sweetalert2";

const demoResult = ref("");

const demoButtons = [
  { label: "confirm", cls: "btn-primary", action: "confirm" },
  { label: "deleteConfirm", cls: "btn-danger", action: "deleteConfirm" },
  { label: "success", cls: "btn-success", action: "success" },
  { label: "error", cls: "btn-danger", action: "error" },
  { label: "warning", cls: "btn-secondary", action: "warning" },
  { label: "info", cls: "btn-primary-outline", action: "info" },
];

const runDemo = async (btn: any) => {
  demoResult.value = "";
  if (btn.action === "confirm") {
    const res = await Swal.fire({
      title: "저장 확인",
      text: "저장하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      confirmButtonColor: "#4a90e2",
      cancelButtonColor: "#95a5a6",
    });
    demoResult.value = res.isConfirmed ? "✅ 확인" : "❌ 취소";
  } else if (btn.action === "deleteConfirm") {
    const res = await Swal.fire({
      title: "삭제 확인",
      text: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#95a5a6",
    });
    demoResult.value = res.isConfirmed ? "✅ 삭제 진행" : "❌ 취소";
  } else if (btn.action === "success") {
    await Swal.fire({
      title: "성공",
      text: "저장되었습니다.",
      icon: "success",
      confirmButtonText: "확인",
      confirmButtonColor: "#a4d96c",
    });
    demoResult.value = "알림 닫힘";
  } else if (btn.action === "error") {
    await Swal.fire({
      title: "오류",
      text: "서버 오류가 발생했습니다.",
      icon: "error",
      confirmButtonText: "확인",
      confirmButtonColor: "#e74c3c",
    });
    demoResult.value = "알림 닫힘";
  } else if (btn.action === "warning") {
    await Swal.fire({
      title: "경고",
      text: "권한이 없습니다.",
      icon: "warning",
      confirmButtonText: "확인",
      confirmButtonColor: "#f39c12",
    });
    demoResult.value = "알림 닫힘";
  } else if (btn.action === "info") {
    await Swal.fire({
      title: "알림",
      text: "새로운 공지사항이 있습니다.",
      icon: "info",
      confirmButtonText: "확인",
      confirmButtonColor: "#4a90e2",
    });
    demoResult.value = "알림 닫힘";
  }
};

const commonRows = [
  {
    name: "isLoading",
    type: "boolean",
    desc: "loading || loadingCount > 0 — axiosConfig가 자동 관리",
  },
  { name: "hasError", type: "boolean", desc: "error !== null" },
  {
    name: "currentBreadcrumbs",
    type: "Breadcrumb[]",
    desc: "현재 브레드크럼 목록 (항상 홈 포함)",
  },
  {
    name: "activeNotifications",
    type: "Notification[]",
    desc: "현재 표시 중인 알림 목록 (duration 후 자동 제거)",
  },
  {
    name: "resetStore()",
    type: "void",
    desc: "모든 상태 초기화 — 로그아웃 시 호출",
  },
];

const modalRows = [
  {
    name: "confirm(message, title?)",
    ret: "Promise<boolean>",
    desc: "취소/확인 다이얼로그. true: 확인, false: 취소",
  },
  {
    name: "deleteConfirm(message?)",
    ret: "Promise<boolean>",
    desc: "삭제 전용. danger 색상, 기본 메시지 제공",
  },
  {
    name: "success(message, title?)",
    ret: "Promise<SwalResult>",
    desc: "성공 알림 (확인 버튼만)",
  },
  {
    name: "error(message, title?)",
    ret: "Promise<SwalResult>",
    desc: "에러 알림",
  },
  {
    name: "warning(message, title?)",
    ret: "Promise<SwalResult>",
    desc: "경고 알림",
  },
  {
    name: "info(message, title?)",
    ret: "Promise<SwalResult>",
    desc: "정보 알림",
  },
];

const patterns = [
  {
    icon: "🗑️",
    title: "삭제 — 확인 후 API 호출",
    code: `const modalStore = useModalStore();

const handleDelete = async (id: number) => {
  const ok = await modalStore.deleteConfirm();
  if (!ok) return;   // 취소 시 중단

  await deleteItem(id);
  await modalStore.success('삭제되었습니다.');
  await fetchList();  // 목록 갱신
};`,
  },
  {
    icon: "💾",
    title: "저장 — confirm → API → 결과 알림",
    code: `const handleSave = async () => {
  const ok = await modalStore.confirm(
    '저장하시겠습니까?', '저장 확인'
  );
  if (!ok) return;

  try {
    await saveData(formValues);
    await modalStore.success('저장되었습니다.');
  } catch {
    await modalStore.error('저장에 실패했습니다.');
  }
};`,
  },
  {
    icon: "📤",
    title: "폼 제출 — 수정 불가 경고 후 submit",
    code: `const handleSubmit = async () => {
  const ok = await modalStore.confirm(
    '제출 후에는 수정이 불가능합니다. 계속하시겠습니까?',
    '제출 확인'
  );
  if (!ok) return;

  await submitExam(answers.value);
  await modalStore.success('제출되었습니다.');
  router.push('/stu/exams');
};`,
  },
  {
    icon: "🚪",
    title: "로그아웃 — 확인 후 세션 종료",
    code: `const handleLogout = async () => {
  const ok = await modalStore.confirm(
    '로그아웃 하시겠습니까?'
  );
  if (!ok) return;

  await authStore.logout();
  router.push('/login');
};`,
  },
  {
    icon: "🔄",
    title: "권한 변경 — 위험 작업 경고",
    code: `const handleRoleChange = async (userId: number, role: string) => {
  const ok = await modalStore.confirm(
    '사용자 권한을 변경하시겠습니까?',
    '권한 변경'
  );
  if (!ok) return;

  await updateUserRole(userId, role);
  await modalStore.success('권한이 변경되었습니다.');
  await fetchUserList();
};`,
  },
  {
    icon: "⚠️",
    title: "페이지 이탈 방지 — 미저장 경고",
    code: `// router guard에서
onBeforeRouteLeave(async (to, from, next) => {
  if (!isDirty.value) { next(); return; }

  const ok = await modalStore.confirm(
    '저장되지 않은 변경사항이 있습니다. 페이지를 벗어나시겠습니까?',
    '페이지 이탈'
  );
  ok ? next() : next(false);
});`,
  },
];

const otherStores = [
  {
    name: "searchStore",
    desc: "searchValue + searchType 상태 보관. setSearchState(q, type) / reset()",
    note: "→ usePagination / useTables가 내부적으로 참조",
  },
  {
    name: "calendarStore",
    desc: "viewDate(dayjs), nextMonth / prevMonth / setToday 액션",
    note: "→ Calendar.vue 내부에서만 사용",
  },
  {
    name: "tooltipStore",
    desc: "v-tooltip 디렉티브가 show/hide로 제어. 직접 호출 불필요",
    note: "→ tooltipDirectives.ts가 자동 관리",
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
  strong {
    color: $color-text-primary;
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
.desc-text {
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin-bottom: $spacing-md;
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

.demo-box {
  padding: $spacing-xl;
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  margin-bottom: $spacing-md;
}
.demo-label {
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  color: $color-text-light;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: $spacing-md;
}
.modal-demo-grid {
  display: flex;
  gap: $spacing-sm;
  flex-wrap: wrap;
  margin-bottom: $spacing-md;
}
.demo-result {
  padding: 8px 14px;
  background: $color-bg-light;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  color: $color-text-secondary;
  strong {
    color: $color-text-primary;
  }
}

.table-wrap {
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  overflow: hidden;
  margin-top: $spacing-md;
  margin-bottom: $spacing-md;
}
.ref-table {
  width: 100%;
  border-collapse: collapse;
  th {
    padding: 9px 14px;
    background: $color-bg-light;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text-secondary;
    text-align: left;
    border-bottom: 1px solid $color-border-light;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  td {
    padding: 8px 14px;
    border-bottom: 1px solid $color-border-light;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    vertical-align: middle;
  }
  tr:last-child td {
    border-bottom: none;
  }
  code {
    background: #eff6ff;
    color: #1d4ed8;
    padding: 2px 7px;
    border-radius: $radius-sm;
    font-size: $font-size-xs;
    font-family: monospace;
    white-space: nowrap;
  }
  .type {
    background: #f0fdf4;
    color: #15803d;
  }
  .group-row td {
    background: $color-bg-light;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text-light;
    padding: 5px 14px;
  }
}

// 패턴 그리드
.pattern-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-lg;
}
.pattern-card {
  background: white;
  border: 1px solid $color-border-light;
  border-radius: $radius-md;
  overflow: hidden;
}
.pattern-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: $spacing-md $spacing-md $spacing-sm;
  border-bottom: 1px solid $color-border-light;
  background: $color-bg-light;
}
.pattern-icon {
  font-size: 18px;
}
.pattern-title {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
}
.code-block-sm {
  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: $spacing-md;
    margin: 0;
    font-size: 12px;
    line-height: 1.55;
    overflow-x: auto;
    code {
      font-family: "Consolas", monospace;
      white-space: pre;
    }
  }
}

.other-stores-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
}
.other-store-card {
  padding: $spacing-md;
  background: white;
  border: 1px solid $color-border-light;
  border-radius: $radius-md;
}
.store-name {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-primary;
  font-family: monospace;
  margin-bottom: 4px;
}
.store-desc {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  line-height: 1.5;
  margin-bottom: 6px;
}
.store-skip {
  font-size: $font-size-xs;
  color: $color-text-light;
  border-top: 1px solid $color-border-light;
  padding-top: 6px;
}

.code-block {
  background: $color-bg-light;
  border-radius: $radius-md;
  border-left: 4px solid $color-primary;
  overflow: hidden;
  margin-bottom: $spacing-md;
  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: $spacing-md;
    margin: 0;
    font-size: $font-size-sm;
    line-height: 1.6;
    overflow-x: auto;
    code {
      font-family: "Consolas", monospace;
      white-space: pre;
    }
  }
}
</style>
