# Milestones

## 2026-03-01
- Phase A~F 완료: 타입 정의, B4 유틸, StoreContext(3-Context 분리), IndexedDB 퍼시스턴스, 라우팅, 공통 컴포넌트(Button/GuideLine/DbErrorToast)
- IndexedDB 에러(QuotaExceeded/Security)를 UIContext.dbError로 올려 DbErrorToast에서 표시
- Button 변형 7종(ghost/primary/accent/outline/danger/icon/add)을 기존 button.scss 클래스에 매핑, GuideLine은 DEV 전용 B4 TRIM+INNER 오버레이

## 2026-03-01 (프로토타입 설계 검토)
- 7관점 토론(기획/아키텍트/보안/웹디자인/앱디자인/UX/만화가)으로 프로토타입 우선순위 재정의: A-episode CSS 리팩터, B-page/cut 신 사이드바 교체, C-episode 5단계 상태 정의가 React 마이그레이션 블로커로 확정
- todo.md 전면 재작성: Phase A(즉시) / B(중요) / C(권장) / D(통합검수) + React 이관 항목 분리 보관
- todo-design.md는 체크리스트가 아닌 정규 설계 스펙 문서로 역할 명확화, B4 비율 역순 오류 정정(CSS aspect-ratio:238/324 ✅, B4_SPEC 객체 표기가 역순으로 잘못됨)
