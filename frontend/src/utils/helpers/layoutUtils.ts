import type { SplitType, Vertex } from "types/models";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 기존: CSS Grid 기반 컷 이동 유틸리티
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function layoutUtils() {
  const shiftCuts = (
    cuts: Array<Record<string, number>>,
    direction: "vertical" | "horizontal",
    targetIndex: number,
    amount: number = 1,
  ) => {
    const startProp = direction === "vertical" ? "colStart" : "rowStart";
    const endProp = direction === "vertical" ? "colEnd" : "rowEnd";

    return cuts.map((cut) => {
      const newCut = { ...cut };
      if (cut[startProp] > targetIndex) {
        newCut[startProp] += amount;
        newCut[endProp] += amount;
      }
      return newCut;
    });
  };

  return { shiftCuts };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 폴리곤 분할 유틸리티 (컷 자르기용)
// 좌표계: 0-100 (페이지 크기의 %)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const classifySplitAngle = (dx: number, dy: number): SplitType => {
  if (dx === 0 && dy === 0) return "horizontal";
  const angleDeg = Math.atan2(Math.abs(dy), Math.abs(dx)) * (180 / Math.PI);
  if (angleDeg < 25) return "horizontal";
  if (angleDeg > 65) return "vertical";
  return "diagonal";
};

const lineSegmentIntersect = (
  l1: Vertex,
  l2: Vertex,
  s1: Vertex,
  s2: Vertex,
): Vertex | null => {
  const a = l2[1] - l1[1];
  const b = l1[0] - l2[0];
  const c = l2[0] * l1[1] - l1[0] * l2[1];
  const denom = a * (s2[0] - s1[0]) + b * (s2[1] - s1[1]);
  if (Math.abs(denom) < 1e-10) return null; // 평행
  const u = -(a * s1[0] + b * s1[1] + c) / denom;
  if (u < -1e-10 || u > 1 + 1e-10) return null; // 선분 밖
  return [
    s1[0] + u * (s2[0] - s1[0]),
    s1[1] + u * (s2[1] - s1[1]),
  ];
};

const sideOf = (l1: Vertex, l2: Vertex, p: Vertex): number =>
  (l2[0] - l1[0]) * (p[1] - l1[1]) - (l2[1] - l1[1]) * (p[0] - l1[0]);

export const splitPolygon = (
  vertices: Vertex[],
  l1: Vertex,
  l2: Vertex,
): [Vertex[], Vertex[]] | null => {
  const n = vertices.length;
  const sides = vertices.map((v) => {
    const s = sideOf(l1, l2, v);
    if (Math.abs(s) < 1e-8) return 0;
    return s > 0 ? 1 : -1;
  });

  const hasPos = sides.some((s) => s > 0);
  const hasNeg = sides.some((s) => s < 0);
  if (!hasPos || !hasNeg) return null; // 직선이 폴리곤을 가로지르지 않음

  const poly1: Vertex[] = [];
  const poly2: Vertex[] = [];

  for (let i = 0; i < n; i++) {
    const curr = vertices[i];
    const next = vertices[(i + 1) % n];
    const sCurr = sides[i];
    const sNext = sides[(i + 1) % n];

    // 각 꼭짓점을 해당 폴리곤에 추가 (직선 위 꼭짓점은 양쪽 모두)
    if (sCurr >= 0) poly1.push(curr);
    if (sCurr <= 0) poly2.push(curr);

    // 엣지가 직선을 가로지를 때 교점 추가
    if ((sCurr > 0 && sNext < 0) || (sCurr < 0 && sNext > 0)) {
      const pt = lineSegmentIntersect(l1, l2, curr, next);
      if (pt) {
        poly1.push(pt);
        poly2.push(pt);
      }
    }
  }

  if (poly1.length < 3 || poly2.length < 3) return null;
  return [poly1, poly2];
};

export const getSnapLine = (
  type: "horizontal" | "vertical",
  midX: number,
  midY: number,
): [Vertex, Vertex] => {
  if (type === "horizontal") {
    return [[0, midY], [100, midY]];
  }
  return [[midX, 0], [midX, 100]];
};

export const getDiagonalLine = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
): [Vertex, Vertex] | null => {
  const dx = endX - startX;
  const dy = endY - startY;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1e-10) return null;
  const scale = 300 / len; // 0-100 범위를 충분히 벗어나도록 확장
  const mx = (startX + endX) / 2;
  const my = (startY + endY) / 2;
  return [
    [mx - dx * scale, my - dy * scale],
    [mx + dx * scale, my + dy * scale],
  ];
};
