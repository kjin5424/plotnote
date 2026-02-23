<template>
  <h2 class="section-title">Tooltip Components Guide</h2>

  <!-- ========================================
         Basic Tooltips
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">1. Basic Tooltips</h3>
    <p class="subsection-description">
      기본 툴팁 사용법입니다. <code>v-tooltip</code> 디렉티브를 사용합니다.
    </p>

    <div class="example-box">
      <h4>Simple Text Tooltip</h4>
      <div class="tooltip-demo-grid">
        <button
          class="btn btn-primary"
          v-tooltip.top="'이것은 기본 툴팁입니다'"
        >
          위에 툴팁
        </button>
        <button
          class="btn btn-success"
          v-tooltip.bottom="'아래쪽에 표시됩니다'"
        >
          아래에 툴팁
        </button>
        <button class="btn btn-danger" v-tooltip.left="'왼쪽에 표시됩니다'">
          왼쪽에 툴팁
        </button>
        <button
          class="btn btn-secondary"
          v-tooltip.right="'오른쪽에 표시됩니다'"
        >
          오른쪽에 툴팁
        </button>
      </div>

      <div class="code-example">
        <pre><code>&lt;button v-tooltip.top="'이것은 기본 툴팁입니다'"&gt;위에 툴팁&lt;/button&gt;
&lt;button v-tooltip.bottom="'아래쪽에 표시됩니다'"&gt;아래에 툴팁&lt;/button&gt;
&lt;button v-tooltip.left="'왼쪽에 표시됩니다'"&gt;왼쪽에 툴팁&lt;/button&gt;
&lt;button v-tooltip.right="'오른쪽에 표시됩니다'"&gt;오른쪽에 툴팁&lt;/button&gt;</code></pre>
      </div>
      <p class="note">
        💡 기본 위치는 <code>.top</code>입니다. 위치 modifier를 생략하면
        자동으로 위쪽에 표시됩니다.
      </p>
    </div>

    <div class="example-box">
      <h4>Multi-line Text Tooltip</h4>
      <div class="tooltip-demo-grid">
        <button
          class="btn btn-primary"
          v-tooltip.top="
            `첫 번째 줄입니다.
두 번째 줄입니다.
세 번째 줄입니다.`
          "
        >
          여러 줄 툴팁
        </button>
      </div>

      <div class="code-example">
        <pre><code>&lt;button v-tooltip.top="\`첫 번째 줄입니다.
두 번째 줄입니다.
세 번째 줄입니다.\`"&gt;
  여러 줄 툴팁
&lt;/button&gt;</code></pre>
      </div>
      <p class="note">
        💡 백틱(\`)을 사용하면 여러 줄 텍스트를 쉽게 작성할 수 있습니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Tooltip Colors
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">2. Tooltip Colors</h3>
    <p class="subsection-description">
      툴팁 색상 변형: <code>.primary</code>, <code>.danger</code>,
      <code>.success</code>
    </p>

    <div class="example-box">
      <div class="tooltip-demo-grid">
        <button
          class="btn btn-primary-outline"
          v-tooltip.top="'기본 다크 색상 툴팁입니다'"
        >
          기본 (Dark)
        </button>
        <button
          class="btn btn-primary"
          v-tooltip.top.primary="'Primary 색상 툴팁입니다'"
        >
          Primary
        </button>
        <button
          class="btn btn-success"
          v-tooltip.top.success="'Success 색상 툴팁입니다'"
        >
          Success
        </button>
        <button
          class="btn btn-danger"
          v-tooltip.top.danger="'Danger 색상 툴팁입니다'"
        >
          Danger
        </button>
      </div>

      <div class="code-example">
        <pre><code>&lt;!-- 기본 (modifier 없음) --&gt;
&lt;button v-tooltip.top="'기본 다크 색상'"&gt;기본&lt;/button&gt;

&lt;!-- 색상 modifier 추가 --&gt;
&lt;button v-tooltip.top.primary="'Primary 색상'"&gt;Primary&lt;/button&gt;
&lt;button v-tooltip.top.success="'Success 색상'"&gt;Success&lt;/button&gt;
&lt;button v-tooltip.top.danger="'Danger 색상'"&gt;Danger&lt;/button&gt;</code></pre>
      </div>
      <p class="note">
        💡 색상과 위치 modifier는 함께 사용할 수 있습니다. 순서는 상관없습니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         HTML Tooltips
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">3. HTML Tooltips</h3>
    <p class="subsection-description">
      HTML을 포함한 툴팁을 표시할 수 있습니다. 강조, 링크, 코드 등을 사용할 수
      있습니다.
    </p>

    <div class="example-box">
      <h4>Basic HTML</h4>
      <div class="tooltip-demo-grid">
        <button class="btn btn-primary" v-tooltip.top="htmlTooltip1">
          HTML 강조
        </button>
        <button class="btn btn-success" v-tooltip.top="htmlTooltip2">
          코드 포함
        </button>
        <button class="btn btn-secondary" v-tooltip.top="htmlTooltip3">
          복합 HTML
        </button>
      </div>

      <div class="code-example">
        <pre><code>&lt;script setup&gt;
const htmlTooltip1 = {
  html: '&lt;strong&gt;강조된 텍스트&lt;/strong&gt;&lt;br&gt;&lt;em&gt;기울임 텍스트&lt;/em&gt;',
  isHtml: true
};

const htmlTooltip2 = {
  html: '버전: &lt;code&gt;v1.2.4&lt;/code&gt;&lt;br&gt;최신 업데이트: 2026-02-18',
  isHtml: true
};
&lt;/script&gt;

&lt;template&gt;
  &lt;button v-tooltip.top="htmlTooltip1"&gt;HTML 강조&lt;/button&gt;
  &lt;button v-tooltip.top="htmlTooltip2"&gt;코드 포함&lt;/button&gt;
&lt;/template&gt;</code></pre>
      </div>
      <p class="note">
        💡 HTML 툴팁을 사용하려면 객체 형태로 전달하고
        <code>isHtml: true</code>를 설정해야 합니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Table Tooltips
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">4. Table Tooltips</h3>
    <p class="subsection-description">
      테이블 형태로 데이터를 정리하여 표시할 수 있습니다. 복잡한 데이터를
      깔끔하게 전달할 때 유용합니다.
    </p>

    <div class="example-box">
      <h4>Basic Table</h4>
      <div class="tooltip-demo-grid">
        <button class="btn btn-primary" v-tooltip.top="tableTooltip1">
          사용자 통계
        </button>
        <button class="btn btn-success" v-tooltip.top="tableTooltip2">
          성적 정보
        </button>
        <button class="btn btn-danger" v-tooltip.top="tableTooltip3">
          월별 데이터
        </button>
      </div>

      <div class="code-example">
        <pre><code>&lt;script setup&gt;
const tableTooltip1 = {
  html: \`
    &lt;table&gt;
      &lt;tr&gt;&lt;th&gt;항목&lt;/th&gt;&lt;th class="num"&gt;값&lt;/th&gt;&lt;/tr&gt;
      &lt;tr&gt;&lt;td&gt;전체 사용자&lt;/td&gt;&lt;td class="num"&gt;245명&lt;/td&gt;&lt;/tr&gt;
      &lt;tr&gt;&lt;td&gt;학생&lt;/td&gt;&lt;td class="num"&gt;180명&lt;/td&gt;&lt;/tr&gt;
      &lt;tr&gt;&lt;td&gt;강사&lt;/td&gt;&lt;td class="num"&gt;65명&lt;/td&gt;&lt;/tr&gt;
    &lt;/table&gt;
  \`,
  isHtml: true
};

const tableTooltip2 = {
  html: \`
    &lt;table class="tooltip-table-bordered"&gt;
      &lt;tr&gt;&lt;th&gt;과목&lt;/th&gt;&lt;th class="num"&gt;점수&lt;/th&gt;&lt;/tr&gt;
      &lt;tr&gt;&lt;td&gt;수학&lt;/td&gt;&lt;td class="num"&gt;95점&lt;/td&gt;&lt;/tr&gt;
      &lt;tr&gt;&lt;td&gt;영어&lt;/td&gt;&lt;td class="num"&gt;88점&lt;/td&gt;&lt;/tr&gt;
      &lt;tr&gt;&lt;td&gt;과학&lt;/td&gt;&lt;td class="num"&gt;92점&lt;/td&gt;&lt;/tr&gt;
    &lt;/table&gt;
  \`,
  isHtml: true
};
&lt;/script&gt;

&lt;template&gt;
  &lt;button v-tooltip.top="tableTooltip1"&gt;사용자 통계&lt;/button&gt;
  &lt;button v-tooltip.top="tableTooltip2"&gt;성적 정보&lt;/button&gt;
&lt;/template&gt;</code></pre>
      </div>
      <p class="note">
        💡 테이블 클래스: <code>.tooltip-table-bordered</code> (경계선),
        <code>.tooltip-table-striped</code> (교대 배경), <code>.num</code> (숫자
        우측 정렬)
      </p>
    </div>

    <div class="example-box">
      <h4>Striped & Bordered Tables</h4>
      <div class="tooltip-demo-grid">
        <button class="btn btn-primary" v-tooltip.top="stripedTableTooltip">
          Striped 테이블
        </button>
        <button class="btn btn-success" v-tooltip.top="complexTableTooltip">
          복잡한 테이블
        </button>
      </div>

      <div class="code-example">
        <pre><code>const stripedTableTooltip = {
  html: \`
    &lt;table class="tooltip-table-striped"&gt;
      &lt;thead&gt;
        &lt;tr&gt;&lt;th&gt;월&lt;/th&gt;&lt;th class="num"&gt;신규&lt;/th&gt;&lt;th class="num"&gt;누적&lt;/th&gt;&lt;/tr&gt;
      &lt;/thead&gt;
      &lt;tbody&gt;
        &lt;tr&gt;&lt;td&gt;1월&lt;/td&gt;&lt;td class="num"&gt;12&lt;/td&gt;&lt;td class="num"&gt;112&lt;/td&gt;&lt;/tr&gt;
        &lt;tr&gt;&lt;td&gt;2월&lt;/td&gt;&lt;td class="num"&gt;18&lt;/td&gt;&lt;td class="num"&gt;130&lt;/td&gt;&lt;/tr&gt;
        &lt;tr&gt;&lt;td&gt;3월&lt;/td&gt;&lt;td class="num"&gt;25&lt;/td&gt;&lt;td class="num"&gt;155&lt;/td&gt;&lt;/tr&gt;
      &lt;/tbody&gt;
    &lt;/table&gt;
  \`,
  isHtml: true
};</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Practical Examples
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">5. Practical Examples</h3>
    <p class="subsection-description">실제 사용 예시들입니다.</p>

    <div class="example-box">
      <h4>Dashboard Widgets</h4>
      <div class="practical-demo">
        <div class="stat-card" v-tooltip.top="statTooltip1">
          <div class="stat-icon">👥</div>
          <div class="stat-value">245</div>
          <div class="stat-label">전체 사용자</div>
        </div>

        <div class="stat-card" v-tooltip.top="statTooltip2">
          <div class="stat-icon">📚</div>
          <div class="stat-value">32</div>
          <div class="stat-label">진행 중인 과정</div>
        </div>

        <div class="stat-card" v-tooltip.top="statTooltip3">
          <div class="stat-icon">✅</div>
          <div class="stat-value">89%</div>
          <div class="stat-label">완료율</div>
        </div>
      </div>

      <div class="code-example">
        <pre><code>const statTooltip1 = {
  html: \`
    &lt;table&gt;
      &lt;tr&gt;&lt;th&gt;유형&lt;/th&gt;&lt;th class="num"&gt;인원&lt;/th&gt;&lt;/tr&gt;
      &lt;tr&gt;&lt;td&gt;학생&lt;/td&gt;&lt;td class="num"&gt;180명&lt;/td&gt;&lt;/tr&gt;
      &lt;tr&gt;&lt;td&gt;강사&lt;/td&gt;&lt;td class="num"&gt;65명&lt;/td&gt;&lt;/tr&gt;
      &lt;tr&gt;&lt;th&gt;전체&lt;/th&gt;&lt;th class="num"&gt;245명&lt;/th&gt;&lt;/tr&gt;
    &lt;/table&gt;
  \`,
  isHtml: true
};</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Icon Buttons with Tooltips</h4>
      <div class="icon-button-demo">
        <button class="btn btn-icon btn-primary" v-tooltip.top="'검색'">
          🔍
        </button>
        <button class="btn btn-icon btn-success" v-tooltip.top="'저장'">
          💾
        </button>
        <button class="btn btn-icon btn-danger" v-tooltip.top="'삭제'">
          🗑️
        </button>
        <button class="btn btn-icon btn-secondary" v-tooltip.top="'설정'">
          ⚙️
        </button>
        <button class="btn btn-icon btn-primary-outline" v-tooltip.top="'정보'">
          ℹ️
        </button>
      </div>

      <div class="code-example">
        <pre><code>&lt;button class="btn btn-icon btn-primary" v-tooltip.top="'검색'"&gt;🔍&lt;/button&gt;
&lt;button class="btn btn-icon btn-success" v-tooltip.top="'저장'"&gt;💾&lt;/button&gt;
&lt;button class="btn btn-icon btn-danger" v-tooltip.top="'삭제'"&gt;🗑️&lt;/button&gt;</code></pre>
      </div>
      <p class="note">
        💡 아이콘만 있는 버튼에는 반드시 툴팁을 추가하여 기능을 설명하세요.
      </p>
    </div>

    <div class="example-box">
      <h4>Form Field Helpers</h4>
      <div class="form-demo">
        <div class="form-group">
          <label class="form-label">
            비밀번호
            <span class="help-icon" v-tooltip.right="passwordHelpTooltip">
              ℹ️
            </span>
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="비밀번호 입력"
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            이메일
            <span
              class="help-icon"
              v-tooltip.right="'회사 이메일 주소를 입력하세요'"
            >
              ℹ️
            </span>
          </label>
          <input
            type="email"
            class="form-control"
            placeholder="email@example.com"
          />
        </div>
      </div>

      <div class="code-example">
        <pre><code>const passwordHelpTooltip = {
  html: \`
    &lt;strong&gt;비밀번호 요구사항&lt;/strong&gt;
    &lt;br&gt;• 최소 8자 이상
    &lt;br&gt;• 영문, 숫자, 특수문자 조합
    &lt;br&gt;• 대소문자 구분
  \`,
  isHtml: true
};

&lt;label&gt;
  비밀번호
  &lt;span v-tooltip.right="passwordHelpTooltip"&gt;ℹ️&lt;/span&gt;
&lt;/label&gt;</code></pre>
      </div>
    </div>
  </section>

  <!-- ========================================
         Best Practices
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">6. Best Practices</h3>
    <p class="subsection-description">툴팁 사용 시 권장사항입니다.</p>

    <div class="example-box">
      <h4>✅ Good Examples</h4>
      <div class="best-practices-grid">
        <div class="practice-item good">
          <div class="practice-example">
            <button
              class="btn btn-icon btn-primary"
              v-tooltip.top="'파일 다운로드'"
            >
              📥
            </button>
          </div>
          <div class="practice-description">
            ✓ 아이콘 버튼에 명확한 설명 제공
          </div>
        </div>

        <div class="practice-item good">
          <div class="practice-example">
            <button
              class="btn btn-danger"
              v-tooltip.top.danger="'삭제된 데이터는 복구할 수 없습니다'"
            >
              삭제
            </button>
          </div>
          <div class="practice-description">✓ 중요한 동작에 경고 툴팁 사용</div>
        </div>

        <div class="practice-item good">
          <div class="practice-example">
            <span class="badge badge-success" v-tooltip.top="detailTooltip">
              완료
            </span>
          </div>
          <div class="practice-description">✓ 상태 표시에 추가 정보 제공</div>
        </div>
      </div>

      <h4 style="margin-top: 2rem">❌ Bad Examples</h4>
      <div class="best-practices-grid">
        <div class="practice-item bad">
          <div class="practice-example">
            <button class="btn btn-primary" v-tooltip.top="'클릭하세요'">
              저장
            </button>
          </div>
          <div class="practice-description">✗ 이미 명확한 버튼에 중복 설명</div>
        </div>

        <div class="practice-item bad">
          <div class="practice-example">
            <button
              class="btn btn-secondary"
              v-tooltip.top="
                '이 버튼을 클릭하면 매우 복잡하고 긴 설명이 나타나는데 이렇게 길면 사용자가 읽기 어렵습니다. 툴팁은 간결해야 합니다.'
              "
            >
              도움말
            </button>
          </div>
          <div class="practice-description">
            ✗ 너무 긴 텍스트 (테이블이나 HTML로 정리)
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

// HTML tooltips
const htmlTooltip1 = {
  html: "<strong>강조된 텍스트</strong><br><em>기울임 텍스트</em>",
  isHtml: true,
};

const htmlTooltip2 = {
  html: "버전: <code>v1.2.4</code><br>최신 업데이트: 2026-02-18",
  isHtml: true,
};

const htmlTooltip3 = {
  html: "<strong>Vue 3 대시보드</strong><br>버전: <code>v1.2.4</code><br><em>최신 업데이트: 2026-02-18</em>",
  isHtml: true,
};

// Table tooltips
const tableTooltip1 = {
  html: `
    <table>
      <tr><th>항목</th><th class="num">값</th></tr>
      <tr><td>전체 사용자</td><td class="num">245명</td></tr>
      <tr><td>학생</td><td class="num">180명</td></tr>
      <tr><td>강사</td><td class="num">65명</td></tr>
    </table>
  `,
  isHtml: true,
};

const tableTooltip2 = {
  html: `
    <table class="tooltip-table-bordered">
      <tr><th>과목</th><th class="num">점수</th></tr>
      <tr><td>수학</td><td class="num">95점</td></tr>
      <tr><td>영어</td><td class="num">88점</td></tr>
      <tr><td>과학</td><td class="num">92점</td></tr>
    </table>
  `,
  isHtml: true,
};

const tableTooltip3 = {
  html: `
    <table class="tooltip-table-striped">
      <thead>
        <tr><th>월</th><th class="num">신규</th><th class="num">누적</th></tr>
      </thead>
      <tbody>
        <tr><td>1월</td><td class="num">12</td><td class="num">112</td></tr>
        <tr><td>2월</td><td class="num">18</td><td class="num">130</td></tr>
        <tr><td>3월</td><td class="num">25</td><td class="num">155</td></tr>
        <tr><td>4월</td><td class="num">32</td><td class="num">187</td></tr>
      </tbody>
    </table>
  `,
  isHtml: true,
};

const stripedTableTooltip = {
  html: `
    <table class="tooltip-table-striped">
      <thead>
        <tr><th>월</th><th class="num">신규</th><th class="num">누적</th></tr>
      </thead>
      <tbody>
        <tr><td>1월</td><td class="num">12</td><td class="num">112</td></tr>
        <tr><td>2월</td><td class="num">18</td><td class="num">130</td></tr>
        <tr><td>3월</td><td class="num">25</td><td class="num">155</td></tr>
      </tbody>
    </table>
  `,
  isHtml: true,
};

const complexTableTooltip = {
  html: `
    <table class="tooltip-table-striped tooltip-table-bordered">
      <thead>
        <tr><th>강의실</th><th>시간</th><th class="num">인원</th></tr>
      </thead>
      <tbody>
        <tr><td>A-101</td><td>09:00</td><td class="num">24</td></tr>
        <tr><td>A-102</td><td>14:00</td><td class="num">18</td></tr>
        <tr><td>B-201</td><td>09:00</td><td class="num">30</td></tr>
      </tbody>
      <tfoot>
        <tr><th colspan="2">총 인원</th><th class="num">72</th></tr>
      </tfoot>
    </table>
  `,
  isHtml: true,
};

// Practical tooltips
const statTooltip1 = {
  html: `
    <table>
      <tr><th>유형</th><th class="num">인원</th></tr>
      <tr><td>학생</td><td class="num">180명</td></tr>
      <tr><td>강사</td><td class="num">65명</td></tr>
      <tr><th>전체</th><th class="num">245명</th></tr>
    </table>
  `,
  isHtml: true,
};

const statTooltip2 = {
  html: `
    <table>
      <tr><th>상태</th><th class="num">과정 수</th></tr>
      <tr><td>진행 중</td><td class="num">32</td></tr>
      <tr><td>예정</td><td class="num">18</td></tr>
      <tr><td>완료</td><td class="num">124</td></tr>
    </table>
  `,
  isHtml: true,
};

const statTooltip3 = {
  html: `
    <strong>완료율 상세</strong>
    <br>• 목표: 85%
    <br>• 현재: 89%
    <br>• 초과: +4%
  `,
  isHtml: true,
};

const passwordHelpTooltip = {
  html: `
    <strong>비밀번호 요구사항</strong>
    <br>• 최소 8자 이상
    <br>• 영문, 숫자, 특수문자 조합
    <br>• 대소문자 구분
  `,
  isHtml: true,
};

const detailTooltip = {
  html: `
    <strong>완료 정보</strong>
    <br>완료일: 2026-02-15
    <br>담당자: 김철수
    <br>소요시간: 3일
  `,
  isHtml: true,
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

.tooltip-demo-grid {
  display: flex;
  gap: $spacing-md;
  flex-wrap: wrap;
  margin-bottom: $spacing-md;
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
}

// Practical examples
.practical-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: $spacing-md;
  margin-bottom: $spacing-md;
}

.stat-card {
  background: linear-gradient(
    135deg,
    $color-primary-light 0%,
    $color-primary 100%
  );
  color: $color-text-white;
  padding: $spacing-lg;
  border-radius: $radius-lg;
  text-align: center;
  cursor: pointer;
  transition: all $transition-base;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;
  }
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: $spacing-sm;
}

.stat-value {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-xs;
}

.stat-label {
  font-size: $font-size-sm;
  opacity: 0.9;
}

.icon-button-demo {
  display: flex;
  gap: $spacing-sm;
  flex-wrap: wrap;
  margin-bottom: $spacing-md;
}

.form-demo {
  max-width: 400px;
}

.form-group {
  margin-bottom: $spacing-lg;
}

.form-label {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  margin-bottom: $spacing-sm;
  font-weight: $font-weight-medium;
  color: $color-text-primary;
}

.help-icon {
  font-size: $font-size-sm;
  cursor: help;
  opacity: 0.6;
  transition: opacity $transition-fast;

  &:hover {
    opacity: 1;
  }
}

.form-control {
  width: 100%;
  padding: $spacing-sm $spacing-md;
  border: $border-width solid $color-border;
  border-radius: $radius-md;
  font-size: $font-size-sm;
}

// Best practices
.best-practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: $spacing-md;
  margin-bottom: $spacing-md;
}

.practice-item {
  padding: $spacing-md;
  border-radius: $radius-md;
  border: 2px solid;

  &.good {
    background: rgba($color-success, 0.05);
    border-color: $color-success-light;
  }

  &.bad {
    background: rgba($color-danger, 0.05);
    border-color: $color-danger-light;
  }
}

.practice-example {
  margin-bottom: $spacing-sm;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.practice-description {
  font-size: $font-size-xs;
  text-align: center;

  .practice-item.good & {
    color: $color-success-dark;
  }

  .practice-item.bad & {
    color: $color-danger-dark;
  }
}

.badge {
  display: inline-block;
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;

  &.badge-success {
    background: $color-success-light;
    color: $color-success-dark;
  }
}

@media (max-width: $breakpoint-md) {
  .practical-demo {
    grid-template-columns: 1fr;
  }

  .best-practices-grid {
    grid-template-columns: 1fr;
  }
}
</style>
