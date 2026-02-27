# PlotNote 프로토타입 사이드바 통합 작업 TODO

## 컨텍스트

- **작업 브랜치**: `kyoungjin`
- **작업 디렉토리**: `C:\plotnote\frontend\public\prototypes\`
- **목표**: 5개 프로토타입 HTML 파일에 통합 사이드바 컴포넌트를 적용

## 참고 파일

- `proto-sidebar.html` — 통합 사이드바 레퍼런스 컴포넌트 (완성본)
- `proto-bookshelf.html` — **[완료]** 사이드바 적용 완료, 나머지 파일의 기준 파일로 사용

---

## 사이드바 구조 핵심 패턴 (참고용)

### CSS 클래스

| 클래스            | 설명                                                        |
| ----------------- | ----------------------------------------------------------- |
| `.sb.rail`        | 접힌 상태 (44px), `.sb-exp` 요소 전부 `display:none`        |
| `.sb-exp`         | 확장 상태에서만 보임 (logo-txt, collapse btn, search, tree) |
| `.sb-rail-nav`    | rail 상태에서만 보이는 아이콘 내비                          |
| `.sb-grp.closed`  | 그룹 접힘                                                   |
| `.tn.closed`      | 트리 노드 접힘                                              |
| `.tn.leaf`        | 자식 없는 말단 노드 (page, episode 등)                      |
| `.tn-row.on`      | 현재 활성 행                                                |
| `.ic-c` / `.ic-o` | 닫힘/열림 아이콘 (CSS로 자동 토글)                          |

### JS 함수 (공통)

```js
function tglSb() {
  document.getElementById("sb").classList.toggle("rail");
}
function tglGrp(id) {
  document.getElementById(id).classList.toggle("closed");
}
function tglTn(id) {
  document.getElementById(id).classList.toggle("closed");
}
function tglLeaf(id) {
  const row = document.querySelector("#" + id + " .tn-row");
  const wasOn = row.classList.contains("on");
  document
    .querySelectorAll(".tn.leaf .tn-row.on")
    .forEach((r) => r.classList.remove("on"));
  if (!wasOn) row.classList.add("on");
}
```

### 아이콘 매핑

| 요소           | 파일명 (prefix: `../../src/assets/images/`)                             |
| -------------- | ----------------------------------------------------------------------- |
| 책장(house)    | `house_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`                      |
| 프로젝트 닫힘  | `book_close_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`                 |
| 프로젝트 열림  | `book_open_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`                  |
| 에피소드 닫힘  | `article_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`                    |
| 에피소드 열림  | `library_books_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`              |
| 페이지 닫힘    | `page-svgrepo-com.svg`                                                  |
| 페이지 열림    | `page-edit-svgrepo-com.svg`                                             |
| 컷 (rail only) | `note_stack_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`                 |
| 즐겨찾기       | `bookmark_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`                   |
| 공유 책장      | `diversity_3_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`                |
| 노드 화살표    | `keyboard_arrow_right_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`       |
| 사이드바 접기  | `keyboard_double_arrow_left_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg` |
| 검색           | `search_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`                     |
| 메모 패널      | `more_horiz_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`                 |
| 핀             | `pin-svgrepo-com.svg`                                                   |
| 닫기           | `close_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`                      |
| 설정           | `setting-5-svgrepo-com.svg`                                             |

---

## 체크리스트

### ✅ 1. `proto-bookshelf.html` — 사이드바 적용 [완료]

- [x] 사이드바 CSS 전면 교체
- [x] `<aside>` HTML 교체 (책장 컨텍스트)
- [x] Rail nav: house 아이콘만 표시
- [x] JS: `tglSb()` 단순화, `tglGrp()`, `tglTn()` 추가
- [x] 메모 모달 버튼 → img 아이콘
- [x] 프로젝트 카드 즐겨찾기 → bookmark img

---

### ✅ 2. `proto-project.html` — 사이드바 적용 [완료]

**파일**: `public/prototypes/proto-project.html`

**사이드바 컨텍스트**: 프로젝트 화면 (고양이와 강아지 활성)

**제거할 CSS** (구 사이드바):

- `.sb.rail` 하위 옛 override들 (`.si-t`, `.si-b`, `.sb-ft-n`, `.sb-dv`, `.sb-sec`, `.sb-u`, `.sb-logo` 옛 버전)
- `.sb-x`, `.sb-sec`, `.sb-lbl`, `.sb-dv`
- `.si`, `.si:hover`, `.si.on`, `.si .d`, `.si.on .d`, `.si-t`, `.si-b`
- `.sb-ft` 옛 버전, `.sb-u`, `.sb-u:hover`, `.av`
- `.si-pop`, `.si-pop-hd`, `.si-pop-i`, `.sb.rail .si:hover .si-pop`
- `.sb-tgl`, `.sb-tgl:hover`
- `.srch`, `.srch:hover`, `.srch svg`, `.srch span` (사이드바에서 사용하던 것, 헤더에는 없음)
- `.ws-hd-top`, `.ws-bc`, `.ws-bc a` 등 (HTML에 미사용)
- `.tabs`, `.tab`, `.tab.on` (HTML에 미사용)
- 전역 `img { width: 18px; aspect-ratio: 1/1; }` 제거

**추가할 CSS** (신 사이드바):

- `proto-bookshelf.html`의 사이드바 CSS 블록 전체 복사

**HTML 변경**:

- `<aside>` 전체 교체
  - 즐겨찾기 그룹: **closed**
  - 나의 책장 그룹: **open** → 고양이와 강아지 **(열림, .tn-row.on)** → 에피소드 leaf 노드 4개
  - 공유 책장 그룹: **closed**
  - Rail nav: house (비활성) + book_open (활성)

**헤더 변경**:

- `ws-fav` 버튼: `favorite` img → `bookmark` img
- 설정 `<img onclick>` → `<button class="cfg-btn">` + img
- 메모 버튼: `⋯` 텍스트 → `more_horiz` img

**JS 변경**:

- `tglSb()` 단순화 (sb-tgl 참조 제거)
- `tglGrp()`, `tglTn()`, `tglLeaf()` 추가
- `renderGrid()`의 `pc-fav` 버튼: `★/☆` → bookmark img

**주의**: 디자인 HTML 주석 제거 금지

---

### 🔄 rate-limit인 동안 사용자가 추가한 사항.

**파일**: `public/prototypes/` 내부 파일 전체 (icon-mapping.text 제외)

---

#### ✅ 요청사항 1: 공통 CSS → `proto-style.css` 분리

**`proto-style.css` 생성 완료** (`public/prototypes/proto-style.css`)

포함된 공통 CSS 블록:
- `:root` (CSS 변수, `--rsp: 280px` 포함 — page/cut 전용이지만 무해)
- Reset (`* {}`) + `body {}` + `button {}`
- 신 통합 사이드바 전체 (`.sb`, `.sb-logo`, `.sb-search`, `.sb-tree`, `.sb-grp`, `.tn`, `.sb-rail-nav`, `.sb-ft` 등)
- `.main {}`
- 검색 모달 (`.s-ov` ~ `.s-esc`) — `.s-res*` 제외 (bookshelf 전용)
- 플로팅 메모 모달 (`.mm` ~ `.mm-txt.empty`) — project의 img-based `.mm-b` 스타일 채택

**HTML 파일 편집 — 미완료** (중단 시점에 각 파일 구조 파악 완료, 편집 시작 전):

| 파일 | 제거할 CSS | 유지할 CSS |
|------|-----------|-----------|
| `proto-bookshelf.html` | `:root`+reset+body+button + 사이드바 CSS + `.main` + 검색 모달(`.s-res*` 앞부분) + `.s-esc` + 메모 모달 | `.s-res*` (bookshelf 전용), 신규 프로젝트 모달 |
| `proto-project.html` | `:root`+reset+body+button + 사이드바 CSS + `.main` + `/* ═══ SEARCH / MEMO ═══ */` 블록 전체 | 설정 모달, `.pc` 애니메이션 등 |
| `proto-episode.html` | `:root`+reset+body+button + 사이드바 CSS + `.main` + 검색 모달 + 메모 모달 | 설정 모달, 에피소드 목록/상세 CSS 등 |
| `proto-page.html` | `:root`+reset+body+button + `.main` + 메모 모달 + 검색 모달 | 구 사이드바 CSS 전체 (item 4 완료 후 제거) |
| `proto-cut.html` | `:root`+reset+body+button + `.main` + 메모 모달 + 검색 모달 | 구 사이드바 CSS 전체 (item 5 완료 후 제거) |

각 HTML 파일에 추가할 `<link>` 태그 (Google Fonts 다음, `<style>` 앞):
```html
<link rel="stylesheet" href="proto-style.css" />
```

**주의사항**:
- page/cut의 구 사이드바 CSS(`.si`, `.sb-tgl`, `.sb-u`, `.av` 등)는 item 4·5 완료 전까지 유지
- bookshelf `.s-res*` (검색 결과 렌더링 CSS)는 bookshelf 전용 → `<style>` 유지
- page/cut의 `.mm-b`는 구버전(색상 기반)이지만 제거 후 proto-style.css의 img 기반으로 교체됨

---

#### ✅ 요청사항 2: 주석 처리 규칙

**규칙 (적용 중)**:
- `디자인 관련 주석`: 무시해도 됨, 읽기만 함
- `클로드용 주석`: 코드에 반영하거나 기록으로 남김
- 둘 다 있는 경우: 제안 후 사용자가 결정

**proto-episode.html에서 발견한 클로드용 주석 (미구현 항목)**:

| 위치 | 내용 | 상태 |
|------|------|------|
| 에피소드 헤더 | 헤더에서 `pageMemo`, `pageDetailMemos` 확인 가능하도록 | 미구현 |
| `.det-col` | 전체 width 사용 → `eth` 클릭 시 해당 정보에 맞는 `det-col` 표시 | 미구현 |
| `ep-col-acts` | `ep-tab`들과 `space-around` 정렬 | 미구현 |
| `bebe-info` | bookmark 아이콘 추가 | 미구현 |
| `sort-tgl` | 클릭 시 `sort-descending` 이미지로 교체 | ✅ 반영됨 (tglSort 함수) |

---

#### ✅ 요청사항 3: Memo 데이터 구조 기록

**proto-episode.html에서 파악한 메모 데이터 구조**:

| 변수명 | JS 경로 | UI 연결 | 설명 |
|--------|---------|---------|------|
| `episodeMemo` | `eps[i].memo` | `.ebody-memo` (목록), `#ep-parent-memo-txt` (상세 패널, 읽기 전용) | 에피소드 대표 메모 |
| `episodeDetailMemos` | `eps[i].detail` | `#det-memo` textarea (상세 패널) | 에피소드 세부 메모 |
| `pageMemo` | `pageMemos[]` 배열 | `.pm-list` > `.pm-row` (`pm-n` + `pm-input`) | 페이지별 메모 (ep 상세 패널 하단) |

> `proto-page.html`, `proto-cut.html`의 추가 Memo 구조는 해당 파일 작업 시 확인 필요.

---

### ✅ 3. `proto-episode.html` — 사이드바 적용 [완료]

**파일**: `public/prototypes/proto-episode.html`

**사이드바 컨텍스트**: 에피소드 화면 (ep.3 이웃 친구들 활성)

**HTML 변경**:

- `<aside>` 전체 교체
  - 나의 책장 그룹: open → 고양이와 강아지 (open) → 에피소드 목록 leaf 노드 → ep.3에 `.tn-row.on`
  - Rail nav: house (비활성) + book_open (비활성) + article (활성, 에피소드)

**제거할 CSS/JS**: 동일 패턴 (구 사이드바 관련 전부)

---

### ⬜ 4. `proto-page.html` — 사이드바 적용

**파일**: `public/prototypes/proto-page.html`

**사이드바 컨텍스트**: 페이지 화면 (p.3~4 활성)

**HTML 변경**:

- `<aside>` 전체 교체
  - 나의 책장 → 고양이와 강아지 (open) → ep.3 (open) → 페이지 leaf 노드 → p.3에 `.tn-row.on`
  - Rail nav: house + book_open + article + page-svgrepo (활성)

**제거할 CSS/JS**: 동일 패턴

---

### ⬜ 5. `proto-cut.html` — 사이드바 적용

**파일**: `public/prototypes/proto-cut.html`

**사이드바 컨텍스트**: 컷 편집 화면 (p.3 컷 편집 중)

**HTML 변경**:

- `<aside>` 전체 교체
  - 나의 책장 → 고양이와 강아지 → ep.3 → p.3 (open) → 컷 표시 (leaf, rail-only)
  - Rail nav: house + book_open + article + page-svgrepo + **note_stack (활성, cut 화면에서만 표시)**

**제거할 CSS/JS**: 동일 패턴

---

### ⬜ 6. (선택) `CLAUDE.md` 생성

`.clinerules` 내용을 Claude Code가 자동으로 읽을 수 있도록 `CLAUDE.md`로 이전.

---

> 작업 규칙은 `CLAUDE.md` 참조 (§3, §4)
