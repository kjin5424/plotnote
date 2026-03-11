# Phase M — React SCSS 디자인 완성

> **범위:** JSX className 정리 + SCSS 스타일 완성 (프로토타입 시각 동등성)
> **규칙:** 로직(상태관리, 이벤트)은 변경하지 않음. className과 DOM 구조만 수정.
> **네이밍:** kebab-case 기본, modifier만 `--` suffix. JSX와 SCSS 1:1 일치.
> **참조:** 프로토타입 CSS의 수치(padding, font-size, gap 등)만 가져오고, 클래스명은 복사하지 않음.
> **CLS 방지:** hover 시 `translateY` 사용 금지, `box-shadow` 강화로 대체.

---

## 현황 대시보드

| 항목 | 상태 | 담당 SCSS | 세션 |
|------|:----:|-----------|:----:|
| M-0. 공통 기반 정비 | ✅ | `common/*.scss` | 1 |
| M-1. Sidebar | ✅ | `common/layout.scss` | 1 |
| M-2. Bookshelf | ✅ | `screens/bookshelf.scss` | 2 |
| M-3. Project | ✅ | `screens/project.scss` | 2 |
| M-5. Page | ✅ | `screens/page.scss` | 3 |
| M-6. Cut | ✅ | `screens/cut.scss` | 3 |
| M-4. Episode | ✅ | `screens/episode.scss` | 3 |

---

## 세션 1: M-0 + M-1

### M-0. 공통 기반 정비 (proto-style.css 대응)

#### M-0. 공통 기반 정비 ✅ (2026-03-11 완료)
- [x] `--header-height` → `44px`
- [x] `.workspace-header` min-height 44px, padding `0 20px`, gap 12px
- [x] `.workspace-body` padding `0 24px 30px`, scrollbar-gutter stable
- [x] `.workspace-title` serif 19px weight 600
- [x] `.btn` padding `5px 12px`, radius 6px, font-size 11px
- [x] `.btn--primary` border 추가
- [x] `.btn--icon` 28x28 radius 5px, `.btn--icon-sm` 24x24, `.btn-header` opacity 0.55
- [x] `.badge`, `.badge--todo/wip/done`, `.badge--owner/editor/comment/readonly`, `.cnt-badge`
- [x] `.drag-handle`, `.drag-parent`, `.dropdown-menu`, `.dropdown-menu-item`
- [x] `.section-header`, `.section-header-icon/label/chevron`, `.section.closed .section-body`
- [x] `.stepper`, `.toggle-group`

---

### M-1. Sidebar (proto-sidebar.css 대응)

#### M-1. Sidebar ✅ (2026-03-11 완료)
- [x] 로고 텍스트 소문자 "plotnote", sidebar-logo-mark div 박스
- [x] `.sidebar-search` / `.sidebar-search-bar` SCSS + JSX 추가
- [x] `.sidebar-tree-row` font-size 11px, padding 3px 6px, min-height 26px, border-radius 4px
- [x] `.sidebar-tree-page` font-size 10px
- [x] `.sidebar-tree-section` padding 2px 6px, section-title font-size 11px, border-radius
- [x] `.sidebar-footer` padding 8px 10px, sidebar-user-row/avatar/name JSX 추가
- [x] `.sidebar-user-avatar` font-size 9px

---

## 세션 2: M-2 + M-3

### M-2. Bookshelf (proto-bookshelf.css 대응)

#### M-2. Bookshelf ✅ (2026-03-11 완료)
- [x] `bookshelf.scss` 완전 재작성 — JSX className 1:1 기준
- [x] `bookshelf-header-title` serif 19px, `bookshelf-header-actions` flex gap 6px
- [x] `bookshelf-grid` minmax(190px) gap 14px, padding-top 16px
- [x] `bookshelf-card` hover box-shadow만 (translateY 금지), `--active` select-ring
- [x] `bookshelf-card-thumbnail` aspect-ratio 16/10, 그래디언트
- [x] `bookshelf-card--add` dashed border, hover border+color 전환
- [x] `bookshelf-card-add-icon` dashed circle + hover color
- [x] bookshelfCardIn 애니메이션, nth-child delay

---

### M-3. Project (proto-project.css 대응)

#### M-3. Project ✅ (2026-03-11 완료)
- [x] `.project-header-title` serif 19px 추가
- [x] `.project-header-fav` flex-shrink 0, hover amber
- [x] `.project-tabs`, `.project-tab`, `.project-tab.active` SCSS
- [x] `ProjectGrid.tsx` 탭 껍데기 JSX 추가 (에피소드 목록 활성, 설정 disabled)
- [x] `STATUS_BADGE` — badge badge--todo/wip/done 으로 변경
- [x] `.project-ep-row` gap 10px, padding 10px 14px
- [x] `.project-ep-num/title/pg` font-size 소형화 (12→12, mono)
- [x] `.project-ep-status` → badge 클래스 위임

---

## 세션 3: M-5 + M-6 + M-4

### M-5. Page ✅ (2026-03-11 완료)
- [x] page.scss에 pg-view-tgl/pg-zoom/pg-toolbar 모두 구현돼 있었음

### M-6. Cut ✅ (2026-03-11 완료)
- [x] SVG 캔버스 셀렉터 추가: cut-canvas-svg/bg, cut-polygon/border, cut-label, cut-preview-line
- [x] CutHeader 브레드크럼: ct-ep-link, ct-pg-num, ct-pg-nav

### M-4. Episode ✅ (2026-03-11 완료)
- [x] resize-handle: layout.scss에 이미 정의 (변경 불필요)
- [x] episode.scss 중복 .badge 제거 → .erow .badge 스코핑
- [x] episode.scss 중복 .cnt-badge 제거

---

## 보류 항목 (Phase N)

| 항목 | 이유 | 선행 조건 |
|------|------|-----------|
| 새 프로젝트 모달 | 기능 구현 필요 | 설정 상속 체계 |
| 공유 모달 | 서버 없음 | Phase 3 서버 |
| 프로젝트 설정 탭 | JSX/기능 없음 | 설정 UI 구현 |
| Rail 호버 팝업 | JS 로직 필요 | 팝업 컴포넌트 |
| 검색 모달 연동 | 검색 기능 없음 | 검색 엔진 |

---

## 작업 규칙

- 프로토타입 CSS 클래스명을 React에 복사하지 않는다
- JSX className 변경 시 해당 SCSS selector도 동시에 수정
- 프로토타입 HTML을 `localhost:5173/prototypes/proto-*.html`에서 비교하며 작업
- 로직 변경 금지 — className, DOM 구조, SCSS만 수정
- CLS 방지: hover 시 translateY 대신 box-shadow 사용
