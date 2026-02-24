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
  { group: "디자인 토큰", items: [
    { id: "colors",     label: "색상" },
    { id: "typography", label: "타이포그래피" },
    { id: "spacing",    label: "간격 & 반경" },
  ]},
  { group: "컴포넌트", items: [
    { id: "buttons",    label: "버튼" },
    { id: "tooltip",    label: "툴팁" },
    { id: "animations", label: "애니메이션" },
  ]},
  { group: "로직", items: [
    { id: "hooks",      label: "훅 (Hooks)" },
    { id: "context",    label: "컨텍스트" },
    { id: "scss",       label: "SCSS 구조" },
  ]},
];

// ─────────────────────────────────────────────
// 색상 섹션
// ─────────────────────────────────────────────
const COLOR_GROUPS = [
  {
    label: "브랜드 (Deep Blue 계열)",
    colors: [
      { name: "Deep Blue",   cssVar: "--color-primary",       hex: "#2A4D88" },
      { name: "Ocean",       cssVar: "--color-primary-light", hex: "#7C94B8" },
      { name: "Glacial",     cssVar: "--color-primary-muted", hex: "#B1BBC8" },
      { name: "Concerto",    cssVar: "--color-primary-dim",   hex: "#D9D9D8" },
    ],
  },
  {
    label: "포인트 (Amber — 전체 UI의 ~5%)",
    colors: [
      { name: "Amber",       cssVar: "--color-accent",        hex: "#fbc662" },
      { name: "Amber Dark",  cssVar: "--color-accent-dark",   hex: "#e8a83c" },
      { name: "Amber Light", cssVar: "--color-accent-light",  hex: "#fdd99b" },
    ],
  },
  {
    label: "배경",
    colors: [
      { name: "Paper",       cssVar: "--bg-primary",          hex: "#f7f6f3" },
      { name: "White",       cssVar: "--bg-secondary",        hex: "#fefefe" },
      { name: "Hover BG",    cssVar: "--bg-tertiary",         hex: "#edede9" },
    ],
  },
  {
    label: "텍스트",
    colors: [
      { name: "Ink",         cssVar: "--text-primary",        hex: "#1a1a1a" },
      { name: "Ink Soft",    cssVar: "--text-secondary",      hex: "#4a4a4a" },
      { name: "Ink Ghost",   cssVar: "--text-tertiary",       hex: "#9a9a9a" },
    ],
  },
  {
    label: "상태",
    colors: [
      { name: "Error",       cssVar: "--color-error",         hex: "#e05555" },
      { name: "Success",     cssVar: "--color-success",       hex: "#52c787" },
      { name: "Warning",     cssVar: "--color-warning",       hex: "#f5b841" },
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
                <div className="guide-swatch__preview" style={{ background: c.hex }} />
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
        Google Fonts — Noto Sans KR (기본) / Noto Serif KR (제목) / DM Mono (메타·코드)
      </p>

      <div className="guide-section-sub">폰트 패밀리</div>
      <div className="guide-demo-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
        {[
          { var: "--font-family-base",  label: "Noto Sans KR",  sample: "가나다 — UI 기본 텍스트" },
          { var: "--font-family-serif", label: "Noto Serif KR", sample: "가나다 — 제목·컨텐츠 강조" },
          { var: "--font-family-mono",  label: "DM Mono",       sample: "ep.01 · pg 01/24 — 메타·코드" },
        ].map((f) => (
          <div key={f.var} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <code className="guide-code-inline">{f.var}</code>
            <span style={{ fontFamily: `var(${f.var})`, fontSize: 15 }}>{f.sample}</span>
          </div>
        ))}
      </div>

      <div className="guide-section-sub">사이즈 스케일</div>
      {[
        { var: "--font-xs",   px: "12px", sample: "레이블, 메타, 배지 · 기본 xs" },
        { var: "--font-sm",   px: "14px", sample: "기본 UI 텍스트 · body sm" },
        { var: "--font-base", px: "16px", sample: "본문 · base" },
        { var: "--font-lg",   px: "18px", sample: "서브 제목 · lg" },
        { var: "--font-xl",   px: "20px", sample: "섹션 제목 · xl" },
      ].map((f) => (
        <div key={f.var} className="guide-type-row">
          <code className="guide-code-inline" style={{ width: 130 }}>{f.var}</code>
          <span style={{ width: 36, fontSize: 10, color: "var(--text-tertiary)", fontFamily: "var(--font-family-mono)" }}>{f.px}</span>
          <span style={{ fontSize: `var(${f.var})`, color: "var(--text-primary)" }}>{f.sample}</span>
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
            <div style={{ fontWeight: f.w, fontSize: 15, marginBottom: 2 }}>Aa 가나</div>
            <code style={{ fontSize: 9, fontFamily: "var(--font-family-mono)", color: "var(--text-tertiary)" }}>{f.w}</code>
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
    { var: "--spacing-xs",  px: 4 },
    { var: "--spacing-sm",  px: 8 },
    { var: "--spacing-md",  px: 16 },
    { var: "--spacing-lg",  px: 24 },
    { var: "--spacing-xl",  px: 32 },
    { var: "--spacing-2xl", px: 48 },
  ];
  const radii = [
    { var: "--radius-sm",   label: "sm",   px: 4 },
    { var: "--radius-md",   label: "md",   px: 8 },
    { var: "--radius-lg",   label: "lg",   px: 12 },
    { var: "--radius-xl",   label: "xl",   px: 20 },
    { var: "--radius-full", label: "full", px: 9999 },
  ];

  return (
    <div>
      <h2 className="guide-section-title">간격 & 반경</h2>

      <div className="guide-section-sub">Spacing</div>
      {spacings.map((s) => (
        <div key={s.var} className="guide-spacing-bar">
          <code className="bar-label" style={{ fontSize: 10, fontFamily: "var(--font-family-mono)", color: "var(--text-tertiary)", width: 130 }}>{s.var}</code>
          <span className="bar-px">{s.px}px</span>
          <div className="bar-visual" style={{ width: s.px * 2 }} />
        </div>
      ))}

      <div className="guide-section-sub">Border Radius</div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
        {radii.map((r) => (
          <div key={r.var} style={{ textAlign: "center" }}>
            <div style={{
              width: 48, height: 48,
              background: "var(--color-primary)",
              borderRadius: `var(${r.var})`,
              opacity: 0.7,
            }} />
            <div style={{ fontSize: 10, fontFamily: "var(--font-family-mono)", color: "var(--text-tertiary)", marginTop: 6 }}>{r.label}</div>
            <div style={{ fontSize: 9, fontFamily: "var(--font-family-mono)", color: "var(--text-tertiary)" }}>{r.px === 9999 ? "∞" : `${r.px}px`}</div>
          </div>
        ))}
      </div>

      <div className="guide-section-sub">Shadow</div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {["--shadow-xs", "--shadow-sm", "--shadow-md", "--shadow-lg"].map((s) => (
          <div key={s} style={{ textAlign: "center" }}>
            <div style={{
              width: 48, height: 48,
              background: "var(--bg-secondary)",
              borderRadius: 8,
              boxShadow: `var(${s})`,
            }} />
            <code style={{ fontSize: 9, fontFamily: "var(--font-family-mono)", color: "var(--text-tertiary)", display: "block", marginTop: 6 }}>{s.replace("--shadow-", "")}</code>
          </div>
        ))}
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
      <p className="guide-section-desc">button.scss 정의. global.scss의 button 리셋 위에 추가.</p>

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
        <button className="btn-add btn-add--accent">+ 중요 에피소드 (Accent)</button>
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
        <button className="btn btn--primary" disabled>Primary (disabled)</button>
        <button className="btn btn--accent" disabled>Accent (disabled)</button>
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
        tooltip.scss에 3가지 방식 통합: (A) data-tooltip CSS · (B) .tooltip React 래퍼 · (C) .tooltip-portal Portal
      </p>

      <div className="guide-section-sub">(A) data-tooltip — 순수 CSS 속성 기반</div>
      <div className="guide-demo-row" style={{ paddingTop: 28 }}>
        <button className="btn btn--outline" data-tooltip="top (기본)">top</button>
        <button className="btn btn--outline" data-tooltip="bottom" data-tooltip-pos="bottom">bottom</button>
        <button className="btn btn--outline" data-tooltip="right" data-tooltip-pos="right">right</button>
        <button className="btn btn--outline" data-tooltip="left" data-tooltip-pos="left">left</button>
      </div>
      <pre className="guide-code">{`<button data-tooltip="저장하기">버튼</button>
<button data-tooltip="아래" data-tooltip-pos="bottom">버튼</button>
// pos: top(기본) | bottom | left | right`}</pre>

      <div className="guide-section-sub">(B) .tooltip 컴포넌트 래퍼 — HTML 내용 지원</div>
      <div className="guide-demo-row">
        <div className="tooltip tooltip--bottom" style={{ position: "relative" }}>
          <button className="btn btn--outline tooltip__trigger">hover me</button>
          <div className="tooltip__content" style={{ opacity: 1, transform: "none", pointerEvents: "auto", position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", zIndex: 100 }}>
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
        <div className="context-menu" style={{ position: "relative", display: "inline-block" }}>
          <div className="context-menu__item"><span>편집</span></div>
          <div className="context-menu__item"><span>복사</span></div>
          <div className="context-menu__divider" />
          <div className="context-menu__item danger"><span>삭제</span></div>
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
  { cls: "anim-fade-up",     desc: "페이지 진입, 카드 로드" },
  { cls: "anim-slide-left",  desc: "사이드바, 리스트 항목" },
  { cls: "anim-scale-in",    desc: "드롭다운, 모달 컨텐츠" },
  { cls: "anim-tree-expand", desc: "트리 노드 펼칠 때" },
];

function AnimationsSection() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <h2 className="guide-section-title">애니메이션</h2>
      <p className="guide-section-desc">animations.scss의 @keyframes + 유틸 클래스. SCSS mixin도 제공.</p>

      <button className="btn btn--outline btn--sm" style={{ marginBottom: 14 }} onClick={() => setKey((k) => k + 1)}>
        ↺ 다시 재생
      </button>

      <div className="guide-section-sub">유틸 클래스</div>
      {ANIM_CLASSES.map((a) => (
        <div key={`${a.cls}-${key}`} className="guide-demo-row" style={{ justifyContent: "space-between" }}>
          <div
            className={a.cls}
            style={{ padding: "5px 10px", background: "var(--bg-secondary)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-sm)" }}
          >
            <code style={{ fontSize: 11, fontFamily: "var(--font-family-mono)", color: "var(--color-primary)" }}>.{a.cls}</code>
          </div>
          <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{a.desc}</span>
        </div>
      ))}

      <div className="guide-section-sub">Stagger (.anim-stagger)</div>
      <div className="guide-demo-row">
        <div className="anim-stagger" key={key} style={{ display: "flex", gap: 6 }}>
          {[0.7, 0.75, 0.8, 0.85, 0.9].map((op, i) => (
            <div
              key={i}
              className="anim-fade-up"
              style={{ width: 32, height: 32, background: "var(--color-primary)", borderRadius: "var(--radius-sm)", opacity: op }}
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
const HOOKS = [
  {
    name: "useModal",
    path: "hooks/ui/useModal",
    desc: "모달 열기/닫기 상태 관리.",
    usage: `const { isOpen, open, close } = useModal();

// JSX
<button onClick={open}>모달 열기</button>
{isOpen && <ConfirmModal onClose={close}>...</ConfirmModal>}`,
  },
  {
    name: "useZoom",
    path: "hooks/ui/useZoom",
    desc: "줌 레벨 제어. 컷 캔버스에서 Ctrl+스크롤로 동작.",
    usage: `const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();

<div style={{ transform: \`scale(\${zoom})\` }}>캔버스</div>
<button onClick={zoomIn}>+</button>
<button onClick={zoomOut}>−</button>
<span>{Math.round(zoom * 100)}%</span>`,
  },
  {
    name: "useResizeHandle",
    path: "hooks/ui/useResizeHandle",
    desc: "사이드바 너비 드래그 리사이즈. MainLayout에서 사용 중.",
    usage: `import { useResizeHandle, resizeEnd } from "hooks/ui/useResizeHandle";

// div.resize-handle에 마우스 이벤트 바인딩
// MainLayout.tsx 참고`,
  },
  {
    name: "useDragAndDrop",
    path: "hooks/ui/useDragAndDrop",
    desc: "드래그 앤 드롭. 페이지 순서, 컷 메모 이동 등에 사용.",
    usage: `const { dragHandlers, isDragging } = useDragAndDrop({
  onDrop: (fromId, toId) => reorderItems(fromId, toId),
});`,
  },
  {
    name: "useSetting",
    path: "hooks/data/useSetting",
    desc: "전역 설정 조회 및 변경. 읽기 방향, 뷰 모드 등.",
    usage: `const { setting, updateSetting } = useSetting();

// setting.readingDirection: 'ltr' | 'rtl'
// setting.spreadView: boolean
updateSetting({ readingDirection: 'rtl' });`,
  },
  {
    name: "useCut",
    path: "hooks/data/useCut",
    desc: "컷 분할 로직. 컷 추가/삭제/리사이즈.",
    usage: `const { cuts, addCut, removeCut, updateCut } = useCut(pageId);`,
  },
];

function HooksSection() {
  return (
    <div>
      <h2 className="guide-section-title">훅 (Hooks)</h2>
      <p className="guide-section-desc">
        hooks/ 디렉토리의 공통 훅. 모두 순수 함수 기반으로 컴포넌트에서 상태 로직 분리.
      </p>
      {HOOKS.map((h) => (
        <div key={h.name} className="guide-hook-card">
          <div className="guide-hook-card__header">
            <span className="hook-name">{h.name}</span>
            <span className="hook-path">{h.path}</span>
          </div>
          <div className="guide-hook-card__desc">{h.desc}</div>
          <pre className="guide-code">{h.usage}</pre>
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
        contexts/ 디렉토리. React Context API 기반. App.tsx에서 전체 앱을 감싸고 있음.
      </p>

      <div className="guide-hook-card">
        <div className="guide-hook-card__header">
          <span className="hook-name">useData</span>
          <span className="hook-path">contexts/DataContext</span>
        </div>
        <div className="guide-hook-card__desc">
          메인 데이터 컨텍스트. 책장·프로젝트·에피소드·페이지·컷 데이터와 UI 상태 제공.
        </div>
        <pre className="guide-code">{`const {
  isLoading,
  bookshelves, selectedBookshelf,
  projects,    selectedProject,
  episodes,    selectedEpisode,
  pages,       selectedPage,
  cuts,        selectedCut,
  uiState,           // { isSidebarOpen, viewMode, spreadStart, ... }
  toggleSidebar,
  selectBookshelf, createBookshelf,
  selectProject,   createProject,
  selectEpisode,   createEpisode,
  selectPage,      createPage,
  selectCut,       createCut,
} = useData();`}</pre>
      </div>

      <div className="guide-hook-card">
        <div className="guide-hook-card__header">
          <span className="hook-name">useAuth</span>
          <span className="hook-path">contexts/AuthContext</span>
        </div>
        <div className="guide-hook-card__desc">
          인증 상태 관리.
        </div>
        <pre className="guide-code">{`const { user, login, logout, isAuthenticated } = useAuth();`}</pre>
      </div>

      <div className="guide-section-sub">uiState 구조</div>
      <pre className="guide-code">{`uiState: {
  isSidebarOpen: boolean,
  viewMode:      'single' | 'spread',  // 단면 / 양면
  spreadStart:   'left' | 'right',     // 양면 시작 방향
}`}</pre>
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
  colors:     <ColorsSection />,
  typography: <TypographySection />,
  spacing:    <SpacingSection />,
  buttons:    <ButtonsSection />,
  tooltip:    <TooltipSection />,
  animations: <AnimationsSection />,
  hooks:      <HooksSection />,
  context:    <ContextSection />,
  scss:       <ScssSection />,
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
              <div className="guide-content">
                {SECTION_MAP[activeTab]}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
