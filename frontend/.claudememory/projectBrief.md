# Project Brief

- **Core Goal:** 만화 창작의 계층 구조(프로젝트-에피소드-페이지-컷)를 유기적으로 연결하고, 시나리오부터 콘티까지 일관성 있게 관리하는 만화 전용 스토리 빌드업 앱.
- **Target Audience:** 일본 출판 만화(우측에서 좌측으로 읽는 방식 등) 형식을 따르는 만화 작가 및 지망생.
- **Key Features:**
  1. **Project Management:** 작품별 주제, 세부 설정(세계관, 캐릭터 시트) 및 전체 에피소드 조감도 관리.
  2. **Episode Management:** 에피소드의 주제 및 세부 내용 과 각 화별 시놉시스, 데드라인, 진행 상태(콘티/선화/채색) 추적.
  3. **Page Management:** 페이지에 대한 짧은 메모와 세부적인 내용을 통해 연출 흐름 관리.
  4. **Cut Management:** 출판 규격(B4)에 맞춰 개별 컷 내 대사(말풍선), 지문, 연출 메모 관리 및 이미지 에셋 연결.

# Design Context

- **Hierarchy:** Project (1) -> Episode (N) -> Page (N) -> Cut (N).

# Future Roadmap & Constraints

- **Infrastructure:** 서버 저장 및 로그인 기능 도입 예정 (JSON 구조는 서버와 1:1 대응 필수).
- **Access Control:** 다중 계정 공유 및 권한 분리(열람/수정), 회원 등급별(비회원/무료) 접근 제한 로직 고려.
- **Scalability:** 일본어, 영어 등 다국어 대응을 고려한 i18n 구조 설계.
- **Mobile App:** Flutter 기반의 모바일 앱 대응 예정 (Cross-platform 데이터 호환성 고려 필수)
