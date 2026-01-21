export default function layoutUtils() {
  const shiftCuts = (cuts, direction, targetIndex, amount = 1) => {
    const startProp = direction === "vertical" ? "colStart" : "rowStart";
    const endProp = direction === "vertical" ? "colEnd" : "rowEnd";

    return cuts.map((cut) => {
      const newCut = { ...cut };
      // 분할 지점보다 뒤에 있는 패널들은 시작/끝 좌표를 모두 밀어줌
      if (cut[startProp] > targetIndex) {
        newCut[startProp] += amount;
        newCut[endProp] += amount;
      }
      return newCut;
    });
  };
}
