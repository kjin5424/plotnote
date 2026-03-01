# Progress

## Current Status
**단계:** HTML 프로토타입 완성 → React 앱 구현 준비 중 (데이터 모델 확정 논의 중)
**브랜치:** `kyoungjin`
**마지막 작업:** 메모리 파일 정비 + 아키텍처 검토 + memos 통합 설계 논의 (2026-02-27)

---

## Phase 1: HTML 프로토타입 (진행 중)

### 완료
- [x] `proto-sidebar.html` — 통합 사이드바 레퍼런스 완성
- [x] `proto-bookshelf.html` — 통합 사이드바 적용
- [x] `proto-project.html` — 통합 사이드바 적용
- [x] `proto-episode.html` — 통합 사이드바 적용
- [x] `proto-style.css` — 공통 CSS 분리 (생성 완료)

### 미완료 (다음 작업 대상)
- [ ] **4번:** `proto-page.html` — 통합 사이드바 적용 + proto-style.css `<link>` 교체
- [ ] **5번:** `proto-cut.html` — 통합 사이드바 적용 + proto-style.css `<link>` 교체
- [ ] **CSS 추출:** 각 HTML 파일에서 proto-style.css로 이동된 공통 CSS 제거 + `<link>` 태그 추가
  - 대상: proto-bookshelf.html, proto-project.html, proto-episode.html, proto-page.html, proto-cut.html
  - 주의: bookshelf의 `.s-res*`(검색결과 CSS)는 전용이므로 `<style>` 유지

### proto-episode.html 미구현 클로드용 주석
| 위치 | 내용 | 상태 |
|---|---|---|
| 에피소드 헤더 | `pageMemo`, `pageDetailMemos` 확인 뷰 | 미구현 |
| `.det-col` | `eth` 클릭 시 해당 정보 표시 | 미구현 |
| `ep-col-acts` | `ep-tab`들과 `space-around` 정렬 | 미구현 |
| `bebe-info` | bookmark 아이콘 추가 | 미구현 |

---

## Phase 2: React 앱 구현 (미시작)

### 이번 세션에서 완료한 선행 작업
- [x] `tsconfig.json`: `"strict": true` 변경 완료 (사용자가 직접 적용했었음)
- [x] `tsconfig.json`: `"paths"` 8개 alias 등록 완료
- [x] `techContext.md` 전면 재작성 (라이브러리 버전, 경로 별칭, B4 유틸, 정규화 인터페이스 등)
- [x] `todo.md` 하단 중복 작업규칙 제거 → `CLAUDE.md §3,4 참조`로 대체
- [x] `todo-design.md` 4개 JS 데이터 섹션에 ⚠️ 경계 주석 추가

### 🟡 데이터 모델 — 큰 방향 합의, 세부 필드는 보류

**합의된 방향 (2026-03-01 확정):**
- 모든 엔티티(Project/Episode/Page/Cut) 메모를 `NormalizedStore.memos` Record에 통합 관리
- 엔티티 자체에서 `memo`, `detailMemo` 인라인 필드 제거
- `ScriptSnippet` 별도 유지 (DnD 배정, type 구분)
- `order: string` — **Lexosort 확정** (사용자 DnD 재정렬 존재)
- emoji 스코프: **episode + cut** (page 아님)
- TypeScript interface ≠ DB 스키마 1:1 대응 아님 — nullable 일부 감수

**보류 쟁점 (향후 메모 수정 요청 시 재논의):**
1. **Memo interface 세부 필드** — SINGLE/DETAIL role 분리 여부, CutMemo 별도 테이블 분리 여부, nullable 범위
2. **ScriptSnippet.speakerId / type 필드** — 캐릭터를 projectDetailMemo 안에서 관리할지, 별도 Character 엔티티로 분리할지 미결. 현재는 speakerId/type 필드를 ScriptSnippet에 두되 활성화 보류.

**현재 사용할 잠정 Memo 인터페이스 (세부는 추후 수정):**
```ts
interface Memo extends BaseEntity {
  parentId: string | null;  // cutMemo 미배정 시 null 가능
  parentType: 'PROJECT' | 'EPISODE' | 'PAGE' | 'CUT';
  role: 'SINGLE' | 'DETAIL';
  content: string;
  order: string;            // Lexosort
  tags: string[];
  emoji: string | null;     // episode SINGLE, cut SINGLE/DETAIL 전용
}
```

**다음 할 일:**
- `techContext.md §5` NormalizedStore 인터페이스 갱신 (memos 추가, 엔티티 memo 필드 제거) ← React 구현 A단계 전에 수행

### 구현 순서 (우선순위)
- [x] **A.** 타입 정의 — `src/types/entities.ts`, `src/types/store.ts`
- [x] **B.** B4 유틸리티 — `src/utils/b4Layout.ts`
- [x] **C.** Context/Reducer — `src/contexts/StoreContext.tsx`
- [x] **D.** 로컬 저장소 — `src/services/persistence.ts` (IndexedDB + debouncedSave)
- [x] **E.** 라우팅 — `src/App.tsx` 정리 (5단계 중첩 라우트, StoreProvider 추가)
- [x] **F.** 공통 컴포넌트 — Button, Modal, GuideLine (B4 가이드라인 오버레이)
- [ ] **G~K.** 화면 구현 (Bookshelf → Project → Episode → Page → Cut 순)

### ⚠️ 마이그레이션 잔존 이슈 (G~K 진행 시 해소)
- `DataContext.tsx`: `DataContextValue`, `CutNote` 타입 import 오류 (Vite 빌드는 통과, IDE 경고만)
- `DataProvider`는 App.tsx에 임시 유지 — 스크린 마이그레이션 완료 후 제거
- 기존 화면들(Bookshelf, Project, Episode, Page, Cut)은 여전히 `useData()` 사용 중 → G~K에서 `useStore()` / `useDispatch()` / `useUI()`로 교체

---

## Known Issues (잔존)
- `vite-plugin-svgr` 미등록 → SVG를 React 컴포넌트로 사용 불가 (`vite.config.ts`에 추가 필요)
- `src/Setting/` 디렉토리 용도 불명확 (vite alias 등록됨, systemPatterns 미언급)
- `todo-design.md §4-5`: B4 비율 `238/324` 표기가 `B4_SPEC { w:324, h:238 }` 과 역순 — 가로/세로 기준 주석 보완 필요
