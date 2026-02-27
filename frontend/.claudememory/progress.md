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

### 🔴 미결: 데이터 모델 확정 필요 (React 구현 전 선행)
**`memos` 통합 테이블 설계 논의 중 — 세션 종료로 중단**

**합의된 방향:**
- 모든 엔티티(Project/Episode/Page/Cut)의 메모를 `NormalizedStore.memos` Record에 통합 관리
- 엔티티 자체에서 `memo`, `detailMemo` 필드 제거
- `ScriptSnippet`은 성격이 달라 별도 유지 (assign 기능, type 구분, DnD 조작)

**미결 쟁점 — 다음 세션에서 결정:**
1. **쟁점 2: `order` 필드 타입** — 정수(`number`) vs Lexosort 문자열(`string`)
   - 정수: 단순하지만 중간 삽입 시 전체 재계산 필요
   - Lexosort: 무한 중간 삽입 가능, 약간 복잡
   - **핵심 질문: 메모 순서를 사용자가 직접 드래그로 재정렬하는 기능이 있을까?**
2. **쟁점 3은 해결됨**: ScriptSnippet 분리 유지로 합의

**논의된 Memo 인터페이스 (잠정안):**
```ts
interface Memo extends BaseEntity {
  parentId: string;
  parentType: 'PROJECT' | 'EPISODE' | 'PAGE' | 'CUT';
  content: string;
  order: number; // 타입 미확정 — 쟁점 2
}
```

**목록 미리보기 처리 방식 (합의):**
```ts
// order: 0 = 주 메모 (목록 1줄 미리보기)
// order: 1 = 상세 메모 (패널 textarea)
const getEpisodeMemos = (episodeId: string) =>
  Object.values(memos)
    .filter(m => m.parentId === episodeId)
    .sort((a, b) => a.order - b.order);
```

**쟁점 2 결정 후 할 일:**
- `techContext.md §5` NormalizedStore 인터페이스 갱신 (memos 추가, 엔티티 memo 필드 제거)
- `todo-design.md` §3-5 경계 주석의 "memo/detailMemo 필드명 미확정" 항목 해소

### 구현 순서 (우선순위, 데이터 모델 확정 후)
- [ ] **A.** 타입 정의 — `src/types/entities.ts`, `src/types/store.ts` (Memo 인터페이스 포함)
- [ ] **B.** B4 유틸리티 — `src/utils/b4Layout.ts` (B4_SPEC, frameToPixels, calcInnerFrameOffset)
- [ ] **C.** Context/Reducer — `src/contexts/StoreContext.tsx` (NormalizedStore + Action 타입)
- [ ] **D.** 로컬 저장소 — `src/services/persistence.ts` (IndexedDB Debounced Save)
- [ ] **E.** 라우팅 — react-router-dom v7 기반 (Bookshelf → Project → Episode → Page → Cut)
- [ ] **F.** 공통 컴포넌트 — Button, Modal, GuideLine (B4 가이드라인 오버레이)
- [ ] **G~K.** 화면 구현 (Bookshelf → Project → Episode → Page → Cut 순)

---

## Known Issues (잔존)
- `vite-plugin-svgr` 미등록 → SVG를 React 컴포넌트로 사용 불가 (`vite.config.ts`에 추가 필요)
- `src/Setting/` 디렉토리 용도 불명확 (vite alias 등록됨, systemPatterns 미언급)
- `todo-design.md §4-5`: B4 비율 `238/324` 표기가 `B4_SPEC { w:324, h:238 }` 과 역순 — 가로/세로 기준 주석 보완 필요
