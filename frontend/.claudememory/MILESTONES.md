# Milestones

## 2026-03-10 (L. DataContext 완전 제거 — React 마이그레이션 전체 완료)

- `DataContext.tsx` / `DataProvider` 완전 삭제, `Sidebar.tsx`/`MainLayout.tsx` → `useStore()` + `useUI()` 전환
- 미사용 데드코드(`usePage`, `useProject`, `useEpisode`, `useCutNote`, `ProjectSidebar`, `EpisodeSidebar`) 일괄 삭제
- Sidebar 새 엔티티 ID 체계(`episode.id`, `project.id`, `page.id`) 적용, `userBookshelvesList` → 전체 bookshelves로 단순화

## 2026-03-10 (K. Cut 화면 마이그레이션 완료)

- 라우트 재설계: Page=`/page`(pageId URL 제거), Cut=`/page/:pageId`로 변경 — Page 선택은 UI state(`currentPageId`)로만 관리
- `useCut.ts` DataContext → StoreContext 전환: `splitCut`을 `dispatch(ADD_CUT/DELETE_CUT)` 기반으로 재작성, 신 Cut 타입(`id`, `frame.vertices`) 대응
- G~K 전 화면 마이그레이션 완료 — DataProvider/DataContext 제거만 남음

## 2026-03-10 (10. 통합 검수 2차 완료)

- design-specialist 관점 검수 결과 91/100 — P1 2건만 실수정: `det-status-sel:focus-visible` 추가(episode.css), `.np-hd-t`/`.np-lbl` CSS에 `user-select: none` 통합 후 bookshelf.html 인라인 스타일 6곳 제거
- P2·P3 에이전트 오탐 3건 현장 검증으로 확인(ep-mini-badge/sidebar alt/cut toolbar title 모두 이미 구현됨)
- P3: proto-bookshelf.css 카드 hover `transform: translateY(-2px)` → `box-shadow` 전환으로 CLS 원천 차단

## 2026-03-08 (9. Bookshelf 디자인 완성)

- 인라인 CSS → proto-bookshelf.css 분리, proto-sidebar/search/memopanel.css 링크 추가, 가비지 중복 HTML 2768→602줄 정리
- 새 프로젝트 모달: .cfg-r 구조 → np-row/np-lbl/np-val/stepper/tgl-grp (proto-style.css 공통 클래스) 가로 배치로 전면 교체
- role-badge(.role-owner/.role-editor/.role-viewer) CSS 추가, 단면→홀수 시작페이지 disabled JS(setView) 구현

## 2026-03-08 (8-6·8-7. 페이지·컷 화면 추가 요구사항 반영)

- pg-nav 접기/펼치기(44px)·리사이즈 핸들, pcard-num 하단 좌측 이동, 미배정 경고 도트, 컷 편집 hover 버튼, +페이지 추가 카드, pg-detail-memo-item border, pg-cut-assign→x버튼
- ct-pg-nav 아이콘+텍스트 형식, ct-side 접기 동그란 아이콘, ct-sec-a-hd 제거 후 ct-memo-row 통합(컷 N 형식·이모지 병렬), ct-memo-add 삭제, ct-detail-add dashed border 통일
- ct-toolbar 컷 초기화 기준 두 그룹 분리, 줌 버튼 -/+ 텍스트화, ct-page solid border·gap 제거, crosshair split-mode CSS class 적용

## 2026-03-06 (8-4. 프로젝트 화면 추가 요구사항 반영)

- 헤더를 `ws-hd-top` 패턴으로 통일, 공유·설정 버튼을 `.hbtn` 아이콘화, `pj-memo-preview` 제거
- 탭 구조("프로젝트 설정" / "에피소드 목록") 도입, 탭 1 상단에 프로젝트 메모 textarea 배치
- `pj-stat-row` column 레이아웃, `pj-stepper-val` input화, `pj-detail-row` 드래그 핸들, `ep-row` 핸들 아이콘 `menu_20dp`로 통일

## 2026-03-06 (7. 통합 검수 완료)

- 모든 proto HTML(project/episode/page/cut/sidebar) 파일을 proto-screen.md 명세와 대조 완료
- 아이콘 오류 3종 신규 발견: `docs_20dp`(→`article_20dp`), `drag_indicator_20dp`(→`menu_20dp`), `icon-mapping.txt` "명시적 수정" 항목 잘못 기재
- 미적용 항목 전체 8번 체크리스트에 통합 기입 완료 — 표기법("ep.1"→"1화", "p.01"→"1p") 오류 포함

## 2026-03-02 (Phase 1 HTML 프로토타입 완료)

- Phase A~C 완료: proto-episode/page/cut.html proto-style.css 전환 + 신 사이드바 교체, 5단계 EpisodeStatus 적용, spread blank-cover 어포던스, ctx-bar flex-wrap 대응
- 모든 이모지 아이콘(🗃↩↪🗑✂↺) → SVG 교체, XSS 경고 주석 추가, B4 비율 Known Issue 표현 정정
- D 통합 검수 완료: 5파일 proto-style.css 링크 ✅, 사이드바 펼침/접힘 기본값 ✅, rail-nav .on 계층 ✅, SVG 경로 전수 ✅

## 2026-03-02 (EpisodeStatus 3단계 + Phase H 완료)

- EpisodeStatus 코드 전체 반영: `entities.ts` 1줄 + `proto-episode.html` tagCls/tagTxt/STATUS_GROUP/cycleStatus 모두 3단계로 수정
- Phase H Project 화면: `index.tsx`/`ProjectHeader.tsx`/`ProjectGrid.tsx` 모두 `useStore()`/`useUI()`/`useDispatch()`로 교체, URL param `projectId` 동기화, 즐겨찾기 토글/에피소드 추가/리스트 구현
- `project.scss`에 에피소드 row 스타일 및 status badge 3종(`--todo`/`--wip`/`--done`) 추가, 빌드 통과 ✅

## 2026-03-02 (screen.md 5관점 검토 + 아키텍처 수정)

- EpisodeStatus 5단계(`draft|storyboard|lineart|coloring|done`) → 3단계(`draft|inProgress|done`)로 확정 변경 — techContext.md, progress.md 반영 (entities.ts, proto-episode.html 후속 수정 필요)
- TRIM(재단선) 가이드라인 오버레이 미표시 확정, 내곽선 색상 Green→파란색(분할전)/검정색(분할후)로 수정
- screen.md: B4 표기 H×W 명확화, 설정 상속 체인(§4-3), 권한 검증 시점(§4-4), 컷 초기화 토스트, 미배정 컷메모 UI 차별화 등 보강 완료 (유저 직접 편집)

## 2026-03-01

- Phase A~F 완료: 타입 정의, B4 유틸, StoreContext(3-Context 분리), IndexedDB 퍼시스턴스, 라우팅, 공통 컴포넌트(Button/GuideLine/DbErrorToast)
- IndexedDB 에러(QuotaExceeded/Security)를 UIContext.dbError로 올려 DbErrorToast에서 표시
- Button 변형 7종(ghost/primary/accent/outline/danger/icon/add)을 기존 button.scss 클래스에 매핑, GuideLine은 DEV 전용 B4 TRIM+INNER 오버레이

## 2026-03-01 (프로토타입 설계 검토)

- 7관점 토론(기획/아키텍트/보안/웹디자인/앱디자인/UX/만화가)으로 프로토타입 우선순위 재정의: A-episode CSS 리팩터, B-page/cut 신 사이드바 교체, C-episode 5단계 상태 정의가 React 마이그레이션 블로커로 확정
- todo.md 전면 재작성: Phase A(즉시) / B(중요) / C(권장) / D(통합검수) + React 이관 항목 분리 보관
- todo-design.md는 체크리스트가 아닌 정규 설계 스펙 문서로 역할 명확화, B4 비율 역순 오류 정정(CSS aspect-ratio:238/324 ✅, B4_SPEC 객체 표기가 역순으로 잘못됨)
