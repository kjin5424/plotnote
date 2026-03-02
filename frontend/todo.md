# PlotNote 프로토타입 구현 TODO

> **디자인 스펙**: `todo-design.md` (화면별 세부 구조·모달·JS 패턴 정규 문서)
> **공통 CSS**: `proto-style.css` ✅ 완성 (866줄)
> **사이드바 레퍼런스**: `proto-sidebar.html` ✅ 완성

---

## 현황 대시보드

| 파일 | proto-style.css | 신 사이드바 | 중복 CSS 제거 | 상태 |
|------|:-:|:-:|:-:|------|
| proto-bookshelf.html | ✅ | ✅ | ✅ | **완료** |
| proto-project.html | ✅ | ✅ | ✅ | **완료** |
| proto-episode.html | ✅ | ✅ | ✅ | **완료** |
| proto-page.html | ✅ | ✅ | ✅ | **완료** |
| proto-cut.html | ✅ | ✅ | ✅ | **완료** |

---

## 🔴 Phase A — 즉시 처리 (개발 블로커)

### A-1. proto-episode.html — proto-style.css 전환

**문제**: `<style>` 태그에 `:root`+사이드바 CSS+모달 CSS 전체가 인라인으로 중복됨 (~300줄 이상)

**작업 순서**:
1. `</head>` 직전, Google Fonts `<link>` 다음 줄에 추가:
   ```html
   <link rel="stylesheet" href="proto-style.css" />
   ```
2. `<style>` 블록에서 제거할 CSS (proto-style.css에 포함된 것):
   - `:root {}` 전체 (CSS 변수)
   - `* {}` 리셋 + `body {}` + `button {}`
   - `.sb`, `.sb-logo`, `.sb-search`, `.sb-tree`, `.sb-grp`, `.tn` 사이드바 전체
   - `.sb-rail-nav`, `.rn-item`, `.rn-pop` rail nav 전체
   - `.sb-ft`, `.sb-av`, `.sb-ft-name`
   - `.main {}`
   - 검색 모달 CSS (`.s-ov` ~ `.s-esc`)
   - 메모 모달 CSS (`.mm` ~ `.mm-txt.empty`)
3. `<style>` 블록에서 **유지할 CSS** (에피소드 전용):
   - `.ws-hd`, `.ws-bd` 에피소드 레이아웃 (2열 분할)
   - `.ep-col`, `.det-col`, `.ep-tabs`, `.ep-tab`
   - `.erow`, `.ebody`, `.er-acts`, `.drag-h`, `.eth`
   - `.etag`, `.t-wip`, `.t-done`, `.t-todo`
   - `.det-hd`, `.det-wrap`, `.det-tab-row`, `.det-bd`
   - `.ep-parent-memo`, `.m-sec`, `.pm-item`, `.pm-hd`, `.pm-ta`
   - `.det-status`, `.det-cfg-btn`, `.sort-tgl`
   - 설정 모달 CSS (`.cfg-ov` 등)

---

### A-2. proto-page.html — 신 사이드바 교체 + proto-style.css 전환

**문제**: 구 사이드바(`.si`, `.si-pop`, `.sb-x`, `.sb-lbl`, `.si-t`, `.si-b`, `.sb-ft-n`, `.sb-u`, `.av`) 잔존

**작업 순서**:
1. proto-style.css `<link>` 추가 (Google Fonts 다음)
2. `<style>` 블록에서 제거:
   - `:root {}` + `* {}` + `body {}` + `button {}`
   - 구 사이드바 CSS 전체 (`.sb`, `.sb.rail`, `.sb-logo` ~ `.sb-u`, `.si`, `.si-pop`, `.av` 등)
   - `.main {}`
   - 검색 모달 CSS
   - 메모 모달 CSS
3. `<aside>` 전체를 **신 통합 사이드바**로 교체 (`class="sb rail"` — 접힘 기본)
4. **사이드바 컨텍스트**:
   - 트리: 즐겨찾기(closed) / 나의 책장(open) → 고양이와 강아지(open) → ep.3(open) → p.3에 `.tn-row.on`
   - rail-nav: house(비활성) → book_open(비활성) → article(비활성) → **page-svgrepo(on)**
5. `<style>` 블록에서 **유지할 CSS** (페이지 전용):
   - `.ws-hd`, toolbar, `ws-ft`
   - `.ws-bd`, `.grid-area`, `.pg-grid`, `.spread-cell`, `.pcard`, `.pi`
   - `.rsp`, `.rsp-tabs`, `.rsp-tab`, `.rsp-bd`, `.rsp-sec`, `.rsp-ci`
   - `.abtn`, `.abtn.pri`, `.view-tgl`, `.vtb`

---

### A-3. proto-cut.html — 신 사이드바 교체 + proto-style.css 전환

**문제**: A-2와 동일 패턴 (구 사이드바 CSS + HTML 잔존)

**작업 순서**: A-2와 동일 패턴

4. **사이드바 컨텍스트**:
   - rail 기본
   - rail-nav: house → book_open → article → page-svgrepo → **note_stack(on, cut 화면 전용)**
   - 트리: 나의 책장 → 고양이와 강아지 → ep.3 → p.3(open) → 컷 leaf 노드

5. **유지할 CSS** (컷 전용):
   - `.ctx-bar`, `.pg-nav`, `.pn-btn`, `.zoom-ctl`, `.z-btn`, `.z-pct`
   - `.canvas-area`, `.canvas-scroll`, `.cut-canvas-wrap`, `.cut-page`, `.cut-grid`, `.cut-cell`
   - `.ftb`, `.ftb-grp`, `.ftb-sep`, `.fb`
   - `.rsp` (page와 동일 구조)

---

### A-4. Episode 상태 탭 필터 — 5단계 그루핑 정의 (문서화)

**문제**: 좌측 탭 필터 "전체/진행중/완료"가 React `entities.ts`의 5단계 `EpisodeStatus`와 불일치

**결정사항** (proto-episode.html에 주석 및 JS 반영):
```js
// EpisodeStatus 그루핑
// "전체"    → 모든 상태
// "진행중"  → storyboard | lineart | coloring
// "완료"    → done
// "예정"    → draft  (탭 항목 추가)

const STATUS_GROUP = {
  all:        ['draft', 'storyboard', 'lineart', 'coloring', 'done'],
  inProgress: ['storyboard', 'lineart', 'coloring'],
  done:       ['done'],
  draft:      ['draft'],
};
```

**상태 태그 JS 데이터 업데이트**:
```js
const tagCls = {
  draft:'t-todo', storyboard:'t-todo',
  lineart:'t-wip', coloring:'t-wip',
  done:'t-done'
};
const tagTxt = {
  draft:'예정', storyboard:'스토리보드',
  lineart:'선화', coloring:'채색', done:'완료'
};
```
**탭 HTML 추가**: `ep-tab` 4번째에 "예정" 탭 추가 또는 "진행중" 그루핑 명시

---

## 🟡 Phase B — 중요 수정

### B-1. proto-bookshelf.html — "보관함" 노드 이모지 → SVG
```html
<!-- 현재 -->
<span class="node-icon">🗃</span>
<!-- 변경: docs_20dp 또는 folder 계열 SVG 사용 -->
<span class="node-icon">
  <img src="../../src/assets/images/docs_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg" alt="">
</span>
```

### B-2. proto-cut.html — 플로팅 툴바 이모지 → SVG
현재 `↩` `↪` 이모지 → 아이콘 SVG 파일 확인 후 교체
- undo/redo: `undo_20dp_*.svg` / `redo_20dp_*.svg` 파일 존재 여부 확인 먼저
- 없으면: `keyboard_backspace_20dp_*.svg` 또는 기존 이모지에 CSS `font-size: 14px; line-height: 1;` 명시 (임시)

### B-3. B4 비율 표기 정정
**위치**: `todo-design.md §4-5`, 각 파일의 `.pi` CSS

**팩트 확인**:
- B4 용지 = 257mm × 364mm (세로형 원고)
- CSS `aspect-ratio: 238/324` → width:238, height:324 → **세로형 ✅ 맞음**
- `B4_SPEC { w:324, h:238 }` 표기가 잘못됨 (가로/세로 역전)
- `known issue` 설명도 혼란스러움 — 정정 필요

**처리**: `progress.md` Known Issue와 `todo-design.md §4-5` 주석 교체
```
/* B4 세로 원고 비율: width 238 / height 324 (B4 257mm×364mm 근사) */
aspect-ratio: 238/324;
```

### B-4. proto-project.html — 메타 타임스탬프 상대시간
```html
<!-- 현재 -->
<span class="pj-meta-val">2025-02-20 14:30</span>
<!-- 변경 -->
<span class="pj-meta-val">3일 전</span>
```
JS에 간단한 `timeAgo()` 함수 추가 또는 그냥 문자열로 수정

### B-5. 검색 `doS()` XSS 경고 주석 추가
**파일**: proto-bookshelf.html, proto-project.html

`doS()` 함수 직전에 추가:
```js
// ⚠️ XSS 주의: innerHTML에 q 직접 삽입 중.
// React 구현 시 JSX(자동 이스케이프) 또는 textContent 기반으로 교체할 것.
```

---

## 🟢 Phase C — 권장 개선

### C-1. proto-page.html — spread 첫 빈 칸 어포던스
홀수 시작 시 `[빈칸, p.01]` 패턴의 빈 칸에 시각적 표시 추가:
```html
<div class="pcard pcard--cover-blank">
  <div class="pi pi--blank">
    <span class="pi-blank-lbl">속표지 앞</span>
  </div>
</div>
```
CSS: `.pcard--cover-blank .pi` → `background: var(--pa); opacity: 0.4; pointer-events: none;`

### C-2. proto-cut.html — ctx-bar 좁은 뷰포트 대응
```css
.ctx-bar { flex-wrap: wrap; gap: 6px; }
.zoom-ctl { margin-left: auto; }
```
또는 `.zoom-ctl`을 `.ftb` 툴바로 이동 (만화가 관점: 줌 컨트롤은 작업 도구 그룹에 있는 게 자연스러움)

### C-3. Episode `ep-col-acts` 정렬 수정
기존 클로드용 주석에서 발견된 미구현 항목:
```css
.ep-col-acts { display: flex; justify-content: space-around; align-items: center; }
```

---

## 🔵 Phase D — 통합 검수 (Phase A~C 완료 후)

`todo-design.md §6` 기준으로 아래 항목을 체크리스트로 검수:

### D-1. CSS 일관성
- [ ] 5개 파일 모두 `proto-style.css` `<link>` 참조 확인
- [ ] 각 파일 `<style>` 블록에 공통 CSS 변수(`:root`) 중복 없음
- [ ] `todo-design.md §CSS 변수` 기준 변수명 일치 확인

### D-2. 사이드바 일관성
- [ ] bookshelf/project/episode: `.sb` 기본 (펼침)
- [ ] page/cut: `.sb.rail` 기본 (접힘)
- [ ] 각 화면에 맞는 `.rn-item.on` 설정
- [ ] page/cut에서 구 사이드바(`.si`, `.si-pop`, `.av`) 완전 제거

### D-3. 레이아웃 시프트 검증
- [ ] `node-hd` 열기/닫기 시 카드 크기 변동 없음 (`outline` 패턴 확인)
- [ ] `erow` hover/선택 시 행 높이 변동 없음
- [ ] `pcard` hover 시 주변 카드 위치 변동 없음
- [ ] `rsp` 패널 열기/닫기 부드러운 width 전환
- [ ] 스크롤 영역 `scrollbar-gutter: stable` 적용 확인

### D-4. 모달 정상 동작
- [ ] 검색: overlay 클릭 닫힘, ESC 닫힘, 결과 렌더링
- [ ] 플로팅 메모: 드래그 이동, 핀 고정, 외부 클릭 닫힘
- [ ] 설정 모달: 각 화면별 열기/닫기
- [ ] 새 프로젝트 모달 (bookshelf): 입력 포커스, 취소/생성

### D-5. 아이콘 정합성
- [ ] 이모지 사용 제거 완료 (🗃, ↩, ↪ 등)
- [ ] 모든 `<img src="...">` 경로가 실제 파일 존재 확인
- [ ] icon-mapping.txt 대비 누락 아이콘 없음

---

## ⬜ React 이관 항목 (프로토타입에서 구현 불필요)

이전 todo.md의 미구현 항목 중 React 구현 단계에서 처리할 것들:

| 항목 | 이관 대상 |
|------|----------|
| 에피소드 헤더에서 pageMemo/pageDetailMemos 확인 | React Episode 화면 (Phase I) |
| `eth` 클릭 시 해당 정보 `det-col` 표시 | React Episode 상세 패널 |
| 에피소드 DnD 순서 변경 (drag-h 핸들) | React `@dnd-kit` 구현 |
| 설정 모달 값 실제 저장 | React `StoreContext` dispatch |
| 검색 실시간 필터 시뮬레이션 | React 검색 컴포넌트 |
| 플로팅 메모 드래그·리사이즈 정밀 구현 | React 메모 패널 |
| 페이지 메모 ↔ 에피소드 메모 데이터 연동 | React `Memo` 단일 테이블 |
| `bebe-info` bookmark 아이콘 추가 | React 사이드바 |
| 팀 프로젝트 공유 기능 UI | 백엔드 도입 시 |
| Episode 5단계 상태 전환 인터랙션 프로토타입 | React Episode 화면 (Phase I) |

---

## 작업 규칙

- 주석 처리: 디자인 관련 주석 유지, 클로드용 주석은 반영하거나 완료 표시
- 파일 단위로 작업하고 완료 후 D 체크리스트 항목 확인
- 각 Phase 완료 시 `progress.md` 업데이트
