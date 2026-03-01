import type { CSSProperties } from 'react';
import { B4_SPEC, SHOW_GUIDELINES, calcInnerFrameOffset } from 'utils/b4Layout';

interface GuideLineProps {
  containerPx: { w: number; h: number };
}

const BASE: CSSProperties = {
  position:      'absolute',
  pointerEvents: 'none',
  boxSizing:     'border-box',
};

export default function GuideLine({ containerPx }: GuideLineProps) {
  if (!SHOW_GUIDELINES) return null;

  const sx     = containerPx.w / B4_SPEC.BLEED.w;
  const sy     = containerPx.h / B4_SPEC.BLEED.h;
  const bleedX = B4_SPEC.BLEED_MM * sx;
  const bleedY = B4_SPEC.BLEED_MM * sy;
  const inner  = calcInnerFrameOffset(containerPx);

  return (
    <>
      <div style={{
        ...BASE,
        left:   bleedX,
        top:    bleedY,
        width:  B4_SPEC.TRIM.w * sx,
        height: B4_SPEC.TRIM.h * sy,
        border: '1px dashed rgba(220,50,50,0.65)',
      }} />
      <div style={{
        ...BASE,
        left:   inner.left,
        top:    inner.top,
        width:  inner.w,
        height: inner.h,
        border: '1px dashed rgba(50,100,220,0.65)',
      }} />
    </>
  );
}
