import { defineStore } from "pinia";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

// HTML 툴팁 지원
export interface TooltipContent {
  text?: string;
  html?: string;
  isHtml?: boolean;
}

export const useTooltipStore = defineStore("tooltip", {
  state: () => ({
    // content를 string | TooltipContent로 확장
    content: "" as string | TooltipContent,
    x: 0,
    y: 0,
    visible: false,
    colorClass: "", // 'tooltip-primary', 'tooltip-danger', 'tooltip-success'
    position: "top" as TooltipPosition,
  }),

  getters: {
    // 렌더링용 헬퍼
    isHtmlContent(state): boolean {
      if (typeof state.content === "string") return false;
      return !!(state.content as TooltipContent).isHtml;
    },

    displayContent(state): string {
      if (typeof state.content === "string") {
        return state.content;
      }
      const c = state.content as TooltipContent;
      return c.isHtml ? c.html || "" : c.text || "";
    },
  },

  actions: {
    // content를 string | TooltipContent 모두 지원
    show(
      content: string | TooltipContent,
      x: number,
      y: number,
      colorClass = "",
      position: TooltipPosition = "top",
    ) {
      this.content = content;
      this.x = x;
      this.y = y;
      this.colorClass = colorClass;
      this.position = position;
      this.visible = true;
    },

    hide() {
      this.visible = false;
    },
  },
});
