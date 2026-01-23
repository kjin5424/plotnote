import PageCard from "./PageCard";

export default function PageBody({
  pages,
  onAddPage,
  deletePage,
  updatePageMemo,
  reorderPages,
  pageView,
  spreadStart,
  readingDirection,
}) {
  // 확인용
  // pageView = "single";
  // spreadStart = "even";
  // readingDirection = "ltr";

  // pageView에 따른 렌더 함수
  // 단면뷰(single)일 때
  const renderSingleView = () => {
    return pages.map((page) => (
      <div className="page-grid">
        <PageCard
          key={page.pageId}
          page={page}
          deletePage={deletePage}
          updatePageMemo={updatePageMemo}
        />
      </div>
    ));
  };
  // 양면뷰(spread)일 떄
  const renderSpreadView = () => {
    const spreads = [];
    // spreads에 출력문 자체를 넣음
    let currentIndex = 0;

    // 홀수 시작: 첫 페이지는 오른쪽에 단독 배치
    if (spreadStart === "odd" && pages.length > 0) {
      const firstPage = pages[0];

      spreads.push(
        <div
          className="spread-group page-grid"
          key="spread-first"
          data-spread-index={0}
        >
          <div
            className="page-grid spread"
            data-reading-direction={readingDirection}
            data-page-ids={firstPage.pageId} // Cut Management로 전달용
          >
            {/* RTL: 오른쪽에 페이지, 왼쪽은 빈 공간 */}
            {readingDirection === "rtl" ? (
              <>
                <PageCard
                  key={firstPage.pageId}
                  page={firstPage}
                  deletePage={deletePage}
                  updatePageMemo={updatePageMemo}
                />
                <div className="empty-page-placeholder">{/* 빈 공간 */}</div>
              </>
            ) : (
              // LTR: 왼쪽에 페이지, 오른쪽은 빈 공간
              <>
                <div className="empty-page-placeholder">{/* 빈 공간 */}</div>
                <PageCard
                  key={firstPage.pageId}
                  page={firstPage}
                  deletePage={deletePage}
                  updatePageMemo={updatePageMemo}
                />
              </>
            )}
          </div>
        </div>,
      );

      currentIndex = 1;
    }
    // ✅ 나머지 페이지들 2개씩 묶기
    for (let i = currentIndex; i < pages.length; i += 2) {
      const leftPage = pages[i];
      const rightPage = pages[i + 1];

      // 양면 페이지 ID 배열 (Cut Management에서 사용)
      const pageIds = leftPage
        ? rightPage
          ? [leftPage.pageId, rightPage.pageId].join(",")
          : leftPage.pageId
        : "";

      spreads.push(
        <div
          className="spread-group"
          key={`spread-${i}`}
          data-spread-index={
            Math.floor(i / 2) + (spreadStart === "odd" ? 1 : 0)
          }
        >
          <div
            className="page-grid spread"
            data-reading-direction={readingDirection}
            data-page-ids={pageIds}
          >
            {readingDirection === "rtl" ? (
              <>
                {rightPage ? (
                  <PageCard
                    key={rightPage.pageId}
                    page={rightPage}
                    deletePage={deletePage}
                    updatePageMemo={updatePageMemo}
                  />
                ) : (
                  <div className="empty-page-placeholder">
                    {/* 마지막 페이지가 홀수일 때 */}
                  </div>
                )}
                <PageCard
                  key={leftPage.pageId}
                  page={leftPage}
                  deletePage={deletePage}
                  updatePageMemo={updatePageMemo}
                />
              </>
            ) : (
              <>
                <PageCard
                  key={leftPage.pageId}
                  page={leftPage}
                  deletePage={deletePage}
                  updatePageMemo={updatePageMemo}
                />
                {rightPage ? (
                  <PageCard
                    key={rightPage.pageId}
                    page={rightPage}
                    deletePage={deletePage}
                    updatePageMemo={updatePageMemo}
                  />
                ) : (
                  <div className="empty-page-placeholder">
                    {/* 마지막 페이지가 홀수일 때 */}
                  </div>
                )}
              </>
            )}
          </div>
        </div>,
      );
    }

    return spreads;
  };
  // 드래그앤드롭으로 페이지 정렬바꾸기 로직
  return (
    <div className="page-body">
      <div className="page-body-action">
        <button onClick={onAddPage}>페이지 추가하기</button>
      </div>
      <div className="page-body-content">
        {pageView === "spread" ? renderSpreadView() : renderSingleView()}
      </div>
    </div>
  );
}
