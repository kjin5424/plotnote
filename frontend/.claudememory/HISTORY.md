# History

> 완료된 Phase의 작업 기록을 아카이빙하는 파일.
> 50KB 초과 시 `HISTORY_v2.md`로 넘버링 아카이빙.

---

## Phase 0–10: HTML 프로토타입 디자인 (2026-03-01 ~ 2026-03-10) — 완료

### 요약
- proto-style.css (공통 866줄), proto-sidebar.css, proto-search.css, proto-memopanel.css 신규 작성
- proto-bookshelf/project/episode/page/cut .html + .css 5개 화면 전체 디자인 완성
- 2차 통합 검수 91/100점 통과
- EpisodeStatus 5단계 → 3단계(draft/inProgress/done) 확정

### 상세 체크리스트 (구 checklist.md에서 이관)

<details>
<summary>Phase 0: 공통 CSS — ✅ 완료</summary>

- [x] CSS 변수 체계 (색상, 간격, 트랜지션, z-index, 폰트)
- [x] scrollbar-gutter: stable
- [x] hover-outline, border-reserve 유틸
- [x] --hd-h: 44px 통일
- [x] 사이드바 펼침/접힘 CSS (proto-sidebar.css)
- [x] 검색 모달 CSS (proto-search.css)
- [x] 플로팅 메모 모달 CSS (proto-memopanel.css)
- [x] 우측 메모 패널(.rsp) CSS
- [x] 섹션 헤더, 설정 모달, 새프로젝트 모달
- [x] 애니메이션 (modalUp, fadeUp, fadeIn, shake)
</details>

<details>
<summary>Phase 1: 사이드바 레퍼런스 — ✅ 완료</summary>

- [x] proto-sidebar.html 인라인 CSS 제거 → 링크 참조
- [x] 트리뷰: 즐겨찾기/나의책장/공유책장 그룹 토글
- [x] 프로젝트→에피소드→페이지 계층 펼침
- [x] rail 모드: 아이콘 + hover 팝업
- [x] collapse 버튼 hover 시에만 표시
- [x] .tn-cnt 카운트 뱃지
- [x] .rn-item.on left-bar indicator
</details>

<details>
<summary>Phase 2: Bookshelf — ✅ 완료 (2026-03-08)</summary>

- [x] proto-bookshelf.css 분리 및 링크
- [x] 프로젝트 카드 그리드 (그래디언트 썸네일, 즐겨찾기, 메타)
- [x] 3 섹션: 즐겨찾기/나의 책장/공유 책장
- [x] role-badge (.role-owner/.role-editor/.role-viewer)
- [x] 새 프로젝트 모달 (stepper/toggle)
- [x] CLS 방지: hover translateY → box-shadow
</details>

<details>
<summary>Phase 3: Project — ✅ 완료</summary>

- [x] proto-project.css 분리 및 링크
- [x] 프로젝트 헤더 (인라인 편집, 즐겨찾기, 공유/설정 아이콘)
- [x] 탭 구조 ("프로젝트 설정"/"에피소드 목록")
- [x] 에피소드 행 (드래그 핸들, 번호, 제목, 상태 배지)
</details>

<details>
<summary>Phase 4: Episode — ✅ 완료</summary>

- [x] proto-episode.css 분리 및 링크
- [x] 좌측 네비게이터 (35%) + 우측 디테일 (65%)
- [x] 필터탭 4종 + 정렬 토글
- [x] 에피소드 카드 리스트 (드래그, 썸네일, 상태)
- [x] 디테일 패널 (메모/페이지메모 탭)
</details>

<details>
<summary>Phase 5: Page — ✅ 완료</summary>

- [x] proto-page.css 분리 및 링크
- [x] 좌측 페이지 그리드 + 우측 디테일
- [x] 양면/단면 토글, 줌 컨트롤
- [x] 하단 툴바
</details>

<details>
<summary>Phase 6: Cut — ✅ 완료</summary>

- [x] proto-cut.css 분리 및 링크
- [x] 중앙 캔버스 (B4 단면/양면)
- [x] 하단 플로팅 툴바
- [x] 우측 패널 (320px)
</details>

<details>
<summary>Phase 7: 통합 검수 — ✅ 완료 (2026-03-06)</summary>

- [x] proto-screen.md 재검증
- [x] CSS/변수/hover/아이콘 일관성 확인
- [x] 아이콘 오류 3종 발견 → 8번에 기입
</details>

<details>
<summary>Phase 8: 추가 요구사항 반영 — ✅ 완료</summary>

- [x] 8-1 공통 (표기법 통일, icon-mapping, user-select, focus outline)
- [x] 8-2 사이드바 (마우스 터널링, 로고 SVG, 표기법)
- [x] 8-3 메모패널 (mm-item 개선, 핀 아이콘, 활성 스크롤)
- [x] 8-4 프로젝트 (헤더 통일, 탭 구조, stepper input, 드래그 핸들)
- [x] 8-5 에피소드 (ep-nav 접기, erow 레이아웃, det-status 드롭다운)
- [x] 8-6 페이지 (pg-nav 접기, pcard-num 위치, 미배정 경고, 컷 편집 버튼)
- [x] 8-7 컷 (ct-pg-nav 형식, ct-side 접기, ct-toolbar 분리, split-mode cursor)
</details>

<details>
<summary>Phase 9-10: 최종 검수 — ✅ 완료 (2026-03-10)</summary>

- [x] 91/100 검수 통과
- [x] P1: det-status-sel:focus-visible, np-hd-t/np-lbl user-select
- [x] P3: 카드 hover transform → box-shadow (CLS 제거)
</details>

### Phase A–L: React 마이그레이션 (2026-03-01 ~ 2026-03-10) — 완료

- [x] A. 타입 정의 — entities.ts, store.ts
- [x] B. B4 유틸리티 — b4Layout.ts
- [x] C. Context/Reducer — StoreContext.tsx (3-Context 분리)
- [x] D. 로컬 저장소 — persistence.ts (IndexedDB)
- [x] E. 라우팅 — App.tsx
- [x] F. 공통 컴포넌트 — Button, GuideLine, DbErrorToast
- [x] G. Bookshelf 화면
- [x] H. Project 화면
- [x] I. Episode 화면
- [x] J. Page 화면
- [x] K. Cut 화면
- [x] L. DataContext 완전 제거 — Sidebar/MainLayout useStore/useUI 전환

---

## 구 todo.md 완료 항목 (Phase A–C proto HTML) — 아카이빙

> 2026-03-02 완료된 proto HTML 작업 항목

- [x] A-1. proto-episode.html proto-style.css 전환
- [x] A-2. proto-page.html 신 사이드바 교체 + proto-style.css 전환
- [x] A-3. proto-cut.html 신 사이드바 교체 + proto-style.css 전환
- [x] A-4. Episode 상태 탭 필터 5단계 → 3단계 그루핑
- [x] B-1. proto-bookshelf.html 이모지 → SVG
- [x] B-2. proto-cut.html 플로팅 툴바 이모지 → SVG
- [x] B-3. B4 비율 표기 정정
- [x] B-4. proto-project.html 상대시간
- [x] B-5. 검색 doS() XSS 경고 주석
- [x] C-1. proto-page.html spread 빈 칸 어포던스
- [x] C-2. proto-cut.html ctx-bar 좁은 뷰포트 대응
- [x] C-3. Episode ep-col-acts 정렬
- [x] D-1~D-5. 통합 검수 전체 통과
