// ============================================================
//  contexts/TooltipContext.tsx  (tooltipStore.ts의 React 버전)
//  Vue의 Pinia store → React Context + useReducer 패턴으로 대체.
//  전역 단일 인스턴스로 툴팁을 관리 (한 번에 하나만 표시).
// ============================================================

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";

// ── 타입 정의 (tooltipStore.ts와 동일 구조 유지)
export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipContent {
  text?: string;
  html?: string;
  isHtml?: boolean;
}

interface TooltipState {
  content: string | TooltipContent;
  x: number;
  y: number;
  visible: boolean;
  colorClass: string;
  position: TooltipPosition;
}

type TooltipAction =
  | {
      type: "SHOW";
      payload: {
        content: string | TooltipContent;
        x: number;
        y: number;
        colorClass?: string;
        position?: TooltipPosition;
      };
    }
  | { type: "HIDE" };

// ── Reducer
const initialState: TooltipState = {
  content: "",
  x: 0,
  y: 0,
  visible: false,
  colorClass: "",
  position: "top",
};

function tooltipReducer(state: TooltipState, action: TooltipAction): TooltipState {
  switch (action.type) {
    case "SHOW":
      return {
        ...state,
        ...action.payload,
        colorClass: action.payload.colorClass ?? "",
        position: action.payload.position ?? "top",
        visible: true,
      };
    case "HIDE":
      return { ...state, visible: false };
    default:
      return state;
  }
}

// ── Context
interface TooltipContextValue {
  state: TooltipState;
  // store.show()에 해당
  show: (
    content: string | TooltipContent,
    x: number,
    y: number,
    colorClass?: string,
    position?: TooltipPosition
  ) => void;
  // store.hide()에 해당
  hide: () => void;
  // 렌더링용 헬퍼 (store getter에 해당)
  isHtmlContent: boolean;
  displayContent: string;
}

export const TooltipContext = createContext<TooltipContextValue | null>(null);

// ── Provider (App.tsx 최상위에 배치)
export function TooltipProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tooltipReducer, initialState);

  const show = useCallback(
    (
      content: string | TooltipContent,
      x: number,
      y: number,
      colorClass = "",
      position: TooltipPosition = "top"
    ) => {
      dispatch({ type: "SHOW", payload: { content, x, y, colorClass, position } });
    },
    []
  );

  const hide = useCallback(() => {
    dispatch({ type: "HIDE" });
  }, []);

  // getter 계산
  const isHtmlContent =
    typeof state.content !== "string" &&
    !!(state.content as TooltipContent).isHtml;

  const displayContent =
    typeof state.content === "string"
      ? state.content
      : state.content.isHtml
      ? state.content.html ?? ""
      : state.content.text ?? "";

  return (
    <TooltipContext.Provider
      value={{ state, show, hide, isHtmlContent, displayContent }}
    >
      {children}
    </TooltipContext.Provider>
  );
}

// ── useTooltipStore 커스텀 훅 (기존 코드에서 store처럼 사용 가능)
export function useTooltipStore() {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error("useTooltipStore는 TooltipProvider 안에서만 사용 가능합니다");
  return ctx;
}
