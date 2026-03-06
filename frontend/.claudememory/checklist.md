# Progress

## Current Status

**단계:** 8. 추가 요구사항 반영 대기
**브랜치:** `kyoungjin`
**최종 업데이트:** 2025-03-04

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

> **작업 노트 (2025-03-04 #2):**
>
> - proto-screen.md 및 checklist.md 피드백 반영 완료
> - 56개 수정/추가 항목 반영: 공통 3개, 프로젝트 6개, 에피소드 14개, 페이지 16개, 컷 12개, 👾 디자인 제안 필요 5개
> - 표기법 통일: 에피소드 "1화", 페이지 "1p", 컷 "컷 1"
> - user-select: none 적용 범위 명세화
> - 메모 프리뷰 영역 공통 스타일 정의
> - **다음 작업:** 7. 통합 검수(명세 검증) → 8. 추가 요구사항 반영 → 2. Bookshelf 디자인 → 7. 통합 검수(2차)

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
  > 결과물: proto-style.css, proto-sidebar.css proto-memopanel.css, proto-search.css

### ✅ 1-1~1-2. 사이드바 레퍼런스 (proto-sidebar.html) — 완료(7. 통합 검수에서 추가 확인 필요)

- [x] 인라인 CSS 제거 → proto-style.css + proto-sidebar.css 링크 참조
- [x] 트리뷰: 즐겨찾기/나의책장/공유책장 그룹 토글
- [x] 프로젝트→에피소드→페이지 → 모든 화면에서 펼침 가능
- [x] 계층 들여쓰기 → --indent 16px/32px/48px 계층 들여쓰기
- [x] rail 모드: 아이콘 + hover 팝업 패널(.rn-pop)
- [ ] sb-logo `height: var(--hd-h)` → 헤더와 수평선 일치
- [x] collapse 버튼 hover 시에만 표시 (CSS로 처리)
- [x] `.tn-cnt` 에피소드/페이지 카운트 뱃지
- [x] `.rn-item.on::after` left-bar indicator
- [x] navTo() 클릭 시 .on 이동 stub
- [x] search/memo import 슬롯 + loadComponent() 헬퍼

  > 결과물: proto-sidebar.html

  > **7. 통합 검수에서 추가 확인 필요 (추가됨: 2025-03-04):**
  >
  > - [ ] 마우스 터널링 현상 해결 (팝업 사라짐 지연 150~200ms)
  > - [ ] 에피소드 hover 시 페이지 리스트 표시 ("1p, 2p, 3p, ...")
  > - [ ] 페이지/컷 아이콘은 `.rn-pop` 없음 확인
  > - [ ] 로고 SVG 심볼 마크 적용

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

### ✅ 7-6. 메모 패널 (proto-memopanel.html) — 완료(7. 통합 검수에서 추가 확인 필요)

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
  > **7. 통합 검수에서 추가 확인 필요 (추가됨: 2025-03-04):**
  >
  > - [ ] `.mm-item` 디자인 개선
  > - [ ] `.mm-item`에 수정/삭제 기능 추가
  > - [ ] 핀 아이콘 변경 (`keep_20dp_*.svg` → `pin-svgrepo-com.svg`)
  >       결과물: proto-memopanel.html

### ⬜ 2. Bookshelf 디자인 (proto-bookshelf.html) — 미완료 (스킵 중)

grep "## 2. Bookshelf 화면 (책장)" `project_knowledge_search`를 통해 접근, proto-screen.md

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

### ✅ 3. Project 디자인 (proto-project.html) — 완료(7. 통합 검수에서 추가 확인 필요)

grep "## 3. Project 화면 (프로젝트)" `project_knowledge_search`를 통해 접근, proto-screen.md

- [x] proto-style.css 링크 전환
- [x] proto-project.css 작성 및 링크 연결
- [x] 통합 사이드바 적용 (프로젝트 .on)
- [x] 프로젝트 헤더: 제목(인라인 편집), 즐겨찾기 토글, "+에피소드 추가", 메모 패널 토글
- [x] 프로젝트 메모 프리뷰 (헤더 하단, 포커스 시 $ocean 좌측 바)
- [x] Card A: 정보/통계 + 공유/설정 버튼
- [x] Card B: 설정 (Card A 하단 확장, stepper/toggle)
- [x] Card C: 세부 정보 (태그 기반 #태그 | 내용)
- [x] 에피소드 행: 드래그 핸들, 번호, 제목, 시놉시스, 상태 배지(3단계: draft/inProgress/done), 메타데이터, 더보기 메뉴
- [x] "마지막 작업" → 상대시간("3일 전") 표시
- [x] XSS 경고 주석 추가
- [x] loadComponent (search/memo import)
  > **7. 통합 검수에서 추가 확인 필요 (추가됨: 2025-03-04):**
  >
  > - [ ] 헤더 `.ws-ttl` 모양, `.ws-fav` 위치 — 다른 파일과 통일
  > - [ ] `.pj-memo-preview` 제거 → 프로젝트 설정 탭 상단에 프로젝트 메모 textarea 배치
  > - [ ] 탭 구조 변경: "프로젝트 설정" / "에피소드 목록"
  > - [ ] `.pj-stat-row` → column 레이아웃으로 변경
  > - [ ] 공유/설정 버튼 아이콘화
  > - [ ] `.pj-stepper`와 `.pj-toggle` width 통일
  > - [ ] `.pj-stepper-val` 클릭 시 직접 숫자 입력 가능
  > - [ ] `.pj-detail-row` 좌측 드래그 핸들 추가
  > - [ ] `.sec-hd` 디자인 통일
  > - [ ] `.ep-row` 드래그 핸들 추가, `.ep-row-more` 가시성 개선
  > - [ ] 다른 `proto-*.html`, `proto-*.css`와의 스타일 통일성
  >       결과물: proto-project.html, proto-project.css

---

### ✅ 4. Episode 디자인 (proto-episode.html) — 완료(7. 통합 검수에서 추가 확인 필요)

grep "## 4. Episode 화면 (에피소드)" `project_knowledge_search`를 통해 접근, proto-screen.md

**화면 구조 (proto-screen.md §4 기준):**

```
┌─ 사이드바 ─┐┌─────────────── 워크스페이스 ───────────────┐
│ (공통)     ││ 헤더: 프로젝트명 | 에피소드 리스트           │
│            ││ 프로젝트 메모 프리뷰 / +에피소드 추가 / 메모  │
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

- [x] proto-episode.html 구조 확인 후 proto-style.css 링크 전환
- [x] proto-episode.css 작성 및 링크 연결
- [x] 통합 사이드바 적용 (에피소드 화면용 `.on` 상태)
- [x] 워크스페이스 헤더 구현
- [x] 좌측 네비게이터 (35%) 구현
- [x] 우측 디테일 패널 (65%) 구현
- [x] 고유 CSS 작성 (episode 전용 스타일)
- [x] JS stub 작성
  > **7. 통합 검수에서 추가 확인 필요 (추가됨: 2025-03-04):**
  >
  > - [ ] `.ep-nav` 접기/펼치기 기능 (44px 축소 모드)
  > - [ ] `.ep-nav` 좌우 리사이즈 핸들
  > - [ ] `.erow` 드래그 핸들 추가
  > - [ ] `.erow` 레이아웃 변경 (1화 | 페이지수 / 제목 | 진행라벨 / 메모...)
  > - [ ] `.ep-add` sticky 제거 — 다른 행과 동일 취급, 정렬순에 따라 위치 변경
  > - [ ] `.det-deadline` 제거
  > - [ ] 탭 좌우2단/상하2단 레이아웃 (Phase 2/3)
  > - [ ] `.ep-memo-preview`가 프로젝트 메모 표시 확인 → `.parent-memo` 삭제
  > - [ ] `.m-ta`, `.pm-row` 내부 배경 `$white` + border
  > - [ ] `.pr-row` x버튼 hover 시에만 표시
  > - [ ] 태그 없는 세부메모 디자인 (👾: 좌측 컬러바 `$glacial` 제안)
  > - [ ] 인스타그램 형식 세부메모 처리 (👾: Phase 1은 plain text, Phase 2에서 태그 파싱)
  > - [ ] `.det-status` badge → 드롭다운으로 변경
  > - [ ] 페이지별 메모에 이모티콘 지정 영역 추가
  > - [ ] `.cfg-box` → 토글 클릭 확장 형식으로 변경 (proto-project.html 참고)
  > - [ ] 서브헤더에 공유버튼 추가
  >       결과물: proto-episode.html, proto-episode.css

---

### ✅ 5. Page 디자인 (proto-page.html) — 완료(7. 통합 검수에서 추가 확인 필요)

grep "## 5. Page 화면 (페이지)" `project_knowledge_search`를 통해 접근, proto-screen.md

**화면 구조 (proto-screen.md §5 기준):**

```
┌─ 사이드바 ─┐┌─────────────── 워크스페이스 ───────────────┐
│ (공통)     ││ 헤더: 에피소드명 + 페이지수                  │
│            ││ 에피소드 메모 프리뷰 / +페이지 추가 / 메모    │
│            │├── 좌측 그리드 (35%) ─┬─ 우측 디테일 (65%) ─┤
│            ││ 페이지 썸네일 그리드     │ 페이지 메모(SINGLE)    │
│            ││ (양면/단면 토글)         │ 페이지 세부메모(DETAIL) │
│            ││ Ctrl+스크롤 줌          │ 컷 메모 리스트          │
│            ││                         │ (드래그→컷에 배정)      │
│            │├── 툴바 ─────────────────┤                        │
│            ││ 줌 컨트롤 / 양면·단면 토글│                       │
└────────────┘└─────────────────────────┴────────────────────────┘
```

**체크리스트:**

- [x] proto-page.html 구조 확인 후 proto-style.css 링크 전환
- [x] proto-page.css 작성 및 링크 연결
- [x] 통합 사이드바 적용 (페이지 화면용 `.on` 상태)
- [x] 워크스페이스 헤더 구현
- [x] 좌측 페이지 그리드 (35%) 구현
- [x] 우측 디테일 패널 (65%) 구현
- [x] 하단 툴바 구현
- [x] 고유 CSS 작성
- [x] JS stub 작성
  > **7. 통합 검수에서 추가 확인 필요 (추가됨: 2025-03-04):**
  >
  > - [ ] `.pg-spread-row` gap 제거 (페이지 붙어있음), `.pcard-memo`만 gap 유지
  > - [ ] `.pcard--blank` "속표지" 글씨 제거, 대각선 dash 제거 → 점선만
  > - [ ] 마지막 페이지 위치에 "+페이지 추가 카드" 배치
  > - [ ] `.pg-nav` 접기/펼치기 기능 (44px 축소 모드)
  > - [ ] `.pg-nav` 좌우 리사이즈 핸들
  > - [ ] 단면보기: `.pg-nav` width에 맞춰 한 장씩 표시, 축소 시 두 장
  > - [ ] 페이지 카드 그리드 스크롤 위치 이슈 수정
  > - [ ] `.pg-memo-preview`가 에피소드 메모 표시 확인 → `.parent-memo` 삭제
  > - [ ] `.m-ta` 내부 배경 `$white`
  > - [ ] 페이지 메모에 이모티콘 지정 영역 추가
  > - [ ] `.pg-detail-memo-item` 드래그 핸들 항상 표시, x버튼만 hover
  > - [ ] `.pg-detail-memo-item`에 border 추가
  > - [ ] 탭 좌우2단/상하2단 레이아웃 (Phase 2/3)
  > - [ ] `.pg-cut-item` 드래그 핸들 항상 표시
  > - [ ] `.pcard-num` 위치 변경: 썸네일 하단 좌측 "1p", 우측에 메모 미리보기
  > - [ ] 미배정 컷 메모 경고 도트 (`$amber` 6px) 추가
  > - [ ] 페이지 카드 hover 시 "컷 편집" 버튼 표시
  > - [ ] `.pg-cut.assign` 제거 → x버튼으로 대체
  >       결과물: proto-page.html, proto-page.css

---

### ✅ 6. Cut 디자인 (proto-cut.html) — 완료(7. 통합 검수에서 추가 확인 필요)

grep "## 6. Cut 화면 (컷)" `project_knowledge_search`를 통해 접근, proto-screen.md

**화면 구조 (proto-screen.md §6 기준):**

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

- [x] proto-cut.html 구조 확인 후 proto-style.css 링크 전환
- [x] proto-cut.css 작성 및 링크 연결
- [x] 통합 사이드바 적용 (컷 화면용 `.on` 상태)
- [x] 워크스페이스 헤더 구현
- [x] 중앙 캔버스 영역 구현
- [x] 하단 플로팅 툴바 구현
- [x] 우측 패널 (320px) 구현
- [x] 고유 CSS 작성
- [x] JS stub 작성

  >       결과물: proto-cut.html, proto-cut.css

  > **7. 통합 검수에서 추가 확인 필요 (추가됨: 2025-03-04):**
  >
  > - [ ] `.ct-pg-nav` 형식 변경: `[◐ 이전][다음 ◑]` 아이콘+텍스트
  > - [ ] `.hbtn`(전체 미리보기)와 `.ct-tb-btn`(화면 맞춤) 아이콘 구별
  >       전체 미리보기: `pinboard_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`
  > - [ ] `.ct-side` 토글접기 시 동그란 아이콘으로 축소 애니메이션
  > - [ ] `.ct-sec-a-hd`와 `.ct-memo-row` 통합 — `.ct-memo-row`만 남기기
  > - [ ] `.ct-page` 테두리 dash → solid
  > - [ ] 양면 뷰 `.ct-page` 사이 gap 제거
  > - [ ] 초기 상태(컷 미분할) 내곽선 `$ocean` 실선 확인
  > - [ ] `.ct-cell` 내부 헤더영역 (번호+컷메모 좌측, 이모지 우측) + 세부메모 배치
  > - [ ] 기본 컷메모 세부메모 아코디언 닫힌 상태
  > - [ ] `.ct-memo-add` 삭제, `.ct-detail-add`를 `.ct-memo-add` 디자인으로 변경
  > - [ ] 컷메모와 컷세부메모 디자인 차별화
  > - [ ] `.ct-toolbar` "컷 초기화" 기준 두 그룹 분리
  > - [ ] `.ct-tb-btn` → proto-page.html처럼 `-` `+` 표시
  > - [ ] 분할 모드 커서 변경 이슈 (👾: `cursor: crosshair !important` 적용)
  >       (👽: `cursor:url('') 2 2, auto;` 형태로 아이콘 "✂️ 컷 분할 모드" 적용)

---

### ✅ 7. 통합 검수(명세 검증) — 완료 (2026-03-06)

- [x] **proto-screen.md 재검증**: 수정/추가된 요구사항 버전으로 각 화면 상세 검토
- [x] CSS 일관성: 5개 HTML 모두 proto-style.css 링크, 고유 스타일만 `proto-*.css`에 유지 ✅
- [x] 변수 일관성: 확인 완료 (인라인 style 최소화됨)
- [x] hover/선택 일관성: 기본 구조 확인 완료
- [x] 아이콘 정합성: 오류 발견 → 8번에 추가 기입
- [x] 누락된 UI 요소 확인 → 8번에 추가 기입
- [x] 상호작용 스펙 일치 확인 → 8번에 추가 기입
- [x] 미적용 내용 8번에 추가 기입 완료

  > **검수 결과 신규 발견 (2026-03-06):**
  >
  > **아이콘 오류:**
  > - [ ] `proto-project.html` 사이드바 에피소드 아이콘 `docs_20dp` → `article_20dp` 교체
  > - [ ] `proto-project.html` `.ep-row` 드래그 핸들 `drag_indicator_20dp` → `menu_20dp` 통일
  > - [ ] `proto-project.html` `.ep-row-more` 더보기 버튼 `more_vert_20dp` → icon-mapping에 추가 필요
  > - [ ] `proto-cut.html` 줌 버튼 (L914, L919) `search_20dp` 잘못 사용 → `-`/`+` 텍스트로 교체 (8-7과 동일)
  > - [ ] `icon-mapping.txt` "명시적 수정" 항목 `sort-descending-svgrepo-com.svg` → `edit_square_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg` 수정
  >
  > **표기법 오류:**
  > - [ ] `proto-episode.html` 에피소드 번호 "ep.1" → "1화" 형식
  > - [ ] `proto-episode.html` 페이지 번호 "p.01" → "1p" 형식
  > - [ ] `proto-project.html` 사이드바 "ep.1 첫 만남" → "1화 첫 만남" 형식
  > - [ ] `proto-sidebar.html` 에피소드 hover 팝업 "24 페이지" → "1p, 2p, 3p, ..." 형식

---

### ⬜ 8. 추가 요구사항 반영 (추가됨: 2025-03-04) — 미완료

**8-1. 공통 요구사항**

- [ ] **표기법 통일** 적용: 에피소드 "1화", 페이지 "1p", 컷 "컷 1"
  - `proto-episode.html`: "ep.1" → "1화", "p.01" → "1p" _(7. 통합검수 신규)_
  - `proto-project.html`: 사이드바 "ep.1 첫 만남" → "1화 첫 만남" _(7. 통합검수 신규)_
- [x] **icon-mapping.txt 수정**: "명시적 수정" 항목 `edit_square_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg`로 수정 완료
- [x] **icon-mapping.txt 추가**: `more_vert_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg` (더보기 버튼) 추가 완료
- [x] **user-select: none** 적용 (proto-style.css)
  - `button` 전역, `img` 전역, `.hbtn`, `.abtn`, `.ic-btn`, `.ic-btn-sm`, `.sort-tgl`, `.add-item`, `.add-row`, `.m-sec-t` 적용 완료
  - 사이드바/탭/개별 파일 전용 클래스는 각 파일 작업 시 적용
- [ ] **버튼 title 속성** 추가: 모든 아이콘 버튼에 `title` 속성
  - 👾: "Phase 2에서 data-tooltip + ::after pseudo-element로 커스텀 툴팁 구현"
- [ ] **메모 포맷팅 툴팁** (Medium 스타일): Phase 2 구현, 현재는 placeholder만
- [x] **focus outline 개선** (proto-style.css): `:focus` 리셋, `:focus-visible` 통일 (`outline: 2px solid var(--oc)` + `outline-offset: 2px`), 버튼류 `box-shadow` 추가, `input/textarea/select`는 기존 border+box-shadow 방식 유지

**8-2. 사이드바**

- [x] 마우스 터널링 현상 해결: CSS hover → JS `.rn-pop.visible` class 방식으로 전환, 180ms 지연 (`scheduleHide`) 적용
- [x] 에피소드 hover 시 페이지 리스트 "1p, 2p, 3p..." 형식으로 표시 확인 (기존 구조 유지, 표기법 수정)
- [x] 페이지 아이콘 `.rn-pop` 없음 확인 (이미 없었음) — 컷 아이콘은 rail nav에 미포함이므로 해당 없음
- [x] 로고 SVG 심볼 마크 적용 (세 사각형 rect 구조)
- [x] 표기법 통일: 에피소드 "ep.N 제목" → "N화 제목", 페이지 "p.0N" → "Np" 전체 적용
- [x] `user-select: none`: `.sb`, `.sb-mk`, `.sb-srch`, `.tn-row`, `.rn-item`, `.rn-pop-i`, `.sb-ft` 적용

**8-3. 메모패널**

- [ ] `.mm-item` 디자인 개선
- [ ] `.mm-item` 수정/삭제 기능 추가
- [ ] 핀 아이콘 변경 (`keep_20dp_*.svg` → `pin-svgrepo-com.svg`)
- [ ] 활성 화면 항목 중심으로 탭 이동 및 자동 스크롤 포커스 이동

**8-4. 프로젝트**

- [ ] 헤더 `.ws-ttl`, `.ws-fav` 위치 통일
- [ ] `.pj-memo-preview` 제거 → 탭 상단에 프로젝트 메모 textarea
- [ ] 탭 구조: "프로젝트 설정" / "에피소드 목록"
- [ ] `.pj-stat-row` → column 레이아웃
- [ ] 공유/설정 버튼 아이콘화
- [ ] `.pj-stepper`, `.pj-toggle` width 통일
- [ ] `.pj-stepper-val` 클릭 시 직접 입력
- [ ] `.pj-detail-row` 드래그 핸들 추가
- [ ] `.sec-hd` 디자인 통일
- [ ] `.ep-row` 드래그 핸들, `.ep-row-more` 가시성 개선
- [ ] 사이드바 에피소드 아이콘 `docs_20dp` → `article_20dp` 교체 _(7. 통합검수 신규)_
- [ ] `.ep-row` 드래그 핸들 아이콘 `drag_indicator_20dp` → `menu_20dp` 통일 _(7. 통합검수 신규)_

**8-5. 에피소드**

- [ ] `.ep-nav` 접기/펼치기 (44px), 리사이즈 핸들
- [ ] `.erow` 드래그 핸들, 레이아웃 변경
- [ ] `.ep-add` sticky 제거
- [ ] `.det-deadline` 제거
- [ ] 탭 좌우2단/상하2단 (Phase 2/3)
- [ ] `.ep-memo-preview` = 프로젝트 메모 확인, `.parent-memo` 삭제
- [ ] `.m-ta`, `.pm-row` 배경 `$white` + border
- [ ] x버튼 hover 시에만 표시
- [ ] 태그 없는 세부메모 디자인 (👾: 좌측 컬러바 `$glacial`)
- [ ] 인스타그램 형식 처리 (👾: Phase 1 plain text, Phase 2 태그 파싱)
- [ ] `.det-status` → 드롭다운
- [ ] 페이지메모 이모티콘 영역
- [ ] `.cfg-box` 토글 확장 형식
- [ ] 서브헤더 공유버튼

**8-6. 페이지**

- [ ] `.pg-spread-row` gap 제거, `.pcard-memo` gap 유지
- [ ] `.pcard--blank` 점선만
- [ ] 마지막에 "+페이지 추가 카드"
- [ ] `.pg-nav` 접기/펼치기, 리사이즈 핸들
- [ ] 단면보기 한 장씩/축소 시 두 장
- [ ] 스크롤 위치 이슈
- [ ] `.pg-memo-preview` = 에피소드 메모, `.parent-memo` 삭제
- [ ] `.m-ta` 배경 `$white`
- [ ] 페이지메모 이모티콘 영역
- [ ] `.pg-detail-memo-item` 드래그 핸들 항상, x버튼 hover, border 추가
- [ ] 탭 좌우2단/상하2단 (Phase 2/3)
- [ ] `.pg-cut-item` 드래그 핸들 항상
- [ ] `.pcard-num` 위치 변경
- [ ] 미배정 경고 도트
- [ ] hover 시 "컷 편집" 버튼
- [ ] `.pg-cut.assign` → x버튼

**8-7. 컷**

- [ ] `.ct-pg-nav` `[◀ 이전][다음 ▶]`
- [ ] 전체미리보기/화면맞춤 아이콘 구별
- [ ] `.ct-side` 접기 → 동그란 아이콘 애니메이션
- [ ] `.ct-sec-a-hd` + `.ct-memo-row` 통합
- [ ] `.ct-page` solid 테두리, gap 제거
- [ ] 초기 상태 내곽선 `$ocean` 실선
- [ ] `.ct-cell` 내부 레이아웃
- [ ] 기본 아코디언 닫힌 상태
- [ ] `.ct-memo-add` 삭제, `.ct-detail-add` 디자인 변경
- [ ] 컷메모/컷세부메모 디자인 차별화
- [ ] `.ct-toolbar` 두 그룹 분리
- [ ] `.ct-tb-btn` `-` `+` 표시
- [ ] 분할 모드 커서 (👾: `cursor: crosshair !important`)

**8-8. 👾 디자인 제안 필요 항목**

1. **태그 없는 세부메모 디자인**: 좌측 컬러바 `$glacial` 제안 — 베베 확인 필요
2. **인스타그램 형식 세부메모 처리**: Phase 1 plain text, Phase 2 태그 파싱 — 베베 확인 필요
3. **`.det-status` badge vs 드롭다운**: 드롭다운으로 변경 예정 — 베베 확인 필요
4. **`.pcard-num` 위치 변경**: 하단 좌측 "1p", 우측 메모 미리보기 — 베베 확인 필요
5. **컷 화면 초기 상태 내곽선 `$ocean` 실선**: 명세대로 구현 확인 필요

---

### ⬜ 9. Bookshelf 디자인 (proto-bookshelf.html) — 미완료 (8번 완료 후 진행)

> 2. Bookshelf 디자인과 동일. 8번 완료 후 전체 디자인에 맞춰 작업.

---

### ⬜ 10. 통합 검수 (2차) — 미완료

- [ ] 8번 추가 요구사항 반영 확인
- [ ] 9번 Bookshelf 디자인 검수
- [ ] 전체 화면 일관성 최종 확인
- [ ] 아이콘 정합성 최종 확인
- [ ] 반응형 최종 점검

---

## 우선순위 정리 (2025-03-04)

1. ✅ checklist.md + proto-screen.md 추가 요구사항 반영
2. ✅ 7. 통합 검수 (명세 검증) — 2026-03-06 완료
3. ⬜ 8. 추가 요구사항 반영
4. ⬜ 9. Bookshelf 디자인
5. ⬜ 10. 통합 검수 (2차)
