# Progress

## Current Status

**단계:** 2. Bookshelf 디자인 스킵, 6. Cut 디자인 완료, 7. 통합 검수 진행 예정
**브랜치:** `kyoungjin`

## 작업 원칙

> 0. `project_knowledge_search`를 통해 접근, checklist.md로 진행해야 하는 작업을 파악한 후, `project_knowledge_search`를 통해 접근, proto-screen.md에서 자세한 내용을 확인 후 작업할 것. 문서가 충돌나는 부분이 있을 시 `project_knowledge_search`를 통해 접근, proto-screen.md를 우선시하나, 베베의 확인이 필요한 부분은 먼저 물어본 후, 의문점을 확실하게 정리한 뒤 코드 작업을 진행할 것. 확인 후 `project_knowledge_search`를 통해 접근, checklist.md의 내용을 수정할 것.
> 1. 항상 작업 전 `project_knowledge_search`를 통해 접근, proto-screen.md를 자세하게 읽고 작업할 것. 또한, 실제 코드 작성 전 베베의 확인이 필요한 부분은 먼저 물어본 후, 의문점을 확실하게 정리한 뒤 코드 작업을 진행할 것.
> 2. 수정 작업 시에는 파일 전체를 수정하는 것이 아니라 해당 부분만 수정 후, 수정 위치를 알려줄 것.
> 3. 작업 완료 시마다 `project_knowledge_search`를 통해 접근, checklist.md의 Current Status를 포함한 변경사항을 보내고 다음 작업을 진행할 것인지 물어볼 것.
> 4. git 링크 참조 금지.
> 5. 필요한 파일은 project_knowledge_search로 검색하거나, 채팅에 직접 첨부하여 /mnt/user-data/uploads/에서 읽을 것. project_knowledge_search 결과가 없고 /mnt/user-data/uploads/에도 없을 경우 더 생각하지 말고 바로 베베에게 요청할 것.

> **다음 세션 안내:**
>
> 1. 이 파일의 "Phase 0: 프로토타입 디자인 리빌드" 섹션을 읽고 미완료 항목부터 기재 순서대로 진행
> 2. 작업 대상 파일: `frontend/public/prototypes/` 내 proto-_.html + proto-_.css + proto-style.css(공용)
> 3. 디자인 스펙 참조: `proto-screen.md`
> 4. 기능 구현 X, 디자인 완성본 HTML/CSS만 작업. JS는 인터랙션 프리뷰용 stub만

> **grep "검색어" `project_knowledge_search`를 통해 접근, proto-screen.md:**
> 각 단계별로 관련 검색어를 기입해놨음.
> 단, 모든 파일 작업 시 "## 7. 공통 UI 요소 상세"는 아주 상세하게, "## 8. 라우팅 구조", "## 9. 데이터 흐름 요약", "## 10. 기술된 내용 외 차후 구현 예정내용"는 중요 포인트를 파악해두어야 한다.

---

## Phase 0: 프로토타입 디자인 리빌드

### 디자인 시스템 (Paper 테마)

- 기본 톤: 80% 미니멀 + 20% 키치, Notion 또는 GitHub like 클린 UI
- Primary: `#2A4D88` (deep blue) — `--db`
- Accent: `#fbc662` (amber) — `--am`
- Background: `#f7f6f3` (paper) — `--pa`
- 폰트: Noto Sans KR 또는 Noto Serif KR 또는 DM Mono

### 사이드바 참조 (유저 제공 이미지 기준)

- **펼침 모드 (220px):** 로고("plotnote") + 접기(«) 버튼 / 검색바 / 트리뷰(즐겨찾기·나의책장·공유책장) / 프로젝트→에피소드→페이지 계층 들여쓰기 / 선택 항목 파란 배경 하이라이트 / 하단 유저 아바타("베베")
- **접힘 모드 (rail, 44px):** 로고 아이콘만 / 각 계층(홈·책장·프로젝트·에피소드·페이지·컷)이 아이콘으로 축약 / 선택 항목 파란 배경 / 하단 유저 아이콘
- 사이드바 디자인은 이미지(sidebar-open.png, sidebar-close.png)와 동일할 필요 없음 — 구조와 계층 표현이 핵심

### 공통 파일 구조

```
frontend/public/prototypes/
├── icon-mapping.txt         ← 아이콘 매핑
├── proto-bookshelf.css       ← 책장 css
├── proto-bookshelf.html     ← 책장 화면
├── proto-cut.css           ← 컷 css
├── proto-cut.html           ← 컷 화면
├── proto-episode.css       ← 에피소드 css
├── proto-episode.html       ← 에피소드 화면
├── proto-memopanel.css      ← 메모 패널 모달 css
├── proto-memopanel.html       ← 메모 패널 모달 화면
├── proto-page.css       ← 페이지 css
├── proto-page.html          ← 페이지 화면
├── proto-project.css       ← 프로젝트 css
├── proto-project.html       ← 프로젝트 화면
├── proto-search.css      ← 검색 모달 css
├── proto-search.html       ← 검색 모달 화면
├── proto-sidebar.css       ← 사이드바 css
├── proto-sidebar.html       ← 사이드바 레퍼런스 (단독 테스트용)
└── proto-style.css          ← 공통 CSS (변수, 사이드바, 검색모달, 메모모달, 레이아웃)테이블 (SVG 경로 참조)
```

### 아이콘 경로

모든 아이콘은 `../../src/assets/images/` 기준. icon-mapping.txt에 매핑표 있음.
추가 아이콘 필요 시 Google Material Symbols에서 20dp/FILL0/wght400 기준으로 다운로드.

> **작업 노트 (2025-03-03):**
>
> - `proto-style.css` 신규 작성 완료: 22개 섹션 (변수, 리셋, 스크롤바, 유틸리티, 메인 레이아웃, 워크스페이스 헤더/바디/풋터, 버튼 시스템, 상태 뱃지, 드래그 핸들, 메모 섹션, 추가 버튼, 섹션 헤더, 설정 모달, 새 프로젝트 모달, 우측 사이드 패널, 토스트, 애니메이션, 태그, 컷 메모, 이모지, 더보기 메뉴)
> - `proto-sidebar.css` 신규 작성 완료: 사이드바 컨테이너, rail 모드, 로고, 검색, 트리 메뉴(그룹/노드/쉐브론/아이콘 전환/카운트 뱃지/빈 상태), rail 네비게이션(호버 팝업 포함), 유저 영역
> - old-proto-style.css 참조하되 처음부터 새로 작성 (베베 확인 완료)
> - 아이콘: 경로 참조 + 없는 아이콘은 특수문자 대체 방침
> - **다음 작업:** proto-search.css → proto-memopanel.css → Phase 1 사이드바 HTML

> **작업 노트 (2025-03-04):**
>
> - `proto-episode.css` 신규 작성 완료: 7개 섹션 (워크스페이스 헤더 보조, 좌측 네비게이터—필터탭/에피소드 카드/드래그 상태/추가 버튼, 우측 디테일—헤더/탭/바디/페이지메모 리스트, 설정 모달 버튼, 데드라인, 그라디언트 썸네일 7종)
> - `proto-episode.html` 신규 작성 완료: 사이드바(ep.3 `.on` + rail nav 에피소드 `.on`), 워크스페이스 헤더(프로젝트명 링크 + 구분자 + 에피소드 리스트 + 메모 프리뷰), 좌우 분할(35%/65%) — 좌측 필터탭 4종 + 정렬 토글 + 에피소드 카드 리스트, 우측 2탭(메모/페이지메모) — 프로젝트 메모 읽기전용 프리뷰 + 에피소드 메모 textarea + 세부메모 태그 리스트 + 24p 페이지메모 리스트, 설정 모달(2×2 그리드 + override 인디케이터), JS stub(필터/정렬/선택→디테일 교체/상태 순환/추가/삭제/loadComponent)
> - 공통 클래스 최대 재사용: `.badge--*`, `.m-sec`, `.m-ta`, `.parent-memo`, `.memo-input`, `.cfg-*`, `.abtn`, `.hbtn`, `.sort-tgl`, `.drag-h`, `.cnt-badge`, `.tag` — proto-episode.css에는 에피소드 고유 스타일만 분리
> - 좌측 네비 비율 기반 설계: `width: 35%; min-width: 280px; max-width: 380px` (old 고정 310px에서 개선)
> - **다음 작업:** 5. Page 디자인 (proto-page.html + proto-page.css)

> **베베의 추가 노트 (2025-03-04):**
>
> - 모든 메모는 italic, bold, 취소선, 밑줄, 텍스트 색깔 변경, 텍스트 배경 색깔 변경이 가능했으면 좋겠음.
>   text를 select(선택) 하면 툴팁처럼 뜨는 형태로
> - 사이드바, 버튼, placeholder, 설정 등, 변경할 수 없는 부분에 대해서 user-select:none 처리가 되었으면 좋겠음.
>   적용되는 항목에 대해선 논의가 필요함.
> - 모든 버튼에는 title 속성 또는 툴팁으로 버튼 이름이 떴으면 좋겠음.
>   title 속성을 전체적인 디자인에 맞춰 css를 적용할 수 있다면 title로 해도 되고,
>   디자인 일관성을 위해 툴팁이 필요하다면 툴팁이어도 되고.

---

### ✅ 0. 공통 CSS (proto-style.css, proto-search.css, proto-memopanel.css) — 완료

- [x] CSS 변수 체계 정립 (색상, 간격, 트랜지션, z-index, 폰트)
- [x] `scrollbar-gutter: stable` 적용 (스크롤바 출현 시 리플로우 방지)
- [x] `.hover-outline`, `.border-reserve` 유틸 클래스 (hover 시 layout shift 방지)
- [x] `--hd-h: 44px` — 사이드바 로고와 워크스페이스 헤더 높이 통일
- [x] 사이드바(.sb) 펼침/접힘(rail) CSS 통합(proto-sidebar.css에 작성)
- [x] 검색 모달(.s-ov) CSS 통합(proto-search.css에 작성)
- [x] 플로팅 메모 모달(.mm) CSS 통합 (드래그/핀/리사이즈)(proto-memopanel.css에 작성)
- [x] 우측 메모 패널(.rsp) CSS 통합 — proto-style.css §16에 포함
- [x] 섹션 헤더(.sec-hd), 설정 모달(.cfg-ov), 새프로젝트 모달(.np-ov) 통합
- [x] 애니메이션 공통화 (modalUp, fadeUp, fadeIn, shake)
  > 결과물: proto-style.css, proto-sidebar.css proto-me mopanel.css, proto-search.css

### ✅ 1-1~1-2. 사이드바 레퍼런스 (proto-sidebar.html) — 완료(일부 7. 통합 검수 단계에서 확인 필요)

- [x] 인라인 CSS 제거 → proto-style.css + proto-sidebar.css 링크 참조
- [x] 트리뷰: 즐겨찾기/나의책장/공유책장 그룹 토글
- [x] 프로젝트→에피소드→페이지 → 모든 화면에서 펼침 가능
- [x] 계층 들여쓰기 → --indent 16px/32px/48px 계층 들여쓰기
- [x] rail 모드: 아이콘 + hover 팝업 패널(.rn-pop)
- [ ] sb-logo `height: var(--hd-h)` → 헤더와 수평선 일치 ⚠️ 재확인 필요
- [x] collapse 버튼 hover 시에만 표시 (CSS로 처리)
- [x] `.tn-cnt` 에피소드/페이지 카운트 뱃지
- [x] `.rn-item.on::after` left-bar indicator
- [x] navTo() 클릭 시 .on 이동 stub
- [x] search/memo import 슬롯 + loadComponent() 헬퍼
  > 결과물: proto-sidebar.html

### ✅ 7-5. 검색 모달 (proto-search.html) — 완료

- [x] 단독 테스트용 HTML (하단 "검색 모달 열기" 버튼)
- [x] loadComponent() import 대응 (부모에서 search-slot에 주입)
- [x] proto-style.css + proto-search.css 링크 참조
- [x] 검색 입력창 (.s-in) + placeholder
- [x] 4개 탭 전환 (프로젝트/에피소드/페이지/컷)
- [x] 탭별 더미 결과 2~3건 (아이콘 + 제목 + 소속 경로)
- [x] 검색어 하이라이트 .s-hl 적용 ("고양이")
- [x] 오버레이 클릭 / Esc 키로 닫기
- [x] 하단 단축키 힌트 (Esc, ↑↓, Enter)
  > 결과물: proto-search.html

### ✅ 7-6. 메모 패널 (proto-memopanel.html) — 완료

- [x] 단독 테스트용 HTML (하단 "열기/토글" 버튼)
- [x] loadComponent() import 대응 (부모에서 memo-slot에 주입)
- [x] proto-style.css + proto-memopanel.css 링크 참조
- [x] 헤더: "메모" 라벨 + 핀/검색/닫기 버튼
- [x] 드래그 이동 JS stub (mousedown→mousemove)
- [x] 핀 활성화 시 닫기 차단 + .pinned 스타일
- [x] 검색 버튼 → 내부 검색창 토글
- [x] 4개 탭 전환 (프로젝트/에피소드/페이지/컷)
- [x] 탭별 더미 메모 데이터 (현재 위치 하이라이트)
- [x] 세부 메모 아코디언 (▶/▼ 토글)
- [x] 빈 메모 상태 (.mm-txt.empty)
- [x] CSS resize: both 리사이즈 지원
  > 결과물: proto-memopanel.html

### ⬜ 2. Bookshelf 디자인 (proto-bookshelf.html) — 미완료

- [ ] proto-style.css 링크 전환
- [ ] proto-bookshelf.css 작성 및 링크 연결
- [ ] 통합 사이드바 적용 (proto-sidebar.html)
- [ ] 프로젝트 카드 그리드 (`.node` 카드: 랜덤 그라디언트 썸네일, 제목, 즐겨찾기 토글, 메타데이터)
- [ ] 3 섹션 구분: 즐겨찾기 / 나의 책장 / 공유 책장
- [ ] 공유 책장 역할 배지 (editor/viewer : 권한에 따라 다르게 표현)
- [ ] 새 프로젝트 모달: 다음과 같이 라벨과 input/button를 가로로 배치
      | 프로젝트 이름 입력창 |
      | 기본 페이지 수 입력창 |
      | 읽기 방향 선택버튼 |
- [ ] 시작 페이지: 단면을 선택한다고 안보이는 것이 아니라 홀수 선택 상태로 disabled 처리
- [ ] node-hd hover: border → outline (layout shift 방지)
- [ ] XSS 경고 주석 추가 (doS 함수)

### ✅ 3. Project 디자인 (proto-project.html) — 완료

- [x] proto-style.css 링크 전환
- [x] proto-project.css 작성 및 링크 연결
- [x] 통합 사이드바 적용 (프로젝트 .on)
- [x] 프로젝트 헤더: 제목(인라인 편집), 즐겨찾기 토글, "+에피소드 추가", 메모 패널 토글
- [x] 프로젝트 메모 프리뷰 (헤더 하단, 포커스 시 $ocean 좌측 바)
- [x] Card A: 정보/통계 + 공유/설정 버튼
- [x] Card B: 설정 (Card A 하단 확장, stepper/toggle)
- [x] Card C: 세부 정보 (태그 기반 #태그 | 내용)
- [?] 프로젝트 정보/통계 카드 + 에피소드 리스트(Card A+Card B+Card C 통합 내용인듯)
- [x] 에피소드 행: 드래그 핸들, 번호, 제목, 시놉시스, 상태 배지(3단계: draft/inProgress/done), 메타데이터, 더보기 메뉴
- [x] 설정 모달: 2×2 그리드 카드, - [?] override 인디케이터
- [x] "마지막 작업" → 상대시간("3일 전") 표시
- [x] XSS 경고 주석 추가
- [x] loadComponent (search/memo import)
  > 결과물: proto-project.html, proto-project.css

---

### ✅ 4. Episode 디자인 (proto-episode.html) — 완료

grep "## 4. Episode 화면 (에피소드)" `project_knowledge_search`를 통해 접근, proto-screen.md

**화면 구조 (proto-screen.md §3 기준):**

```
┌─ 사이드바 ─┐┌─────────────── 워크스페이스 ───────────────┐
│ (공통)     ││ 헤더: 프로젝트명 | 에피소드 리스트           │
│            ││ 에피소드 메모 프리뷰 / +에피소드 추가 / 메모  │
│            │├──── 좌측 네비 (35%) ──┬── 우측 디테일 (65%) ──┤
│            ││ 필터탭 (전체/진행/완료/예정)│ 에피소드 헤더    │
│            ││ 정렬 토글              │ 에피소드 메모(SINGLE) │
│            ││ 에피소드 리스트        │ 세부 메모(DETAIL)     │
│            ││ (썸네일+제목+상태)     │ 태그 기반 필터        │
│            ││                       │ 페이지 메모 리스트    │
│            ││                       │ (드래그로 순서변경)   │
└────────────┘└───────────────────────┴──────────────────────┘
```

**체크리스트:**

- [ ] 기존 proto-episode.html 구조 확인 후 proto-style.css 링크 전환
- [ ] proto-episode.css 작성 및 링크 연결
- [ ] 통합 사이드바 적용 (proto-sidebar.html 기준 복사, 에피소드 화면용 `.on` 상태 설정)
- [ ] 워크스페이스 헤더 구현
  - 프로젝트명 표시 (링크로 프로젝트 화면 이동 가능 시사)
  - " | 에피소드 리스트" 구분자
  - 에피소드 메모 프리뷰 (1줄, 말줄임)
  - "+에피소드 추가" 버튼
  - 메모 패널 토글 버튼
- [ ] 좌측 네비게이터 (35%) 구현
  - 필터 탭: 전체 / 진행중 / 완료 / 예정 (탭 버튼 그룹, active 상태)
  - 정렬 토글 (최신순/번호순)
  - 에피소드 리스트 카드: 썸네일(작은 정사각) + 제목 + 상태 배지(3단계) + 에피소드 메모 1줄 미리보기
  - 선택된 에피소드 하이라이트
  - 더블클릭 → 페이지 화면 이동 stub (alert 또는 주석)
- [ ] 우측 디테일 패널 (65%) 구현
  - 에피소드 헤더: 제목(인라인 편집), 상태 배지, 데드라인
  - 에피소드 메모 (SINGLE): 텍스트 영역, 이모지 선택
  - 세부 메모 (DETAIL): 추가 버튼, 개별 메모 카드 리스트, 태그 필터
  - 페이지 메모 리스트: 페이지별 메모 미리보기, 드래그 핸들로 순서 변경 시사
  - "이 메모는 페이지 화면의 메모와 연동됩니다" 안내 텍스트
- [ ] 고유 CSS 작성 (episode 전용 스타일)
  - 좌우 분할 레이아웃 (flex: 35%/65%)
  - 필터 탭 스타일
  - 에피소드 카드 스타일 (리스트형, 프로젝트 화면의 행과는 다름)
  - 상태 배지 3종 (--todo/--wip/--done) — proto-style.css에 이미 있으면 재사용
- [x] JS stub 작성
  - 필터 탭 전환 (active 토글)
  - 정렬 토글
  - 에피소드 선택 → 우측 디테일 교체 시뮬레이션
  - 메모 추가/삭제 stub
- [x] 사이드바 — proto-sidebar.html 패턴 복제, 트리뷰에서 ep.3 .on, rail nav에서 에피소드 아이콘 .on - 워크스페이스 헤더 — ep-pj-link(프로젝트명 → 클릭 시 이동 시사) + ws-sep + "에피소드 리스트" + 우측 +에피소드 추가 + 메모 토글. 하단 ep-memo-preview 1줄 말줄임 - 좌측 네비 (35%) — 필터탭 4종(전체/진행중/완료/예정 + 카운트 뱃지), 정렬 토글(asc/desc 아이콘 교체), 에피소드 카드(erow: 그라디언트 썸네일 + 번호 + 제목 + 메모 1줄 + 상태배지 + 페이지수 + hover 드래그핸들), 선택 하이라이트(.on), - 더블클릭 → 페이지 화면 stub - 우측 디테일 (65%) — 2탭 구조: - 메모 탭: 프로젝트 메모 읽기전용 프리뷰(parent-memo), 에피소드 메모 textarea(m-ta), 세부 메모 리스트(태그 + 인라인 input + 추가/삭제) - 페이지 메모 탭: 24페이지 메모 리스트(pm-row: 그랩핸들 + 페이지번호 링크 + 인라인 input), 연동 안내 텍스트 - JS stub — 필터 탭 전환, 정렬 토글, 에피소드 선택→디테일 교체, 상태 순환(done→진행중→예정), 페이지/세부메모 추가, loadComponent (search/memo)
  > 완료보고가 checklist.md와 맞지 않아 체크리스트가 제대로 구현되었는지 확인하지 못함
  > ⚠️ **검증 필요 사항:**
- [ ] proto-screen.md §4와 완전 일치 확인
- [ ] "이 메모는 페이지 화면의 메모와 연동됩니다" 안내 텍스트 존재 확인
- [ ] 체크리스트 항목 (라인 219~253) 재검증
  > 결과물: proto-episode.html, proto-episode.css

---

### ✅ 5. Page 디자인 (proto-page.html) — 완료

**화면 구조 (proto-screen.md §4 기준):**

```
┌─ 사이드바 ─┐┌─────────────── 워크스페이스 ───────────────┐
│ (공통)     ││ 헤더: 에피소드명 + 페이지수                  │
│            ││ 에피소드 메모 프리뷰 / +페이지 추가 / 메모    │
│            │├── 좌측 그리드 (20~30%) ─┬─ 우측 디테일 (70~80%) ─┤
│            ││ 페이지 썸네일 그리드     │ 페이지 메모(SINGLE)    │
│            ││ (양면/단면 토글)         │ 페이지 세부메모(DETAIL) │
│            ││ Ctrl+스크롤 줌          │ 컷 메모 리스트          │
│            ││                         │ (드래그→컷에 배정)      │
│            │├── 툴바 ─────────────────┤                        │
│            ││ 줌 컨트롤 / 양면·단면 토글│                       │
└────────────┘└─────────────────────────┴────────────────────────┘
```

**체크리스트:**

- [ ] 기존 proto-page.html 구조 확인 후 proto-style.css 링크 전환
- [ ] proto-page.css 작성 및 링크 연결
- [ ] 통합 사이드바 적용 (페이지 화면용 `.on` 상태)
- [ ] 워크스페이스 헤더 구현
  - 에피소드 제목 + "(24p)" 페이지 수 표시
  - 에피소드 메모 프리뷰 (1줄)
  - "+페이지 추가" 버튼
  - 메모 패널 토글 버튼
- [ ] 좌측 페이지 그리드 (20~30%) 구현
  - 양면(spread) 뷰: 2열 그리드, RTL 읽기방향 기본
  - 단면(single) 뷰: 1열 또는 다열 그리드
  - 페이지 카드: B4 비율 썸네일(aspect-ratio: 238/324), 페이지 번호
  - 컷 분할선 미리보기 (컷이 나뉜 상태면 선이 보임)
  - 페이지 메모 미리보기 (썸네일 하단, 최대 2줄, 말줄임)
  - 선택 페이지 하이라이트 (파란 테두리)
  - 양면 뷰 홀수 시작 시 첫 페이지 blank cover (`.pcard--cover-blank`)
  - Ctrl+스크롤 줌 (JS stub)
- [ ] 우측 디테일 패널 (70~80%) 구현
  - 페이지 메모 (SINGLE): 텍스트 영역
  - 페이지 세부 메모 (DETAIL): 추가/삭제
  - 컷 메모 리스트: 미배정(cutId=null) 메모 목록, 드래그 핸들
  - "이 메모를 컷 화면에서 드래그하여 컷에 배정할 수 있습니다" 안내
  - 배정된 컷 메모는 배정 위치 표시 (예: "→ 컷 3")
- [ ] 하단 툴바 구현
  - 줌 컨트롤 (−, 퍼센트 표시, +, 맞춤 버튼)
  - 양면/단면 토글 버튼
- [ ] 고유 CSS 작성
  - 좌우 분할 레이아웃 (flex: 가변)
  - 페이지 카드 그리드 (spread/single 모드별)
  - B4 비율 썸네일 스타일
  - blank cover 스타일
  - 줌 툴바 스타일
- [ ] JS stub 작성
  - 양면/단면 토글
  - 페이지 선택 → 우측 디테일 교체
  - 줌 컨트롤 (+/−/맞춤)
  - Ctrl+스크롤 줌 stub > 결과물: proto-page.html, proto-page.css > 체크리스트 대로 결과를 반환해주지 않아 체크리스트 확인을 하지 못함. 7. 통합 검수 단계에서 확인 필요
    ⚠️ **검증 필요 사항:**
- [ ] RTL 읽기방향 처리 확인
- [ ] Ctrl+스크롤 줌 JS stub 동작 확인
- [ ] blank cover 스타일 확인
- [ ] 체크리스트 항목 (라인 280~316) 재검증

---

### ✅ 6. Cut 디자인 (proto-cut.html) — 완료

**화면 구조 (proto-screen.md §5 기준):**

```
┌─ 사이드바 ─┐┌─────────────── 워크스페이스 ──────────────────────┐
│ (공통)     ││ 헤더: 에피소드명 + 페이지번호                      │
│            ││ 페이지 메모 프리뷰 / ◀▶ 페이지 이동 / 전체뷰 / 메모 │
│            │├─────── 중앙 캔버스 ──────────┬─ 우측 패널 (320px) ──┤
│            ││ B4 페이지 (단면/양면)         │ 컷 메모 관리         │
│            ││ 가이드라인 오버레이           │ (미배정→컷 드래그)    │
│            ││ (제판선=파랑, 내곽선=파랑/검정)│ 컷 세부메모          │
│            ││ 컷 분할 영역 표시            │ (대사/지문/연출)      │
│            ││ 배정된 메모 미리보기          │                      │
│            ││ 이모지 표시                  │                      │
│            │├─────── 하단 툴바 ────────────┤                      │
│            ││ undo/redo/분할모드/삭제/초기화/줌                    │
└────────────┘└──────────────────────────────┴──────────────────────┘
```

**체크리스트:**

- [ ] proto-cut.html 구조 확인 후 proto-style.css 링크 전환
- [ ] proto-cut.css 작성 및 링크 연결
- [ ] 통합 사이드바 적용 (컷 화면용 `.on` 상태)
- [ ] 워크스페이스 헤더 구현
  - 에피소드 제목 + "p.03" 현재 페이지 번호
  - 페이지 메모 프리뷰 (1줄)
  - ◀ 이전 / ▶ 다음 페이지 이동 버튼
  - 전체 미리보기 버튼 (모든 페이지 한눈에)
  - 메모 패널 토글 버튼
- [ ] 중앙 캔버스 영역 구현
  - B4 비율 페이지 (aspect-ratio: 238/324)
  - 양면 시 2페이지 나란히 (RTL 기준 우→좌)
  - 가이드라인 오버레이: 제판선(bleed, 파란 점선), 내곽선(inner, 파란→컷 분할 후 검정)
  - 재단선(trim)은 미표시
  - 컷 분할 영역: CSS Grid로 분할된 영역 표시, 각 컷에 번호
  - 배정된 컷 메모 미리보기 (컷 내부에 작은 글씨)
  - 컷별 이모지 표시
  - 선택된 컷 하이라이트 (파란 테두리 또는 배경)
- [ ] 하단 플로팅 툴바 구현
  - Undo / Redo 버튼 (SVG 아이콘, 이미 교체됨)
  - 컷 분할 모드 토글 (active 시 강조)
  - 컷 삭제 버튼
  - 레이아웃 초기화 버튼
  - 줌 컨트롤 (−, 퍼센트, +, 맞춤)
  - flex-wrap 대응 (좁은 화면에서 줄바꿈)
  - zoom-ctl margin-left:auto (우측 정렬)
- [ ] 우측 패널 (320px) 구현
  - 컷 메모 관리: 미배정 메모 리스트 (드래그 핸들), 배정된 메모는 회색 처리
  - "드래그하여 좌측 컷에 배정" 안내
  - 컷 세부 메모: 대사(dialog) / 지문(narration) / 연출(direction) 구분
  - 메모 추가/삭제 버튼
  - 이모지 선택 UI
- [ ] 고유 CSS 작성
  - 캔버스 영역 (중앙 정렬, 배경 #f5f5f5)
  - B4 페이지 스타일 (가이드라인 오버레이 포함)
  - 컷 그리드 스타일 (분할선, hover, 선택 상태)
  - 플로팅 툴바 스타일 (position: fixed 또는 sticky)
  - 우측 패널 스타일
  - 메모 카드 스타일 (미배정 vs 배정됨 구분)
- [ ] JS stub 작성
  - 컷 분할 모드 토글
  - 컷 선택
  - undo/redo stub
  - 줌 컨트롤
  - 페이지 이동 (◀▶)
  - 메모 배정 drag stub (시각적 시뮬레이션) > 결과물: proto-cut.html, proto-cut.css > 체크리스트 대로 결과를 반환해주지 않아 체크리스트 확인을 하지 못함. 7. 통합 검수 단계에서 확인 필요
    ⚠️ **검증 필요 사항:**
- [ ] 양면 시 2페이지 RTL 배치 확인
- [ ] 가이드라인 색상 변경 로직 (파랑→검정) 확인
- [ ] 컷 분할 모드 커서 변경 확인
- [ ] 체크리스트 항목 (라인 349~394) 재검증

---

### ⬜ 7. 통합 검수 — 미완료

### 7-1. CSS 일관성 검수

- [ ] 모든 HTML 파일에서 proto-style.css 링크 확인
- [ ] 인라인 style 속성 제거 확인
- [ ] CSS 변수 일관성 확인
- [ ] hover 시 layout shift 방지 (outline/box-shadow 사용) 확인
- [ ] hover/선택 일관성: 모든 hover는 outline/box-shadow (border 변경 X → layout shift 방지)

### 7-2. 아이콘 정합성 검수

- [ ] icon-mapping.txt 대조
- [ ] 누락/오타 아이콘 확인
- [ ] 아이콘 경로 정합성

### 7-3. proto-screen.md 명세 대조

- [ ] 각 화면 레이아웃 ASCII 다이어그램 일치
- [ ] 모든 UI 요소 존재 확인
- [ ] 상호작용 스펙 일치

### 7-4. 베베 추가 요구사항 구현

- [ ] 메모 텍스트 포맷팅 툴팁 구현
- [ ] user-select: none 적용
- [ ] 버튼 title 속성/툴팁 추가

### 7-5. 반응형 & 접근성

- [ ] 최소 1024px 너비 레이아웃 확인
- [ ] 키보드 접근성 확인
- [ ] 스크린 리더 대응

---
