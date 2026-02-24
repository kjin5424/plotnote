import WorkspaceLayout from "components/layout/WorkspaceLayout";
import EpisodeHeader from "./EpisodeHeader";
import EpisodeList from "./EpisodeList";
import useData from "contexts/DataContext";
import { useEpisode } from "hooks/data/useEpisode";
import { useNavigate, useParams } from "react-router-dom";

export default function EpisodeManagement() {
  const { getCurrentProject, navigateToEpisode } = useData();
  const { episodes, addEpisode } = useEpisode();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const project = getCurrentProject();

  if (!project) {
    return <div className="episode-no-selection">선택된 프로젝트가 없습니다.</div>;
  }

  const handleSelectEpisode = (episodeId: string) => {
    navigateToEpisode(episodeId);
    navigate(`/project/${projectId}/episode/${episodeId}/page`);
  };

  return (
    <div className="management-container">
      <WorkspaceLayout
        header={
          <EpisodeHeader
            projectTitle={project.title}
            onAddEpisode={addEpisode}
          />
        }
        body={<EpisodeList episodes={episodes} onSelect={handleSelectEpisode} />}
      />
    </div>
  );
}
