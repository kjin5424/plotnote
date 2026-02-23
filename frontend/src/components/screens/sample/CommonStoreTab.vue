<template>
  <div>
    <h2 class="section-title">commonStore</h2>
    <p class="section-desc">
      <strong>commonStore</strong>는 앱 전반의 로딩·에러·브레드크럼·알림 상태를
      관리합니다.
    </p>

    <!-- ==================== commonStore ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">commonStore — 로딩 상태</h3>
      <p class="desc-text">
        <code>setLoading(true)</code> 호출 후 300ms 디바운스로
        <code>loadingCount</code>를 올립니다. 빠른 요청은 로딩 UI가 나타나지
        않아 깜빡임을 방지합니다. <code>isLoading</code>은
        <code>loading || loadingCount > 0</code>입니다.
      </p>

      <div class="code-block">
        <pre><code>import { useCommonStore } from '@/stores/commonStore';
const commonStore = useCommonStore();

// axiosConfig 인터셉터에서 자동 호출 — 직접 호출 불필요
commonStore.setLoading(true);   // 300ms 후 loadingCount++
commonStore.setLoading(false);  // 카운터 감소

// 강제 초기화 (에러 복구 등)
commonStore.resetLoading();

// 템플릿에서
// &lt;Loading v-if="commonStore.isLoading" /&gt;</code></pre>
      </div>
    </section>

    <section class="style-section">
      <h3 class="subsection-title">commonStore — 에러 / 브레드크럼 / 알림</h3>

      <div class="code-block">
        <pre><code>// ── 에러 ──────────────────────────────────────────────────────────
commonStore.setError('서버 오류가 발생했습니다.');  // error 설정 + 에러 알림 자동 추가
commonStore.clearError();                          // error = null

// ── 브레드크럼 ────────────────────────────────────────────────────
// 홈이 없으면 자동으로 { label: '홈', path: '/' } 앞에 삽입
commonStore.setBreadcrumbs([
  { label: '강의 관리', path: '/courses' },
  { label: '강의 상세' },           // path 없으면 링크 없음 (현재 위치)
]);

commonStore.addBreadcrumb({ label: '수강생 목록' });  // 맨 뒤에 추가
commonStore.clearBreadcrumbs();                      // 홈만 남김

// ── 알림 (토스트) ─────────────────────────────────────────────────
commonStore.showSuccess('저장되었습니다.');            // 3초 후 자동 제거
commonStore.showError('삭제에 실패했습니다.', 5000);  // 5초
commonStore.showWarning('미저장 변경사항이 있습니다.'); // 4초
commonStore.showInfo('새 공지사항이 있습니다.');

// 수동 추가 / 제거
const id = commonStore.addNotification({ type: 'success', message: '완료', duration: 2000 });
commonStore.removeNotification(id);
commonStore.clearAllNotifications();</code></pre>
      </div>

      <div class="table-wrap">
        <table class="ref-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>타입 / 시그니처</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            <tr class="group-row">
              <td colspan="3">State / Getters</td>
            </tr>
            <tr v-for="r in commonRows" :key="r.name">
              <td>
                <code>{{ r.name }}</code>
              </td>
              <td>
                <code class="type">{{ r.type }}</code>
              </td>
              <td>{{ r.desc }}</td>
            </tr>
          </tbody>
        </table>
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
    desc: "취소/확인 다이얼로그 — true: 확인, false: 취소",
  },
  {
    name: "deleteConfirm(message?)",
    ret: "Promise<boolean>",
    desc: "삭제 전용 — danger 색상, 기본 메시지 제공",
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
