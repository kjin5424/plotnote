# Progress

## Current Status
**단계:** Phase L 완료 — React 전 화면 마이그레이션 + DataContext 완전 제거
**브랜치:** `kyoungjin`
**마지막 작업:** DataContext/DataProvider 제거, Sidebar/MainLayout useStore/useUI 전환 (2026-03-10)

> **다음 세션 시작 옵션 (우선순위 순):**
> 1. **React 앱 통합 검수** — 화면 간 이동, CRUD, 사이드바 동작 실제 확인
> 2. **메모(Memo) CRUD UI** — proto에 있지만 React 미구현
> 3. **DnD** — 페이지/에피소드 순서 드래그앤드롭
> 4. **b4Layout.ts 버그** — `B4_SPEC { w:324, h:238 }` w/h 역순 수정

---

## 라우트 구조 (최종)
- Bookshelf: `/bookshelf`
- Project: `/project/:projectId`
- Episode: `/project/:projectId/episode/:episodeId`
- Page: `/project/:projectId/episode/:episodeId/page`
- Cut: `/project/:projectId/episode/:episodeId/page/:pageId`

---

## Phase 1: HTML 프로토타입

### 완료
- [x] `proto-sidebar.html` — 통합 사이드바 레퍼런스 완성
- [x] `proto-bookshelf.html` — 통합 사이드바 적용
- [x] `proto-project.html` — 통합 사이드바 적용
- [x] `proto-episode.html` — 통합 사이드바 적용
- [x] `proto-style.css` — 공통 CSS 분리

### 미완료 (선택적)
- [ ] `proto-page.html` — 통합 사이드바 + proto-style.css
- [ ] `proto-cut.html` — 통합 사이드바 + proto-style.css
- [ ] 각 HTML에서 proto-style.css로 이동된 CSS 제거 (bookshelf `.s-res*` 제외)

---

## Phase 2: React 앱 구현 — 전체 완료 ✅

- [x] **A.** 타입 정의 — `src/types/entities.ts`, `src/types/store.ts`
- [x] **B.** B4 유틸리티 — `src/utils/b4Layout.ts`
- [x] **C.** Context/Reducer — `src/contexts/StoreContext.tsx`
- [x] **D.** 로컬 저장소 — `src/services/persistence.ts`
- [x] **E.** 라우팅 — `src/App.tsx` (5단계 중첩 라우트, StoreProvider)
- [x] **F.** 공통 컴포넌트 — Button, GuideLine, DbErrorToast, toast.scss
- [x] **G.** Bookshelf 화면 — `BookshelfHeader`, `BookshelfList`, `index.tsx`
- [x] **H.** Project 화면 — `ProjectHeader`, `ProjectGrid`, `index.tsx`
- [x] **I.** Episode 화면 — `EpisodeHeader`, `EpisodeList(Nav)`, `EpisodeItem`, `EpisodeDetail`, `index.tsx`
- [x] **J.** Page 화면 — `PageHeader`, `PageBody(Nav)`, `PageCard`, `PageDetail`, `index.tsx`
- [x] **K.** Cut 화면 — `CutHeader`, `CutBody`, `CutCanvas`, `index.tsx`, `useCut.ts`
- [x] **L.** DataContext 완전 제거 — Sidebar/MainLayout useStore/useUI 전환, 데드코드 삭제

---

## 핵심 아키텍처 결정 (불변)

### 데이터 모델
- `NormalizedStore`: bookshelves/projects/episodes/pages/cuts/memos/scriptSnippets/assets — 모두 `Record<string, T>`
- `EpisodeStatus`: `'draft' | 'inProgress' | 'done'` — 3단계
- `Memo`: 모든 엔티티 메모를 단일 테이블 통합 (`parentId | null`, `parentType`, `role: SINGLE|DETAIL`)
- `ScriptSnippet`: 미확정 보류 (cutId nullable, type/speakerId 포함 스키마 전체 재논의 필요)
- `order: string` — Lexosort (DnD 재정렬)
- 엔티티 ID 필드: 구 schema `episode.episodeId` → 신 schema `episode.id`

### 컴포넌트 구조
- 3-Context: `StoreContext`(데이터), `DispatchContext`(dispatch), `UIContext`(UI상태+dbError)
- IndexedDB: debounced 500ms 저장, classifyDbError로 QuotaExceeded/Security 분류
- Button variant → className 매핑: ghost=btn, primary=btn--primary, accent=btn--accent, outline=btn--outline, danger=btn--danger, icon=btn--icon, add=btn-add

### 보류 쟁점
1. Memo SINGLE/DETAIL role 분리 여부, CutMemo 별도 테이블 분리 여부
2. ScriptSnippet.speakerId/type — 캐릭터 별도 엔티티 여부

---

## 핵심 파일 경로

| 역할 | 경로 |
|---|---|
| 엔티티 타입 | `src/types/entities.ts` |
| 스토어 타입 | `src/types/store.ts` |
| B4 유틸 | `src/utils/b4Layout.ts` |
| 상태관리 | `src/contexts/StoreContext.tsx` |
| 퍼시스턴스 | `src/services/persistence.ts` |
| 진입점 | `src/App.tsx`, `src/index.tsx` |
| 공통버튼 | `src/components/common/Button/Button.tsx` |
| B4가이드 | `src/components/common/GuideLine/GuideLine.tsx` |
| DB에러토스트 | `src/components/common/DbErrorToast/DbErrorToast.tsx` |
| SCSS 진입점 | `src/assets/styles/index.scss` |

---

## Known Issues
- `vite-plugin-svgr` 미등록 → SVG를 React 컴포넌트로 사용 불가 (`vite.config.ts` 추가 필요)
- `src/Setting/` 디렉토리 용도 불명확
- `b4Layout.ts`의 `B4_SPEC { w:324, h:238 }` — w/h 역순 표기 버그 (CSS는 올바름)
