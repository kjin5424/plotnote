<template>
  <div>
    <h2 class="section-title">Utility Classes</h2>

    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('text-alignment')"
      >
        Text Alignment
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="card">
          <p class="text-left">왼쪽 정렬 (.text-left)</p>
          <p class="text-center">가운데 정렬 (.text-center)</p>
          <p class="text-right">오른쪽 정렬 (.text-right)</p>
        </div>
      </div>
    </section>

    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('font-weights-sizes')"
      >
        Font Weights & Sizes
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="demo-grid-2col">
          <div class="card">
            <h4 class="demo-subtitle">Font Weights</h4>
            <hr />
            <p class="fw-light">.fw-light (Light (300))</p>
            <p class="fw-normal">.fw-normal (Normal (400))</p>
            <p class="fw-medium">.fw-medium (Medium (500))</p>
            <p class="fw-semibold">.fw-semibold (Semibold (600))</p>
            <p class="fw-bold">.fw-bold (Bold (700))</p>
          </div>
          <div class="card">
            <h4 class="demo-subtitle">Font Sizes</h4>
            <hr />
            <p class="fs-xs">.fs-xs (12px)</p>
            <p class="fs-sm">.fs-sm (13px)</p>
            <p class="fs-base">.fs-base (14px)</p>
            <p class="fs-md">.fs-md (15px)</p>
            <p class="fs-lg">.fs-lg (16px)</p>
            <p class="fs-xl">.fs-xl (18px)</p>
          </div>
        </div>
      </div>
    </section>

    <div style="display: flex; flex-direction: row; width: 100%; gap: 20px">
      <section class="style-section" style="width: 100%">
        <h3
          class="subsection-title clickable"
          @click="showExample('background-colors')"
        >
          Background Colors
          <span class="example-badge">예시 보기</span>
        </h3>
        <div class="utility-demo">
          <div class="bg-demo-box bg-white">.bg-white</div>
          <div class="bg-demo-box bg-light">.bg-light</div>
          <div class="bg-demo-box bg-gray">.bg-gray</div>
          <div class="bg-demo-box bg-primary demo-text-white">.bg-primary</div>
          <div class="bg-demo-box bg-success demo-text-white">.bg-success</div>
          <div class="bg-demo-box bg-danger demo-text-white">.bg-danger</div>
        </div>
      </section>
      <section class="style-section" style="width: 100%">
        <h3
          class="subsection-title clickable"
          @click="showExample('text-colors')"
        >
          Text Colors
          <span class="example-badge">예시 보기</span>
        </h3>
        <div class="utility-demo">
          <div class="card">
            <p class="text-primary">.text-primary</p>
            <p class="text-secondary">.text-secondary</p>
            <p class="text-light">.text-light</p>
            <p class="text-success">.text-success</p>
            <p class="text-danger">.text-danger</p>
            <p class="text-warning">.text-warning</p>
            <p class="error-message">.error-message</p>
          </div>
        </div>
      </section>
    </div>
    <section class="style-section">
      <h3 class="subsection-title clickable" @click="showExample('margins')">
        Margins & Paddings
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="demo-grid-2col">
          <!-- Margin Examples -->
          <div>
            <h4 class="demo-subtitle">Margin Examples</h4>
            <div class="demo-dashed-wrapper demo-mb-sm">
              <div class="m-0 demo-margin-box">.m-0 (margin: 0)</div>
            </div>
            <div class="demo-dashed-wrapper demo-mb-sm">
              <div class="mt-xs demo-margin-box">.mt-xs (margin-top: 4px)</div>
            </div>
            <div class="demo-dashed-wrapper demo-mb-sm">
              <div class="mt-sm demo-margin-box">.mt-sm (margin-top: 8px)</div>
            </div>
            <div class="demo-dashed-wrapper demo-mb-sm">
              <div class="mt-md demo-margin-box">.mt-md (margin-top: 12px)</div>
            </div>
            <div class="demo-dashed-wrapper demo-mb-sm">
              <div class="mb-lg demo-margin-box">
                .mb-lg (margin-bottom: 16px)
              </div>
            </div>
            <div class="demo-dashed-wrapper">
              <div class="ml-xl demo-margin-box">
                .ml-xl (margin-left: 24px)
              </div>
            </div>
          </div>

          <!-- Padding Examples -->
          <div>
            <h4 class="demo-subtitle">Padding Examples</h4>
            <div class="p-0 demo-padding-box demo-mb-sm">.p-0 (padding: 0)</div>
            <div class="pt-xs demo-padding-box demo-mb-sm">
              .pt-xs (padding-top: 4px)
            </div>
            <div class="pt-sm demo-padding-box demo-mb-sm">
              .pt-sm (padding-top: 8px)
            </div>
            <div class="pt-md demo-padding-box demo-mb-sm">
              .pt-md (padding-top: 12px)
            </div>
            <div class="pb-lg demo-padding-box demo-mb-sm">
              .pb-lg (padding-bottom: 16px)
            </div>
            <div class="pl-xl demo-padding-box">
              .pl-xl (padding-left: 24px)
            </div>
          </div>
        </div>
        <p class="hint demo-mt-lg">
          사용 가능한 방향: t(top), b(bottom), l(left), r(right) / 크기:
          xs(4px), sm(8px), md(12px), lg(16px), xl(24px)
        </p>
      </div>
    </section>

    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('display-flex')"
      >
        Display & Flex
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <h4 class="demo-subtitle">Display</h4>
        <div class="demo-stack demo-mb-xl">
          <div class="d-block demo-container">.d-block (display: block)</div>
          <div class="demo-container">
            <span class="d-inline demo-block-primary demo-inline-pad">
              .d-inline
            </span>
            <span class="d-inline demo-block-success demo-inline-pad">
              .d-inline
            </span>
          </div>
          <div class="demo-container">
            <span
              class="d-inline-block demo-block-primary demo-inline-block-pad"
            >
              .d-inline-block
            </span>
            <span
              class="d-inline-block demo-block-success demo-inline-block-pad"
            >
              .d-inline-block
            </span>
          </div>
          <div class="d-flex demo-container demo-gap-sm">
            <div class="demo-block-primary demo-pad demo-flex-1">.d-flex</div>
            <div class="demo-block-success demo-pad demo-flex-1">Item</div>
          </div>
          <div class="d-grid demo-container demo-grid-3col demo-gap-sm">
            <div class="demo-block-primary demo-pad demo-text-center">
              .d-grid
            </div>
            <div class="demo-block-success demo-pad demo-text-center">Item</div>
            <div class="demo-block-danger demo-pad demo-text-center">Item</div>
          </div>
        </div>

        <h4 class="demo-subtitle">Flex Direction</h4>
        <div class="demo-stack demo-mb-xl">
          <div class="d-flex flex-row demo-container demo-gap-sm">
            <div class="demo-block-primary demo-pad">.flex-row</div>
            <div class="demo-block-success demo-pad">Item 2</div>
            <div class="demo-block-danger demo-pad">Item 3</div>
          </div>
          <div class="d-flex flex-column demo-container demo-gap-sm">
            <div class="demo-block-primary demo-pad">.flex-column</div>
            <div class="demo-block-success demo-pad">Item 2</div>
            <div class="demo-block-danger demo-pad">Item 3</div>
          </div>
          <div class="d-flex flex-wrap demo-container demo-gap-sm">
            <div class="demo-block-primary demo-pad demo-w-200">.flex-wrap</div>
            <div class="demo-block-success demo-pad demo-w-200">Item 2</div>
            <div class="demo-block-danger demo-pad demo-w-200">Item 3</div>
            <div class="demo-block-warning demo-pad demo-w-200">Item 4</div>
          </div>
        </div>

        <h4 class="demo-subtitle">Justify Content</h4>
        <div class="demo-stack demo-mb-xl">
          <div class="d-flex justify-start demo-container">
            <div class="demo-block-primary demo-pad">.justify-start</div>
          </div>
          <div class="d-flex justify-center demo-container">
            <div class="demo-block-primary demo-pad">.justify-center</div>
          </div>
          <div class="d-flex justify-end demo-container">
            <div class="demo-block-primary demo-pad">.justify-end</div>
          </div>
          <div class="d-flex justify-between demo-container">
            <div class="demo-block-primary demo-pad">Item 1</div>
            <div class="demo-block-success demo-pad">Item 2</div>
            <div class="demo-block-danger demo-pad">.justify-between</div>
          </div>
        </div>

        <h4 class="demo-subtitle">Align Items</h4>
        <div class="demo-stack demo-mb-xl">
          <div class="d-flex align-start demo-container demo-h-80">
            <div class="demo-block-primary demo-pad">.align-start</div>
          </div>
          <div class="d-flex align-center demo-container demo-h-80">
            <div class="demo-block-primary demo-pad">.align-center</div>
          </div>
          <div class="d-flex align-end demo-container demo-h-80">
            <div class="demo-block-primary demo-pad">.align-end</div>
          </div>
        </div>

        <h4 class="demo-subtitle">Flex</h4>
        <div class="demo-stack demo-mb-xl">
          <div class="d-flex demo-container demo-gap-sm">
            <div class="flex-1 demo-block-primary demo-pad">.flex-1</div>
            <div class="demo-block-success demo-pad">고정 크기</div>
          </div>
        </div>

        <h4 class="demo-subtitle">Gap</h4>
        <div class="demo-stack">
          <div class="d-flex gap-xs demo-container">
            <div class="demo-block-primary demo-pad">.gap-xs</div>
            <div class="demo-block-success demo-pad">4px</div>
          </div>
          <div class="d-flex gap-sm demo-container">
            <div class="demo-block-primary demo-pad">.gap-sm</div>
            <div class="demo-block-success demo-pad">8px</div>
          </div>
          <div class="d-flex gap-md demo-container">
            <div class="demo-block-primary demo-pad">.gap-md</div>
            <div class="demo-block-success demo-pad">12px</div>
          </div>
          <div class="d-flex gap-lg demo-container">
            <div class="demo-block-primary demo-pad">.gap-lg</div>
            <div class="demo-block-success demo-pad">16px</div>
          </div>
          <div class="d-flex gap-xl demo-container">
            <div class="demo-block-primary demo-pad">.gap-xl</div>
            <div class="demo-block-success demo-pad">24px</div>
          </div>
        </div>
      </div>
    </section>

    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('border-radius')"
      >
        Border Radius
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="demo-flex-wrap demo-gap-md">
          <div class="radius-demo-box rounded-sm">.rounded-sm</div>
          <div class="radius-demo-box rounded-md">.rounded-md</div>
          <div class="radius-demo-box rounded-lg">.rounded-lg</div>
          <div class="radius-demo-box rounded-xl">.rounded-xl</div>
          <div class="radius-demo-box rounded-full">.rounded-full</div>
        </div>
      </div>
    </section>

    <section class="style-section">
      <h3 class="subsection-title clickable" @click="showExample('shadows')">
        Shadows
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="demo-flex-wrap demo-gap-lg">
          <div class="shadow-demo-box shadow-sm">.shadow-sm</div>
          <div class="shadow-demo-box shadow-md">.shadow-md</div>
          <div class="shadow-demo-box shadow-lg">.shadow-lg</div>
          <div class="shadow-demo-box shadow-xl">.shadow-xl</div>
          <div class="shadow-demo-box shadow-none demo-bordered">
            .shadow-none
          </div>
        </div>
      </div>
    </section>

    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('width-height')"
      >
        Width & Height
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="demo-bordered demo-pad-md demo-mb-md">
          <div class="w-full demo-block-primary demo-pad demo-text-center">
            .w-full (width: 100%)
          </div>
        </div>
        <div class="demo-bordered demo-pad-md demo-mb-md">
          <div
            class="w-auto demo-block-success demo-pad demo-text-center"
            style="display: inline-block"
          >
            .w-auto (width: auto)
          </div>
        </div>
        <div class="demo-bordered demo-pad-md" style="height: 100px">
          <div class="h-full demo-block-danger demo-pad">
            .h-full (height: 100%)
          </div>
        </div>
      </div>
    </section>

    <section class="style-section">
      <h3 class="subsection-title clickable" @click="showExample('overflow')">
        Overflow
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="demo-stack">
          <div>
            <h4 class="demo-subtitle-sm">.overflow-hidden</h4>
            <div class="overflow-hidden demo-container demo-overflow-box">
              이 텍스트는 overflow-hidden으로 넘치는 부분이 숨겨집니다. 더 많은
              텍스트를 추가해도 보이지 않습니다.
            </div>
          </div>
          <div>
            <h4 class="demo-subtitle-sm">.overflow-auto</h4>
            <div class="overflow-auto demo-container demo-overflow-box">
              이 텍스트는 overflow-auto로 필요시 스크롤바가 나타납니다. 더 많은
              텍스트를 추가하면 스크롤할 수 있습니다.
            </div>
          </div>
          <div>
            <h4 class="demo-subtitle-sm">.overflow-scroll</h4>
            <div class="overflow-scroll demo-container demo-overflow-box">
              이 텍스트는 overflow-scroll로 항상 스크롤바가 표시됩니다.
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="style-section">
      <h3 class="subsection-title clickable" @click="showExample('position')">
        Position
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="demo-stack">
          <div class="demo-container">
            <strong>.position-relative</strong> - 상대 위치 지정 (자식 요소의
            absolute 기준점)
          </div>
          <div class="demo-container">
            <strong>.position-absolute</strong> - 절대 위치 지정 (부모 요소
            기준)
          </div>
          <div class="demo-container">
            <strong>.position-fixed</strong> - 고정 위치 지정 (뷰포트 기준)
          </div>
          <div class="demo-container">
            <strong>.position-sticky</strong> - 스크롤 시 고정 위치
          </div>
        </div>
      </div>
    </section>

    <div style="display: flex; flex-direction: row; width: 100%; gap: 20px">
      <section class="style-section" style="width: 100%">
        <h3 class="subsection-title clickable" @click="showExample('cursor')">
          Cursor
          <span class="example-badge">예시 보기</span>
        </h3>
        <div class="utility-demo">
          <div class="demo-stack">
            <div class="cursor-pointer demo-container">
              <strong>.cursor-pointer</strong> - 마우스를 올리면 포인터 커서로
              변경됩니다
            </div>
            <div class="cursor-not-allowed demo-container">
              <strong>.cursor-not-allowed</strong> - 마우스를 올리면 금지 커서로
              변경됩니다
            </div>
          </div>
        </div>
      </section>

      <section class="style-section" style="width: 100%">
        <h3
          class="subsection-title clickable"
          @click="showExample('user-select')"
        >
          User Select
          <span class="example-badge">예시 보기</span>
        </h3>
        <div class="utility-demo">
          <div class="demo-stack">
            <div class="select-none demo-container">
              <strong>.select-none</strong> - 이 텍스트는 선택할 수 없습니다
              (드래그해보세요)
            </div>
            <div class="select-text demo-container">
              <strong>.select-text</strong> - 이 텍스트는 정상적으로 선택할 수
              있습니다
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="style-section">
      <h3 class="subsection-title clickable" @click="showExample('transition')">
        Transition
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="demo-stack">
          <button
            class="transition demo-transition-btn"
            @click="transitionActive1 = !transitionActive1"
            :class="{ 'demo-active-primary': transitionActive1 }"
          >
            <strong>.transition</strong> - 클릭하여 기본 속도 확인 (0.3s)
          </button>
          <button
            class="transition-fast demo-transition-btn"
            @click="transitionActive2 = !transitionActive2"
            :class="{ 'demo-active-success': transitionActive2 }"
          >
            <strong>.transition-fast</strong> - 클릭하여 빠른 속도 확인 (0.15s)
          </button>
          <button
            class="transition-slow demo-transition-btn"
            @click="transitionActive3 = !transitionActive3"
            :class="{ 'demo-active-danger': transitionActive3 }"
          >
            <strong>.transition-slow</strong> - 클릭하여 느린 속도 확인 (0.5s)
          </button>
        </div>
      </div>
    </section>

    <section class="style-section">
      <h3 class="subsection-title clickable" @click="showExample('container')">
        Container
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="container demo-container demo-pad-lg demo-mb-md">
          <strong>.container</strong> - 최대 너비 1200px, 자동 중앙 정렬, 좌우
          패딩 포함
          <p class="demo-description">
            주로 페이지 콘텐츠를 감싸는 레이아웃 컨테이너로 사용됩니다.
          </p>
        </div>
        <div class="container-fluid demo-container-alt demo-pad-lg">
          <strong>.container-fluid</strong> - 전체 너비, 좌우 패딩 포함
          <p class="demo-description">
            화면 전체 너비를 사용하는 레이아웃에 적합합니다.
          </p>
        </div>
      </div>
    </section>

    <section class="style-section">
      <h3 class="subsection-title clickable" @click="showExample('card')">
        Card
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="card">
          <strong>.card</strong> - 카드 컴포넌트
          <p class="demo-description">
            흰색 배경, 테두리, 그림자, 둥근 모서리가 적용된 카드 스타일입니다.
          </p>
        </div>
      </div>
    </section>

    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('disabled-state')"
      >
        Disabled State
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="demo-stack">
          <button class="btn btn-primary">Normal Button</button>
          <button class="btn btn-primary disabled">
            Disabled Button (.disabled)
          </button>
          <button class="btn btn-primary" disabled>
            Disabled Button (disabled attr)
          </button>
        </div>
        <p class="hint demo-mt-md">
          .disabled 클래스 또는 disabled 속성 적용 시 투명도 0.6, 클릭 불가
          상태가 됩니다.
        </p>
      </div>
    </section>

    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('loading-state')"
      >
        Loading State
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="demo-stack">
          <div class="demo-container demo-pad-xl">Normal Content</div>
          <div class="loading demo-container demo-pad-xl">
            Loading Content (.loading)
          </div>
        </div>
        <p class="hint demo-mt-md">
          .loading 클래스 적용 시 투명도 감소, 클릭 불가, 회전하는 로딩
          인디케이터가 표시됩니다.
        </p>
      </div>
    </section>

    <section class="style-section">
      <h3
        class="subsection-title clickable"
        @click="showExample('responsive-helpers')"
      >
        Responsive Helpers
        <span class="example-badge">예시 보기</span>
      </h3>
      <div class="utility-demo">
        <div class="demo-stack">
          <div class="hide-mobile demo-container">
            <strong>.hide-mobile</strong> - 모바일(768px 이하)에서 숨김
          </div>
          <div class="hide-desktop demo-container">
            <strong>.hide-desktop</strong> - 데스크톱(769px 이상)에서 숨김
          </div>
        </div>
        <p class="hint demo-mt-md">
          브라우저 창 크기를 조절하여 반응형 동작을 확인할 수 있습니다.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Swal from "sweetalert2";

const transitionActive1 = ref(false);
const transitionActive2 = ref(false);
const transitionActive3 = ref(false);

const showExample = async (type: string) => {
  const examples: Record<string, string> = {
    "text-alignment": `<!-- HTML -->
<p class="text-left">왼쪽 정렬</p>
<p class="text-center">가운데 정렬</p>
<p class="text-right">오른쪽 정렬</p>

<!-- 테이블에서 사용 -->
<td class="align-center">123</td>
<td class="align-right">₩1,000</td>`,

    "font-weights-sizes": `<!-- HTML - Font Weights -->
<h1 class="fw-bold">굵은 제목</h1>
<p class="fw-medium">중간 강조</p>
<span class="fw-light">가벼운 텍스트</span>

<!-- HTML - Font Sizes -->
<p class="fs-xs">작은 글씨 (12px)</p>
<p class="fs-base">기본 글씨 (14px)</p>
<p class="fs-xl">큰 글씨 (18px)</p>

// SCSS
.title {
  font-weight: $font-weight-semibold; // 600
  font-size: $font-size-2xl; // 20px
}`,

    "text-colors": `<!-- HTML -->
<p class="text-primary">주요 텍스트</p>
<p class="text-success">성공 메시지</p>
<p class="text-danger">에러 메시지</p>
<small class="text-light">부가 설명</small>`,

    "background-colors": `<!-- HTML -->
<div class="bg-primary">파란 배경</div>
<div class="bg-success">초록 배경</div>
<div class="bg-danger">빨간 배경</div>
<div class="bg-light">밝은 배경</div>`,

    margins: `<!-- HTML -->
<div class="mt-lg mb-xl">
  여백이 있는 요소
</div>

<div class="pt-md pb-md">
  패딩이 있는 요소
</div>

<!-- 모든 방향 조합 가능 -->
<div class="m-0">margin: 0</div>
<div class="mt-xs">margin-top: 4px</div>
<div class="mb-sm">margin-bottom: 8px</div>
<div class="ml-md">margin-left: 12px</div>
<div class="mr-lg">margin-right: 16px</div>

// SCSS
.section {
  margin-top: $spacing-xl; // 24px
  padding: $spacing-lg; // 16px
}`,

    "display-flex": `<!-- HTML -->
<div class="d-flex gap-md">
  <button>버튼 1</button>
  <button>버튼 2</button>
</div>

<div class="d-flex justify-between align-center">
  <span>왼쪽</span>
  <span>오른쪽</span>
</div>

<div class="d-flex flex-column gap-lg">
  <div>세로 아이템 1</div>
  <div>세로 아이템 2</div>
</div>

// SCSS
.button-group {
  display: flex;
  gap: $spacing-md; // 12px
  justify-content: space-between;
  align-items: center;
}`,

    "border-radius": `<!-- HTML -->
<div class="rounded-sm">작은 둥근 모서리</div>
<div class="rounded-md">중간 둥근 모서리</div>
<div class="rounded-lg">큰 둥근 모서리</div>
<div class="rounded-full">완전히 둥근 모서리</div>

// SCSS
.card {
  border-radius: $radius-lg; // 6px
}`,

    shadows: `<!-- HTML -->
<div class="shadow-sm">작은 그림자</div>
<div class="shadow-md">중간 그림자</div>
<div class="shadow-lg">큰 그림자</div>
<div class="shadow-none">그림자 없음</div>

// SCSS
.card {
  box-shadow: $shadow-md;
}`,

    "width-height": `<!-- HTML -->
<div class="w-full">전체 너비</div>
<div class="w-auto">자동 너비</div>
<div class="h-full">전체 높이</div>

// SCSS - 직접 사용은 제한적`,

    overflow: `<!-- HTML -->
<div class="overflow-hidden">넘치는 내용 숨김</div>
<div class="overflow-auto">필요시 스크롤</div>
<div class="overflow-scroll">항상 스크롤</div>`,

    position: `<!-- HTML -->
<div class="position-relative">
  <div class="position-absolute">절대 위치</div>
</div>
<div class="position-fixed">고정 위치</div>
<div class="position-sticky">스티키 위치</div>`,

    cursor: `<!-- HTML -->
<button class="cursor-pointer">클릭 가능</button>
<button class="cursor-not-allowed">클릭 불가</button>`,

    "user-select": `<!-- HTML -->
<div class="select-none">선택 불가 텍스트</div>
<div class="select-text">선택 가능 텍스트</div>`,

    transition: `<!-- HTML -->
<div class="transition">기본 속도 (0.3s)</div>
<div class="transition-fast">빠른 속도 (0.15s)</div>
<div class="transition-slow">느린 속도 (0.5s)</div>

// SCSS
.button {
  transition: $transition-base;

  &:hover {
    background: $color-primary;
  }
}`,

    container: `<!-- HTML -->
<div class="container">
  최대 너비 1200px, 중앙 정렬
</div>

<div class="container-fluid">
  전체 너비 사용
</div>

// 일반적으로 페이지 최상단 래퍼로 사용`,

    card: `<!-- HTML -->
<div class="card">
  <h3>카드 제목</h3>
  <p>카드 내용</p>
</div>

// SCSS - card 클래스는 기본 스타일 제공
// 추가 커스터마이징 가능`,

    "disabled-state": `<!-- HTML -->
<button class="disabled">비활성화 (클래스)</button>
<button disabled>비활성화 (속성)</button>

// CSS로 자동 적용됨
// opacity: 0.6, cursor: not-allowed`,

    "loading-state": `<!-- HTML -->
<div class="loading">
  로딩 중인 콘텐츠
</div>

// CSS로 자동 적용
// 회전하는 로딩 인디케이터 표시`,

    "responsive-helpers": `<!-- HTML -->
<div class="hide-mobile">
  데스크톱에서만 표시
</div>

<div class="hide-desktop">
  모바일에서만 표시
</div>

// 브레이크포인트: 768px`,
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

const escapeHtml = (text: string): string => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

const getTitleByType = (type: string): string => {
  const titles: Record<string, string> = {
    "text-alignment": "Text Alignment",
    "font-weights-sizes": "Font Weights & Sizes",
    "text-colors": "Text Colors",
    "background-colors": "Background Colors",
    margins: "Margins & Paddings",
    "display-flex": "Display & Flex",
    "border-radius": "Border Radius",
    shadows: "Shadows",
    "width-height": "Width & Height",
    overflow: "Overflow",
    position: "Position",
    cursor: "Cursor",
    "user-select": "User Select",
    transition: "Transition",
    container: "Container",
    card: "Card",
    "disabled-state": "Disabled State",
    "loading-state": "Loading State",
    "responsive-helpers": "Responsive Helpers",
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

.utility-demo {
  padding: $spacing-xl;
  background: $color-bg-light;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
}

.bg-demo-box {
  padding: $spacing-lg;
  margin-bottom: $spacing-sm;
  border-radius: $radius-md;
  border: 1px solid $color-border;
}

.radius-demo-box {
  width: 100px;
  height: 100px;
  background: $color-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: $font-size-sm;
}

.shadow-demo-box {
  padding: $spacing-xl;
  background: white;
  border-radius: $radius-md;
  text-align: center;
}

.hint {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  font-style: italic;
  margin-top: $spacing-md;
}

// ===== Demo Helper Classes =====
.demo-subtitle {
  margin-bottom: $spacing-md;
  color: $color-text-secondary;
}

.demo-subtitle-sm {
  margin-bottom: $spacing-sm;
  color: $color-text-secondary;
}

.demo-description {
  margin-top: $spacing-sm;
  color: $color-text-secondary;
  font-size: $font-size-base;
}

.demo-text-white {
  color: white;
}
.demo-text-center {
  text-align: center;
}

// Layout helpers
.demo-grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xl;
}

.demo-grid-3col {
  grid-template-columns: repeat(3, 1fr);
}

.demo-stack {
  display: grid;
  gap: $spacing-md;
}

.demo-flex-wrap {
  display: flex;
  flex-wrap: wrap;
}

.demo-gap-sm {
  gap: $spacing-sm;
}
.demo-gap-md {
  gap: $spacing-md;
}
.demo-gap-lg {
  gap: $spacing-lg;
}

// Spacing helpers
.demo-mb-sm {
  margin-bottom: $spacing-sm;
}
.demo-mb-md {
  margin-bottom: $spacing-md;
}
.demo-mb-xl {
  margin-bottom: $spacing-xl;
}
.demo-mt-md {
  margin-top: $spacing-md;
}
.demo-mt-lg {
  margin-top: $spacing-lg;
}

// Container styles
.demo-container {
  background: $color-bg-light;
  padding: $spacing-md;
  border: 1px solid $color-border;
}

.demo-container-alt {
  background: $color-bg-gray;
  border: 1px solid $color-border;
}

.demo-bordered {
  border: 1px solid $color-border;
}

.demo-dashed-wrapper {
  border: 2px dashed $color-border;
  padding: $spacing-xs;
}

// Demo box variants
.demo-margin-box {
  background: $color-bg-light;
  border: 1px solid $color-primary;
}

.demo-padding-box {
  background: $color-bg-light;
  border: 1px solid $color-success;
}

// Colored block elements
.demo-block-primary {
  background: $color-primary;
  color: white;
}

.demo-block-success {
  background: $color-success;
  color: white;
}

.demo-block-danger {
  background: $color-danger;
  color: white;
}

.demo-block-warning {
  background: $color-warning;
  color: white;
}

// Sizing & padding
.demo-pad {
  padding: $spacing-sm;
}
.demo-pad-md {
  padding: $spacing-md;
}
.demo-pad-lg {
  padding: $spacing-lg;
}
.demo-pad-xl {
  padding: $spacing-xl;
}
.demo-inline-pad {
  padding: $spacing-xs $spacing-sm;
}
.demo-inline-block-pad {
  padding: $spacing-sm $spacing-md;
  width: 100px;
}
.demo-flex-1 {
  flex: 1;
}
.demo-w-200 {
  width: 200px;
}
.demo-h-80 {
  height: 80px;
}

.demo-overflow-box {
  height: 60px;
  width: 300px;
  padding: $spacing-sm;
}

// Transition button
.demo-transition-btn {
  padding: $spacing-md;
  border: 1px solid $color-border;
  background: $color-bg-light;
  cursor: pointer;
  border-radius: $radius-sm;

  &.demo-active-primary {
    background: $color-primary;
    color: white;
  }

  &.demo-active-success {
    background: $color-success;
    color: white;
  }

  &.demo-active-danger {
    background: $color-danger;
    color: white;
  }
}
</style>
