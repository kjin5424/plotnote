<template>
  <h2 class="section-title">Button Components Guide</h2>
  <!-- ========================================
         Basic Buttons
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">1. Basic Buttons</h3>
    <p class="subsection-description">
      기본 버튼 스타일입니다. <code>.btn</code> 클래스를 기본으로 사용합니다.
    </p>

    <div class="example-box">
      <h4>Color Variants</h4>
      <div class="button-group-demo">
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-success">Success</button>
        <button class="btn btn-danger">Danger</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-cancel">Cancel</button>
      </div>

      <div class="code-example">
        <pre><code>&lt;button class="btn btn-primary"&gt;Primary&lt;/button&gt;
&lt;button class="btn btn-success"&gt;Success&lt;/button&gt;
&lt;button class="btn btn-danger"&gt;Danger&lt;/button&gt;
&lt;button class="btn btn-secondary"&gt;Secondary&lt;/button&gt;
&lt;button class="btn btn-cancel"&gt;Cancel&lt;/button&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Outline Buttons</h4>
      <div class="button-group-demo">
        <button class="btn btn-primary-outline">Primary</button>
        <button class="btn btn-success-outline">Success</button>
        <button class="btn btn-danger-outline">Danger</button>
        <button class="btn btn-secondary-outline">Secondary</button>
        <button class="btn btn-cancel-outline">Cancel</button>
      </div>

      <div class="code-example">
        <pre><code>&lt;button class="btn btn-primary-outline"&gt;Primary&lt;/button&gt;
&lt;button class="btn btn-success-outline"&gt;Success&lt;/button&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Ghost Buttons</h4>
      <div class="button-group-demo">
        <button class="btn btn-primary-ghost">Primary</button>
        <button class="btn btn-success-ghost">Success</button>
        <button class="btn btn-danger-ghost">Danger</button>
        <button class="btn btn-secondary-ghost">Secondary</button>
        <button class="btn btn-cancel-ghost">Cancel</button>
      </div>

      <div class="code-example">
        <pre><code>&lt;button class="btn btn-primary-ghost"&gt;Primary&lt;/button&gt;
&lt;button class="btn btn-success-ghost"&gt;Success&lt;/button&gt;</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Button Sizes
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">2. Button Sizes</h3>
    <p class="subsection-description">
      버튼 크기 옵션: <code>.btn-sm</code>, <code>.btn-md</code>,
      <code>.btn-lg</code>, <code>.btn-xl</code>
    </p>

    <div class="example-box">
      <div class="button-group-demo" style="align-items: center">
        <button class="btn btn-primary btn-sm">Small</button>
        <button class="btn btn-primary btn-md">Medium</button>
        <button class="btn btn-primary btn-lg">Large</button>
        <button class="btn btn-primary btn-xl">Extra Large</button>
      </div>

      <div class="code-example">
        <pre><code>&lt;button class="btn btn-primary btn-sm"&gt;Small&lt;/button&gt;
&lt;button class="btn btn-primary btn-md"&gt;Medium&lt;/button&gt;
&lt;button class="btn btn-primary btn-lg"&gt;Large&lt;/button&gt;
&lt;button class="btn btn-primary btn-xl"&gt;Extra Large&lt;/button&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Block Button (Full Width)</h4>
      <button class="btn btn-primary btn-block">Full Width Button</button>

      <div class="code-example">
        <pre><code>&lt;button class="btn btn-primary btn-block"&gt;Full Width Button&lt;/button&gt;</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Button Shapes
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">3. Button Shapes</h3>
    <p class="subsection-description">
      버튼 모양 옵션:
      <code>.btn(default)</code>, <code>.btn-square</code>,
      <code>.btn-round</code>,
      <code>.btn-pill</code>
    </p>

    <div class="example-box">
      <div class="button-group-demo" style="align-items: center">
        <button class="btn btn-secondary-outline btn-square">
          <span>📌</span>
        </button>
        <button class="btn btn-primary-outline btn-square btn-round">
          <span>🔍</span>
        </button>
        <button class="btn btn-success-outline btn-square">
          <span>🐤</span>
        </button>
        <button class="btn btn-primary btn-pill">Pill Button</button>
        <button class="btn btn-primary btn-flat">Flat Button</button>
      </div>

      <div class="code-example">
        <pre><code>&lt;button class="btn btn-secondary-outline btn-square"&gt;📌&lt;/button&gt;
&lt;button class="btn btn-primary-outline btn-square btn-round"&gt;🔍&lt;/button&gt; <span class="text-light">// 주의 : btn-square가 필요</span>
&lt;button class="btn btn-success-outline btn-square"&gt;🐤&lt;/button&gt; <span class="text-light">// btn-sm, btn-lg</span>
&lt;button class="btn btn-success-outline btn-square"&gt;Pill Button&lt;/button&gt;
&lt;button class="btn btn-primary btn-flat"&gt;Flat Button&lt;/button&gt;</code></pre>
      </div>
    </div>
    <p class="subsection-description">
      아이콘 버튼:
      <code>.btn-icon</code>, <code>.btn-icon-left</code>,
      <code>.btn-icon-right</code>
    </p>

    <div class="example-box">
      <div class="button-group-demo" style="align-items: center">
        <button class="btn btn-primary btn-icon">🔍</button>
        <button class="btn btn-primary btn-icon btn-sm">✓</button>
        <button class="btn btn-primary btn-icon btn-lg">❤</button>
        <button class="btn btn-primary">
          <span class="btn-icon-left">←</span>
          Previous
        </button>
        <button class="btn btn-primary">
          Next
          <span class="btn-icon-right">→</span>
        </button>
        <button class="btn btn-success">
          <span class="btn-icon-left">✓</span>
          Confirm
          <span class="btn-icon-right">→</span>
        </button>
      </div>

      <div class="code-example">
        <pre><code>&lt;button class="btn btn-primary btn-icon"&gt;🔍&lt;/button&gt;
&lt;button class="btn btn-primary btn-icon btn-sm"&gt;✓&lt;/button&gt;
&lt;button class="btn btn-primary btn-icon btn-lg"&gt;❤&lt;/button&gt;
&lt;button class="btn btn-primary"&gt;&lt;span class="btn-icon-left"&gt;←&lt;/span&gt;Previous&lt;/button&gt;
&lt;button class="btn btn-primary"&gt;Next&lt;span class="btn-icon-right"&gt;→&lt;/span&gt;&lt;/button&gt;
&lt;button class="btn btn-success"&gt;&lt;span class="btn-icon-left"&gt;✓&lt;/span&gt;Confirm&lt;span class="btn-icon-right"&gt;→&lt;/span&gt;&lt;/button&gt;
</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Button States
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">4. Button States</h3>
    <p class="subsection-description">버튼 상태: disabled, loading 등</p>

    <div class="example-box">
      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 10px;
          align-items: baseline;
        "
      >
        <h4>Disabled State</h4>
        <span class="text-light"
          >버튼 컬러와 상관없이 disabled color가 적용됩니다.</span
        >
      </div>
      <div class="button-group-demo">
        <button class="btn btn-primary" disabled>Disabled</button>
        <button class="btn btn-success" disabled>Disabled</button>
        <button class="btn btn-danger" disabled>Disabled</button>
      </div>

      <div class="code-example">
        <pre><code>&lt;button class="btn btn-primary" disabled&gt;Disabled&lt;/button&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Loading State</h4>
      <div class="button-group-demo">
        <button class="btn btn-primary loading">Loading</button>
        <button class="btn btn-success loading">Loading</button>
        <button class="btn btn-danger loading">Loading</button>
      </div>

      <div class="code-example">
        <pre><code>&lt;button class="btn btn-primary loading"&gt;Loading&lt;/button&gt;</code></pre>
      </div>
      <p class="note">
        💡 <code>.loading</code> 클래스를 추가하면 자동으로 스피너 애니메이션이
        표시됩니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Toggle Buttons - 새로 추가된 섹션
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">5. Toggle Buttons (토글 버튼)</h3>
    <p class="subsection-description">
      스위치 형태의 토글 버튼입니다. 설정 옵션이나 On/Off 상태를 표현할 때
      사용합니다.
    </p>

    <!-- 5-1. Basic Toggle -->
    <div class="example-box">
      <h4>5.1 Basic Toggle</h4>
      <div class="toggle-demo-grid">
        <label class="toggle-button">
          <input type="checkbox" v-model="toggle1" />
          <span class="toggle-switch" :class="{ checked: toggle1 }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">기본 토글</span>
        </label>

        <label class="toggle-button">
          <input type="checkbox" v-model="toggle2" />
          <span class="toggle-switch" :class="{ checked: toggle2 }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">알림 받기</span>
        </label>
      </div>

      <div class="code-example">
        <pre><code>&lt;label class="toggle-button"&gt;
  &lt;input type="checkbox" v-model="toggleValue" /&gt;
  &lt;span class="toggle-switch" :class="{ checked: toggleValue }"&gt;
    &lt;span class="toggle-circle"&gt;&lt;/span&gt;
  &lt;/span&gt;
  &lt;span class="toggle-label"&gt;기본 토글&lt;/span&gt;
&lt;/label&gt;</code></pre>
      </div>
      <p class="note">
        💡 기본 토글은 체크박스 input과 연동되어 v-model로 상태를 관리할 수
        있습니다.
      </p>
    </div>

    <!-- 5-2. Toggle Sizes -->
    <div class="example-box">
      <h4>5.2 Toggle Sizes</h4>
      <div class="toggle-demo-grid">
        <label class="toggle-button toggle-small">
          <input type="checkbox" v-model="toggleSmall" />
          <span class="toggle-switch" :class="{ checked: toggleSmall }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">Small 사이즈</span>
        </label>

        <label class="toggle-button">
          <input type="checkbox" v-model="toggleMedium" />
          <span class="toggle-switch" :class="{ checked: toggleMedium }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">Medium (기본)</span>
        </label>

        <label class="toggle-button toggle-large">
          <input type="checkbox" v-model="toggleLarge" />
          <span class="toggle-switch" :class="{ checked: toggleLarge }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">Large 사이즈</span>
        </label>
      </div>

      <div class="code-example">
        <pre><code>&lt;!-- Small --&gt;
&lt;label class="toggle-button toggle-small"&gt;...&lt;/label&gt;

&lt;!-- Medium (기본) --&gt;
&lt;label class="toggle-button"&gt;...&lt;/label&gt;

&lt;!-- Large --&gt;
&lt;label class="toggle-button toggle-large"&gt;...&lt;/label&gt;</code></pre>
      </div>
      <p class="note">
        💡 사이즈 클래스: <code>.toggle-small</code>, 기본(클래스 없음),
        <code>.toggle-large</code>
      </p>
    </div>

    <!-- 5-3. Toggle Color Variants -->
    <div class="example-box">
      <h4>5.3 Toggle Color Variants</h4>
      <div class="toggle-demo-grid">
        <label class="toggle-button">
          <input type="checkbox" v-model="togglePrimary" />
          <span class="toggle-switch" :class="{ checked: togglePrimary }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">Primary (기본)</span>
        </label>

        <label class="toggle-button toggle-success">
          <input type="checkbox" v-model="toggleSuccess" />
          <span class="toggle-switch" :class="{ checked: toggleSuccess }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">Success</span>
        </label>

        <label class="toggle-button toggle-warning">
          <input type="checkbox" v-model="toggleWarning" />
          <span class="toggle-switch" :class="{ checked: toggleWarning }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">Warning</span>
        </label>

        <label class="toggle-button toggle-danger">
          <input type="checkbox" v-model="toggleDanger" />
          <span class="toggle-switch" :class="{ checked: toggleDanger }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">Danger</span>
        </label>

        <label class="toggle-button toggle-info">
          <input type="checkbox" v-model="toggleInfo" />
          <span class="toggle-switch" :class="{ checked: toggleInfo }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">Info</span>
        </label>
      </div>

      <div class="code-example">
        <pre><code>&lt;!-- Primary (기본) --&gt;
&lt;label class="toggle-button"&gt;...&lt;/label&gt;

&lt;!-- Success --&gt;
&lt;label class="toggle-button toggle-success"&gt;...&lt;/label&gt;

&lt;!-- Warning --&gt;
&lt;label class="toggle-button toggle-warning"&gt;...&lt;/label&gt;

&lt;!-- Danger --&gt;
&lt;label class="toggle-button toggle-danger"&gt;...&lt;/label&gt;

&lt;!-- Info --&gt;
&lt;label class="toggle-button toggle-info"&gt;...&lt;/label&gt;</code></pre>
      </div>
    </div>

    <!-- 5-4. Toggle Label Positions -->
    <div class="example-box">
      <h4>5.4 Toggle Label Positions</h4>
      <div class="toggle-demo-grid">
        <label class="toggle-button">
          <input type="checkbox" v-model="toggleLabelRight" />
          <span class="toggle-switch" :class="{ checked: toggleLabelRight }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">레이블 오른쪽 (기본)</span>
        </label>

        <label class="toggle-button label-left">
          <input type="checkbox" v-model="toggleLabelLeft" />
          <span class="toggle-switch" :class="{ checked: toggleLabelLeft }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">레이블 왼쪽</span>
        </label>

        <label class="toggle-button label-top">
          <input type="checkbox" v-model="toggleLabelTop" />
          <span class="toggle-switch" :class="{ checked: toggleLabelTop }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">레이블 위쪽</span>
        </label>

        <label class="toggle-button label-bottom">
          <input type="checkbox" v-model="toggleLabelBottom" />
          <span class="toggle-switch" :class="{ checked: toggleLabelBottom }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">레이블 아래쪽</span>
        </label>
      </div>

      <div class="code-example">
        <pre><code>&lt;!-- 오른쪽 (기본) --&gt;
&lt;label class="toggle-button"&gt;...&lt;/label&gt;

&lt;!-- 왼쪽 --&gt;
&lt;label class="toggle-button label-left"&gt;...&lt;/label&gt;

&lt;!-- 위쪽 --&gt;
&lt;label class="toggle-button label-top"&gt;...&lt;/label&gt;

&lt;!-- 아래쪽 --&gt;
&lt;label class="toggle-button label-bottom"&gt;...&lt;/label&gt;</code></pre>
      </div>
    </div>

    <!-- 5-5. Disabled Toggle -->
    <div class="example-box">
      <h4>5.5 Disabled State</h4>
      <div class="toggle-demo-grid">
        <label class="toggle-button disabled">
          <input type="checkbox" disabled />
          <span class="toggle-switch disabled">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label disabled">비활성화 (OFF)</span>
        </label>

        <label class="toggle-button disabled">
          <input type="checkbox" checked disabled />
          <span class="toggle-switch checked disabled">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label disabled">비활성화 (ON)</span>
        </label>
      </div>

      <div class="code-example">
        <pre><code>&lt;label class="toggle-button disabled"&gt;
  &lt;input type="checkbox" disabled /&gt;
  &lt;span class="toggle-switch disabled"&gt;
    &lt;span class="toggle-circle"&gt;&lt;/span&gt;
  &lt;/span&gt;
  &lt;span class="toggle-label disabled"&gt;비활성화&lt;/span&gt;
&lt;/label&gt;</code></pre>
      </div>
      <p class="note">
        💡 <code>.disabled</code> 클래스를 toggle-button, toggle-switch,
        toggle-label에 모두 추가하고, input에 disabled 속성을 추가합니다.
      </p>
    </div>

    <!-- 5-6. Toggle with Icons -->
    <div class="example-box">
      <h4>5.6 Toggle with Icons (아이콘 포함)</h4>
      <div class="toggle-demo-grid">
        <label class="toggle-button">
          <input type="checkbox" v-model="toggleIcon1" />
          <span
            class="toggle-switch with-icons"
            :class="{ checked: toggleIcon1 }"
          >
            <span class="toggle-icon icon-on">✓</span>
            <span class="toggle-icon icon-off">✕</span>
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">아이콘 토글</span>
        </label>
      </div>

      <div class="code-example">
        <pre><code>&lt;label class="toggle-button"&gt;
  &lt;input type="checkbox" v-model="toggleValue" /&gt;
  &lt;span class="toggle-switch with-icons" :class="{ checked: toggleValue }"&gt;
    &lt;span class="toggle-icon icon-on"&gt;✓&lt;/span&gt;
    &lt;span class="toggle-icon icon-off"&gt;✕&lt;/span&gt;
    &lt;span class="toggle-circle"&gt;&lt;/span&gt;
  &lt;/span&gt;
  &lt;span class="toggle-label"&gt;아이콘 토글&lt;/span&gt;
&lt;/label&gt;</code></pre>
      </div>
      <p class="note">
        💡 <code>.with-icons</code> 클래스를 추가하고, icon-off와 icon-on 요소를
        포함합니다.
      </p>
    </div>

    <!-- 5-7. Loading Toggle -->
    <div class="example-box">
      <h4>5.7 Loading State</h4>
      <div class="toggle-demo-grid">
        <label class="toggle-button">
          <input type="checkbox" disabled />
          <span class="toggle-switch loading">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">로딩 중...</span>
        </label>

        <button class="btn btn-primary btn-sm" @click="simulateToggleLoading">
          로딩 시뮬레이션
        </button>
      </div>

      <div class="code-example">
        <pre><code>&lt;label class="toggle-button"&gt;
  &lt;input type="checkbox" disabled /&gt;
  &lt;span class="toggle-switch loading"&gt;
    &lt;span class="toggle-circle"&gt;&lt;/span&gt;
  &lt;/span&gt;
  &lt;span class="toggle-label"&gt;로딩 중...&lt;/span&gt;
&lt;/label&gt;</code></pre>
      </div>
      <p class="note">
        💡 <code>.loading</code> 클래스를 추가하면 자동으로 슬라이드
        애니메이션이 적용됩니다.
      </p>
    </div>

    <!-- 5-8. Toggle Group -->
    <div class="example-box">
      <h4>5.8 Toggle Group</h4>
      <div class="toggle-group">
        <div class="toggle-group-title">알림 설정</div>
        <label class="toggle-button">
          <input type="checkbox" v-model="notificationEmail" />
          <span class="toggle-switch" :class="{ checked: notificationEmail }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">이메일 알림</span>
        </label>

        <label class="toggle-button">
          <input type="checkbox" v-model="notificationSms" />
          <span class="toggle-switch" :class="{ checked: notificationSms }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">SMS 알림</span>
        </label>

        <label class="toggle-button">
          <input type="checkbox" v-model="notificationPush" />
          <span class="toggle-switch" :class="{ checked: notificationPush }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">푸시 알림</span>
        </label>
      </div>

      <div
        class="toggle-group toggle-group-horizontal"
        style="margin-top: 20px"
      >
        <div
          class="toggle-group-title"
          style="width: 100%; margin-bottom: 12px"
        >
          기능 활성화 (가로 배치)
        </div>
        <label class="toggle-button toggle-small toggle-success">
          <input type="checkbox" v-model="featureDarkMode" />
          <span class="toggle-switch" :class="{ checked: featureDarkMode }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">다크모드</span>
        </label>

        <label class="toggle-button toggle-small toggle-success">
          <input type="checkbox" v-model="featureAutoSave" />
          <span class="toggle-switch" :class="{ checked: featureAutoSave }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">자동저장</span>
        </label>

        <label class="toggle-button toggle-small toggle-success">
          <input type="checkbox" v-model="featureAnalytics" />
          <span class="toggle-switch" :class="{ checked: featureAnalytics }">
            <span class="toggle-circle"></span>
          </span>
          <span class="toggle-label">통계 수집</span>
        </label>
      </div>

      <div class="code-example">
        <pre><code>&lt;!-- 세로 배치 (기본) --&gt;
&lt;div class="toggle-group"&gt;
  &lt;div class="toggle-group-title"&gt;알림 설정&lt;/div&gt;
  &lt;label class="toggle-button"&gt;...&lt;/label&gt;
  &lt;label class="toggle-button"&gt;...&lt;/label&gt;
&lt;/div&gt;

&lt;!-- 가로 배치 --&gt;
&lt;div class="toggle-group toggle-group-horizontal"&gt;
  &lt;div class="toggle-group-title"&gt;기능 활성화&lt;/div&gt;
  &lt;label class="toggle-button"&gt;...&lt;/label&gt;
  &lt;label class="toggle-button"&gt;...&lt;/label&gt;
&lt;/div&gt;</code></pre>
      </div>
      <p class="note">
        💡 <code>.toggle-group</code>으로 여러 토글을 그룹화할 수 있습니다.
        <code>.toggle-group-horizontal</code>을 추가하면 가로 배치됩니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Special Button Styles
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">6. Special Button Styles</h3>

    <div class="example-box">
      <h4>Soft Buttons</h4>
      <div class="button-group-demo">
        <button class="btn btn-soft-primary">Soft Primary</button>
        <button class="btn btn-soft-success">Soft Success</button>
        <button class="btn btn-soft-danger">Soft Danger</button>
      </div>

      <div class="code-example">
        <pre><code>&lt;button class="btn btn-soft-primary"&gt;Soft Primary&lt;/button&gt;
&lt;button class="btn btn-soft-success"&gt;Soft Success&lt;/button&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Link Button</h4>
      <button class="btn btn-link">Link Button</button>

      <div class="code-example">
        <pre><code>&lt;button class="btn btn-link"&gt;Link Button&lt;/button&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Elevated Button</h4>
      <button class="btn btn-primary btn-elevated">Elevated Button</button>

      <div class="code-example">
        <pre><code>&lt;button class="btn btn-primary btn-elevated"&gt;Elevated Button&lt;/button&gt;</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Button Groups
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">7. Button Groups</h3>

    <div class="example-box">
      <h4>Horizontal Button Group</h4>
      <div class="btn-group">
        <button class="btn btn-primary">Left</button>
        <button class="btn btn-primary">Middle</button>
        <button class="btn btn-primary">Right</button>
      </div>

      <div class="code-example">
        <pre><code>&lt;div class="btn-group"&gt;
  &lt;button class="btn btn-primary"&gt;Left&lt;/button&gt;
  &lt;button class="btn btn-primary"&gt;Middle&lt;/button&gt;
  &lt;button class="btn btn-primary"&gt;Right&lt;/button&gt;
&lt;/div&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <!-- Horizontal Group with Different Colors -->
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: baseline;
          gap: 10px;
        "
      >
        <h4>Mixed Color Group</h4>
        <span class="text-light">다양한 색상 조합 가능</span>
      </div>
      <div class="btn-group">
        <button class="btn btn-success">Success</button>
        <button class="btn btn-danger">Danger</button>
        <button class="btn btn-secondary">Secondary</button>
      </div>
      <div class="code-example">
        <pre><code>&lt;div class="btn-group"&gt;
  &lt;button class="btn btn-success"&gt;Success&lt;/button&gt;
  &lt;button class="btn btn-danger"&gt;Danger&lt;/button&gt;
  &lt;button class="btn btn-secondary"&gt;Secondary&lt;/button&gt;
&lt;/div&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Vertical Button Group</h4>
      <div class="btn-group-vertical">
        <button class="btn btn-secondary">Top</button>
        <button class="btn btn-secondary">Middle</button>
        <button class="btn btn-secondary">Bottom</button>
      </div>

      <div class="code-example">
        <pre><code>&lt;div class="btn-group-vertical"&gt;
  &lt;button class="btn btn-secondary"&gt;Top&lt;/button&gt;
  &lt;button class="btn btn-secondary"&gt;Middle&lt;/button&gt;
  &lt;button class="btn btn-secondary"&gt;Bottom&lt;/button&gt;
&lt;/div&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: baseline;
          gap: 10px;
        "
      >
        <h4>Different Sizes</h4>
        <span>그룹 내 모든 버튼은 동일한 크기 사용 권장</span>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm">Small</button>
        <button class="btn btn-primary btn-sm">Group</button>
      </div>
      <div class="btn-group" style="margin-left: 12px">
        <button class="btn btn-primary btn-lg">Large</button>
        <button class="btn btn-primary btn-lg">Group</button>
      </div>
      <div class="code-example">
        <pre><code>&lt;div class="btn-group"&gt;
  &lt;button class="btn btn-primary btn-sm"&gt;Small&lt;/button&gt;
  &lt;button class="btn btn-primary btn-sm"&gt;Group&lt;/button&gt;
&lt;/div&gt;
&lt;div class="btn-group" style="margin-left: 12px">&gt;
  &lt;button class="btn btn-primary btn-lg"&gt;Large&lt;/button&gt;
  &lt;button class="btn btn-primary btn-lg"&gt;Group&lt;/button&gt;
&lt;/div&gt;
  </code></pre>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

// Basic toggles
const toggle1 = ref(false);
const toggle2 = ref(true);

// Size toggles
const toggleSmall = ref(false);
const toggleMedium = ref(true);
const toggleLarge = ref(false);

// Color variant toggles
const togglePrimary = ref(true);
const toggleSuccess = ref(false);
const toggleWarning = ref(false);
const toggleDanger = ref(false);
const toggleInfo = ref(false);

// Label position toggles
const toggleLabelRight = ref(true);
const toggleLabelLeft = ref(false);
const toggleLabelTop = ref(false);
const toggleLabelBottom = ref(false);

// Icon toggle
const toggleIcon1 = ref(false);

// Notification toggles
const notificationEmail = ref(true);
const notificationSms = ref(false);
const notificationPush = ref(true);

// Feature toggles
const featureDarkMode = ref(false);
const featureAutoSave = ref(true);
const featureAnalytics = ref(false);

// Settings example
const settings = reactive({
  profilePublic: false,
  showEmail: false,
  emailNotification: true,
  marketingEmails: false,
  twoFactor: false,
  loginAlerts: true,
});

// Loading simulation
const simulateToggleLoading = () => {
  alert(
    "로딩 상태는 API 호출 중에 .loading 클래스를 동적으로 추가하여 사용합니다.",
  );
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

.section-description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
}

.button-section {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.subsection-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e0e0e0;
}

.subsection-description {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.example-box {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.example-box h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 1rem;
}

.button-group-demo {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.toggle-demo-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}

.code-example {
  background: #f4f4f4;
  border-left: 4px solid #4285f4;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  overflow-x: auto;
}

.code-example pre {
  margin: 0;
  font-family: "Courier New", monospace;
  font-size: 0.9rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.code-example code {
  color: #2c3e50;
}

.note {
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
  padding: 0.75rem 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #1976d2;
}

.info-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  border-left: 3px solid #4285f4;
}

.info-item strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.info-item p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
}

.practical-example {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1rem;
}

.settings-panel {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
}

.settings-panel h5 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.setting-section {
  margin-bottom: 1.5rem;
}

.setting-section h6 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.setting-section .toggle-button {
  margin-bottom: 0.75rem;
}

.settings-result {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
}

.settings-result h6 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 0.75rem;
}

.settings-result pre {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.85rem;
  overflow-x: auto;
  border: 1px solid #e0e0e0;
}

@media (max-width: 768px) {
  .practical-example {
    grid-template-columns: 1fr;
  }

  .button-group-demo {
    flex-direction: column;
  }
}
</style>
