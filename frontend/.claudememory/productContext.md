# Product Context

## Why this exists

- **단절된 워크플로우 해결:** 기존 도구들의 기획(주제/설정)과 실행(콘티) 단계 간 분리 현상 개선.
- **작업 효율 극대화:** 텍스트 단계의 컷 구성을 콘티 단계로 직결하여 리소스 낭비 방지.
- **유기적 데이터 구조:** 페이지 화면에서 작성한 컷 메모를 컷화면에서 분할된 컷에 직접 할당(Assign)하고, 전 단계의 상/하위 데이터를 자유롭게 탐색 가능한 환경 구축.

## User Workflows

- **Project Building:** 작품 전체 주제, 캐릭터, 세계관, 장르 등 핵심 설정 정의.
- **Episode Planning:** 화별 주요 사건 메모 및 에피소드 전체 흐름 관리.
- **Define Page Flow:** 시놉시스 구체화 및 페이지별 연출 의도 설정.
- **Page Cut:** B4 규격 기반 컷 분할 및 메모/대사 드래그 앤 드롭 배정.
- **Refinement:** 배정된 데이터를 바탕으로 구도, 표정 등 세부 연출 확정.

## Guiding Principles

### 1. 데이터 무결성 및 연결성 (Data Integrity)

- **Single Source of Truth (SSOT):** 모든 데이터에 고유 ID 부여, 배정 위치와 상관없이 원본 연결성 유지.
- **Non-Destructive Editing:** 컷 삭제/변경 시 할당 데이터는 '미배정(Unassigned) 보관함'으로 자동 이동 및 보존.
- **Future-Proof Modeling:** 다국어, 권한 설정 등 향후 확장성을 고려한 선제적 스키마 설계.

### 2. 사용자 경험 및 탐색 (UX & Navigation)

- **Simple UI/UX:** 시각적 위계 중심 설계 및 터널링을 통한 단계적 정보 노출.
- **Context-Preserving:** 계층 이동 시 스크롤 위치, 필터 상태, 편집 포커스 상태 완벽 유지.
- **Instant Feedback:** 모든 액션에 대한 즉각적 피드백 및 시스템 상태(저장/동기화) 명시.

### 3. 성능 및 리스크 관리 (Performance & Risk)

- **Performance First:** 빠른 응답 속도 최우선, 데이터 로딩 시 스켈레톤 UI 적용.
- **Zero-Friction Storage:** 입력 중단 시 Debounced Save를 통한 백그라운드 실시간 저장.
- **Safe Exit:** 네트워크 오류 등 예외 상황 대응을 위한 명확한 탈출구(홈 이동 등) 배치.

### 4. 보편적 설계 및 접근성 (Universal Design)

- **Locale-Agnostic:** 한국어/일본어(세로), 영어(가로)를 모두 수용하는 유연한 텍스트 엔진.
- **Accessibility:** 고대비 모드 및 폰트 크기 최적화를 통한 사용자 피로도 감소.
