# Milestones

## 2026-03-01
- Phase A~F 완료: 타입 정의, B4 유틸, StoreContext(3-Context 분리), IndexedDB 퍼시스턴스, 라우팅, 공통 컴포넌트(Button/GuideLine/DbErrorToast)
- IndexedDB 에러(QuotaExceeded/Security)를 UIContext.dbError로 올려 DbErrorToast에서 표시
- Button 변형 7종(ghost/primary/accent/outline/danger/icon/add)을 기존 button.scss 클래스에 매핑, GuideLine은 DEV 전용 B4 TRIM+INNER 오버레이

## 2026-03-02 (EpisodeStatus 3단계 + Phase H 완료)
- EpisodeStatus 코드 전체 반영: `entities.ts` 1줄 + `proto-episode.html` tagCls/tagTxt/STATUS_GROUP/cycleStatus 모두 3단계로 수정
- Phase H Project 화면: `index.tsx`/`ProjectHeader.tsx`/`ProjectGrid.tsx` 모두 `useStore()`/`useUI()`/`useDispatch()`로 교체, URL param `projectId` 동기화, 즐겨찾기 토글/에피소드 추가/리스트 구현
- `project.scss`에 에피소드 row 스타일 및 status badge 3종(`--todo`/`--wip`/`--done`) 추가, 빌드 통과 ✅

## 2026-03-02 (screen.md 5관점 검토 + 아키텍처 수정)
- EpisodeStatus 5단계(`draft|storyboard|lineart|coloring|done`) → 3단계(`draft|inProgress|done`)로 확정 변경 — techContext.md, progress.md 반영 (entities.ts, proto-episode.html 후속 수정 필요)
- TRIM(재단선) 가이드라인 오버레이 미표시 확정, 내곽선 색상 Green→파란색(분할전)/검정색(분할후)로 수정
- screen.md: B4 표기 H×W 명확화, 설정 상속 체인(§4-3), 권한 검증 시점(§4-4), 컷 초기화 토스트, 미배정 컷메모 UI 차별화 등 보강 완료 (유저 직접 편집)

## 2026-03-06 (7. 통합 검수 완료)
- 모든 proto HTML(project/episode/page/cut/sidebar) 파일을 proto-screen.md 명세와 대조 완료
- 아이콘 오류 3종 신규 발견: `docs_20dp`(→`article_20dp`), `drag_indicator_20dp`(→`menu_20dp`), `icon-mapping.txt` "명시적 수정" 항목 잘못 기재
- 미적용 항목 전체 8번 체크리스트에 통합 기입 완료 — 표기법("ep.1"→"1화", "p.01"→"1p") 오류 포함

## 2026-03-02 (Phase 1 HTML 프로토타입 완료)
- Phase A~C 완료: proto-episode/page/cut.html proto-style.css 전환 + 신 사이드바 교체, 5단계 EpisodeStatus 적용, spread blank-cover 어포던스, ctx-bar flex-wrap 대응
- 모든 이모지 아이콘(🗃↩↪🗑✂↺) → SVG 교체, XSS 경고 주석 추가, B4 비율 Known Issue 표현 정정
- D 통합 검수 완료: 5파일 proto-style.css 링크 ✅, 사이드바 펼침/접힘 기본값 ✅, rail-nav .on 계층 ✅, SVG 경로 전수 ✅

## 2026-03-01 (프로토타입 설계 검토)
- 7관점 토론(기획/아키텍트/보안/웹디자인/앱디자인/UX/만화가)으로 프로토타입 우선순위 재정의: A-episode CSS 리팩터, B-page/cut 신 사이드바 교체, C-episode 5단계 상태 정의가 React 마이그레이션 블로커로 확정
- todo.md 전면 재작성: Phase A(즉시) / B(중요) / C(권장) / D(통합검수) + React 이관 항목 분리 보관
- todo-design.md는 체크리스트가 아닌 정규 설계 스펙 문서로 역할 명확화, B4 비율 역순 오류 정정(CSS aspect-ratio:238/324 ✅, B4_SPEC 객체 표기가 역순으로 잘못됨)
