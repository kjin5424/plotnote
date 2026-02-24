import { useEffect } from "react";
import { createPortal } from "react-dom";

type ConfirmType = "primary" | "danger";
type ModalSize = "sm" | "md" | "lg" | "xl";

const SIZE_WIDTH: Record<ModalSize, number> = {
  sm: 400,
  md: 600,
  lg: 800,
  xl: 1000,
};

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  // 확인 버튼
  onConfirm?: () => void;
  confirmText?: string;
  confirmType?: ConfirmType;
  confirmDisabled?: boolean;
  showConfirm?: boolean;
  // 취소 버튼
  onCancel?: () => void;
  cancelText?: string;
  showCancel?: boolean;
  // 옵션
  showClose?: boolean;       // X 버튼 표시 여부
  closeOnOverlay?: boolean;  // 오버레이 클릭으로 닫기
  size?: ModalSize;
}

export default function Modal({
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "확인",
  confirmType = "primary",
  confirmDisabled = false,
  showConfirm = false,
  onCancel,
  cancelText = "취소",
  showCancel = false,
  showClose = true,
  closeOnOverlay = true,
  size = "md",
}: ModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 오버레이 mouseDown으로 닫기 (onClick 대신 사용)
  // — 모달 내부에서 드래그 후 오버레이에서 버튼 뗄 때 의도치 않게 닫히는 것 방지
  const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const confirmBtnClass =
    confirmType === "danger" ? "btn--danger" : "btn--primary";

  return createPortal(
    <div className="modal-overlay" onMouseDown={handleOverlayMouseDown}>
      <div
        className="modal-content"
        style={{ maxWidth: SIZE_WIDTH[size] }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {(title || showClose) && (
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}
            {showClose && (
              <button className="modal-close" onClick={onClose} aria-label="닫기">
                ✕
              </button>
            )}
          </div>
        )}

        <div className="modal-body">{children}</div>

        {(showConfirm || showCancel) && (
          <div className="modal-footer">
            {showCancel && (
              <button className="btn--outline" onClick={handleCancel}>
                {cancelText}
              </button>
            )}
            {showConfirm && (
              <button
                className={confirmBtnClass}
                onClick={onConfirm}
                disabled={confirmDisabled}
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
