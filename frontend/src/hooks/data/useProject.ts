// 프로젝트 목록 조회 및 선택
import useData from "contexts/DataContext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "types/models";

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.isFavorited !== b.isFavorited) return a.isFavorited ? -1 : 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function useProject() {
  const { uiState, getProjects, navigateToProject } = useData();
  const { currentBookshelfId, currentProjectId } = uiState;
  const navigate = useNavigate();

  const projectList: Project[] = currentBookshelfId
    ? sortProjects(getProjects(currentBookshelfId))
    : [];

  const selectProject = useCallback(
    (projectId: string) => {
      navigateToProject(projectId);
      navigate("/project");
    },
    [navigateToProject, navigate],
  );

  return {
    projects: projectList,
    currentProjectId,
    selectProject,
  };
}
