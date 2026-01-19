export const useResizeHandle = ({ e, setIsResizing }) => {
  e.preventDefault();
  setIsResizing(true);
};

export const useResizeMove = ({ e, isResizing, setSidebarWidht }) => {
  if (!isResizing) return;
  const newWidth = Math.max(150, Math.min(400, e.clientx));
  setSidebarWidht(newWidth);
};

export const resizeEnd = ({ setIsResizing }) => {
  setIsResizing(false);
};
