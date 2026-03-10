# Progress

## Current Status
**단계:** React Phase J — Page 화면 마이그레이션 완료, Cut 화면 대기
**브랜치:** `kyoungjin`
**마지막 작업:** J. Page 화면 마이그레이션 완료 (2026-03-10)

> **다음 세션 시작:**
> 1. React Phase K — Cut 화면 마이그레이션
> 2. 작업 대상: `src/components/screens/Cut/` (기존 파일 useData → useStore 교체)
> 3. 참조: `proto-cut.html`, `proto-cut.css`, `src/types/entities.ts`
> 4. 패턴: Episode/Page 화면과 동일 패턴
> 5. K 완료 후: DataProvider/DataContext 제거

### Phase 1 완료 항목 (2026-03-02)
- **A-1~A-4**: proto-episode.html proto-style.css 전환 + 신 사이드바 인라인 복사 + 5단계 EpisodeStatus 적용
- **A-2**: proto-page.html 신 사이드바 교체 + proto-style.css 전환 (구 `.si`/`.si-pop`/`.av` 제거)
- **A-3**: proto-cut.html 신 사이드바 교체 + proto-style.css 전환 + missing `z-pct` 버그 수정
- **B-1**: proto-bookshelf.html "보관함" 🗃 이모지 → `library_books` SVG
- **B-2**: proto-cut.html 플로팅 툴바 이모지(↩↪🗑✂↺) → SVG(undo/redo/delete/content_cut/restart_alt)
- **B-3**: progress.md B4 비율 Known Issue 표현 정정 (B4 257mm×364mm 세로형)
- **B-4**: proto-project.html "마지막 작업" 타임스탬프 → "3일 전" 상대시간
- **B-5**: proto-bookshelf/project.html doS() 함수에 XSS 경고 주석 추가
- **C-1**: proto-page.html spread 뷰 홀수 시작 blank cover 어포던스 (`.pcard--cover-blank` + JS)
- **C-2**: proto-cut.html ctx-bar flex-wrap + zoom-ctl margin-left:auto 대응

### 다음 작업
- **D**: 통합 검수 (D-1 CSS 일관성 ~ D-5 아이콘 정합성)
- **React Phase H**: Project 화면 마이그레이션 (D 완료 후)

---

## Phase 1: HTML 프로토타입

### 완료
- [x] `proto-sidebar.html` — 통합 사이드바 레퍼런스 완성
- [x] `proto-bookshelf.html` — 통합 사이드바 적용
- [x] `proto-project.html` — 통합 사이드바 적용
- [x] `proto-episode.html` — 통합 사이드바 적용
- [x] `proto-style.css` — 공통 CSS 분리

### 미완료 (React 구현 후 병행 가능)
- [ ] `proto-page.html` — 통합 사이드바 + proto-style.css
- [ ] `proto-cut.html` — 통합 사이드바 + proto-style.css
- [ ] 각 HTML에서 proto-style.css로 이동된 CSS 제거 (bookshelf `.s-res*` 제외)

---

## Phase 2: React 앱 구현

### 완료 (A~F)
- [x] **A.** 타입 정의 — `src/types/entities.ts`, `src/types/store.ts`
- [x] **B.** B4 유틸리티 — `src/utils/b4Layout.ts`
- [x] **C.** Context/Reducer — `src/contexts/StoreContext.tsx`
- [x] **D.** 로컬 저장소 — `src/services/persistence.ts`
- [x] **E.** 라우팅 — `src/App.tsx` (5단계 중첩 라우트, StoreProvider)
- [x] **F.** 공통 컴포넌트 — Button, GuideLine, DbErrorToast, toast.scss

### 다음 작업 (G~K)
- [x] **G.** Bookshelf 화면 — `BookshelfHeader`, `BookshelfList`, `index.tsx` 마이그레이션 완료
- [x] **H.** Project 화면 — `ProjectHeader`, `ProjectGrid`, `index.tsx` 마이그레이션 완료
- [x] **I.** Episode 화면 — `EpisodeHeader`, `EpisodeList(Nav)`, `EpisodeItem`, `EpisodeDetail`, `index.tsx` 마이그레이션 완료
- [x] **J.** Page 화면 — `PageHeader`, `PageBody(Nav)`, `PageCard`, `PageDetail`(신규), `index.tsx` 마이그레이션 완료
- [ ] **K.** Cut 화면
- [ ] DataProvider/DataContext 제거 (K 완료 후)

---

## 핵심 아키텍처 결정 (불변)

### 데이터 모델
- `NormalizedStore`: bookshelves/projects/episodes/pages/cuts/memos/scriptSnippets/assets — 모두 `Record<string, T>`
- `EpisodeStatus`: `'draft' | 'inProgress' | 'done'` — 3단계 (예정/진행중/완료) ← 5단계에서 변경
- `Memo`: 모든 엔티티 메모를 단일 테이블 통합 (`parentId | null`, `parentType`, `role: SINGLE|DETAIL`)
- `ScriptSnippet`: 미확정 보류 (cutId nullable, type/speakerId 포함 스키마 전체 재논의 필요)
- `order: string` — Lexosort (DnD 재정렬)
- emoji: episode + cut 전용 (`emoji: string | null`)
- TypeScript interface ≠ DB 스키마 1:1 대응 아님

### 보류 쟁점 (메모 수정 요청 시 재논의)
1. Memo SINGLE/DETAIL role 분리 여부, CutMemo 별도 테이블 분리 여부
2. ScriptSnippet.speakerId/type — 캐릭터 별도 엔티티 여부

### 컴포넌트 구조
- 3-Context: `StoreContext`(데이터), `DispatchContext`(dispatch), `UIContext`(UI상태+dbError)
- IndexedDB: debounced 500ms 저장, classifyDbError로 QuotaExceeded/Security 분류
- Button variant → className 매핑: ghost=btn, primary=btn--primary, accent=btn--accent, outline=btn--outline, danger=btn--danger, icon=btn--icon, add=btn-add
- GuideLine: DEV 전용(`SHOW_GUIDELINES`), TRIM(빨간)/INNER(파란) 점선 오버레이

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

## ⚠️ 마이그레이션 잔존 이슈 (G~K 진행 시 해소)
- `DataContext.tsx`: `DataContextValue`, `CutNote` import 오류 (Vite 빌드 통과, IDE 경고만)
- `DataProvider` App.tsx에 임시 유지 — 스크린 마이그레이션 완료 후 제거
- 기존 화면들 여전히 `useData()` 사용 중 → G~K에서 `useStore()`/`useDispatch()`/`useUI()`로 교체

## Known Issues
- `vite-plugin-svgr` 미등록 → SVG를 React 컴포넌트로 사용 불가 (`vite.config.ts` 추가 필요)
- `src/Setting/` 디렉토리 용도 불명확
- B4 비율: CSS `aspect-ratio: 238/324` = width:238, height:324 → **세로형 원고 ✅ 올바름**. B4 = 257mm×364mm 근사. React `b4Layout.ts`의 `B4_SPEC { w:324, h:238 }` 표기가 w/h 역순 — Phase I(Episode) 구현 시 수정
