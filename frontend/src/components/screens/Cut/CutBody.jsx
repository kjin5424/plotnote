export default function CutBody() {
  // pageVIew에 따른 렌더 함수
  // 단면뷰(single)일 때 : .page-grid.single>CutCard>CutItem
  // 양면뷰(spread)일 때 : .spread-group>.page-grid.spread>CutCard>CutItem
  return (
    <div className="cut-body">
      <div className="cut-body-header">컷바디헤더</div>
      <div className="cut-body-content"></div>
    </div>
  );
}
