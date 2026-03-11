# Phase M — React SCSS 디자인 완성

> **범위:** JSX className 정리 + SCSS 스타일 완성 (프로토타입 시각 동등성)
> **규칙:** 로직(상태관리, 이벤트)은 변경하지 않음. className과 DOM 구조만 수정.
> **네이밍:** kebab-case 기본, modifier만 `--` suffix. JSX와 SCSS 1:1 일치.
> **참조:** 프로토타입 CSS의 수치(padding, font-size, gap 등)만 가져오고, 클래스명은 복사하지 않음.
> **CLS 방지:** hover 시 `translateY` 사용 금지, `box-shadow` 강화로 대체.

---

## 현황 대시보드

| 항목                | 상태 | 담당 SCSS                | 세션 |
| ------------------- | :--: | ------------------------ | :--: |
| M-0. 공통 기반 정비 |  ✅  | `common/*.scss`          |  1   |
| M-1. Sidebar        |  ✅  | `common/layout.scss`     |  1   |
| M-2. Bookshelf      |  ✅  | `screens/bookshelf.scss` |  2   |
| M-3. Project        |  ✅  | `screens/project.scss`   |  2   |
| M-5. Page           |  ✅  | `screens/page.scss`      |  3   |
| M-6. Cut            |  ✅  | `screens/cut.scss`       |  3   |
| M-4. Episode        |  ✅  | `screens/episode.scss`   |  3   |

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

## Phase N — 다음 작업 (2026-03-11 재검토)

> **결론:** "서버 없음"으로 보류했던 항목 대부분은 localStorage 기반으로 바로 가능.
> 진짜 서버가 필요한 건 "공유 모달"과 "검색 엔진" 두 개뿐.

### N-0. 정리 (바로 가능)

- [ ] `Guide.tsx` — 훅/컨텍스트/유틸 문서 최신화 (DataContext 참조 제거, utils 섹션 추가)
- [ ] `src/components/screens/sample/` 삭제 (Vue/Pinia 레퍼런스, TS 에러 원인)
- [ ] `b4Layout.ts` w/h 역순 버그: `{ w:324, h:238 }` → `{ w:238, h:324 }`

### N-1. 새 프로젝트 모달 (바로 가능)

- 트리거: `BookshelfHeader` "+ 새 프로젝트" 버튼
- `ADD_PROJECT` dispatch 이미 있음 — 모달 JSX + SCSS만 추가
- 빈 파일인 `hooks/ui/useModal.ts` 구현 필요

### N-2. Rail 호버 팝업 (바로 가능)

- `sidebar-tree-row` hover → 페이지 수·상태 팝업
- `useTooltip` 훅 이미 있음. 팝업 컴포넌트 JSX + SCSS만 추가

### N-3. 프로젝트 설정 탭 (바로 가능)

- ProjectGrid의 disabled "설정" 탭 활성화
- `UPDATE_PROJECT` dispatch 이미 있음
- `settingsHelper.ts`의 상속 체계(Episode > Project > User > Default) 활용

### N-4. 에피소드/페이지 DnD 재정렬 (훅 구현 필요)

- `orderManager.ts`의 `reorder()` 이미 있음
- `hooks/ui/useDragAndDrop.ts` 빈 파일 → 구현 필요
- `REORDER_EPISODES`, `REORDER_PAGES` reducer action 이미 있음

### 진짜 보류 (서버 선행 필요)

| 항목      | 이유                                                            |
| --------- | --------------------------------------------------------------- |
| 공유 모달 | localStorage에 "공유 링크" 개념 없음 — 서버 필수                |
| 검색 모달 | 검색 인덱스 없음 — 서버 or 클라이언트 전문 검색 라이브러리 필요 |

👽: 공유 링크 부분은 클릭하면 구현 준비중이에요! 라고 뜰 수 있도록 함.

### 현재 빈 파일 (구현 대기)

| 파일                         | 필요한 시점                    |
| ---------------------------- | ------------------------------ |
| `hooks/ui/useModal.ts`       | N-1 모달 구현 시               |
| `hooks/ui/useZoom.ts`        | 줌 기능 확장 시                |
| `hooks/ui/useDragAndDrop.ts` | N-4 DnD 구현 시                |
| `hooks/data/useSetting.ts`   | N-3 설정 탭 구현 시            |
| `contexts/AuthContext.tsx`   | 서버 도입 시 (현재 fetch 스텁) |

---

## 작업 규칙

- 프로토타입 CSS 클래스명을 React에 복사하지 않는다
- JSX className 변경 시 해당 SCSS selector도 동시에 수정
- 프로토타입 HTML을 `localhost:5173/prototypes/proto-*.html`에서 비교하며 작업
- 로직 변경 금지 — className, DOM 구조, SCSS만 수정
- CLS 방지: hover 시 translateY 대신 box-shadow 사용
