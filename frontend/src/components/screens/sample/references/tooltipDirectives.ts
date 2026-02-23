import {
  useTooltipStore,
  type TooltipPosition,
  type TooltipContent,
} from "@/stores/tooltipStore";

const POSITION_KEYS = new Set<string>(["top", "bottom", "left", "right"]);
const COLOR_KEYS = new Set<string>(["primary", "danger", "success"]);

function parseModifiers(modifiers: Record<string, boolean>) {
  let position: TooltipPosition = "top";
  let colorClass = "";

  for (const key of Object.keys(modifiers)) {
    if (POSITION_KEYS.has(key)) {
      position = key as TooltipPosition;
    } else if (COLOR_KEYS.has(key)) {
      colorClass = `tooltip-${key}`;
    }
  }

  return { position, colorClass };
}

function getCoordinates(rect: DOMRect, position: TooltipPosition) {
  switch (position) {
    case "bottom":
      return { x: rect.left + rect.width / 2, y: rect.bottom };
    case "left":
      return { x: rect.left, y: rect.top + rect.height / 2 };
    case "right":
      return { x: rect.right, y: rect.top + rect.height / 2 };
    case "top":
    default:
      return { x: rect.left + rect.width / 2, y: rect.top };
  }
}

export const vTooltip = {
  mounted(el: HTMLElement, binding: any) {
    const store = useTooltipStore();

    const onMouseEnter = () => {
      const rect = el.getBoundingClientRect();
      const { position, colorClass } = parseModifiers(binding.modifiers);
      const { x, y } = getCoordinates(rect, position);

      store.show(binding.value, x, y, colorClass, position);
    };

    const hide = () => {
      store.hide();
    };

    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", hide);
    el.addEventListener("click", hide);

    // 참조를 저장하여 unmounted에서 정확히 제거
    (el as any)._tooltipHandlers = { onMouseEnter, hide };
  },

  unmounted(el: HTMLElement) {
    const store = useTooltipStore();
    store.hide();

    const handlers = (el as any)._tooltipHandlers;
    if (handlers) {
      el.removeEventListener("mouseenter", handlers.onMouseEnter);
      el.removeEventListener("mouseleave", handlers.hide);
      el.removeEventListener("click", handlers.hide);
      delete (el as any)._tooltipHandlers;
    }
  },
};
