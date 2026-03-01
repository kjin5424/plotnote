# PlotNote 프로토타입 디자인 스펙 (정규 문서)

> **역할**: 이 파일은 화면별 HTML 구조·CSS 패턴·JS 인터랙션의 **설계 레퍼런스**입니다.
> 구현 체크리스트는 `todo.md`를 참조하세요.
>
> **공통 CSS**: `proto-style.css` (이미 완료 — 866줄)
> **사이드바**: `proto-sidebar.html` (이미 완료 — 392줄)
> **아이콘**: `../../src/assets/images/` 경로의 SVG 파일 50개 사용 (icon-mapping.txt 참조)

---

## 전역 규칙 (모든 화면 공통)

### 파일 구조

```
proto-*.html 파일 구성:
<head>
  - Google Fonts (Noto Sans KR, Noto Serif KR, DM Mono)
  - <link rel="stylesheet" href="proto-style.css">   ← 공통 CSS
  - <style> 해당 화면 전용 CSS만 작성 </style>
</head>
<body>
  - <aside class="sb"> 통합 사이드바 (proto-sidebar.html에서 복사)
  - <div class="main"> 메인 콘텐츠
  - 모달들 (.s-ov, .mm, .cfg-ov, .np-ov)
  - <script> JS
</body>
```

### 사이드바 규칙

- 모든 화면에서 **동일한 통합 사이드바** 사용 (proto-sidebar.html 참조)
- bookshelf/project/episode: 펼침(`.sb`) 상태 기본
- page/cut: 접힘(`.sb.rail`) 상태 기본
- page/cut에서 기존에 사용하던 구 사이드바(`.si`, `.si-pop` 등)는 **제거**하고 통합 사이드바의 `.rn-item + .rn-pop`으로 대체
- 사이드바와 워크스페이스 헤더의 수평선 일치: `sb-logo`의 `height: var(--hd-h)` + `border-bottom`과 `ws-hd`의 `height: var(--hd-h)` + `border-bottom`이 동일 높이

### 레이아웃 시프트 방지 규칙 (★ 최우선)

- **hover 시 border 추가 금지**: `border: none → border: 1px solid X` 패턴 금지
  - 대안 1: 처음부터 `border: 1px solid transparent`로 예약, hover 시 색상만 변경
  - 대안 2: `outline` 사용 (레이아웃에 영향 없음)
  - 대안 3: `box-shadow: inset 0 0 0 1px var(--bd)` 사용
- **scrollbar 출현 리플로우 방지**: 스크롤 가능 영역에 `scrollbar-gutter: stable` 적용
- **node-hd 토글 시 크기 변동 방지**: `.pgrid` 등 자식 요소의 width가 부모 스크롤바 유무에 따라 변하지 않도록 함

### CSS 변수 (proto-style.css에 정의됨)

```
색상: --db(진한파랑) --db2(hover) --oc(보조파랑) --gl(유리) --co(콘크리트)
      --am(앰버) --am-bg(앰버배경) --wh(흰) --pa(종이) --canvas(캔버스)
      --ink(본문) --i2(보조텍스트) --gh(고스트)
보더: --bd(기본) --bd2(버튼테두리)
상태: --sel-bg(선택배경) --hover-bg(호버배경)
치수: --sw(220px) --rail(44px) --hd-h(44px) --rsp(280px)
글꼴: --ff-sans --ff-serif --ff-mono
```

### 공통 버튼 클래스 (proto-style.css)

| 클래스 | 용도 | 예시 |
|--------|------|------|
| `.abtn` | 텍스트 액션 버튼 (테두리) | "정렬", "필터" |
| `.abtn.pri` | 강조 액션 버튼 (파란 배경) | "+ 새 프로젝트", "+ 에피소드 추가" |
| `.hbtn` | 28x28 아이콘 전용 버튼 | 메뉴, 검색, 메모 토글 |
| `.cfg-btn` | 설정 기어 버튼 | 프로젝트 설정 |
| `.sort-tgl` | 정렬 토글 (mono) | "최신순 ↕" |
| `.view-tgl > .vtb` | 양면/단면 뷰 토글 | "양면 | 단면" |
| `.etag` + `.t-wip`/`.t-done`/`.t-todo` | 상태 태그 | "진행중", "완료" |

### 공통 모달

1. **검색 모달** (`.s-ov > .s-box`): Cmd+K 스타일, 탭별 검색 (프로젝트/에피소드/페이지/컷)
2. **플로팅 메모** (`.mm`): 드래그 가능, 리사이즈 가능, 탭(projectMemo/episodeMemo/pageMemo)
3. **설정 모달** (`.cfg-ov > .cfg-box`): 2x2 그리드 카드, override 시 amber 표시
4. **새 프로젝트** (`.np-ov > .np-box`): bookshelf에서만 사용

---

## 1. Bookshelf (proto-bookshelf.html)

### 1-1. 화면 개요

책장 화면. 사용자가 소유/공유한 프로젝트를 카드 그리드로 탐색하는 진입점.

### 1-2. 레이아웃 구조

```
body (flex row)
├── aside.sb              ← 통합 사이드바 (펼침 기본)
└── div.main              ← flex column
    ├── div.ws-hd         ← 고정 높이 44px
    │   └── div.ws-tr
    │       ├── div.ws-ttl → "책장" (Noto Serif 17px)
    │       └── div.ws-acts
    │           └── button.abtn.pri → "+ 새 프로젝트"
    └── div.ws-bd         ← 스크롤 영역 (scrollbar-gutter: stable)
        ├── div.node#node-fav    ← "즐겨찾기" 섹션
        │   ├── div.node-hd      ← 클릭으로 접기/펼치기
        │   │   ├── span.node-arrow  (▶ 아이콘, 열림 시 90도 회전)
        │   │   ├── span.node-icon   (favorite SVG)
        │   │   ├── span.node-ttl    ("즐겨찾기")
        │   │   └── span.node-count  ("2개", DM Mono)
        │   └── div.node-bd
        │       └── div.pgrid   ← 카드 그리드
        │           ├── div.pc  ← 프로젝트 카드 (반복)
        │           └── div.pc.pc-add  ← "+ 추가" 카드
        ├── div.node#node-my     ← "나의 책장" 섹션 (동일 구조)
        └── div.node#node-shared ← "팀 프로젝트" 또는 disabled
```

### 1-3. 프로젝트 카드 (`.pc`) 상세

```
div.pc (border: 1px solid transparent → hover 시 --bd2 색상만 변경)
├── div.pc-th            ← 썸네일 (aspect-ratio: 4/3, 회색 배경)
│   └── div.pc-th-n      ← 에피소드 수 뱃지 (오른쪽 상단, 작은 원형)
├── div.pc-info          ← 카드 하단 정보
│   ├── div.pc-tr        ← 제목 행
│   │   ├── span.pc-ttl  ← 프로젝트명 (12px, 1줄 ellipsis)
│   │   └── button.pc-fav ← 즐겨찾기 별 (클릭 시 .on 토글)
│   ├── div.pc-mt        ← "168p" 같은 총 페이지수 (ghost 색상, mono)
│   └── div.pc-ct        ← "베베" 같은 소유자/협업자 (tip으로 전체 목록)
└── (hover 시 box-shadow 추가, fadeUp 애니메이션 stagger)
```

### 1-4. 핵심 디자인 포인트

- **node-hd hover 시 레이아웃 시프트 제거**:
  - 현재 문제: `node-hd`에 `border: none` → hover 시 `border: 1px solid var(--gh)` 추가 → 2px 크기 변동
  - 해결: `border: 1px solid transparent` 기본 적용, hover 시 `border-color` 변경만
  - 또는 `outline: 1px solid var(--gh); outline-offset: -1px;` 사용
- **pgrid**: `display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px;`
- **pc fadeUp 애니메이션**: `animation-delay`를 `nth-child`로 stagger (0.03s 간격, 최대 10개)
- **pc.pc-add** (추가 카드): 점선 border, 중앙 "+" 아이콘, opacity .5 → hover .8
- **node 접기 시**: `.node-bd` display:none, arrow 회전 0도

### 1-5. 모달

- **새 프로젝트 모달** (`.np-ov`): 프로젝트명 입력 + 기본 설정(페이지수/읽기방향/시작페이지/뷰) 토글
- **검색 모달** (`.s-ov`): 탭별 검색
- **플로팅 메모** (`.mm`): projectMemo 탭

### 1-6. JS 인터랙션

```js
tglSb()      // 사이드바 접기/펼치기 (.rail 토글)
tglGrp(id)   // 사이드바 그룹 접기/펼치기 (.closed 토글)
tglTn(id)    // 사이드바 트리노드 접기/펼치기 (.closed 토글)
tglNode(id)  // 워크스페이스 node 섹션 접기/펼치기
openNP()     // 새 프로젝트 모달 열기 (.open 추가)
closeNP(e)   // 모달 닫기 (overlay 클릭 감지)
openS()      // 검색 모달 열기
closeS(e)    // 검색 모달 닫기
tglMM()      // 플로팅 메모 토글
```

### 1-7. 사이드바 상태

- rail-nav에서 `.rn-item.on`은 "책장" 아이콘 (현재 화면이 bookshelf이므로)
- 트리에서 현재 프로젝트가 없으므로 `.tn-row.on` 없음

---

## 2. Project (proto-project.html)

### 2-1. 화면 개요

특정 프로젝트의 상세 화면. 프로젝트 메모/정보 + 에피소드 카드 그리드.

### 2-2. 레이아웃 구조

```
body (flex row)
├── aside.sb              ← 통합 사이드바 (펼침)
└── div.main
    ├── div.ws-hd (44px)
    │   └── div.ws-tr
    │       ├── div.ws-ttl → "고양이와 강아지" (프로젝트명)
    │       ├── button.ws-fav.on → 즐겨찾기 별
    │       └── div.ws-acts
    │           ├── button.abtn.pri → "+ 에피소드 추가"
    │           ├── button.cfg-btn → 설정 기어 아이콘 (onclick=openCfg)
    │           └── button.hbtn → 메모 패널 토글 (⋯ 아이콘)
    └── div.ws-bd (스크롤)
        ├── div.pj-info (grid 2열)
        │   ├── div.pj-card → "프로젝트 메모" + textarea.pj-ta
        │   └── div.pj-card → "프로젝트 세부 메모" + textarea.pj-ta
        ├── div.pj-info (grid 1열)
        │   └── div.pj-card → "프로젝트 정보"
        │       └── div.pj-meta
        │           ├── div.pj-meta-item → "에피소드: 7개"
        │           ├── div.pj-meta-item → "총 페이지: 168p"
        │           └── div.pj-meta-item → "마지막 작업: 2시간 전"
        ├── div.sec-hd
        │   ├── h2 → "에피소드 목록"
        │   ├── span.sec-c → "7개"
        │   └── button.sort-tgl → "최신순" (정순/역순 토글)
        └── div.pgrid#ep-grid ← 에피소드 카드 그리드 (JS로 렌더)
```

### 2-3. 에피소드 카드 (project 화면 전용 `.pc`)

bookshelf의 `.pc`와 유사하지만 내용이 다름:

```
div.pc (border: 1px solid transparent, hover 시 border-color 변경)
├── div.pc-th            ← 썸네일 (첫 페이지 미리보기)
│   └── span.pc-th-n     ← "ep.1" 에피소드 번호 (왼쪽 상단)
├── div.pc-info
│   ├── div.pc-tr
│   │   ├── span.pc-ttl  ← "첫 만남" 에피소드 제목
│   │   └── button.pc-fav ← 즐겨찾기 별
│   ├── div.pc-memo      ← episodeMemo 1줄 미리보기 (있으면 표시, 없으면 hidden)
│   ├── div.pc-ft
│   │   ├── span.pc-mt   ← "24p" 페이지수
│   │   ├── span.etag    ← 상태 태그 (t-wip/t-done/t-todo)
│   │   └── span.pc-ep-n ← "2시간 전" 마지막 작업
│   └── (fadeUp 애니메이션, stagger)
```

### 2-4. 에피소드 카드 JS 렌더링

> ⚠️ **프로토타입 목업 전용 데이터.** React 구현 시 `techContext.md §5` 인터페이스로 대체됨.
> - `n` → `displayNumber` (표시용), 별도 `id: nanoid()` 필드 추가 필요
> - `tag: "wip"/"todo"` → `status: 'storyboard'/'draft'/...` (5단계 열거형으로 교체)
> - `fav` → `Episode` 인터페이스에 미정의, 추후 스키마 확정 필요
> - 정렬 토글: `[...episodes].toReversed()` 또는 `episodeOrder` 배열 재정렬로 대체 (Immutability)

```js
const episodes = [
  { n: 1, ttl: "첫 만남", tag: "wip", pg: 24, fav: true, memo: "공원에서 만남", date: "2시간 전" },
  { n: 2, ttl: "모험의 시작", tag: "todo", pg: 24, fav: false, memo: "", date: "어제" },
  // ...
];
// JS로 pgrid 안에 .pc 카드들을 동적 생성
// 정순/역순 토글 시 배열 reverse 후 재렌더
```

### 2-5. 핵심 디자인 포인트

- `pj-info`: `display: grid; grid-template-columns: 1fr 1fr; gap: 12px;`
- `pj-card`: background var(--wh), border 1px solid var(--bd), border-radius 8px, padding 16px
- `pj-ta`: background var(--pa), 포커스 시 border-color var(--oc) + box-shadow
- `pj-meta-item`: flex row, `.pj-meta-lbl`(ghost 색상 10px mono) + `.pj-meta-val`(ink 12px)

### 2-6. 모달

- **설정 모달** (`.cfg-ov`): 2x2 그리드 — 기본페이지수/읽기방향/시작페이지/기본뷰
- **검색 모달** (`.s-ov`)
- **플로팅 메모** (`.mm`): projectMemo + projectDetailMemo 탭

### 2-7. 사이드바 상태

- 트리: "나의 책장 > 프로젝트1" `.tn-row.on`
- rail-nav: "프로젝트" `.rn-item.on`

---

## 3. Episode (proto-episode.html)

### 3-1. 화면 개요

프로젝트 내 에피소드 관리. **2열 레이아웃** — 좌측 에피소드 목록 + 우측 선택된 에피소드 상세.

### 3-2. 레이아웃 구조

```
body (flex row)
├── aside.sb              ← 통합 사이드바 (펼침)
└── div.main
    ├── div.ws-hd (44px)
    │   ├── span.ep-col-ttl → "에피소드 목록"
    │   └── div.ws-hd-r
    │       └── button.hbtn → 메모 패널 토글
    └── div.ws-bd (flex row, 스크롤 없음 — 내부 각 열이 독립 스크롤)
        ├── div.ep-col (좌측, flex: 3, min-width: 320px)
        │   ├── div.ep-col-hd
        │   │   ├── div.ep-tabs (탭 필터)
        │   │   │   ├── div.ep-tab.on → "전체 (7)"
        │   │   │   ├── div.ep-tab → "진행중"
        │   │   │   └── div.ep-tab → "완료"
        │   │   └── div.ep-col-acts
        │   │       └── button.sort-tgl → 정렬 토글
        │   ├── div.ep-list (스크롤 영역)
        │   │   └── div.erow (에피소드 행, 반복) ← JS 렌더
        │   └── div.ep-add → "+ 에피소드 추가" 버튼
        └── div.det-col (우측, flex: 5, border-left)
            ├── div.det-placeholder → "에피소드를 선택하세요" (선택 전)
            └── div.det-wrap (선택 후)
                ├── div.det-hd
                │   ├── div.det-hd-top
                │   │   ├── div.det-hd-l
                │   │   │   ├── span.det-ep-num → "ep.1"
                │   │   │   ├── span.det-ttl → "첫 만남"
                │   │   │   └── span.det-pg-count → "24p"
                │   │   └── div.det-hd-acts
                │   │       ├── div.det-status → 상태 드롭다운 (t-wip 등)
                │   │       └── button.det-cfg-btn → 에피소드 개별 설정
                │   └── div.det-tab-row
                │       ├── div.det-tab.on → "메모"
                │       └── div.det-tab-r
                │           └── button.det-add-pg → "+ 페이지 추가"
                └── div.det-bd (스크롤 영역)
                    ├── div.ep-parent-memo → 에피소드 메모 (상단 고정 표시)
                    ├── div.m-sec → "에피소드 세부 메모" + textarea
                    └── div.m-sec → "페이지별 메모"
                        ├── div.pm-list → 페이지 메모 카드 목록
                        └── div.pm-add → "+ 페이지 추가"
```

### 3-3. 에피소드 행 (`.erow`) 상세

```
div.erow (border: 1px solid transparent, 선택 시 border-color + sel-bg)
├── div.drag-h          ← 드래그 핸들 (⠿ 아이콘, hover 시 opacity 변경)
├── div.eth             ← 에피소드 썸네일 (40x40 or 48x48, 회색)
│   └── span.eth-n      ← "1" 번호
├── div.ebody
│   ├── div.ebody-num   ← "ep.1" (mono, ghost)
│   ├── div.ebody-ttl   ← "첫 만남" (12px, ink)
│   ├── div.ebody-memo  ← episodeMemo 1줄 (11px, i2, 없으면 숨김)
│   └── div.ebody-pg    ← "24p" (9px, mono, ghost)
└── div.er-acts
    ├── span.etag       ← 상태 태그
    └── (hover 시 더보기 버튼 등)
```

### 3-4. 디테일 패널 우측 — 페이지별 메모 (`.pm-list`)

```
div.pm-item (각 페이지 메모 카드)
├── div.pm-hd
│   ├── span.pm-num     ← "p.01"
│   └── button.pm-del   ← 삭제 (hover 시 표시)
└── textarea.pm-ta      ← 페이지 메모 내용 (포커스 시 확장)
```

- 페이지 추가 시 pm-item이 리스트 맨 아래에 추가됨
- 이 페이지 메모는 page 화면의 pageMemo와 **동일 데이터 연동**

### 3-5. JS 데이터 및 인터랙션

> ⚠️ **프로토타입 목업 전용 데이터.** React 구현 시 `techContext.md §5` 인터페이스로 대체됨.
> - `id: 1` (정수) → `id: nanoid()` (문자열)로 교체
> - `pages: [...]` (중첩 배열) → `pageOrder: string[]` (ID 배열) + 별도 `pages` Record로 분리
> - `memo` / `detailMemo` → 필드명 미확정 (`synopsis`? `memo`?) — **3번 논의 후 결정**
> - `tag: "wip"` → `status: 'storyboard'` 등으로 교체

```js
const episodes = [
  { id: 1, n: 1, ttl: "첫 만남", tag: "wip", pg: 24, memo: "공원에서...", detailMemo: "...", pages: [...] },
  // ...
];

// 좌측 ep-list 렌더 → 클릭 시 우측 det-col 업데이트
// 정렬 토글 (정순/역순)
// 탭 필터 (전체/진행중/완료)
// 드래그 핸들로 에피소드 순서 변경 (프로토에서는 시각적 표시만)
// 에피소드 추가 (하단 버튼)
// 페이지 추가 (우측 det-add-pg 또는 pm-add)
```

### 3-6. 핵심 디자인 포인트

- 좌우 분할: `ep-col { flex: 3; }`, `det-col { flex: 5; border-left: 1px solid var(--bd); }`
- ws-bd는 **overflow: hidden** — 각 열이 독립 스크롤 (`ep-list`, `det-bd` 각각 overflow-y: auto)
- erow 선택 상태: `border-left: 2px solid var(--db)` + `background: var(--sel-bg)`
  - ★ border-left 2px는 처음부터 transparent로 예약
- ep-parent-memo: 상단 sticky 또는 접기 가능한 영역으로, 상위 레벨 메모 참조용

### 3-7. 모달

- **설정 모달** (`.cfg-ov`): 에피소드 개별 설정 (프로젝트 기본값과 다르면 `.ov` amber 표시)
- **플로팅 메모** (`.mm`)
- **검색 모달** (`.s-ov`)

### 3-8. 사이드바 상태

- 트리: "나의 책장 > 프로젝트1" 펼침, 에피소드 목록 표시
- rail-nav: "에피소드" `.rn-item.on`

---

## 4. Page (proto-page.html)

### 4-1. 화면 개요

에피소드 내 페이지 그리드. 양면/단면 뷰, 우측 메모 패널.

### 4-2. 레이아웃 구조

```
body (flex row)
├── aside.sb.rail         ← 통합 사이드바 (접힘 기본 ★)
└── div.main
    ├── div.ws-hd (44px)
    │   ├── div.ws-bc → breadcrumb: 프로젝트 > 에피소드
    │   └── div.ws-hd-r
    │       ├── button.hbtn → 검색
    │       └── button.hbtn → 메모 패널 토글
    ├── div.toolbar (ws-hd 아래 별도 바)
    │   ├── span.ep-name → "ep.1 — 첫 만남"
    │   ├── span.ep-pg-count → "24p"
    │   └── div.tb-r
    │       ├── div.view-tgl → button.vtb "양면" | button.vtb "단면"
    │       └── button.abtn.pri → "+ 페이지 추가"
    ├── div.ws-bd (flex row)
    │   ├── div.grid-area (flex: 1, 스크롤)
    │   │   └── div.pg-grid ← JS로 렌더 (양면/단면에 따라 구조 다름)
    │   └── div.rsp (우측 메모 패널, 접을 수 있음)
    └── div.ws-ft (하단 상태바)
        ├── span → 저장 상태
        ├── span → "pg 10 / 24"
        └── span → "ctrl+scroll 크기 조정"
```

### 4-3. 페이지 그리드 — 양면(spread) 모드

```
div.pg-grid
├── div.spread-row (반복, 한 행에 3개 spread = 6페이지)
│   ├── div.spread-pair
│   │   ├── div.pcard (왼쪽 페이지)
│   │   └── div.pcard (오른쪽 페이지)
│   ├── div.spread-pair
│   │   └── ... (반복)
│   └── div.spread-pair
│       └── ...

홀수 시작(spreadStart=odd)일 경우:
첫 행의 첫 pair는 [빈칸, p.01] (첫 페이지가 오른쪽에 위치)
```

### 4-4. 페이지 그리드 — 단면(single) 모드

```
div.pg-grid
└── (flat grid: repeat(auto-fill, minmax(120px, 1fr)))
    ├── div.pcard (반복)
    └── ...
```

### 4-5. 페이지 카드 (`.pcard`) 상세

```
div.pcard (border: 1px solid transparent, 선택 시 border-color --db)
├── div.pi (페이지 아이템 — B4 비율 aspect-ratio: 238/324)
│   ├── span.pi-num → "01" (왼쪽 상단, 작은 숫자)
│   └── div.pi-lines (컷 미리보기 — 얇은 줄로 표현)
│       └── div.pi-line (반복, 가로줄 = 컷 구분선)
└── div.pcard-info
    └── div.pcard-memo → pageMemo 미리보기 (2줄 clamp, 넘으면 ...)
```

### 4-6. 우측 메모 패널 (`.rsp`)

```
div.rsp (width: 0 → .open 시 280px, border-left 표시)
├── div.rsp-tabs
│   ├── div.rsp-tab.on → "p.01" (선택된 페이지)
│   └── div.rsp-tab → "p.02" (spread일 때 펼쳐진 페이지)
└── div.rsp-bd (스크롤)
    ├── div.rsp-sec → "📄 페이지 메모"
    │   ├── div.rsp-sec-hd (클릭으로 접기/펼치기)
    │   └── div.rsp-sec-body
    │       └── div.rsp-mi → textarea (pageMemo 편집)
    └── div.rsp-sec → "✂ 컷 메모"
        ├── div.rsp-sec-hd
        └── div.rsp-sec-body
            ├── div.rsp-ci (반복, 각 cutMemo)
            │   ├── span.rsp-cn → "1" (컷 번호)
            │   └── span.rsp-ct → cutMemo 내용 (비어있으면 .empty italic)
            └── button.rsp-add → "+ 컷 메모 추가"
```

### 4-7. JS 데이터 및 렌더링

> ⚠️ **프로토타입 목업 전용 데이터.** React 구현 시 `techContext.md §5` 인터페이스로 대체됨.
> - `cuts: ["문자열 배열"]` → `cutOrder: string[]` (Cut ID 배열) + 별도 `cuts` Record로 분리
>   - 배열 인덱스로 컷을 식별하는 구조 → No Index as Key 원칙 위반
>   - 문자열 값은 `Cut.memo`에 해당하며, `Cut` 엔티티로 독립되어야 함
> - `memo` → `Page.memo` (필드명은 유지 가능, 단 단일 메모 vs 상세 메모 구분 필요 — **3번 논의 후 결정**)

```js
const pages = [
  { n: 1, memo: "공원 입구 장면", cuts: ["주인공 등장", "강아지 발견", ""] },
  { n: 2, memo: "강아지 첫 등장", cuts: ["클로즈업", ""] },
  // ... 24개
];

// swView('spread'|'single') → 그리드 재렌더
// addPage() → 페이지 추가
// 페이지 카드 클릭 → rsp 패널 업데이트 (선택된 페이지의 메모/컷 표시)
// rsp 탭 클릭 → 해당 페이지로 rsp 전환
// togSec(el) → rsp 섹션 접기/펼치기
```

### 4-8. 핵심 디자인 포인트

- **toolbar**: `ws-hd` 아래 별도 바, `height: 36px`, `border-bottom: 1px solid var(--bd)`
- **spread-pair**: `display: flex; gap: 0;` (두 페이지가 붙어있는 느낌)
  - 왼쪽 pcard: `border-radius: 4px 0 0 4px`
  - 오른쪽 pcard: `border-radius: 0 4px 4px 0`
- **ws-ft** (하단 상태바): `height: 28px`, `border-top: 1px solid var(--bd)`, ghost 색상 텍스트
- rsp 토글: `button.hbtn` 클릭 → `.rsp.open` 토글
- 페이지 카드 hover: `box-shadow: var(--sh-sm)` + `transform: translateY(-1px)` (의도된 애니메이션)

### 4-9. 사이드바 상태 (★ 통합 사이드바로 교체)

- **기존 구 사이드바 (`.si`, `.si-pop`) 제거**
- 통합 사이드바의 rail 상태 기본
- rail-nav 표시 depth: 책장 > 프로젝트 > 에피소드 > **페이지(on)** > 컷(숨김)
- 페이지 `.rn-item.on`의 `.rn-pop`에 페이지 목록 표시

### 4-10. 모달

- **검색 모달** (`.s-ov`)
- **플로팅 메모** (`.mm`): episodeMemo + pageMemo 탭

---

## 5. Cut (proto-cut.html)

### 5-1. 화면 개요

특정 페이지의 컷 편집 캔버스. 컷 분할 + 메모 지정.

### 5-2. 레이아웃 구조

```
body (flex row)
├── aside.sb.rail         ← 통합 사이드바 (접힘 기본 ★)
└── div.main
    ├── div.ws-hd (44px)
    │   ├── div.ws-bc → breadcrumb: 프로젝트 > ep.1 > p.01
    │   └── div.ws-hd-r
    │       ├── button.hbtn → 검색
    │       └── button.hbtn → 메모 패널 토글
    ├── div.ctx-bar (컨텍스트 바 — ws-hd 아래)
    │   ├── span.ctx-ep → "ep.1 첫 만남"
    │   ├── span.ctx-sep → "›"
    │   ├── span.ctx-pg → "p.01" (양면일 때 p.02도 표시)
    │   ├── div.pg-nav → 이전/다음 페이지 네비게이션
    │   │   ├── button.pn-btn → "←"
    │   │   └── button.pn-btn → "→"
    │   └── div.zoom-ctl → 줌 컨트롤
    │       ├── button.z-btn → "−"
    │       ├── button.z-pct → "100%"  (클릭 시 100% 리셋)
    │       ├── button.z-btn → "+"
    │       └── button.hbtn → 메모 패널 토글
    └── div.canvas-area (flex row, flex: 1)
        ├── div.canvas-scroll (flex: 1, overflow: auto)
        │   └── div.cut-canvas-wrap ← JS로 렌더
        │       └── div.cut-page (B4 비율 페이지)
        │           └── div.cut-grid (CSS Grid)
        │               └── div.cut-cell (반복, 각 컷)
        │                   ├── span.cut-cell-n → 컷 번호 ("1")
        │                   └── div.cut-cell-memo → cutMemo 표시
        ├── div.rsp (우측 메모 패널, page와 동일 구조)
        └── div.ftb (플로팅 툴바 — 하단 중앙 fixed)
```

### 5-3. 컷 캔버스 (`.cut-canvas-wrap`) 상세

```
div.cut-canvas-wrap
├── div.cut-page (양면일 때 2개)
│   ├── div.cut-grid
│   │   ├── style="grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr 1fr;"
│   │   ├── div.cut-cell (grid-column: 1/2; grid-row: 1/3;) ← 큰 컷
│   │   ├── div.cut-cell (grid-column: 2/3; grid-row: 1/2;) ← 작은 컷
│   │   └── div.cut-cell (grid-column: 2/3; grid-row: 2/3;)
│   │
│   │   각 .cut-cell:
│   │   ├── border: 1px solid var(--bd) (항상)
│   │   ├── 선택 시: border-color var(--db), background var(--sel-bg) 아주 연하게
│   │   ├── hover 시: border-color var(--bd2) (outline이 아닌 기존 border 색상 변경)
│   │   ├── span.cut-cell-n → 좌상단 컷 번호 (9px mono ghost)
│   │   └── div.cut-cell-memo → cutMemo (11px, 넘치면 ...)
```

### 5-4. 플로팅 툴바 (`.ftb`)

```
div.ftb (position: fixed, bottom: 20px, 중앙 정렬)
├── div.ftb-grp → undo/redo
│   ├── button.fb → "↩" undo
│   └── button.fb → "↪" redo
├── div.ftb-sep → 구분선
├── div.ftb-grp → 분할 도구
│   ├── button.fb → 수직 분할 아이콘 (split_scene SVG)
│   ├── button.fb → 수평 분할 아이콘
│   ├── button.fb.danger → 컷 삭제 (delete SVG, hover 시 빨간색)
│   └── button.fb-full → fit-screen 아이콘
```

**★ 현재 문제**: 플로팅 툴바에 이모지(↩, ↪ 등) 사용 → **SVG 아이콘으로 교체 필요**

사용할 SVG:
- undo/redo: 적합한 아이콘 없으면 텍스트 "↩↪" 유지하되 스타일링
- 수직 분할: `split_scene_20dp_*.svg` 또는 `splitscreen_left_20dp_*.svg`
- 수평 분할: `split_scene_left_20dp_*.svg`
- 삭제: `delete_20dp_*.svg`
- 전체화면: `fit_screen_20dp_*.svg`

### 5-5. JS 데이터 및 인터랙션

> ⚠️ **프로토타입 목업 전용 데이터.** React 구현 시 `techContext.md §5, §6` 인터페이스로 대체됨.
> - `cols/rows: "1fr 1fr"` (CSS Grid 문자열) → 렌더링 관심사. 데이터 레이어에 저장 불가
> - `gc/gr: "1/2"` (CSS Grid position) → `CutFrame { x, y, w, h }` (Inner Frame 기준 % 좌표)로 대체
>   - 예: `gc:"1/2", gr:"1/3"` (2열 중 1번 열, 3행 중 1~2행) → `{ x:0, y:0, w:50, h:66.6 }`
> - `id: 1` (정수) → `id: nanoid()` (문자열)로 교체
> - `memo` → `Cut.memo` (유지 가능) + `scriptSnippetId` 추가 필요 (미배정 보관함 연동)

```js
// 페이지 데이터 (컷 레이아웃 포함)
const pages = [
  {
    n: 1,
    cols: "1fr 1fr",
    rows: "1fr 1fr 1fr",
    cells: [
      { id: 1, gc: "1/2", gr: "1/3", memo: "주인공 등장" },
      { id: 2, gc: "2/3", gr: "1/2", memo: "강아지 발견" },
      { id: 3, gc: "2/3", gr: "2/3", memo: "" },
    ]
  },
  // ...
];

// renderPage(pageIndex) → cut-canvas-wrap 내부 렌더
// selectCell(cellId) → 선택 상태 토글 + rsp 업데이트
// navPage(dir) → 이전/다음 페이지 전환
// zoom(delta) → 캔버스 scale 변경
// undo()/redo() → stub
```

### 5-6. 핵심 디자인 포인트

- **canvas-scroll**: `background: var(--canvas)` (약간 어두운 종이색), 페이지가 가운데 위치
- **cut-page**: `background: var(--wh)`, `box-shadow: var(--sh-md)`, B4 비율
- **cut-cell**: 처음부터 `border: 1px solid var(--bd)` → hover/select 시 색상만 변경
- **ftb**: `background: var(--wh)`, `border: 1px solid var(--bd)`, `border-radius: var(--r-10)`, `box-shadow: var(--sh-lg)`
  - 버튼들: 32x32, border-radius 6px, hover 시 background var(--hover-bg)

### 5-7. 사이드바 상태 (★ 통합 사이드바로 교체)

- **기존 구 사이드바 제거** (page와 동일)
- rail 기본, rail-nav: 책장 > 프로젝트 > 에피소드 > 페이지 > **컷(on, 표시됨)**

### 5-8. 모달

- **검색 모달** (`.s-ov`)
- **플로팅 메모** (`.mm`): pageMemo + cutMemo 탭

---

## 6. 최종 통합 검수

### 6-1. CSS 일관성

- [ ] 모든 파일이 `<link rel="stylesheet" href="proto-style.css">` 참조
- [ ] 각 파일의 `<style>` 블록에 공통 CSS와 중복되는 선언 없음
- [ ] CSS 변수명이 모든 파일에서 동일하게 사용됨

### 6-2. 사이드바 일관성

- [ ] 5개 파일 모두 동일한 통합 사이드바 HTML 구조
- [ ] bookshelf/project/episode: 펼침(`.sb`) 기본
- [ ] page/cut: 접힘(`.sb.rail`) 기본
- [ ] rail ↔ 펼침 전환 시 모든 화면에서 동일하게 동작
- [ ] 각 화면에 맞는 `.rn-item.on` 설정
- [ ] 각 화면에 맞는 `.tn-row.on` 설정
- [ ] page/cut에서 기존 구 사이드바(`.si`, `.si-pop`) 완전 제거

### 6-3. 레이아웃 시프트 검증

- [ ] **node-hd (bookshelf)**: 열기/닫기 시 하위 `.pgrid` 카드 크기 변동 없음
- [ ] **erow (episode)**: hover/선택 시 행 높이 변동 없음
- [ ] **pc (bookshelf/project)**: hover 시 주변 카드 위치 변동 없음
- [ ] **pcard (page)**: hover 시 주변 카드 위치 변동 없음
- [ ] **cut-cell (cut)**: hover/선택 시 셀 크기 변동 없음
- [ ] **rsp (page/cut)**: 패널 열기/닫기 시 그리드 영역 부드럽게 전환
- [ ] 모든 스크롤 영역에 `scrollbar-gutter: stable` 적용

### 6-4. 모달 정상 동작

- [ ] 검색 모달: overlay 클릭 시 닫힘, ESC 키 닫힘
- [ ] 플로팅 메모: 드래그 이동, 리사이즈, 핀 고정
- [ ] 설정 모달: 카드 클릭 시 값 토글
- [ ] 새 프로젝트 모달: 설정 토글 + 생성 버튼

### 6-5. 아이콘 정합성

- [ ] 모든 아이콘이 `../../src/assets/images/` 경로의 실제 SVG 파일 사용
- [ ] 이모지(🏠, 📖, ✂, ↩ 등) 사용 부분 → SVG로 교체
- [ ] icon-mapping.txt 대비 사용 아이콘 목록 일치

### 6-6. 애니메이션 품질

- [ ] 카드 fadeUp stagger 동작
- [ ] 모달 modalUp 애니메이션
- [ ] 사이드바 접기/펼치기 부드러운 전환
- [ ] rsp 패널 width 전환 부드러움
- [ ] hover 상태 전환 자연스러움 (너무 빠르거나 느리지 않음)

---

## 아이콘 매핑 참조

| 용도 | 파일명 |
|------|--------|
| 접기/펼치기 화살표 | `keyboard_arrow_right_20dp_*.svg` |
| 하위 펼침 화살표 | `keyboard_arrow_down_20dp_*.svg` |
| 사이드바 접기 | `keyboard_double_arrow_left_20dp_*.svg` |
| 홈/책장 | `house_20dp_*.svg` |
| 프로젝트(닫힘) | `book_close_20dp_*.svg` |
| 프로젝트(열림) | `book_open_20dp_*.svg` |
| 에피소드(닫힘) | `article_20dp_*.svg` |
| 에피소드(열림) | `library_books_20dp_*.svg` |
| 페이지(기본) | `page-svgrepo-com.svg` |
| 페이지(편집) | `page-edit-svgrepo-com.svg` |
| 검색 | `search_20dp_*.svg` |
| 메뉴 | `menu_20dp_*.svg` |
| 닫기 | `close_20dp_*.svg` |
| 즐겨찾기 | `favorite_20dp_*.svg` |
| 북마크 | `bookmark_20dp_*.svg` |
| 설정 | `setting-5-svgrepo-com.svg` |
| 추가 | `add_20dp_*.svg` |
| 삭제 | `delete_20dp_*.svg` |
| 편집 | `edit_square_20dp_*.svg` |
| 메모/노트 | `note_stack_20dp_*.svg` |
| 핀 | `pin-svgrepo-com.svg` |
| 정렬(오름) | `sort-ascending-svgrepo-com.svg` |
| 정렬(내림) | `sort-descending-svgrepo-com.svg` |
| 컷 분할 | `split_scene_20dp_*.svg` |
| 양면 뷰 | `two_pager_20dp_*.svg` |
| 전체화면 | `fit_screen_20dp_*.svg` |
| 줌인 | `zoom_in_20dp_*.svg` |
| 줌아웃 | `zoom_out_20dp_*.svg` |
| 공유/협업 | `diversity_3_20dp_*.svg` |
| 사용자 | `person_20dp_*.svg` |
| 로그아웃 | `logout_20dp_*.svg` |
| 컷 도구 | `content_cut_20dp_*.svg` |
| 문서 | `docs_20dp_*.svg` |
| 그리드뷰 | `grid_view_20dp_*.svg` |
| 감정(만족) | `sentiment_very_satisfied_20dp_*.svg` |
| 감정(평온) | `sentiment_calm_20dp_*.svg` |
| 더보기 | `more_horiz_20dp_*.svg` |