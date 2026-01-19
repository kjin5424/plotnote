<<<<<<< HEAD
=======
import { usePage } from "hooks/data/usePage";

>>>>>>> 679aa2a191b485ac4096a2254ed6129bb0143f90
export default function PageHeader({ episode }) {
  return (
    <div className="page-header">
      <h1 className="page-header-title">화</h1>
      <div className="page-header-action">
<<<<<<< HEAD
        <button>페이지 추가</button>
=======
        <button onClick={() => addPage(episode.episodeId)}>페이지 추가</button>
>>>>>>> 679aa2a191b485ac4096a2254ed6129bb0143f90
      </div>
    </div>
  );
}
