/**
 * Guide.tsx — PlotNote 디자인 시스템 가이드
 *
 * 제거 방법:
 *   1. MainLayout.tsx에서 import Guide 줄 삭제
 *   2. <Guide /> 렌더 줄 삭제
 *   3. src/components/screens/guide/ 폴더 삭제
 */

import { useState } from "react";
import "./guide.scss";

// ─────────────────────────────────────────────
// 탭 정의
// ─────────────────────────────────────────────
const TABS = [
  {
    group: "디자인 토큰",
    items: [
      { id: "colors", label: "색상" },
      { id: "typography", label: "타이포그래피" },
      { id: "spacing", label: "간격 & 반경" },
    ],
  },
  {
    group: "컴포넌트",
    items: [
      { id: "buttons", label: "버튼" },
      { id: "tooltip", label: "툴팁" },
      { id: "animations", label: "애니메이션" },
    ],
  },
  {
    group: "로직",
    items: [
      { id: "hooks", label: "훅 (Hooks)" },
      { id: "context", label: "컨텍스트" },
      { id: "utils", label: "유틸리티" },
      { id: "scss", label: "SCSS 구조" },
    ],
  },
];

// ─────────────────────────────────────────────
// 색상 섹션
// ─────────────────────────────────────────────
const COLOR_GROUPS = [
  {
    label: "브랜드 (Deep Blue 계열)",
    colors: [
      { name: "Deep Blue", cssVar: "--color-primary", hex: "#2A4D88" },
      { name: "Ocean", cssVar: "--color-primary-light", hex: "#7C94B8" },
      { name: "Glacial", cssVar: "--color-primary-muted", hex: "#B1BBC8" },
      { name: "Concerto", cssVar: "--color-primary-dim", hex: "#D9D9D8" },
    ],
  },
  {
    label: "포인트 (Amber — 전체 UI의 ~5%)",
    colors: [
      { name: "Amber", cssVar: "--color-accent", hex: "#fbc662" },
      { name: "Amber Dark", cssVar: "--color-accent-dark", hex: "#e8a83c" },
      { name: "Amber Light", cssVar: "--color-accent-light", hex: "#fdd99b" },
    ],
  },
  {
    label: "배경",
    colors: [
      { name: "Paper", cssVar: "--bg-primary", hex: "#f7f6f3" },
      { name: "White", cssVar: "--bg-secondary", hex: "#fefefe" },
      { name: "Hover BG", cssVar: "--bg-tertiary", hex: "#edede9" },
    ],
  },
  {
    label: "텍스트",
    colors: [
      { name: "Ink", cssVar: "--text-primary", hex: "#1a1a1a" },
      { name: "Ink Soft", cssVar: "--text-secondary", hex: "#4a4a4a" },
      { name: "Ink Ghost", cssVar: "--text-tertiary", hex: "#9a9a9a" },
    ],
  },
  {
    label: "상태",
    colors: [
      { name: "Error", cssVar: "--color-error", hex: "#e05555" },
      { name: "Success", cssVar: "--color-success", hex: "#52c787" },
      { name: "Warning", cssVar: "--color-warning", hex: "#f5b841" },
    ],
  },
];

function ColorsSection() {
  return (
    <div>
      <h2 className="guide-section-title">색상 팔레트</h2>
      <p className="guide-section-desc">
        60-30-10 Rule · 배경(60%) — Deep Blue 계열(30%) — Amber 포인트(~5%)
      </p>
      {COLOR_GROUPS.map((g) => (
        <div key={g.label}>
          <div className="guide-section-sub">{g.label}</div>
          <div className="guide-colors">
            {g.colors.map((c) => (
              <div key={c.cssVar} className="guide-swatch">
                <div
                  className="guide-swatch__preview"
                  style={{ background: c.hex }}
                />
                <div className="guide-swatch__info">
                  <div className="swatch-name">{c.name}</div>
                  <div className="swatch-var">{c.cssVar}</div>
                  <div className="swatch-hex">{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="guide-section-sub">JS에서 접근</div>
      <pre className="guide-code">{`// CSS 변수 읽기
getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary'); // '#2A4D88'

// CSS 변수 변경 (테마 전환)
document.documentElement.style
  .setProperty('--color-primary', '#ff0000');`}</pre>
    </div>
  );
}

// ─────────────────────────────────────────────
// 타이포그래피 섹션
// ─────────────────────────────────────────────
function TypographySection() {
  return (
    <div>
      <h2 className="guide-section-title">타이포그래피</h2>
      <p className="guide-section-desc">
        Google Fonts — Noto Sans KR (기본) / Noto Serif KR (제목) / DM Mono
        (메타·코드)
      </p>

      <div className="guide-section-sub">폰트 패밀리</div>
      <div
        className="guide-demo-row"
        style={{ flexDirection: "column", alignItems: "flex-start", gap: 14 }}
      >
        {[
          {
            var: "--font-family-base",
            label: "Noto Sans KR",
            sample: "가나다 — UI 기본 텍스트",
          },
          {
            var: "--font-family-serif",
            label: "Noto Serif KR",
            sample: "가나다 — 제목·컨텐츠 강조",
          },
          {
            var: "--font-family-mono",
            label: "DM Mono",
            sample: "1화 · pg 01/24 — 메타·코드",
          },
        ].map((f) => (
          <div
            key={f.var}
            style={{ display: "flex", alignItems: "baseline", gap: 12 }}
          >
            <code className="guide-code-inline">{f.var}</code>
            <span style={{ fontFamily: `var(${f.var})`, fontSize: 15 }}>
              {f.sample}
            </span>
          </div>
        ))}
      </div>

      <div className="guide-section-sub">사이즈 스케일</div>
      {[
        {
          var: "--font-xs",
          px: "12px",
          sample: "레이블, 메타, 배지 · 기본 xs",
        },
        { var: "--font-sm", px: "14px", sample: "기본 UI 텍스트 · body sm" },
        { var: "--font-base", px: "16px", sample: "본문 · base" },
        { var: "--font-lg", px: "18px", sample: "서브 제목 · lg" },
        { var: "--font-xl", px: "20px", sample: "섹션 제목 · xl" },
      ].map((f) => (
        <div key={f.var} className="guide-type-row">
          <code className="guide-code-inline" style={{ width: 130 }}>
            {f.var}
          </code>
          <span
            style={{
              width: 36,
              fontSize: 10,
              color: "var(--text-tertiary)",
              fontFamily: "var(--font-family-mono)",
            }}
          >
            {f.px}
          </span>
          <span
            style={{ fontSize: `var(${f.var})`, color: "var(--text-primary)" }}
          >
            {f.sample}
          </span>
        </div>
      ))}

      <div className="guide-section-sub">굵기</div>
      <div className="guide-demo-row">
        {[
          { w: 300, var: "--font-light" },
          { w: 400, var: "--font-normal" },
          { w: 500, var: "--font-medium" },
          { w: 600, var: "--font-semibold" },
          { w: 700, var: "--font-bold" },
        ].map((f) => (
          <div key={f.var} style={{ textAlign: "center" }}>
            <div style={{ fontWeight: f.w, fontSize: 15, marginBottom: 2 }}>
              Aa 가나
            </div>
            <code
              style={{
                fontSize: 9,
                fontFamily: "var(--font-family-mono)",
                color: "var(--text-tertiary)",
              }}
            >
              {f.w}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 간격 & 반경 섹션
// ─────────────────────────────────────────────
function SpacingSection() {
  const spacings = [
    { var: "--spacing-xs", px: 4 },
    { var: "--spacing-sm", px: 8 },
    { var: "--spacing-md", px: 16 },
    { var: "--spacing-lg", px: 24 },
    { var: "--spacing-xl", px: 32 },
    { var: "--spacing-2xl", px: 48 },
  ];
  const radii = [
    { var: "--radius-sm", label: "sm", px: 4 },
    { var: "--radius-md", label: "md", px: 8 },
    { var: "--radius-lg", label: "lg", px: 12 },
    { var: "--radius-xl", label: "xl", px: 20 },
    { var: "--radius-full", label: "full", px: 9999 },
  ];

  return (
    <div>
      <h2 className="guide-section-title">간격 & 반경</h2>

      <div className="guide-section-sub">Spacing</div>
      {spacings.map((s) => (
        <div key={s.var} className="guide-spacing-bar">
          <code
            className="bar-label"
            style={{
              fontSize: 10,
              fontFamily: "var(--font-family-mono)",
              color: "var(--text-tertiary)",
              width: 130,
            }}
          >
            {s.var}
          </code>
          <span className="bar-px">{s.px}px</span>
          <div className="bar-visual" style={{ width: s.px * 2 }} />
        </div>
      ))}

      <div className="guide-section-sub">Border Radius</div>
      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          alignItems: "flex-end",
        }}
      >
        {radii.map((r) => (
          <div key={r.var} style={{ textAlign: "center" }}>
            <div
              style={{
                width: 48,
                height: 48,
                background: "var(--color-primary)",
                borderRadius: `var(${r.var})`,
                opacity: 0.7,
              }}
            />
            <div
              style={{
                fontSize: 10,
                fontFamily: "var(--font-family-mono)",
                color: "var(--text-tertiary)",
                marginTop: 6,
              }}
            >
              {r.label}
            </div>
            <div
              style={{
                fontSize: 9,
                fontFamily: "var(--font-family-mono)",
                color: "var(--text-tertiary)",
              }}
            >
              {r.px === 9999 ? "∞" : `${r.px}px`}
            </div>
          </div>
        ))}
      </div>

      <div className="guide-section-sub">Shadow</div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {["--shadow-xs", "--shadow-sm", "--shadow-md", "--shadow-lg"].map(
          (s) => (
            <div key={s} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "var(--bg-secondary)",
                  borderRadius: 8,
                  boxShadow: `var(${s})`,
                }}
              />
              <code
                style={{
                  fontSize: 9,
                  fontFamily: "var(--font-family-mono)",
                  color: "var(--text-tertiary)",
                  display: "block",
                  marginTop: 6,
                }}
              >
                {s.replace("--shadow-", "")}
              </code>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 버튼 섹션
// ─────────────────────────────────────────────
function ButtonsSection() {
  return (
    <div>
      <h2 className="guide-section-title">버튼</h2>
      <p className="guide-section-desc">
        button.scss 정의. global.scss의 button 리셋 위에 추가.
      </p>

      <div className="guide-section-sub">Variants</div>
      <div className="guide-demo-row">
        <button className="btn">btn</button>
        <button className="btn btn--primary">btn--primary</button>
        <button className="btn btn--accent">btn--accent</button>
        <button className="btn btn--outline">btn--outline</button>
        <button className="btn btn--danger">btn--danger</button>
      </div>
      <pre className="guide-code">{`<button className="btn btn--primary">저장</button>
<button className="btn btn--accent">에피소드 추가</button>  {/* ~5% 포인트만 */}
<button className="btn btn--outline">취소</button>
<button className="btn btn--danger">삭제</button>`}</pre>

      <div className="guide-section-sub">크기 & 아이콘 버튼</div>
      <div className="guide-demo-row">
        <button className="btn btn--primary">기본</button>
        <button className="btn btn--primary btn--sm">btn--sm</button>
        <button className="btn--icon">✕</button>
      </div>

      <div className="guide-section-sub">뷰 토글 (view-toggle)</div>
      <div className="guide-demo-row">
        <div className="view-toggle">
          <button className="view-btn active">단면</button>
          <button className="view-btn">양면</button>
        </div>
      </div>
      <pre className="guide-code">{`<div className="view-toggle">
  <button className="view-btn active">단면</button>
  <button className="view-btn">양면</button>
</div>`}</pre>

      <div className="guide-section-sub">필터 칩 (btn-chip)</div>
      <div className="guide-demo-row">
        <button className="btn-chip active">전체</button>
        <button className="btn-chip">미작업</button>
        <button className="btn-chip">완료</button>
      </div>

      <div className="guide-section-sub">추가 버튼 (btn-add)</div>
      <div style={{ padding: "8px 0" }}>
        <button className="btn-add">+ 에피소드 추가</button>
      </div>
      <div style={{ padding: "4px 0" }}>
        <button className="btn-add btn-add--accent">
          + 중요 에피소드 (Accent)
        </button>
      </div>

      <div className="guide-section-sub">이미지 아이콘 버튼 (.image-btn)</div>
      <div className="guide-demo-row">
        <button className="image-btn img-menu">menu</button>
        <button className="image-btn img-add">add</button>
        <button className="image-btn img-close">close</button>
        <button className="image-btn img-settings">settings</button>
        <button className="image-btn img-search">search</button>
        <button className="image-btn img-more">more</button>
        <button className="image-btn img-favorite">favorite</button>
      </div>
      <pre className="guide-code">{`// className: "image-btn" + 이미지 클래스
<button className="image-btn img-menu">menu</button>
<button className="image-btn img-add">add</button>
// 사용 가능: img-menu, img-home, img-close, img-add, img-search,
//            img-settings, img-logout, img-person, img-folder,
//            img-folder-open, img-docs, img-arrow-right,
//            img-arrow-down, img-more, img-favorite`}</pre>

      <div className="guide-section-sub">Disabled</div>
      <div className="guide-demo-row">
        <button className="btn btn--primary" disabled>
          Primary (disabled)
        </button>
        <button className="btn btn--accent" disabled>
          Accent (disabled)
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 툴팁 섹션
// ─────────────────────────────────────────────
function TooltipSection() {
  return (
    <div>
      <h2 className="guide-section-title">툴팁</h2>
      <p className="guide-section-desc">
        tooltip.scss에 3가지 방식 통합: (A) data-tooltip CSS · (B) .tooltip
        React 래퍼 · (C) .tooltip-portal Portal
      </p>

      <div className="guide-section-sub">
        (A) data-tooltip — 순수 CSS 속성 기반
      </div>
      <div className="guide-demo-row" style={{ paddingTop: 28 }}>
        <button className="btn btn--outline" data-tooltip="top (기본)">
          top
        </button>
        <button
          className="btn btn--outline"
          data-tooltip="bottom"
          data-tooltip-pos="bottom"
        >
          bottom
        </button>
        <button
          className="btn btn--outline"
          data-tooltip="right"
          data-tooltip-pos="right"
        >
          right
        </button>
        <button
          className="btn btn--outline"
          data-tooltip="left"
          data-tooltip-pos="left"
        >
          left
        </button>
      </div>
      <pre className="guide-code">{`<button data-tooltip="저장하기">버튼</button>
<button data-tooltip="아래" data-tooltip-pos="bottom">버튼</button>
// pos: top(기본) | bottom | left | right`}</pre>

      <div className="guide-section-sub">
        (B) .tooltip 컴포넌트 래퍼 — HTML 내용 지원
      </div>
      <div className="guide-demo-row">
        <div
          className="tooltip tooltip--bottom"
          style={{ position: "relative" }}
        >
          <button className="btn btn--outline tooltip__trigger">
            hover me
          </button>
          <div
            className="tooltip__content"
            style={{
              opacity: 1,
              pointerEvents: "auto",
              position: "absolute",
              top: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100,
            }}
          >
            <div className="tooltip__content-title">저장하기</div>
            <div className="tooltip__content-desc">현재 작업을 저장합니다</div>
            <span className="tooltip__content-kbd">Ctrl+S</span>
          </div>
        </div>
      </div>
      <pre className="guide-code">{`<div className="tooltip tooltip--bottom">
  <button className="tooltip__trigger">버튼</button>
  <div className="tooltip__content is-visible">
    <div className="tooltip__content-title">제목</div>
    <div className="tooltip__content-desc">설명</div>
    <span className="tooltip__content-kbd">Ctrl+S</span>
  </div>
</div>
// 위치: tooltip--top | --bottom | --left | --right
// is-visible 클래스로 노출/숨김 제어`}</pre>

      <div className="guide-section-sub">컨텍스트 메뉴 (.context-menu)</div>
      <div className="guide-demo-row">
        <div
          className="context-menu"
          style={{ position: "relative", display: "inline-block" }}
        >
          <div className="context-menu__item">
            <span>편집</span>
          </div>
          <div className="context-menu__item">
            <span>복사</span>
          </div>
          <div className="context-menu__divider" />
          <div className="context-menu__item danger">
            <span>삭제</span>
          </div>
        </div>
      </div>
      <pre className="guide-code">{`<div className="context-menu">
  <div className="context-menu__item">편집</div>
  <div className="context-menu__item">복사</div>
  <div className="context-menu__divider" />
  <div className="context-menu__item danger">삭제</div>
</div>`}</pre>
    </div>
  );
}

// ─────────────────────────────────────────────
// 애니메이션 섹션
// ─────────────────────────────────────────────
const ANIM_CLASSES = [
  { cls: "anim-fade-up", desc: "페이지 진입, 카드 로드" },
  { cls: "anim-slide-left", desc: "사이드바, 리스트 항목" },
  { cls: "anim-scale-in", desc: "드롭다운, 모달 컨텐츠" },
  { cls: "anim-tree-expand", desc: "트리 노드 펼칠 때" },
];

function AnimationsSection() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <h2 className="guide-section-title">애니메이션</h2>
      <p className="guide-section-desc">
        animations.scss의 @keyframes + 유틸 클래스. SCSS mixin도 제공.
      </p>

      <button
        className="btn btn--outline btn--sm"
        style={{ marginBottom: 14 }}
        onClick={() => setKey((k) => k + 1)}
      >
        ↺ 다시 재생
      </button>

      <div className="guide-section-sub">유틸 클래스</div>
      {ANIM_CLASSES.map((a) => (
        <div
          key={`${a.cls}-${key}`}
          className="guide-demo-row"
          style={{ justifyContent: "space-between" }}
        >
          <div
            className={a.cls}
            style={{
              padding: "5px 10px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <code
              style={{
                fontSize: 11,
                fontFamily: "var(--font-family-mono)",
                color: "var(--color-primary)",
              }}
            >
              .{a.cls}
            </code>
          </div>
          <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>
            {a.desc}
          </span>
        </div>
      ))}

      <div className="guide-section-sub">Stagger (.anim-stagger)</div>
      <div className="guide-demo-row">
        <div
          className="anim-stagger"
          key={key}
          style={{ display: "flex", gap: 6 }}
        >
          {[0.7, 0.75, 0.8, 0.85, 0.9].map((op, i) => (
            <div
              key={i}
              className="anim-fade-up"
              style={{
                width: 32,
                height: 32,
                background: "var(--color-primary)",
                borderRadius: "var(--radius-sm)",
                opacity: op,
              }}
            />
          ))}
        </div>
      </div>
      <pre className="guide-code">{`// 부모에 .anim-stagger → 자식 nth-child(1~10)에 순차 delay
<div className="anim-stagger">
  <div>1</div>
  <div>2</div>
</div>

// 직접 delay 제어
<div className="anim-fade-up" style={{ '--anim-delay': '0.2s' } as any}>...</div>`}</pre>

      <div className="guide-section-sub">SCSS Mixin (variables.scss)</div>
      <pre className="guide-code">{`@include hover-card-lift;              // scale + shadow
@include hover-lift(-4px);             // translateY
@include hover-fill-from-bottom(#2A4D88); // 배경 fill (아래→위)
@include hover-fill-from-left(#2A4D88);   // 배경 fill (왼→오)
@include hover-bg(#eef1f7);           // 단순 배경 전환
@include focus-ring;                  // 포커스 링 (접근성)
@include text-ellipsis(2);            // 말줄임 n줄
@include custom-scrollbar;            // 커스텀 스크롤바
@include image-icon(var(--img-menu)); // 이미지 아이콘 배경`}</pre>
    </div>
  );
}

// ─────────────────────────────────────────────
// 훅 섹션
// ─────────────────────────────────────────────
const HOOK_GROUPS = [
  {
    category: "data — 비즈니스 로직",
    path: "hooks/data/",
    hooks: [
      {
        name: "useCut",
        status: "✅ 구현됨",
        desc: "컷 분할 로직. SVG 폴리곤 기반 수평/수직/대각선 분할.",
        usage: `const { cutList, currentCutId, selectCut, splitCut } = useCut(pageId);

// 드래그 좌표로 컷 분할 (0-100 SVG 좌표계)
splitCut(cutId, { startX, startY, endX, endY });
// cutId가 null이면 빈 페이지 전체를 분할`,
      },
      {
        name: "useSetting",
        status: "⚠️ 빈 파일 — N-3에서 구현 예정",
        desc: "설정 조회/변경. 상속 체계: Episode > Project > User > Default.",
        usage: `// 구현 예정 API (settingsHelper.ts 활용)
const { effectiveSettings, updateProjectSetting } = useSetting(projectId, episodeId);
// effectiveSettings.spreadStart, readingDirection, pageView ...`,
      },
    ],
  },
  {
    category: "ui — 인터랙션 / 레이아웃",
    path: "hooks/ui/",
    hooks: [
      {
        name: "useResizeHandle",
        status: "✅ 구현됨 (유틸 함수, 훅 아님)",
        desc: "사이드바 너비 드래그 리사이즈. Sidebar.tsx에서 사용.",
        usage: `import { startResize, updateWidth, endResize } from "hooks/ui/useResizeHandle";

// onMouseDown → startResize(e, setIsResizing)
// document mousemove → updateWidth(e, setSidebarWidth)  [150px~400px 클램핑]
// document mouseup  → endResize(setIsResizing)`,
      },
      {
        name: "useTooltip / useSimpleTooltip",
        status: "✅ 구현됨",
        desc: "TooltipContext 기반 툴팁. 복잡한 HTML 내용은 useTooltip, 단순 텍스트는 useSimpleTooltip.",
        usage: `// 1. JS 기반 — 위치 계산, HTML 지원
const tooltip = useTooltip("저장하기", "top");
const tooltip = useTooltip({ html: "<b>제목</b>", isHtml: true }, "bottom");
const tooltip = useTooltip("삭제", "top", "danger"); // color variant
<button {...tooltip.triggerProps}>버튼</button>

// 2. CSS 전용 — data-attribute (JS 인프라 불필요)
const attrs = useSimpleTooltip("텍스트", "top");
<span {...attrs}>hover me</span>`,
      },
      {
        name: "useModal",
        status: "⚠️ 빈 파일 — N-1에서 구현 예정",
        desc: "모달 열기/닫기 상태 관리.",
        usage: `// 구현 예정 API
const { isOpen, open, close } = useModal();
<button onClick={open}>모달 열기</button>
{isOpen && <Modal onClose={close} />}`,
      },
      {
        name: "useZoom",
        status: "⚠️ 빈 파일",
        desc: "줌 레벨 제어. PageBody의 인라인 useState로 임시 구현 중.",
        usage: `// 구현 예정 API
const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();`,
      },
      {
        name: "useDragAndDrop",
        status: "⚠️ 빈 파일 — N-4에서 구현 예정",
        desc: "에피소드/페이지 순서 DnD. orderManager.ts의 reorder()와 연동.",
        usage: `// 구현 예정 API
const { dragHandlers, isDragging } = useDragAndDrop({
  onDrop: (fromId, toId) => dispatch({ type: 'REORDER_EPISODES', ... }),
});`,
      },
    ],
  },
];

function HooksSection() {
  return (
    <div>
      <h2 className="guide-section-title">훅 (Hooks)</h2>
      <p className="guide-section-desc">
        hooks/ 디렉토리. data/(비즈니스 로직)와 ui/(인터랙션)로 분리.
        ⚠️ 빈 파일은 Phase N에서 순차 구현 예정.
      </p>
      {HOOK_GROUPS.map((group) => (
        <div key={group.category}>
          <div className="guide-section-sub">
            {group.category}
            <span style={{ fontSize: 10, marginLeft: 8, color: "var(--text-tertiary)", fontFamily: "var(--font-family-mono)" }}>
              {group.path}
            </span>
          </div>
          {group.hooks.map((h) => (
            <div key={h.name} className="guide-hook-card">
              <div className="guide-hook-card__header">
                <span className="hook-name">{h.name}</span>
                <span className="hook-path">{h.status}</span>
              </div>
              <div className="guide-hook-card__desc">{h.desc}</div>
              <pre className="guide-code">{h.usage}</pre>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// 컨텍스트 섹션
// ─────────────────────────────────────────────
function ContextSection() {
  return (
    <div>
      <h2 className="guide-section-title">컨텍스트</h2>
      <p className="guide-section-desc">
        contexts/ 디렉토리. StoreProvider 하나가 Store + Dispatch + UI 세 컨텍스트를 묶어서 제공.
        App.tsx 최상위에서 {"<StoreProvider>"} → {"<TooltipProvider>"} 순으로 감쌈.
      </p>

      {/* StoreContext */}
      <div className="guide-section-sub">StoreContext — 메인 데이터 (contexts/StoreContext.tsx)</div>
      <div className="guide-hook-card">
        <div className="guide-hook-card__header">
          <span className="hook-name">useStore()</span>
          <span className="hook-path">→ NormalizedStore (읽기 전용)</span>
        </div>
        <div className="guide-hook-card__desc">
          전체 앱 데이터. IndexedDB에 500ms debounce로 자동 저장.
        </div>
        <pre className="guide-code">{`const store = useStore();

// store 구조 — 모두 Record<string, T>
store.bookshelves   // { [id]: Bookshelf }
store.projects      // { [id]: Project }
store.episodes      // { [id]: Episode }
store.pages         // { [id]: Page }
store.cuts          // { [id]: Cut }
store.memos         // { [id]: Memo }
store.scriptSnippets
store.assets`}</pre>
      </div>

      <div className="guide-hook-card">
        <div className="guide-hook-card__header">
          <span className="hook-name">useDispatch()</span>
          <span className="hook-path">→ Dispatch{"<Action>"}</span>
        </div>
        <div className="guide-hook-card__desc">
          상태 변경의 유일한 통로. 모든 Action은 불변성 보장.
        </div>
        <pre className="guide-code">{`const dispatch = useDispatch();

// 주요 Action 타입
dispatch({ type: 'ADD_BOOKSHELF',    payload: { title, ownerId } });
dispatch({ type: 'ADD_PROJECT',      payload: { bookshelfId, title } });
dispatch({ type: 'ADD_EPISODE',      payload: { projectId, title } });
dispatch({ type: 'ADD_PAGE',         payload: { episodeId } });
dispatch({ type: 'ADD_CUT',          payload: { pageId, frame } });
dispatch({ type: 'ADD_MEMO',         payload: { parentId, parentType, role, content } });
dispatch({ type: 'UPDATE_PROJECT',   payload: { id, title?, settings? } });
dispatch({ type: 'DELETE_EPISODE',   payload: { id } }); // cascade 포함
dispatch({ type: 'REORDER_EPISODES', payload: { projectId, newOrder: string[] } });
dispatch({ type: 'ASSIGN_CUT_MEMO',  payload: { id, cutId } });`}</pre>
      </div>

      <div className="guide-hook-card">
        <div className="guide-hook-card__header">
          <span className="hook-name">useUI()</span>
          <span className="hook-path">→ UIContextValue</span>
        </div>
        <div className="guide-hook-card__desc">
          현재 선택된 엔티티 ID + 사이드바 상태. 모든 setter는 useCallback 메모이제이션됨 (무한 루프 방지).
        </div>
        <pre className="guide-code">{`const { ui, dbError, clearDbError,
        setCurrentBookshelfId, setCurrentProjectId,
        setCurrentEpisodeId,  setCurrentPageId, setCurrentCutId,
        toggleSidebar, setSidebarOpen,
        navigateToProject, navigateToEpisode, navigateToPage,
      } = useUI();

// ui 구조 (types/ui.ts → UiState)
ui.currentBookshelfId  // string | null
ui.currentProjectId    // string | null
ui.currentEpisodeId    // string | null
ui.currentPageId       // string | null
ui.currentCutId        // string | null
ui.isSidebarOpen       // boolean

// navigateTo* 는 하위 ID를 null로 리셋함
// navigateToProject(id) → currentEpisodeId/PageId/CutId = null`}</pre>
      </div>

      {/* TooltipContext */}
      <div className="guide-section-sub">TooltipContext (contexts/TooltipContext.tsx)</div>
      <div className="guide-hook-card">
        <div className="guide-hook-card__header">
          <span className="hook-name">useTooltipStore()</span>
          <span className="hook-path">→ 전역 단일 툴팁 인스턴스</span>
        </div>
        <div className="guide-hook-card__desc">
          직접 사용보다 hooks/ui/useTooltip.ts를 통해 사용 권장.
        </div>
        <pre className="guide-code">{`const { state, show, hide, isHtmlContent, displayContent } = useTooltipStore();
// 직접 사용보다 useTooltip() 훅을 통해 사용 권장`}</pre>
      </div>

      {/* AuthContext */}
      <div className="guide-section-sub">AuthContext (contexts/AuthContext.tsx) — ⚠️ 서버 스텁</div>
      <div className="guide-hook-card">
        <div className="guide-hook-card__header">
          <span className="hook-name">useUser()</span>
          <span className="hook-path">서버 도입 전까지 미사용</span>
        </div>
        <div className="guide-hook-card__desc">
          현재 /api/auth/login fetch 스텁만 있음. 권한 분기(owner/editor/readonly)는 서버 도입 시 활성화.
        </div>
        <pre className="guide-code">{`// 서버 도입 후 활성화 예정
const { user, isAuthenticated, login, logout } = useUser();
// user.role: 'owner' | 'editor' | 'comment' | 'readonly'`}</pre>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 유틸리티 섹션
// ─────────────────────────────────────────────
function UtilsSection() {
  return (
    <div>
      <h2 className="guide-section-title">유틸리티</h2>
      <p className="guide-section-desc">
        utils/helpers/ — 순수 함수. 컴포넌트/훅에 의존하지 않아서 어디서든 import 가능.
        utils/constants/ — 공통 상수.
      </p>

      <div className="guide-section-sub">idGenerator.ts — 엔티티 ID 생성</div>
      <div className="guide-hook-card">
        <div className="guide-hook-card__desc">
          nanoid 기반. 접두사로 엔티티 타입 식별 가능. 인덱스 기반 ID 절대 사용 금지.
        </div>
        <pre className="guide-code">{`import { generatePageId, generateCutId, generateEpisodeId,
         generateProjectId, generateUserId } from "utils/helpers/idGenerator";

generatePageId()    // "pg-AbC12345"
generateCutId(pageId) // "pg-AbC12345-xY5f2a"  (부모 ID 포함)
generateEpisodeId() // "ep-AbC12345"
generateProjectId() // "pr-AbC12345"
generateUserId()    // "usr-AbC1234567"`}</pre>
      </div>

      <div className="guide-section-sub">layoutUtils.ts — 컷 분할 기하 연산</div>
      <div className="guide-hook-card">
        <div className="guide-hook-card__desc">
          SVG 0-100 좌표계 기반. 폴리곤을 선분으로 잘라 두 개의 폴리곤으로 분할.
          useCut() 훅 내부에서 사용.
        </div>
        <pre className="guide-code">{`import { classifySplitAngle, splitPolygon,
         getSnapLine, getDiagonalLine } from "utils/helpers/layoutUtils";

// 드래그 방향 → 분할 타입 판별 (25° 미만: horizontal, 65° 초과: vertical)
classifySplitAngle(dx, dy) // → 'horizontal' | 'vertical' | 'diagonal'

// 수평/수직 분할선 (페이지 끝까지 뻗는 선분)
getSnapLine('horizontal', midX, midY) // → [[0,y], [100,y]]

// 대각선 분할선 (드래그 방향으로 300배 확장)
getDiagonalLine(startX, startY, endX, endY) // → [[x1,y1], [x2,y2]]

// 폴리곤 분할 — 선분 l1-l2로 vertices를 두 폴리곤으로 자름
splitPolygon(vertices, l1, l2) // → [Vertex[], Vertex[]] | null`}</pre>
      </div>

      <div className="guide-section-sub">orderManager.ts — 배열 순서 관리</div>
      <div className="guide-hook-card">
        <div className="guide-hook-card__desc">
          episodeOrder, pageOrder, cutOrder 등 ID 배열 조작. REORDER_* Action payload에 사용.
        </div>
        <pre className="guide-code">{`import { reorder, addToOrder, removeFromOrder } from "utils/helpers/orderManager";

reorder(list, fromIndex, toIndex)    // DnD 결과 순서 변경
addToOrder(list, newId)              // 맨 끝에 추가
addToOrder(list, newId, position)    // 특정 위치에 삽입
removeFromOrder(list, targetId)      // ID로 제거

// 예: 에피소드 순서 변경
const newOrder = reorder(project.episodeOrder, 0, 2);
dispatch({ type: 'REORDER_EPISODES', payload: { projectId, newOrder } });`}</pre>
      </div>

      <div className="guide-section-sub">settingsHelper.ts — 설정 상속 체계</div>
      <div className="guide-hook-card">
        <div className="guide-hook-card__desc">
          Rule 7-1: Episode → Project → User → Default 순으로 폴백. null이면 상위 값 사용.
        </div>
        <pre className="guide-code">{`import { getEffectiveSetting, getEffectiveSettings } from "utils/helpers/settingsHelper";

// 단일 키 조회
const spreadStart = getEffectiveSetting({
  settingKey: 'spreadStart',
  episode, project, user, defaultSettings,
});

// 전체 설정 키 일괄 조회
// keys: defaultPageCount, readingDirection, spreadStart, pageView
const settings = getEffectiveSettings({ episode, project, user, defaultSettings });

// 상속 우선순위: episode.settings.key → project.settings.key → user.globalSettings.key → default`}</pre>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCSS 구조 섹션
// ─────────────────────────────────────────────
function ScssSection() {
  return (
    <div>
      <h2 className="guide-section-title">SCSS 구조</h2>
      <p className="guide-section-desc">
        src/assets/styles/ · 진입점 index.scss 하나만 App.tsx에서 import.
      </p>

      <div className="guide-section-sub">파일 구조</div>
      <pre className="guide-code">{`src/assets/styles/
├── index.scss              ← App.tsx에서 단일 import
├── common/
│   ├── variables.scss      ← SCSS 변수 + CSS :root 토큰 + Mixin
│   ├── animations.scss     ← @keyframes + 유틸 클래스
│   ├── global.scss         ← 리셋, body, 이미지버튼 클래스
│   ├── layout.scss         ← app-layout, sidebar, workspace
│   ├── button.scss         ← btn, btn--primary, view-toggle 등
│   ├── tooltip.scss        ← data-tooltip, .tooltip, .tooltip-portal
│   ├── loading.scss        ← spinner, skeleton, dot-loader
│   └── modal.scss          ← modal-overlay, modal-content
└── screens/
    ├── bookshelf.scss
    ├── project.scss
    ├── episode.scss
    ├── page.scss
    └── cut.scss`}</pre>

      <div className="guide-section-sub">import 방법</div>
      <pre className="guide-code">{`// App.tsx — 딱 한 줄
import "assets/styles/index.scss";

// 컴포넌트에서 직접 SCSS 사용 시 (CSS 모듈 X)
// → 클래스명 충돌 주의. 글로벌 클래스 그대로 사용.`}</pre>

      <div className="guide-section-sub">variables.scss 핵심 구조</div>
      <pre className="guide-code">{`// [1] SCSS 변수 (컴파일 타임)
$deep-blue: #2A4D88;
$amber:     #fbc662;

// [2] CSS Custom Properties (런타임 · :root)
:root {
  --color-primary: #{$deep-blue};
  --color-accent:  #{$amber};
  --sidebar-width: 200px;
  --header-height: 48px;
  ...
}

// [3] SCSS Mixins
@mixin hover-lift($y: -2px, $shadow: null) { ... }
@mixin custom-scrollbar($width: 5px) { ... }
@mixin text-ellipsis($lines: 1) { ... }
@mixin focus-ring { ... }

// 사용 예 (각 scss 파일에서)
@use '../common/variables' as *;

.my-card {
  @include hover-lift(-3px, var(--shadow-md));
  @include custom-scrollbar;
}`}</pre>

      <div className="guide-section-sub">레이아웃 클래스 구조</div>
      <pre className="guide-code">{`// DOM 구조 (MainLayout → WorkspaceLayout)
<div className="app-layout">          {/* flex-col, 100vh */}
  <div className="main-content">      {/* flex-row, flex:1 */}
    <div className="sidebar">         {/* 200px, slide-in */}
      <div className="sidebar-header" />
      <div className="sidebar-body" />
      <div className="sidebar-footer" />
    </div>
    <main>                            {/* flex:1 */}
      <div className="workspace-layout">   {/* flex-col */}
        <div className="workspace-header" />
        <div className="workspace-body" /> {/* scroll */}
      </div>
    </main>
  </div>
</div>`}</pre>
    </div>
  );
}

// ─────────────────────────────────────────────
// 메인 Guide 컴포넌트
// ─────────────────────────────────────────────
const SECTION_MAP: Record<string, JSX.Element> = {
  colors: <ColorsSection />,
  typography: <TypographySection />,
  spacing: <SpacingSection />,
  buttons: <ButtonsSection />,
  tooltip: <TooltipSection />,
  animations: <AnimationsSection />,
  hooks: <HooksSection />,
  context: <ContextSection />,
  utils: <UtilsSection />,
  scss: <ScssSection />,
};

export default function Guide() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("colors");

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        className="guide-float-btn"
        onClick={() => setIsOpen(true)}
        title="Design Guide"
        aria-label="디자인 가이드 열기"
      >
        ?
      </button>

      {/* 가이드 오버레이 */}
      {isOpen && (
        <div className="guide-overlay" onClick={() => setIsOpen(false)}>
          <div className="guide-panel" onClick={(e) => e.stopPropagation()}>
            {/* 헤더 */}
            <div className="guide-panel-header">
              <span className="guide-panel-header__title">
                PlotNote · Design Guide
              </span>
              <button
                className="guide-panel-header__close"
                onClick={() => setIsOpen(false)}
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            {/* 바디 */}
            <div className="guide-panel-body">
              {/* 탭 nav */}
              <nav className="guide-nav" aria-label="가이드 탭">
                {TABS.map((group) => (
                  <div key={group.group}>
                    <div className="guide-nav-group">{group.group}</div>
                    {group.items.map((tab) => (
                      <button
                        key={tab.id}
                        className={`guide-nav-item ${activeTab === tab.id ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                ))}
              </nav>

              {/* 콘텐츠 */}
              <div className="guide-content">{SECTION_MAP[activeTab]}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
