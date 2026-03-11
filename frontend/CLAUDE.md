# Claude Code Strategy: Memory-Driven Execution

Always follow the instructions in this file as your top priority.

### 0. Role & Context Management

- **0-1. Role:** 이 프로젝트는 특정 분야의 전문성을 갖춘 서브에이전트 시스템을 운용한다. 기본 에이전트는 `main-agent`로, 모든 작업은 `.claude/agents/`에 정의된 에이전트들의 가이드라인을 준수해야 한다.
  - **업무 배분**: 복잡한 요청의 경우 `main-agent` 에이전트를 통해 각 전문가 에이전트(`code-reviewer`, `security-expert`, `design-specialist` 등)에게 검토를 요청한다.
  - **최종 승인**: 아키텍처 설계나 에이전트 간 의견 충돌 시 `chief-architect`의 결정을 따른다.
  - **리뷰 필수**: 모든 코드 변경 사항은 `code-reviewer`의 검토를 거쳐야 하며, UI 관련 수정은 `design-specialist`의 CLS(레이아웃 시프트) 방지 가이드라인을 준수해야 한다.
  - **사용자 관점**: 기능의 편의성은 `end-user-cartoonist` 에이전트의 피드백(기계치 만화가 관점)을 최우선으로 고려한다.
- **0-2. Memory Bank:** 모든 컨텍스트는 `.claudememory/` 폴더 내 파일을 참조한다.
  - 작업을 시작할 때 반드시 `progress.md`를 읽어 맥락을 파악할 것.
  - 세션 종료 시 반드시 todo.md, progress.md, MILESTONES.md를 최신순 정렬로 날짜와 함께 최신화할 것.
  - todo.md 최신화 작업 시 ### 2. Implementation & Archive Policy 참고할 것.
- **0-3. Optimization:** 50턴 이상 대화 또는 컨텍스트 경고 시 다음과 같은 절차를 실행한다.
  - 이 프로젝트에서 `/cleanup-context`라고 하면 현재 컨텍스트를 요약하고 불필요한 파일을 메모리에서 내려라.
  - 핵심 성과와 다음 할 일을 `progress.md`에 백업한다.
  - `/clear`로 최적화 하고 대화 기록을 요약해서 압축한다.

### 1. Analysis & Planning (Debate First)

- **1-1. No Rush:** 복잡하거나 긴 요청을 받으면 즉시 코드를 작성하지 않고, 최적의 구현 방식을 먼저 생각하고 필요시 나에게 질문하거나 대안을 제시한다.
- **1-2. Multi-Agent Debate:** 복잡한 설계 시 `/agents`를 활용(기획, 아키텍트, 보안 관점)하여 교차 검토 후 `PLAN.md`에 합의안을 기록한다.
- **1-3. Type-Driven Development:** 기능 구현 전 `types/` 폴더에 TypeScript 인터페이스를 우선 정의한다. (Zod 유효성 검사 필수 포함)
- **1-4. Anti-Index Key:** 데이터 식별 시 인덱스 사용을 금지하며, `nanoid` 또는 `UUID`를 필수 사용한다.

### 2. Implementation & Archive Policy

- **2-1. Atomic Tasks:** 한 번의 응답으로 처리 가능한 수준으로 단계를 쪼개어 `.claudememory/todo.md`에 기록한다.
- **2-2. Statelessness:** 새로운 채팅 세션에서 `todo.md`만 읽어도 즉시 다음 단계를 이어갈 수 있도록 구체적으로 기술한다.
- **2-3. Soft Reset Strategy:** `npm run memory-reset` 전, 현재 성과를 `HISTORY.md`로 백업하여 기록의 연속성을 유지한다.
- **2-3. Task Archiving:** `todo.md`의 완료 항목이 **15개**를 초과하거나 파일 크기가 **2KB** 초과 시 `HISTORY.md`로 이동.
- **2-4. Versioned Logs:** `HISTORY.md`가 **50KB**를 초과하면 `HISTORY_vN.md`로 넘버링 아카이빙.
- **2-5. Milestone Update:** 세션 종료 전 핵심 결정 사항 3줄을 `MILESTONES.md`에 날짜와 함께 기록.

### 3. Step-by-Step Execution & Verification

- **3-1. Ready to Work:** 계획 수립 완료 후, **"몇 번 항목부터 실행할까요?"**라고 묻고 사용자 입력을 대기한다.
- **3-2. Targeted Diff:** 전체 파일 재작성 금지. `Search and Replace` 블록(diff)만 사용하며, 선택된 작업 범위 외의 코드는 건드리지 않는다.
- **3-3. No Inline Docs:** 코드는 self-explanatory하게 짜되 로직 주석이나 JSDoc은 작성하지 않는다. (문서화는 `Ollama`에게 담당)
- **3-4. Verification:** 단계 완료 후 요약 보고 및 진행 승인을 구한다.
- **3-5. Finishing:** 작업이 완료되거나 세션이 종료되기 전에 내린 핵심 아키텍처 결정 사항과 해결된 난제를 딱 3줄로 요약해서 MILESTONES.md에 추가한다.
  - 형식 (필수 준수):
    ```
    ## YYYY-MM-DD (Phase N: 작업명)
    - 결정/성과 1줄
    - 결정/성과 1줄
    - 결정/성과 1줄
    ```
  - 신규 항목은 파일 최상단(기존 첫 번째 ## 위)에 삽입한다. (최신순 정렬)
- **3-6. Manual Testing:** 자동 테스트를 끄고, 필요 시 수동으로 `/run npm test`를 실행한다.

### 4. Git & Code Format

- **4-1. Commit Suggestion:** 매 단계 완료 시 아래 규칙에 따라 커밋 메시지를 제안한다.
  - 형식: `Type: 작업 요약` (예: `feat: 로그인 API 연동`)
  - 태그: `feat`, `fix`, `docs`, `refactor`, `test`,`chore`
  - 메시지는 즉시 복사 가능하게 코드 블록(```)으로 제공한다.

# 5. Design Principles (Core)

- **5-1. Unique Identity:** 디스플레이 번호(Page 1...)와 내부 고유 ID(`nanoid`)를 엄격히 분리한다.
- **5-1. Strict Immutability:** 모든 상태 변경은 불변성을 유지한다.
- **5-3. Future-Proof Modeling:** 나중에 필요한 필드(권한, 언어 설정 등)는 스키마에 미리 반영하되, 현재 UI 구현은 보류함.
- **5-4. Data Consistency:** 기능 구현보다 데이터 모델의 안정성과 일관성을 최우선함. JS에 의존적인 로직(Class, Prototype 등)보다 순수 JSON 기반의 데이터 모델링을 우선하여 모바일(`Flutter`) 환경과의 호환성을 확보한다.

## 6. Constraints & Known Issues

- **6-1. Layout Offeset:** 속표지 시작 위치(L/R)에 따른 전체 양면 Spread 쌍의 유동적 변화
- **6-2. Dynamic Pagination:** 중간 페이지 삽입/삭제 시 뒤따르는 페이지들의 속성 재계산.
- **6-3. RTL Flow:** RTL(우상단→좌하단) 컷 흐름: 페이지 내 컷 인덱스(cut_order)가 우상단에서 좌하단으로 흐르는 로직을 기본값으로 하되, 작가의 의도에 따른 예외적 순서 변경 허용.
- **6-4. Asset Sync:** 상위 에셋 변경 시 하위 컷 메타데이터 동기화/버전 관리를 수행한다.
- **6-5. Complex Geometry:** 비정형 컷 분할: 수직/수평 외에 대각선 컷 분할 시의 좌표 데이터 보존 및 해당 컷 내부의 메모 영역 판정 로직 복잡성.
- **6-6. Multi Format:** 해상도 및 규격 변환: B4 출판 규격으로 작업하다가 웹툰(세로 스크롤)이나 A4 보급형으로 리사이징 시 컷 배치의 유연성 확보.
- **6-7. Conflict Resolve:** 오프라인 작업 후 동기화: 서버 도입 시, 네트워크 단절 상태에서 로컬 JSON에 저장된 데이터와 서버 데이터 충돌(Conflict) 해결 시나리오.
- **6-8. Offline-First & Sync Strategy:** 로컬 저장을 기본으로 하되, 서버 도입 및 모바일 앱(`Flutter`) 연동 시 데이터 충돌(Conflict)을 방지하기 위해 모든 객체에 updated_at 타임스탬프와 version 필드 관리를 고려한다.

## 7. Business Logic Rules

- **7-1. Settings Inheritance:** `Episode`>`Project`>`User`>`Default` 순으로 설정을 상속함. 하위 설정이 `null`이면 상위 값을 따르고, 값이 있으면 해당 값을 우선(Override)함.
- **7-2. Reactive Layout:** 페이지 `order`가 바뀌면 즉시 해당 페이지가 '좌측'인지 '우측'인지 재계산되어야 함.
