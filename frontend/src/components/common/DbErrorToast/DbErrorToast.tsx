import { useUI } from 'contexts/StoreContext';

export default function DbErrorToast() {
  const { dbError, clearDbError } = useUI();
  if (!dbError) return null;

  return (
    <div className="db-error-toast" role="alert">
      <span className="db-error-toast__msg">{dbError}</span>
      <button
        className="btn--icon db-error-toast__close"
        onClick={clearDbError}
        aria-label="닫기"
      >
        ✕
      </button>
    </div>
  );
}
