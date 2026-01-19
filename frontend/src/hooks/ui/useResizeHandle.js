export const useResizeHandle = (e) => {
  e.preventDefault();
  setIsResizing(true);
};

export const useResizeMove = (e) => {
  if (!isResizing) return;
  const newWidth = Math.max(150, Math.min(400, e.clientx));
  setSidebarWidht(newWidth);
};

export const resizeEnd = () => {
  setIsResizing(false);
};
