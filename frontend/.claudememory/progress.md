# Progress

## Current Status
**단계:** Phase M — React SCSS 디자인 완성 (JSX className 정리 + 프로토타입 시각 동등성)
**브랜치:** `kyoungjin`
**마지막 작업:** 3-에이전트 토론 → Phase M 계획 확정, .claudememory 문서 정비 (2026-03-11)

> **범위:** JSX className 정리 + SCSS 스타일 완성. 로직(상태관리, 이벤트) 변경 금지.
> **네이밍:** kebab-case 기본, modifier만 `--` suffix. JSX와 SCSS 1:1 일치.
> **CLS 방지:** hover 시 translateY 금지 → box-shadow만 사용.
> **세션 계획:** 세션1(M-0+M-1) → 세션2(M-2+M-3) → 세션3(M-5+M-6+M-4)

---

## Phase M 작업 범위 — 화면별 SCSS 완성도

| 화면 | 현재 완성도 | 주요 누락 | 참조 |
|------|:-:|---|---|
| **M-0 Common** | 40% | CSS 변수 통일, workspace 레이아웃, 버튼, 뱃지, 드래그 핸들 | `proto-style.css` |
| **M-1 Sidebar** | 70% | SVG 로고, 검색바 껍데기, 트리 노드 수치, 푸터 | `proto-sidebar.css` |
| **M-2 Bookshelf** | 60% | JSX 클래스 통일, 섹션 구조, 카드 그리드 | `proto-bookshelf.css` |
| **M-3 Project** | 50% | JSX 클래스 통일, 헤더 편집, 탭(에피소드 목록만), 행 수치 | `proto-project.css` |
| **M-4 Episode** | 95% | 리사이즈 핸들 | `proto-episode.css` |
| **M-5 Page** | 85% | 뷰 토글, 줌, 리사이즈 핸들 | `proto-page.css` |
| **M-6 Cut** | 85% | 가이드라인, 크로스헤어, 컷 추가 버튼 | `proto-cut.css` |

### 토론으로 보류 확정된 항목
- 새 프로젝트 모달 (기능 구현 선행 필요)
- 공유 모달 (서버 없음)
- 프로젝트 설정 탭 전체 (JSX/기능 없음)
- Rail 호버 팝업 (JS 로직 필요)
- 검색 모달 연동 (검색 기능 없음)

---

## 2026-03-11 버그 수정 내역

1. **무한 루프 수정** — `StoreContext.tsx`의 `navigateToProject`/`navigateToEpisode`/`navigateToPage` 등 모든 UI setter를 `useCallback`으로 메모이제이션. 매 렌더마다 새 함수 참조 생성 → useEffect 의존성 배열에서 무한 루프 발생하던 문제 해결.
2. **기본 책장 자동 생성** — `BookshelfManagement/index.tsx`에서 `bookshelves`가 비어있으면 `ADD_BOOKSHELF` 자동 dispatch. 첫 실행 시 빈 화면 문제 해결.
3. **CRUD 버튼 추가** — `BookshelfHeader.tsx`에 "+ 새 프로젝트" 버튼, `BookshelfList.tsx`에 "+ 새 프로젝트" 카드 추가.

---

## 라우트 구조 (최종)
- Bookshelf: `/bookshelf`
- Project: `/project/:projectId`
- Episode: `/project/:projectId/episode/:episodeId`
- Page: `/project/:projectId/episode/:episodeId/page`
- Cut: `/project/:projectId/episode/:episodeId/page/:pageId`

---

## 핵심 아키텍처 결정 (불변)

### 데이터 모델
- `NormalizedStore`: bookshelves/projects/episodes/pages/cuts/memos/scriptSnippets/assets — 모두 `Record<string, T>`
- `EpisodeStatus`: `'draft' | 'inProgress' | 'done'` — 3단계
- `order: string` — Lexosort (DnD 재정렬)
- 엔티티 ID 필드: `entity.id` (nanoid)

### 컴포넌트 구조
- 3-Context: `StoreContext`(데이터), `DispatchContext`(dispatch), `UIContext`(UI상태+dbError)
- UI setter 함수들: 모두 `useCallback`으로 메모이제이션 (무한 루프 방지)
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
| SCSS 진입점 | `src/assets/styles/index.scss` |
| **프로토타입 CSS** | `public/prototypes/proto-*.css` |
| **React SCSS** | `src/assets/styles/screens/*.scss`, `layout/*.scss`, `common/*.scss` |

---

## Known Issues
- `vite-plugin-svgr` 미등록 → SVG를 React 컴포넌트로 사용 불가 (현재 img src로 사용 중)
- `b4Layout.ts`의 `B4_SPEC { w:324, h:238 }` — w/h 역순 표기 버그 (CSS는 올바름)
- `src/Setting/` 디렉토리 용도 불명확
- `src/components/screens/sample/` — Vue/Pinia 레퍼런스 코드, TS 에러 다수 (삭제 대상)
- `src/components/screens/guide/Guide.tsx` — `transform` duplicate key 경고
