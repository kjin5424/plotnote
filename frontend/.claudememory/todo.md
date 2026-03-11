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
| M-2. Bookshelf | ⬜ | `screens/bookshelf.scss` | 2 |
| M-3. Project | ⬜ | `screens/project.scss` | 2 |
| M-5. Page | 🔶 (85%) | `screens/page.scss` | 3 |
| M-6. Cut | 🔶 (85%) | `screens/cut.scss` | 3 |
| M-4. Episode | ✅ (95%) | `screens/episode.scss` | 3 |

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

#### M-2-0. JSX 클래스명 정리 (선행 필수)
- [ ] `BookshelfList.tsx`: `bookshelf-grid`/`bookshelf-card-*` → SCSS와 1:1 통일
- [ ] `BookshelfHeader.tsx`: `bookshelf-header-title`/`bookshelf-header-actions` → SCSS와 통일

#### M-2-1. 헤더
- [ ] 제목 serif + 우측 버튼 수치 조정
- 참조: `proto-style.css` `.ws-hd`

#### M-2-2. 섹션 구조 (JSX 변경 필요)
- [ ] `BookshelfList.tsx`에 섹션 그룹 추가 (즐겨찾기/나의 책장)
- [ ] M-0-5 섹션 헤더 스타일 적용
- [ ] 접기/펼치기 토글 (state 추가)
- 참조: `proto-bookshelf.css` `.node`, `.node-hd`

#### M-2-3. 프로젝트 카드 그리드
- [ ] 그리드: `repeat(auto-fill, minmax(156px, 1fr))`
- [ ] 카드 썸네일: 그래디언트 배경, `aspect-ratio: 3/4`
- [ ] 카드 정보: 제목, 메타(페이지수, 수정일)
- [ ] 즐겨찾기 북마크 아이콘
- [ ] hover: box-shadow만 (translateY 금지)
- 참조: `proto-bookshelf.css` `.pc`, `.pc-th`, `.pc-info`

#### M-2-4. 새 프로젝트 추가 카드
- [ ] dashed border, + 아이콘, hover 시 border-color 전환
- 참조: `proto-bookshelf.css` `.pc-add`

---

### M-3. Project (proto-project.css 대응)

#### M-3-0. JSX 클래스명 정리 (선행 필수)
- [ ] `ProjectHeader.tsx`: 클래스명 SCSS 일치 확인

#### M-3-1. 헤더
- [ ] 인라인 편집 input 스타일 (proto `input.ws-ttl`)
- [ ] 즐겨찾기 토글 아이콘 (proto `.ws-fav`)
- [ ] 헤더 아이콘 버튼 (`.btn-header` — M-0-2)
- 참조: `proto-project.css` `input.ws-ttl`, `.ws-fav`

#### M-3-2. 탭 구조 (JSX 변경 필요)
- [ ] "에피소드 목록" 탭만 기본 활성 (설정 탭 보류)
- [ ] `.project-tab`, `.project-tab.active` SCSS
- 참조: `proto-project.css` `.pj-tabs`, `.pj-tab`

#### M-3-3. 에피소드 목록
- [ ] `.project-ep-row` 수치를 proto `.ep-row`와 맞춤
- [ ] 상태 배지 → M-0-3 `.badge` 적용
- [ ] 드래그 핸들 → M-0-4 `.drag-handle` 적용
- 참조: `proto-project.css` `.ep-row`, `.ep-tag`

---

## 세션 3: M-5 + M-6 + M-4

### M-5. Page (85% → 100%)

#### M-5-1. 뷰 토글 (단면/양면)
- [ ] `.view-toggle`, `.view-btn` 수치 확인
- 참조: `proto-page.css` `.pg-view-tgl`

#### M-5-2. 줌 컨트롤
- [ ] `.zoom-control`, `.zoom-btn`, `.zoom-value` SCSS
- 참조: `proto-page.css` `.pg-zoom`

#### M-5-3. 리사이즈 핸들
- [ ] 패널간 핸들 스타일
- 참조: `proto-page.css`

### M-6. Cut (85% → 100%)

#### M-6-1. 가이드라인 오버레이
- [ ] `.cut-bleed`, `.cut-inner` 가이드 CSS
- 참조: `proto-cut.css`

#### M-6-2. 분할 모드 크로스헤어
- [ ] `.cut-split-guide`: cursor crosshair, preview line
- 참조: `proto-cut.css`

#### M-6-3. 컷 추가 버튼
- [ ] 빈 셀 "+" 버튼 스타일
- 참조: `proto-cut.css`

### M-4. Episode (95% → 100%)

#### M-4-1. 리사이즈 핸들
- [ ] `.resize-handle` 스타일 확인만
- 참조: `proto-episode.css`

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
