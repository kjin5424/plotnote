// 사이드바 리사이즈 핸들 유틸
// startResize: ResizeHandle의 onMouseDown에 연결
// updateWidth: document mousemove 리스너
// endResize:   document mouseup 리스너

export const startResize = (
  e: React.MouseEvent,
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  e.preventDefault();
  setIsResizing(true);
};

export const updateWidth = (
  e: MouseEvent,
  setSidebarWidth: React.Dispatch<React.SetStateAction<number>>,
) => {
  const newWidth = Math.max(150, Math.min(400, e.clientX));
  setSidebarWidth(newWidth);
};

export const endResize = (
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsResizing(false);
};
