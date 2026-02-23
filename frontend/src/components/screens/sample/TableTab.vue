<template>
  <div>
    <h2 class="section-title">Table Components</h2>

    <!-- Grid Table -->
    <section class="style-section">
      <h3 class="subsection-title">Grid Table (thead + tbody)</h3>
      <p class="description">
        데이터 목록을 표시하는 일반적인 테이블입니다. 헤더(thead)와
        본문(tbody)으로 구성됩니다.
      </p>

      <div class="table-demo">
        <table class="table table-grid">
          <thead>
            <tr>
              <th class="align-center">번호</th>
              <th>과정명</th>
              <th>과제명</th>
              <th class="align-center">학생명</th>
              <th class="align-center">상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="align-center">1</td>
              <td>JAVA</td>
              <td>test update</td>
              <td class="align-center">정학민</td>
              <td class="align-center">
                <span class="badge badge-gray">진행 예정</span>
              </td>
            </tr>
            <tr class="selected">
              <td class="align-center">2</td>
              <td>react</td>
              <td>test</td>
              <td class="align-center">정학민</td>
              <td class="align-center">
                <span class="badge badge-primary">마감</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-explanation">
        <h4>적용 방법</h4>
        <pre><code>&lt;table class="table table-grid"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th class="align-center"&gt;번호&lt;/th&gt;  &lt;!-- 가운데 정렬 --&gt;
      &lt;th&gt;과정명&lt;/th&gt;  &lt;!-- 기본 좌측 정렬 --&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;  &lt;!-- 일반 행 --&gt;
      &lt;td class="align-center"&gt;1&lt;/td&gt;
      &lt;td&gt;JAVA&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr class="selected"&gt;  &lt;!-- 선택된 행 --&gt;
      &lt;td class="align-center"&gt;2&lt;/td&gt;
      &lt;td&gt;react&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</code></pre>

        <div class="class-guide">
          <h5>사용 가능한 클래스</h5>
          <ul>
            <li><code>.table</code> - 기본 테이블 스타일 (필수)</li>
            <li><code>.table-grid</code> - 그리드 테이블 타입 (필수)</li>
            <li><code>.align-center</code> - 셀 내용 가운데 정렬</li>
            <li><code>.align-right</code> - 셀 내용 우측 정렬</li>
            <li><code>.selected</code> - 행 선택 상태 표시 (파란색 배경)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Form Table -->
    <section class="style-section">
      <h3 class="subsection-title">Form Table (tbody only)</h3>
      <p class="description">
        상세 정보나 폼 데이터를 표시하는 테이블입니다. 헤더 없이 tbody만
        사용합니다.
      </p>

      <div class="table-demo">
        <table class="table table-form">
          <tbody>
            <tr>
              <th>과제명</th>
              <td>spring boot</td>
              <th>강의명</th>
              <td>spring boot</td>
            </tr>
            <tr>
              <th>주교수</th>
              <td>김대훈</td>
              <th>부교수</th>
              <td>박지민</td>
            </tr>
            <tr class="readonly">
              <th>출석율</th>
              <td>95 %</td>
              <th>평가</th>
              <td>A+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-explanation">
        <h4>적용 방법</h4>
        <pre><code>&lt;table class="table table-form"&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th&gt;과제명&lt;/th&gt;  &lt;!-- 라벨 (회색 배경) --&gt;
      &lt;td&gt;spring boot&lt;/td&gt;  &lt;!-- 값 --&gt;
      &lt;th&gt;강의명&lt;/th&gt;
      &lt;td&gt;spring boot&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr class="readonly"&gt;  &lt;!-- 읽기 전용 행 --&gt;
      &lt;th&gt;출석율&lt;/th&gt;
      &lt;td&gt;95 %&lt;/td&gt;
      &lt;th&gt;평가&lt;/th&gt;
      &lt;td&gt;A+&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</code></pre>

        <div class="class-guide">
          <h5>사용 가능한 클래스</h5>
          <ul>
            <li><code>.table</code> - 기본 테이블 스타일 (필수)</li>
            <li><code>.table-form</code> - 폼 테이블 타입 (필수)</li>
            <li><code>.readonly</code> - 읽기 전용 행 (회색 배경)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Small Table -->
    <section class="style-section">
      <h3 class="subsection-title">Small Table</h3>
      <p class="description">
        좁은 공간이나 많은 데이터를 표시할 때 사용하는 작은 크기의 테이블입니다.
      </p>

      <div class="table-demo">
        <table class="table table-grid table-sm">
          <thead>
            <tr>
              <th class="align-center">NO</th>
              <th>제목</th>
              <th class="align-center">작성자</th>
              <th class="align-center">날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="align-center">1</td>
              <td>공지사항입니다</td>
              <td class="align-center">관리자</td>
              <td class="align-center">2025-02-09</td>
            </tr>
            <tr>
              <td class="align-center">2</td>
              <td>과제 제출 안내</td>
              <td class="align-center">홍길동</td>
              <td class="align-center">2025-02-08</td>
            </tr>
            <tr>
              <td class="align-center">3</td>
              <td>시험 일정 변경</td>
              <td class="align-center">김철수</td>
              <td class="align-center">2025-02-07</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-explanation">
        <h4>적용 방법</h4>
        <pre><code>&lt;table class="table table-grid table-sm"&gt;
  &lt;!-- table-sm 클래스 추가로 패딩이 줄어듭니다 --&gt;
  &lt;thead&gt;...&lt;/thead&gt;
  &lt;tbody&gt;...&lt;/tbody&gt;
&lt;/table&gt;</code></pre>

        <div class="class-guide">
          <h5>사용 가능한 클래스</h5>
          <ul>
            <li><code>.table-sm</code> - 작은 크기 테이블 (패딩 8px)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Bordered Table -->
    <section class="style-section">
      <h3 class="subsection-title">Bordered Table</h3>
      <p class="description">
        모든 셀에 테두리가 있는 테이블입니다. 데이터 구분이 명확해야 할 때
        사용합니다.
      </p>

      <div class="table-demo">
        <table class="table table-grid table-bordered">
          <thead>
            <tr>
              <th class="align-center">학번</th>
              <th>이름</th>
              <th class="align-center">학과</th>
              <th class="align-center">학년</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="align-center">2021001</td>
              <td>김학생</td>
              <td class="align-center">컴퓨터공학</td>
              <td class="align-center">3</td>
            </tr>
            <tr>
              <td class="align-center">2021002</td>
              <td>이학생</td>
              <td class="align-center">경영학</td>
              <td class="align-center">2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-explanation">
        <h4>적용 방법</h4>
        <pre><code>&lt;table class="table table-grid table-bordered"&gt;
  &lt;!-- table-bordered 클래스 추가로 모든 셀에 테두리 --&gt;
  &lt;thead&gt;...&lt;/thead&gt;
  &lt;tbody&gt;...&lt;/tbody&gt;
&lt;/table&gt;</code></pre>

        <div class="class-guide">
          <h5>사용 가능한 클래스</h5>
          <ul>
            <li><code>.table-bordered</code> - 모든 셀에 테두리 표시</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Striped Table -->
    <section class="style-section">
      <h3 class="subsection-title">Striped Table</h3>
      <p class="description">
        홀수 행과 짝수 행의 배경색이 교차하는 테이블입니다. 가독성을 높여줍니다.
      </p>

      <div class="table-demo">
        <table class="table table-grid table-striped">
          <thead>
            <tr>
              <th class="align-center">순번</th>
              <th>과목명</th>
              <th class="align-center">학점</th>
              <th class="align-center">담당교수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="align-center">1</td>
              <td>자바 프로그래밍</td>
              <td class="align-center">3</td>
              <td class="align-center">김교수</td>
            </tr>
            <tr>
              <td class="align-center">2</td>
              <td>데이터베이스</td>
              <td class="align-center">3</td>
              <td class="align-center">이교수</td>
            </tr>
            <tr>
              <td class="align-center">3</td>
              <td>웹 프로그래밍</td>
              <td class="align-center">3</td>
              <td class="align-center">박교수</td>
            </tr>
            <tr>
              <td class="align-center">4</td>
              <td>알고리즘</td>
              <td class="align-center">3</td>
              <td class="align-center">최교수</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-explanation">
        <h4>적용 방법</h4>
        <pre><code>&lt;table class="table table-grid table-striped"&gt;
  &lt;!-- table-striped 클래스 추가로 짝수 행 배경색 변경 --&gt;
  &lt;thead&gt;...&lt;/thead&gt;
  &lt;tbody&gt;...&lt;/tbody&gt;
&lt;/table&gt;</code></pre>

        <div class="class-guide">
          <h5>사용 가능한 클래스</h5>
          <ul>
            <li><code>.table-striped</code> - 짝수 행에 배경색 적용</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Sortable Column Header -->
    <section class="style-section">
      <h3 class="subsection-title">Sortable Column Header</h3>
      <p class="description">
        클릭하여 정렬할 수 있는 컬럼 헤더입니다. 정렬 방향 아이콘이 표시됩니다.
      </p>

      <div class="table-demo">
        <table class="table table-grid">
          <thead>
            <tr>
              <th class="align-center">번호</th>
              <th class="sortable">제목</th>
              <th class="sortable sort-asc">등록일</th>
              <th class="sortable sort-desc">조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="align-center">1</td>
              <td>공지사항</td>
              <td>2025-02-09</td>
              <td>150</td>
            </tr>
            <tr>
              <td class="align-center">2</td>
              <td>자료실 업데이트</td>
              <td>2025-02-08</td>
              <td>89</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-explanation">
        <h4>적용 방법</h4>
        <pre><code>&lt;thead&gt;
  &lt;tr&gt;
    &lt;th class="sortable"&gt;제목&lt;/th&gt;  &lt;!-- 정렬 가능 --&gt;
    &lt;th class="sortable sort-asc"&gt;등록일&lt;/th&gt;  &lt;!-- 오름차순 정렬 중 --&gt;
    &lt;th class="sortable sort-desc"&gt;조회수&lt;/th&gt;  &lt;!-- 내림차순 정렬 중 --&gt;
  &lt;/tr&gt;
&lt;/thead&gt;</code></pre>

        <div class="class-guide">
          <h5>사용 가능한 클래스</h5>
          <ul>
            <li>
              <code>.sortable</code> - 정렬 가능한 컬럼 (커서 포인터, 화살표
              아이콘)
            </li>
            <li>
              <code>.sort-asc</code> - 오름차순 정렬 중 (위쪽 화살표 활성화)
            </li>
            <li>
              <code>.sort-desc</code> - 내림차순 정렬 중 (아래쪽 화살표 활성화)
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Sticky Header -->
    <section class="style-section">
      <h3 class="subsection-title">Sticky Header</h3>
      <p class="description">
        스크롤 시 헤더가 고정되는 테이블입니다. 긴 목록을 볼 때 유용합니다.
      </p>

      <div class="sticky-table-container">
        <table class="table table-grid table-sticky">
          <thead>
            <tr>
              <th class="align-center">번호</th>
              <th>항목명</th>
              <th class="align-center">상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 20" :key="i">
              <td class="align-center">{{ i }}</td>
              <td>항목 {{ i }}</td>
              <td class="align-center">
                <span class="badge badge-primary">완료</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-explanation">
        <h4>적용 방법</h4>
        <pre><code>&lt;!-- 스크롤 가능한 컨테이너로 테이블 감싸기 --&gt;
&lt;div style="max-height: 400px; overflow-y: auto;"&gt;
  &lt;table class="table table-grid table-sticky"&gt;
    &lt;!-- table-sticky 클래스로 헤더 고정 --&gt;
    &lt;thead&gt;...&lt;/thead&gt;
    &lt;tbody&gt;...&lt;/tbody&gt;
  &lt;/table&gt;
&lt;/div&gt;</code></pre>

        <div class="class-guide">
          <h5>사용 가능한 클래스</h5>
          <ul>
            <li>
              <code>.table-sticky</code> - 헤더를 고정 (thead에 position:
              sticky)
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Checkbox/Radio in Table -->
    <section class="style-section">
      <h3 class="subsection-title">Checkbox/Radio in Table</h3>
      <p class="description">
        체크박스나 라디오 버튼이 포함된 테이블입니다. 행 선택 기능에 사용합니다.
      </p>

      <div class="table-demo">
        <table class="table table-grid">
          <thead>
            <tr>
              <th class="align-center" style="width: 50px">
                <input type="checkbox" />
              </th>
              <th class="align-center">번호</th>
              <th>과목명</th>
              <th class="align-center">학점</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="align-center">
                <input type="checkbox" />
              </td>
              <td class="align-center">1</td>
              <td>자바 프로그래밍</td>
              <td class="align-center">3</td>
            </tr>
            <tr class="selected">
              <td class="align-center">
                <input type="checkbox" checked />
              </td>
              <td class="align-center">2</td>
              <td>데이터베이스</td>
              <td class="align-center">3</td>
            </tr>
            <tr>
              <td class="align-center">
                <input type="checkbox" />
              </td>
              <td class="align-center">3</td>
              <td>웹 프로그래밍</td>
              <td class="align-center">3</td>
            </tr>
          </tbody>
        </table>

        <table class="table table-grid" style="margin-top: 24px">
          <thead>
            <tr>
              <th class="align-center" style="width: 50px">선택</th>
              <th class="align-center">번호</th>
              <th>옵션명</th>
              <th class="align-center">가격</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="align-center">
                <input type="radio" name="option" />
              </td>
              <td class="align-center">1</td>
              <td>기본 옵션</td>
              <td class="align-center">0원</td>
            </tr>
            <tr class="selected">
              <td class="align-center">
                <input type="radio" name="option" checked />
              </td>
              <td class="align-center">2</td>
              <td>프리미엄 옵션</td>
              <td class="align-center">10,000원</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-explanation">
        <h4>적용 방법</h4>
        <pre><code>&lt;!-- 체크박스 테이블 --&gt;
&lt;table class="table table-grid"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th class="align-center" style="width: 50px;"&gt;
        &lt;input type="checkbox" /&gt;  &lt;!-- 전체 선택 --&gt;
      &lt;/th&gt;
      &lt;th&gt;과목명&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr class="selected"&gt;  &lt;!-- 선택된 행에 클래스 추가 --&gt;
      &lt;td class="align-center"&gt;
        &lt;input type="checkbox" checked /&gt;
      &lt;/td&gt;
      &lt;td&gt;자바 프로그래밍&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;

&lt;!-- 라디오 버튼 테이블 --&gt;
&lt;table class="table table-grid"&gt;
  &lt;tbody&gt;
    &lt;tr class="selected"&gt;
      &lt;td class="align-center"&gt;
        &lt;input type="radio" name="option" checked /&gt;
      &lt;/td&gt;
      &lt;td&gt;프리미엄 옵션&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</code></pre>

        <div class="class-guide">
          <h5>사용 팁</h5>
          <ul>
            <li>체크박스/라디오 컬럼은 <code>width: 50px</code> 고정 추천</li>
            <li>선택된 행에는 <code>.selected</code> 클래스 추가</li>
            <li>라디오 버튼은 동일한 <code>name</code> 속성 사용</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Table Actions -->
    <section class="style-section">
      <h3 class="subsection-title">Table Actions</h3>
      <p class="description">
        테이블 셀 내에서 버튼이나 액션을 표시하는 방법입니다.
      </p>

      <div class="table-demo">
        <table class="table table-grid">
          <thead>
            <tr>
              <th class="align-center">번호</th>
              <th>제목</th>
              <th class="align-center">작성자</th>
              <th class="align-center" style="width: 120px">액션</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="align-center">1</td>
              <td>공지사항입니다</td>
              <td class="align-center">관리자</td>
              <td class="align-center">
                <div class="table-actions">
                  <button class="btn btn-sm btn-primary">수정</button>
                  <button class="btn btn-sm btn-danger">삭제</button>
                </div>
              </td>
            </tr>
            <tr>
              <td class="align-center">2</td>
              <td>과제 제출 안내</td>
              <td class="align-center">홍길동</td>
              <td class="align-center">
                <div class="table-actions">
                  <button class="btn btn-sm btn-outline-primary">보기</button>
                  <button class="btn btn-sm btn-outline-secondary">
                    다운로드
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-explanation">
        <h4>적용 방법</h4>
        <pre><code>&lt;table class="table table-grid"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th class="align-center" style="width: 120px;"&gt;액션&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td class="align-center"&gt;
        &lt;div class="table-actions"&gt;
          &lt;button class="btn btn-sm btn-primary"&gt;수정&lt;/button&gt;
          &lt;button class="btn btn-sm btn-danger"&gt;삭제&lt;/button&gt;
        &lt;/div&gt;
      &lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</code></pre>

        <div class="class-guide">
          <h5>사용 팁</h5>
          <ul>
            <li>
              <code>.table-actions</code> - 버튼들을 가로로 배치 (gap: 4px)
            </li>
            <li><code>.btn-sm</code> - 작은 크기 버튼 사용 권장</li>
            <li>액션 컬럼은 고정 너비 지정 권장 (예: 120px, 150px)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Table Loading State -->
    <section class="style-section">
      <h3 class="subsection-title">Table Loading State</h3>
      <p class="description">
        데이터 로딩 중이거나 데이터가 없을 때 표시하는 상태입니다.
      </p>

      <div class="table-demo">
        <table class="table table-grid">
          <thead>
            <tr>
              <th class="align-center">번호</th>
              <th>제목</th>
              <th class="align-center">작성자</th>
              <th class="align-center">날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" class="table-empty">
                <div class="loading-spinner"></div>
                <p>데이터를 불러오는 중입니다...</p>
              </td>
            </tr>
          </tbody>
        </table>

        <table class="table table-grid" style="margin-top: 24px">
          <thead>
            <tr>
              <th class="align-center">번호</th>
              <th>제목</th>
              <th class="align-center">작성자</th>
              <th class="align-center">날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" class="table-empty">
                <p>검색 결과가 없습니다.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-explanation">
        <h4>적용 방법</h4>
        <pre><code>&lt;!-- 로딩 중 --&gt;
&lt;tbody&gt;
  &lt;tr&gt;
    &lt;td colspan="4" class="table-empty"&gt;
      &lt;div class="loading-spinner"&gt;&lt;/div&gt;
      &lt;p&gt;데이터를 불러오는 중입니다...&lt;/p&gt;
    &lt;/td&gt;
  &lt;/tr&gt;
&lt;/tbody&gt;

&lt;!-- 데이터 없음 --&gt;
&lt;tbody&gt;
  &lt;tr&gt;
    &lt;td colspan="4" class="table-empty"&gt;
      &lt;p&gt;검색 결과가 없습니다.&lt;/p&gt;
    &lt;/td&gt;
  &lt;/tr&gt;
&lt;/tbody&gt;</code></pre>

        <div class="class-guide">
          <h5>사용 가능한 클래스</h5>
          <ul>
            <li>
              <code>.table-empty</code> - 빈 상태 셀 (중앙 정렬, 패딩 40px)
            </li>
            <li><code>.loading-spinner</code> - 로딩 스피너 아이콘</li>
            <li><code>colspan</code> - 전체 컬럼 수만큼 병합</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Fixed Width Columns -->
    <section class="style-section">
      <h3 class="subsection-title">Fixed Width Columns</h3>
      <p class="description">
        특정 컬럼의 너비를 고정하거나 반응형으로 조절하는 방법입니다.
      </p>

      <div class="table-demo">
        <table class="table table-grid">
          <colgroup>
            <col style="width: 60px" />
            <col style="width: auto" />
            <col style="width: 100px" />
            <col style="width: 120px" />
            <col style="width: 80px" />
          </colgroup>
          <thead>
            <tr>
              <th class="align-center">NO</th>
              <th>제목 (가변 너비)</th>
              <th class="align-center">작성자</th>
              <th class="align-center">날짜</th>
              <th class="align-center">조회</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="align-center">1</td>
              <td>
                이것은 아주 긴 제목의 예시입니다. 제목은 가변 너비로 설정되어
                있습니다.
              </td>
              <td class="align-center">홍길동</td>
              <td class="align-center">2025-02-09</td>
              <td class="align-center">123</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-explanation">
        <h4>적용 방법</h4>
        <pre><code>&lt;table class="table table-grid"&gt;
  &lt;colgroup&gt;
    &lt;col style="width: 60px;" /&gt;  &lt;!-- 고정 너비 --&gt;
    &lt;col style="width: auto;" /&gt;  &lt;!-- 가변 너비 --&gt;
    &lt;col style="width: 100px;" /&gt;
    &lt;col style="width: 120px;" /&gt;
  &lt;/colgroup&gt;
  &lt;thead&gt;...&lt;/thead&gt;
  &lt;tbody&gt;...&lt;/tbody&gt;
&lt;/table&gt;

&lt;!-- 또는 th/td에 직접 지정 --&gt;
&lt;th style="width: 100px;"&gt;작성자&lt;/th&gt;</code></pre>

        <div class="class-guide">
          <h5>권장 너비 가이드</h5>
          <ul>
            <li>순번/체크박스: 50~60px</li>
            <li>날짜: 100~120px</li>
            <li>작성자/이름: 80~100px</li>
            <li>상태 배지: 80~100px</li>
            <li>액션 버튼: 120~150px</li>
            <li>제목/내용: auto (나머지 공간 차지)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Utility Classes Summary -->
    <section class="style-section">
      <h3 class="subsection-title">모든 유틸리티 클래스 정리</h3>
      <div class="utility-summary">
        <div class="utility-group">
          <h4>테이블 타입</h4>
          <ul>
            <li><code>.table</code> - 기본 테이블 (필수)</li>
            <li><code>.table-grid</code> - 그리드 테이블 (목록용)</li>
            <li><code>.table-form</code> - 폼 테이블 (상세정보용)</li>
          </ul>
        </div>

        <div class="utility-group">
          <h4>테이블 변형</h4>
          <ul>
            <li><code>.table-sm</code> - 작은 테이블 (패딩 축소)</li>
            <li><code>.table-bordered</code> - 모든 셀 테두리</li>
            <li><code>.table-striped</code> - 줄무늬 효과</li>
            <li><code>.table-sticky</code> - 헤더 고정</li>
          </ul>
        </div>

        <div class="utility-group">
          <h4>정렬</h4>
          <ul>
            <li><code>.align-center</code> - 중앙 정렬</li>
            <li><code>.align-right</code> - 우측 정렬</li>
            <li><code>.align-left</code> - 좌측 정렬 (기본값)</li>
          </ul>
        </div>

        <div class="utility-group">
          <h4>행 상태</h4>
          <ul>
            <li><code>.selected</code> - 선택된 행 (파란 배경)</li>
            <li><code>.readonly</code> - 읽기 전용 행 (회색 배경)</li>
          </ul>
        </div>

        <div class="utility-group">
          <h4>정렬 기능</h4>
          <ul>
            <li><code>.sortable</code> - 정렬 가능 컬럼</li>
            <li><code>.sort-asc</code> - 오름차순 정렬 중</li>
            <li><code>.sort-desc</code> - 내림차순 정렬 중</li>
          </ul>
        </div>

        <div class="utility-group">
          <h4>특수 셀</h4>
          <ul>
            <li><code>.table-empty</code> - 빈 상태 표시 셀</li>
            <li><code>.table-actions</code> - 액션 버튼 컨테이너</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 스크립트는 필요 없음 (순수 문서화 페이지)
</script>

<style scoped lang="scss">
.section-title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-3xl;
  padding-bottom: $spacing-lg;
  border-bottom: 2px solid $color-primary;
}

.style-section {
  margin-bottom: $spacing-3xl;
}

.subsection-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-md;
}

.description {
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin-bottom: $spacing-lg;
  line-height: 1.6;
}

.table-demo {
  padding: $spacing-xl;
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  margin-bottom: $spacing-lg;
  overflow-x: auto;
}

// Sticky Header 전용 컨테이너
.sticky-table-container {
  max-height: 300px;
  overflow-y: auto;
  padding: $spacing-xl;
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  margin-bottom: $spacing-lg;
}

.code-explanation {
  background: $color-bg-light;
  border-radius: $radius-md;
  padding: $spacing-lg;
  border-left: 4px solid $color-primary;

  h4 {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $spacing-md;
  }

  h5 {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin: $spacing-lg 0 $spacing-sm 0;
  }

  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: $spacing-md;
    border-radius: $radius-sm;
    overflow-x: auto;
    margin: $spacing-md 0;
    font-size: $font-size-sm;
    line-height: 1.6;

    code {
      font-family: "Consolas", "Monaco", "Courier New", monospace;
      white-space: pre;
    }
  }
}

.class-guide {
  margin-top: $spacing-lg;
  padding: $spacing-md;
  background: white;
  border-radius: $radius-sm;

  ul {
    list-style: none;
    padding: 0;
    margin: $spacing-sm 0 0 0;

    li {
      padding: $spacing-xs 0;
      font-size: $font-size-sm;
      color: $color-text-secondary;
      line-height: 1.6;

      code {
        background: #e3f2fd;
        color: #1976d2;
        padding: 3px 8px;
        border-radius: $radius-sm;
        font-size: $font-size-xs;
        font-weight: $font-weight-semibold;
        font-family: "Consolas", "Monaco", "Courier New", monospace;
      }
    }
  }
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
}

.badge-primary {
  background-color: $color-primary;
  color: white;
}

.badge-gray {
  background-color: $color-gray-400;
  color: white;
}

.table-actions {
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto $spacing-md;
  border: 4px solid $color-border-light;
  border-top-color: $color-primary;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.utility-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: $spacing-lg;
  margin-top: $spacing-lg;
}

.utility-group {
  background: white;
  padding: $spacing-lg;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;

  h4 {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-primary;
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-sm;
    border-bottom: 1px solid $color-border-light;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: $spacing-xs 0;
      font-size: $font-size-sm;
      color: $color-text-secondary;
      line-height: 1.6;

      code {
        background: #e3f2fd;
        color: #1976d2;
        padding: 3px 8px;
        border-radius: $radius-sm;
        font-size: $font-size-xs;
        font-weight: $font-weight-semibold;
        margin-right: $spacing-xs;
        font-family: "Consolas", "Monaco", "Courier New", monospace;
      }
    }
  }
}

// 반응형
@media (max-width: 768px) {
  .utility-summary {
    grid-template-columns: 1fr;
  }
}
</style>
