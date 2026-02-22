export const ResizeHandle = ({ isResizing, useResizeHandle }) => {
  <div
    className={`resize-handle ${isResizing ? "dragging" : ""}`}
    onMouseDown={{ useResizeHandle }}
  ></div>;
};
