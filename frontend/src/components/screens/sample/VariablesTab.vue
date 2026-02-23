<template>
  <div>
    <h2 class="section-title">Variables (CSS Design Tokens)</h2>

    <!-- Color Tokens -->
    <section class="style-section">
      <h3 class="subsection-title clickable" @click="showExample('colors')">
        Color Tokens
        <span class="example-badge">예시 보기</span>
      </h3>

      <div class="color-group">
        <h4>Primary Colors</h4>
        <div class="color-grid">
          <div class="color-item">
            <div class="color-box cb-primary"></div>
            <span class="color-name">$color-primary</span>
            <span class="color-value">#4a90e2</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-primary-light"></div>
            <span class="color-name">$color-primary-light</span>
            <span class="color-value">#6ba3e8</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-primary-dark"></div>
            <span class="color-name">$color-primary-dark</span>
            <span class="color-value">#3a7bc8</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-primary-hover"></div>
            <span class="color-name">$color-primary-hover</span>
            <span class="color-value">#0056b3</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-primary-active"></div>
            <span class="color-name">$color-primary-active</span>
            <span class="color-value">#004085</span>
          </div>
        </div>
      </div>

      <div class="color-group">
        <h4>Secondary Colors</h4>
        <div class="color-grid">
          <div class="color-item">
            <div class="color-box cb-secondary"></div>
            <span class="color-name">$color-secondary</span>
            <span class="color-value">#eff2f1</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-secondary-light"></div>
            <span class="color-name">$color-secondary-light</span>
            <span class="color-value">#f7f9f8</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-secondary-dark"></div>
            <span class="color-name">$color-secondary-dark</span>
            <span class="color-value">#d8dedd</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-secondary-hover"></div>
            <span class="color-name">$color-secondary-hover</span>
            <span class="color-value">#e0e5e3</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-secondary-active"></div>
            <span class="color-name">$color-secondary-active</span>
            <span class="color-value">#d0d6d4</span>
          </div>
        </div>
      </div>

      <div class="color-group">
        <h4>Success Colors (연두색)</h4>
        <div class="color-grid">
          <div class="color-item">
            <div class="color-box cb-success"></div>
            <span class="color-name">$color-success</span>
            <span class="color-value">#8ac926</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-success-light"></div>
            <span class="color-name">$color-success-light</span>
            <span class="color-value">#a8d65e</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-success-dark"></div>
            <span class="color-name">$color-success-dark</span>
            <span class="color-value">#6fa41e</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-success-hover"></div>
            <span class="color-name">$color-success-hover</span>
            <span class="color-value">#78b120</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-success-active"></div>
            <span class="color-name">$color-success-active</span>
            <span class="color-value">#75b31f</span>
          </div>
        </div>
      </div>

      <div class="color-group">
        <h4>Danger Colors (빨강)</h4>
        <div class="color-grid">
          <div class="color-item">
            <div class="color-box cb-danger"></div>
            <span class="color-name">$color-danger</span>
            <span class="color-value">#db3a34</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-danger-light"></div>
            <span class="color-name">$color-danger-light</span>
            <span class="color-value">#e66661</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-danger-dark"></div>
            <span class="color-name">$color-danger-dark</span>
            <span class="color-value">#a81610</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-danger-hover"></div>
            <span class="color-name">$color-danger-hover</span>
            <span class="color-value">#d10c05</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-danger-active"></div>
            <span class="color-name">$color-danger-active</span>
            <span class="color-value">#c23329</span>
          </div>
        </div>
      </div>

      <div class="color-group">
        <h4>Warning Colors (주황)</h4>
        <div class="color-grid">
          <div class="color-item">
            <div class="color-box cb-warning"></div>
            <span class="color-name">$color-warning</span>
            <span class="color-value">#ff9505</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-warning-light"></div>
            <span class="color-name">$color-warning-light</span>
            <span class="color-value">#ffad3d</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-warning-dark"></div>
            <span class="color-name">$color-warning-dark</span>
            <span class="color-value">#df5e08</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-warning-hover"></div>
            <span class="color-name">$color-warning-hover</span>
            <span class="color-value">#e66a04</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-warning-active"></div>
            <span class="color-name">$color-warning-active</span>
            <span class="color-value">#ec8600</span>
          </div>
        </div>
      </div>

      <div class="color-group">
        <h4>Gray Scale</h4>
        <div class="color-grid">
          <div class="color-item">
            <div class="color-box cb-gray-50"></div>
            <span class="color-name">$color-gray-50</span>
            <span class="color-value">#f7f8f9</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-gray-100"></div>
            <span class="color-name">$color-gray-100</span>
            <span class="color-value">#e8ebed</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-gray-200"></div>
            <span class="color-name">$color-gray-200</span>
            <span class="color-value">#c9cdd2</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-gray-400"></div>
            <span class="color-name">$color-gray-400</span>
            <span class="color-value">#9ea4aa</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-gray-500"></div>
            <span class="color-name">$color-gray-500</span>
            <span class="color-value">#72787f</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-gray-600"></div>
            <span class="color-name">$color-gray-600</span>
            <span class="color-value">#454c53</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-gray-800"></div>
            <span class="color-name">$color-gray-800</span>
            <span class="color-value">#26282b</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-gray-900"></div>
            <span class="color-name">$color-gray-900</span>
            <span class="color-value">#1b1d1f</span>
          </div>
        </div>
      </div>

      <div class="color-group">
        <h4>Disabled Colors</h4>
        <div class="color-grid">
          <div class="color-item">
            <div class="color-box cb-disabled"></div>
            <span class="color-name">$color-disabled</span>
            <span class="color-value">#d5dbdb</span>
          </div>
          <div class="color-item">
            <div class="color-box cb-disabled-text"></div>
            <span class="color-name">$color-disabled-text</span>
            <span class="color-value">#454c53</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Background Colors -->
    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('background-colors')"
      >
        Background Colors
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="text-token-list">
        <div class="token-item">
          <span class="token-name tok-bg-white">$color-bg-white</span>
          <span class="token-value">#ffffff</span>
        </div>
        <div class="token-item">
          <span class="token-name tok-bg-light">$color-bg-light</span>
          <span class="token-value">#f8f9fa</span>
        </div>
        <div class="token-item">
          <span class="token-name tok-bg-gray">$color-bg-gray</span>
          <span class="token-value">#e9ecef</span>
        </div>
      </div>
    </section>

    <!-- Text Colors -->
    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('text-colors')"
      >
        Text Colors
        <span class="example-badge">예시 보기</span>
      </h3>
      <div
        class="text-token-list"
        style="
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: center;
        "
      >
        <div style="display: flex; flex-direction: column; width: 100%">
          <div class="token-item">
            <span class="token-name tok-text-primary"
              >$color-text-primary</span
            >
            <span class="token-value">#2c3e50</span>
          </div>
          <div class="token-item">
            <span class="token-name tok-text-secondary"
              >$color-text-secondary</span
            >
            <span class="token-value">#7f8c8d</span>
          </div>
          <div class="token-item">
            <span class="token-name tok-text-light">$color-text-light</span>
            <span class="token-value">#95a5a6</span>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; width: 100%">
          <div class="token-item">
            <span class="token-name tok-text-success"
              >$color-text-success</span
            >
            <span class="token-value">#8ac926</span>
          </div>
          <div class="token-item">
            <span class="token-name tok-text-danger">$color-text-danger</span>
            <span class="token-value">#db3a34</span>
          </div>
          <div class="token-item">
            <span class="token-name tok-text-warning"
              >$color-text-warning</span
            >
            <span class="token-value">#ff9505</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Typography -->
    <section class="style-section">
      <h3 class="subsection-title clickable" @click="showExample('typography')">
        Typography Scale
        <span class="example-badge">예시 보기</span>
      </h3>

      <div class="typography-demo">
        <div class="typo-item">
          <h1>Heading 1 (32px, 600, 1.2)</h1>
          <p class="typo-meta">
            $font-size-4xl, $font-weight-semibold, $line-height-tight
          </p>
        </div>
        <div class="typo-item">
          <h2>Heading 2 (24px, 600, 1.2)</h2>
          <p class="typo-meta">
            $font-size-3xl, $font-weight-semibold, $line-height-tight
          </p>
        </div>
        <div class="typo-item">
          <h3>Heading 3 (20px, 600, 1.2)</h3>
          <p class="typo-meta">
            $font-size-2xl, $font-weight-semibold, $line-height-tight
          </p>
        </div>
        <div class="typo-item">
          <p class="typo-body-lg">Body Large (16px, 400, 1.5)</p>
          <p class="typo-meta">
            $font-size-lg, $font-weight-normal, $line-height-normal
          </p>
        </div>
        <div class="typo-item">
          <p class="typo-body-base">Body Base (14px, 400, 1.5)</p>
          <p class="typo-meta">
            $font-size-base, $font-weight-normal, $line-height-normal
          </p>
        </div>
        <div class="typo-item">
          <p class="typo-body-sm">Body Small (12px, 400, 1.5)</p>
          <p class="typo-meta">
            $font-size-xs, $font-weight-normal, $line-height-normal
          </p>
        </div>
      </div>
    </section>

    <!-- Spacing -->
    <section class="style-section">
      <h3 class="subsection-title clickable" @click="showExample('spacing')">
        Spacing Scale
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="spacing-list">
        <div class="spacing-item">
          <div class="spacing-box sp-xs"></div>
          <span class="spacing-label">$spacing-xs</span>
          <span class="spacing-value">4px</span>
        </div>
        <div class="spacing-item">
          <div class="spacing-box sp-sm"></div>
          <span class="spacing-label">$spacing-sm</span>
          <span class="spacing-value">8px</span>
        </div>
        <div class="spacing-item">
          <div class="spacing-box sp-md"></div>
          <span class="spacing-label">$spacing-md</span>
          <span class="spacing-value">12px</span>
        </div>
        <div class="spacing-item">
          <div class="spacing-box sp-lg"></div>
          <span class="spacing-label">$spacing-lg</span>
          <span class="spacing-value">16px</span>
        </div>
        <div class="spacing-item">
          <div class="spacing-box sp-xl"></div>
          <span class="spacing-label">$spacing-xl</span>
          <span class="spacing-value">24px</span>
        </div>
        <div class="spacing-item">
          <div class="spacing-box sp-2xl"></div>
          <span class="spacing-label">$spacing-2xl</span>
          <span class="spacing-value">32px</span>
        </div>
        <div class="spacing-item">
          <div class="spacing-box sp-3xl"></div>
          <span class="spacing-label">$spacing-3xl</span>
          <span class="spacing-value">48px</span>
        </div>
      </div>
    </section>

    <!-- Border Radius -->
    <section class="style-section">
      <h3 class="subsection-title clickable" @click="showExample('radius')">
        Border Radius
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="radius-grid">
        <div class="radius-item">
          <div class="radius-box rd-sm"></div>
          <span class="radius-label">$radius-sm</span>
          <span class="radius-value">4px</span>
        </div>
        <div class="radius-item">
          <div class="radius-box rd-md"></div>
          <span class="radius-label">$radius-md</span>
          <span class="radius-value">8px</span>
        </div>
        <div class="radius-item">
          <div class="radius-box rd-lg"></div>
          <span class="radius-label">$radius-lg</span>
          <span class="radius-value">12px</span>
        </div>
        <div class="radius-item">
          <div class="radius-box rd-xl"></div>
          <span class="radius-label">$radius-xl</span>
          <span class="radius-value">16px</span>
        </div>
        <div class="radius-item">
          <div class="radius-box rd-round"></div>
          <span class="radius-label">$radius-round</span>
          <span class="radius-value">50%</span>
        </div>
      </div>
    </section>

    <!-- Shadows -->
    <section class="style-section">
      <h3 class="subsection-title clickable" @click="showExample('shadows')">
        Shadow Tokens
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="shadow-grid">
        <div class="shadow-item sd-sm">
          <span class="shadow-label">$shadow-sm</span>
          <span class="shadow-value">0 1px 3px rgba(0,0,0,0.08)</span>
        </div>
        <div class="shadow-item sd-md">
          <span class="shadow-label">$shadow-md</span>
          <span class="shadow-value">0 2px 6px rgba(0,0,0,0.12)</span>
        </div>
        <div class="shadow-item sd-lg">
          <span class="shadow-label">$shadow-lg</span>
          <span class="shadow-value">0 4px 12px rgba(0,0,0,0.15)</span>
        </div>
        <div class="shadow-item sd-xl">
          <span class="shadow-label">$shadow-xl</span>
          <span class="shadow-value">0 8px 24px rgba(0,0,0,0.18)</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";

const showExample = async (type: string) => {
  const examples: Record<string, string> = {
    colors: `<!-- HTML -->
<div class="success-message">
  <span class="badge badge-success">성공</span>
</div>

// SCSS
.success-message {
  background: $color-success-light; // #b8e186
  color: $color-success-dark; // #8dc74e
  border: 1px solid $color-success; // #a4d96c

  .badge {
    background: $color-success; // 버튼, 뱃지 등에 사용
  }
}`,

    typography: `<!-- HTML -->
<h1>제목입니다</h1>
<p class="fw-semibold fs-lg">강조된 텍스트</p>

// SCSS - Font Sizes
$font-size-xs: 12px;
$font-size-sm: 13px;
$font-size-base: 14px;
$font-size-md: 15px;
$font-size-lg: 16px;
$font-size-xl: 18px;
$font-size-2xl: 20px;
$font-size-3xl: 24px;
$font-size-4xl: 32px;

// Font Weights
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// Line Heights
$line-height-tight: 1.2;
$line-height-normal: 1.5;
$line-height-relaxed: 1.75;

// 사용 예시
.page-title {
  font-size: $font-size-3xl; // 24px
  font-weight: $font-weight-bold; // 700
  line-height: $line-height-tight; // 1.2
}

.description {
  font-size: $font-size-base; // 14px
  font-weight: $font-weight-normal; // 400
  color: $color-text-secondary; // #495057
}`,

    spacing: `// SCSS - Margin 예시
.card {
  margin-top: $spacing-lg; // 16px
  margin-bottom: $spacing-2xl; // 32px
  padding: $spacing-xl; // 24px
}

.button-group {
  gap: $spacing-md; // 12px (flex/grid gap)
}

.section {
  padding: $spacing-3xl; // 48px
}`,

    radius: `// SCSS
.card {
  border-radius: $radius-lg; // 12px
}

.button {
  border-radius: $radius-md; // 8px
}

.avatar {
  border-radius: $radius-round; // 50% (원형)
}

.pill-button {
  border-radius: $radius-full; // 9999px (캡슐형)
}`,

    shadows: `// SCSS
.card {
  box-shadow: $shadow-md; // 기본 카드
}

.dropdown {
  box-shadow: $shadow-lg; // 드롭다운 메뉴
}

.modal {
  box-shadow: $shadow-xl; // 모달, 중요한 컴포넌트
}

.button:hover {
  box-shadow: $shadow-sm; // 호버 효과
}`,

    "background-colors": `// SCSS
.page {
  background: $color-bg-white; // #ffffff
}

.section {
  background: $color-bg-light; // #f8f9fa
}

.disabled-input {
  background: $color-bg-gray; // #e9ecef
}`,

    "text-colors": `// SCSS
h1 {
  color: $color-text-primary; // #212529 - 주요 텍스트
}

p {
  color: $color-text-secondary; // #495057 - 본문 텍스트
}

.description {
  color: $color-text-muted; // #6c757d - 부가 설명
}

.placeholder {
  color: $color-text-light; // #adb5bd - placeholder
}`,
  };

  const code = examples[type] || "예시 코드가 없습니다.";

  await Swal.fire({
    title: `${getTitleByType(type)} 코드 예시`,
    html: `<pre style="text-align: left; max-height: 400px; overflow-y: auto; background: #f5f5f5; padding: 16px; border-radius: 8px; font-size: 13px;"><code>${escapeHtml(code)}</code></pre>`,
    width: "800px",
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
        .catch((err) => {
          console.error("클립보드 복사 실패:", err);
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

const escapeHtml = (text: string): string => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

const getTitleByType = (type: string): string => {
  const titles: Record<string, string> = {
    colors: "Color Tokens",
    typography: "Typography Scale",
    spacing: "Spacing Scale",
    radius: "Border Radius",
    shadows: "Shadow Tokens",
    "background-colors": "Background Colors",
    "text-colors": "Text Colors",
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

.subsection-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-lg;
  display: flex;
  align-items: center;
  gap: $spacing-md;

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

.style-section {
  margin-bottom: $spacing-3xl;

  h4 {
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
    color: $color-text-secondary;
    margin-bottom: $spacing-md;
    margin-top: $spacing-lg;
  }
}

.color-group {
  margin-bottom: $spacing-2xl;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: $spacing-lg;
  margin-top: $spacing-md;
}

.color-item {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.color-box {
  width: 100%;
  height: 80px;
  border-radius: $radius-md;
  box-shadow: $shadow-sm;
  border: 1px solid $color-border-light;
}

// ===== Color Box Classes =====
// Primary
.cb-primary { background-color: $color-primary; }
.cb-primary-light { background-color: $color-primary-light; }
.cb-primary-dark { background-color: $color-primary-dark; }
.cb-primary-hover { background-color: $color-primary-hover; }
.cb-primary-active { background-color: $color-primary-active; }

// Secondary
.cb-secondary { background-color: $color-secondary; }
.cb-secondary-light { background-color: $color-secondary-light; }
.cb-secondary-dark { background-color: $color-secondary-dark; }
.cb-secondary-hover { background-color: $color-secondary-hover; }
.cb-secondary-active { background-color: $color-secondary-active; }

// Success
.cb-success { background-color: $color-success; }
.cb-success-light { background-color: $color-success-light; }
.cb-success-dark { background-color: $color-success-dark; }
.cb-success-hover { background-color: $color-success-hover; }
.cb-success-active { background-color: $color-success-active; }

// Danger
.cb-danger { background-color: $color-danger; }
.cb-danger-light { background-color: $color-danger-light; }
.cb-danger-dark { background-color: $color-danger-dark; }
.cb-danger-hover { background-color: $color-danger-hover; }
.cb-danger-active { background-color: $color-danger-active; }

// Warning
.cb-warning { background-color: $color-warning; }
.cb-warning-light { background-color: $color-warning-light; }
.cb-warning-dark { background-color: $color-warning-dark; }
.cb-warning-hover { background-color: $color-warning-hover; }
.cb-warning-active { background-color: $color-warning-active; }

// Gray Scale
.cb-gray-50 { background-color: $color-gray-50; }
.cb-gray-100 { background-color: $color-gray-100; }
.cb-gray-200 { background-color: $color-gray-200; }
.cb-gray-400 { background-color: $color-gray-400; }
.cb-gray-500 { background-color: $color-gray-500; }
.cb-gray-600 { background-color: $color-gray-600; }
.cb-gray-800 { background-color: $color-gray-800; }
.cb-gray-900 { background-color: $color-gray-900; }

// Disabled
.cb-disabled { background-color: $color-disabled; }
.cb-disabled-text { background-color: $color-disabled-text; }

.color-name {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $color-text-primary;
  font-family: monospace;
}

.color-value {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  font-family: monospace;
}

.typography-demo {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  margin-bottom: $spacing-2xl;
}

.typo-item {
  padding: $spacing-md;
  border-left: 3px solid $color-primary;
  background: $color-bg-light;
}

.typo-body-lg { font-size: $font-size-lg; }
.typo-body-base { font-size: $font-size-base; }
.typo-body-sm { font-size: $font-size-xs; }

.typo-meta {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  font-family: monospace;
  margin-top: $spacing-xs;
}

.spacing-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.spacing-item {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
}

.spacing-box {
  height: 20px;
  border-radius: $radius-sm;
  background-color: $color-primary;
}

// ===== Spacing Width Classes =====
.sp-xs { width: $spacing-xs; }
.sp-sm { width: $spacing-sm; }
.sp-md { width: $spacing-md; }
.sp-lg { width: $spacing-lg; }
.sp-xl { width: $spacing-xl; }
.sp-2xl { width: $spacing-2xl; }
.sp-3xl { width: $spacing-3xl; }

.spacing-label {
  font-weight: $font-weight-medium;
  font-family: monospace;
  min-width: 120px;
}

.spacing-value {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  font-family: monospace;
}

.radius-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: $spacing-xl;
}

.radius-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-md;
}

.radius-box {
  width: 100px;
  height: 100px;
  background: $color-primary;
}

// ===== Border Radius Classes =====
.rd-sm { border-radius: $radius-sm; }
.rd-md { border-radius: $radius-md; }
.rd-lg { border-radius: $radius-lg; }
.rd-xl { border-radius: $radius-xl; }
.rd-round { border-radius: $radius-round; }

.radius-label {
  font-weight: $font-weight-medium;
  font-family: monospace;
}

.radius-value {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  font-family: monospace;
}

.shadow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: $spacing-xl;
}

.shadow-item {
  padding: $spacing-xl;
  background: white;
  border-radius: $radius-md;
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
  align-items: center;
  text-align: center;
}

// ===== Shadow Classes =====
.sd-sm { box-shadow: $shadow-sm; }
.sd-md { box-shadow: $shadow-md; }
.sd-lg { box-shadow: $shadow-lg; }
.sd-xl { box-shadow: $shadow-xl; }

.shadow-label {
  font-weight: $font-weight-semibold;
  font-family: monospace;
  color: $color-text-primary;
}

.shadow-value {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  font-family: monospace;
}

.text-token-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-xl;
  background: $color-bg-light;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
}

.token-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
  background: white;
  border-radius: $radius-sm;
  border: 1px solid $color-border-light;
}

.token-name {
  font-weight: $font-weight-medium;
  font-family: monospace;
}

// ===== Background Token Classes =====
.tok-bg-white { background-color: $color-bg-white; color: $color-text-primary; }
.tok-bg-light { background-color: $color-bg-light; color: $color-text-primary; }
.tok-bg-gray { background-color: $color-bg-gray; color: $color-text-primary; }

// ===== Text Color Token Classes =====
.tok-text-primary { color: $color-text-primary; }
.tok-text-secondary { color: $color-text-secondary; }
.tok-text-light { color: $color-text-light; }
.tok-text-success { color: $color-success; }
.tok-text-danger { color: $color-danger; }
.tok-text-warning { color: $color-warning; }

.token-value {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  font-family: monospace;
}
</style>
