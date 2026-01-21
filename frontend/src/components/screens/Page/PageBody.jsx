import PageCard from "./PageCard";

export default function PageBody({
  pages,
  onAddPage,
  deletePage,
  updatePageMemo,
  reorderPages,
  pageView,
  spreadStart,
}) {
  // pageView에 따른 렌더 함수
  const renderPages = () => {
    // pageView = "single";
    // 단면뷰(single)일 때
    if (pageView === "single") {
      return pages.map((page) => (
        <div className={`page-grid ${pageView}`}>
          <PageCard
            key={page.pageId}
            page={page}
            onDeletePage={deletePage}
            onUpdateMemo={updatePageMemo}
          />
        </div>
      ));
    }
    // 양면뷰(spread)일 떄
    if (pageView === "spread") {
      const spread = [];
      let i = 0;
      // 홀수시작 짝수시작 설정
      if (spreadStart === "odd" && pages.length > 0) {
        spread.push([[[], pages[0]]]);
        i = 1;
      }
      for (; i < pages.length; i += 2) spread.push(pages.slice(i, i + 2));

      return spread.map((pages, index) => (
        <div className="spread-group" key={index}>
          <div className={`page-grid ${pageView}`}>
            {/* {index === 0 && spreadStart === "odd" && <PageCard />} */}
            {pages.map((page) => {
              return (
                <PageCard
                  key={page.pageId}
                  page={page}
                  onDeletePage={deletePage}
                  onUpdateMemo={updatePageMemo}
                />
              );
            })}
          </div>
        </div>
      ));
    }
  };
  // 드래그앤드롭으로 페이지 정렬바꾸기 로직
  return (
    <div className="page-body">
      <div className="page-body-action">
        <button onClick={onAddPage}>페이지 추가하기</button>
      </div>
      <div className="page-body-content">{renderPages()}</div>
    </div>
  );
}
