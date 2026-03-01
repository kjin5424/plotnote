import type { CutFrame } from 'types/entities';

export const B4_SPEC = {
  BLEED:    { w: 324, h: 238 },
  TRIM:     { w: 312, h: 226 },
  INNER:    { w: 270, h: 180 },
  BLEED_MM: 6,
  MARGIN:   { top: 21, bottom: 21, gutter: 12, outer: 23 },
} as const;

export const SHOW_GUIDELINES = import.meta.env.DEV;

export const frameToPixels = (
  frame: CutFrame,
  containerPx: { w: number; h: number },
) => ({
  x: (frame.x / 100) * containerPx.w,
  y: (frame.y / 100) * containerPx.h,
  w: (frame.w / 100) * containerPx.w,
  h: (frame.h / 100) * containerPx.h,
});

export const calcInnerFrameOffset = (canvasPx: { w: number; h: number }) => {
  const sx = canvasPx.w / B4_SPEC.BLEED.w;
  const sy = canvasPx.h / B4_SPEC.BLEED.h;
  return {
    top:  B4_SPEC.MARGIN.top * sy,
    left: B4_SPEC.MARGIN.gutter * sx,
    w:    B4_SPEC.INNER.w * sx,
    h:    B4_SPEC.INNER.h * sy,
  };
};
