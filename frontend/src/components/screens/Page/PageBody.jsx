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
    let currentIndex = 0;

    // spreadStart가 odd일 때 첫 페이지 처리
    if (spreadStart === "odd" && pages.length > 0) {
      const firstPage = pages[0];
      spreads.push(
        <div className="spread-group" key="spread-first">
          <div
            className="page-grid spread"
            data-reading-direction={readingDirection}
          >
            <div className="empty-page-placeholder" />
            <PageCard
              key={firstPage.pageId}
              page={firstPage}
              deletePage={deletePage}
              updatePageMemo={updatePageMemo}
            />
          </div>
        </div>,
      );
      currentIndex = 1;
    }

    // 나머지 페이지들 2개씩 묶기
    for (let i = currentIndex; i < pages.length; i += 2) {
      const leftPage = pages[i];
      const rightPage = pages[i + 1];

      spreads.push(
        <div className="spread-group" key={`spread-${i}`}>
          <div
            className="page-grid spread"
            data-reading-direction={readingDirection}
          >
            <PageCard
              page={leftPage}
              deletePage={deletePage}
              updatePageMemo={updatePageMemo}
            />
            {rightPage ? (
              <PageCard
                page={rightPage}
                deletePage={deletePage}
                updatePageMemo={updatePageMemo}
              />
            ) : (
              <div className="empty-page-placeholder" />
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
      <div
        className="page-body-content"
        data-reading-direction={readingDirection}
      >
        {pageView === "spread" ? renderSpreadView() : renderSingleView()}
      </div>
    </div>
  );
}
