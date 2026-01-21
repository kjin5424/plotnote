export default function PageHeader({ episode, addPage }) {
  return (
    <div className="page-header">
      <div className="page-header-title">
        <h1>{episode.title}</h1>
      </div>
      <div className="page-header-memo">메모</div>
    </div>
  );
}
