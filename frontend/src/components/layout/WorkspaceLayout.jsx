// Header + Body 레이아웃
export default function WorkspaceLayout({ header, body }) {
  return (
    <div className="workspace-layout">
      <div className="workspace-header">{header}</div>
      <div className="workspace-body">{body}</div>
    </div>
  );
}
