<<<<<<< HEAD
export const useResizeHandle = (e) => {
=======
export const useResizeHandle = ({ e, setIsResizing }) => {
>>>>>>> 5cd361e0e338b60f3f52a00c30037b0e2480e884
  e.preventDefault();
  setIsResizing(true);
};

<<<<<<< HEAD
export const useResizeMove = (e) => {
=======
export const useResizeMove = ({ e, isResizing, setSidebarWidht }) => {
>>>>>>> 5cd361e0e338b60f3f52a00c30037b0e2480e884
  if (!isResizing) return;
  const newWidth = Math.max(150, Math.min(400, e.clientx));
  setSidebarWidht(newWidth);
};

<<<<<<< HEAD
export const resizeEnd = () => {
=======
export const resizeEnd = ({ setIsResizing }) => {
>>>>>>> 5cd361e0e338b60f3f52a00c30037b0e2480e884
  setIsResizing(false);
};
