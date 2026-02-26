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

### ⬜ 3. `proto-episode.html` — 사이드바 적용

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

## 작업 규칙 (`.clinerules` 기반)

- 전체 파일 재작성 금지 → **Search & Replace (diff)만 출력**
- 각 단계 완료 후 git commit 메시지 제안
- 디자인 관련 HTML 주석 절대 제거 금지
- 다음 단계 진행 전 확인 요청
