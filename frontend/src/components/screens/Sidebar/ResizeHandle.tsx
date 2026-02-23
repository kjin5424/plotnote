interface ResizeHandleProps {
  isResizing: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export const ResizeHandle = ({ isResizing, onMouseDown }: ResizeHandleProps) => {
  return (
    <div
      className={`resize-handle ${isResizing ? "dragging" : ""}`}
      onMouseDown={onMouseDown}
    />
  );
};
