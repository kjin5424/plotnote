import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ResizeHandle } from "./ResizeHandle";
import useData from "contexts/DataContext";
import type { Project, Episode, Page } from "types/models";

import libraryBooksIcon from "assets/images/library_books_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import folderIcon from "assets/images/folder_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import articleIcon from "assets/images/article_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import noteStackIcon from "assets/images/note_stack_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import settingsIcon from "assets/images/settings_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import favoriteIcon from "assets/images/favorite_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import arrowDownIcon from "assets/images/keyboard_arrow_down_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import arrowRightIcon from "assets/images/keyboard_arrow_right_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";

interface SidebarProps {
  isOpen: boolean;
  sidebarWidth: number;
  isResizing: boolean;
  useResizeHandle: (e: React.MouseEvent) => void;
  toggleSidebar: () => void;
}

const INDENT = 16; // px per depth level

export default function Sidebar({
  isOpen,
  sidebarWidth,
  isResizing,
  useResizeHandle,
  toggleSidebar,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentUserId,
    uiState,
    bookshelves,
    projects,
    episodes,
    pages,
    userBookshelvesList,
    navigateToProject,
    navigateToEpisode,
    navigateToPage,
  } = useData();

  const { currentProjectId, currentEpisodeId, currentPageId } = uiState;

  // ── 접기/펼치기 상태
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set(),
  );
  const [expandedEpisodes, setExpandedEpisodes] = useState<Set<string>>(
    new Set(),
  );
  const [expandedSections, setExpandedSections] = useState({
    favorites: false,
    myBookshelves: true,
    sharedBookshelves: false,
  });

  // workspace에서 선택 시 자동 펼침 + 해당 섹션 오픈
  useEffect(() => {
    if (!currentProjectId) return;
    setExpandedProjects((prev) => new Set([...prev, currentProjectId]));
    if (ownedProjectsRef.current.some((p) => p.projectId === currentProjectId)) {
      setExpandedSections((prev) => ({ ...prev, myBookshelves: true }));
    } else if (
      sharedProjectsRef.current.some((p) => p.projectId === currentProjectId)
    ) {
      setExpandedSections((prev) => ({ ...prev, sharedBookshelves: true }));
    }
  }, [currentProjectId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentEpisodeId) {
      setExpandedEpisodes((prev) => new Set([...prev, currentEpisodeId]));
    }
  }, [currentEpisodeId]);

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(projectId)) next.delete(projectId);
      else next.add(projectId);
      return next;
    });
  };

  const toggleEpisode = (episodeId: string) => {
    setExpandedEpisodes((prev) => {
      const next = new Set(prev);
      if (next.has(episodeId)) next.delete(episodeId);
      else next.add(episodeId);
      return next;
    });
  };

  const toggleSection = (key: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ── 데이터 구성
  const userBsh = currentUserId ? userBookshelvesList[currentUserId] : null;

  // 내 책장: owned 책장 프로젝트를 flat하게 (책장 타이틀 없이 바로 프로젝트)
  const ownedProjects: Project[] = (userBsh?.owned ?? []).flatMap((id) => {
    const shelf = bookshelves[id];
    if (!shelf) return [];
    return shelf.projectOrder.map((pid) => projects[pid]).filter(Boolean);
  });

  // 공유책장: shared 책장 프로젝트 flat
  const sharedProjects: Project[] = (userBsh?.shared ?? [])
    .map((s) => bookshelves[s.bookshelfId])
    .filter(Boolean)
    .flatMap((shelf) =>
      shelf.projectOrder.map((pid) => projects[pid]).filter(Boolean),
    );

  const favoritedProjects = ownedProjects.filter((p) => p.isFavorited);

  // 최신 목록을 effect 안에서 참조하기 위한 ref
  const ownedProjectsRef = useRef(ownedProjects);
  ownedProjectsRef.current = ownedProjects;
  const sharedProjectsRef = useRef(sharedProjects);
  sharedProjectsRef.current = sharedProjects;

  // ── 클릭 핸들러

  // 섹션 헤더: 항상 책장화면으로 이동 + 섹션 토글
  const handleSectionClick = (key: keyof typeof expandedSections) => {
    navigate("/bookshelf");
    toggleSection(key);
  };

  // 프로젝트: active면 토글만, 아니면 이동 + 펼침
  const handleProjectClick = (project: Project) => {
    if (currentProjectId === project.projectId) {
      toggleProject(project.projectId);
    } else {
      navigateToProject(project.projectId);
      setExpandedProjects((prev) => new Set([...prev, project.projectId]));
      navigate("/project");
    }
  };

  // 에피소드: active면 토글만, 아니면 이동 + 펼침
  const handleEpisodeClick = (projectId: string, episode: Episode) => {
    if (currentEpisodeId === episode.episodeId) {
      toggleEpisode(episode.episodeId);
    } else {
      navigateToEpisode(episode.episodeId);
      setExpandedEpisodes((prev) => new Set([...prev, episode.episodeId]));
      navigate(`/project/${projectId}/episode/${episode.episodeId}/page`);
    }
  };

  // 페이지: 항상 이동 (leaf)
  const handlePageClick = (pageId: string) => {
    navigateToPage(pageId);
    navigate(`/pages/${pageId}`);
  };

  // ── 트리 렌더링

  const renderEpisodeItem = (
    projectId: string,
    episode: Episode,
    depth: number,
  ) => {
    const isExpanded = expandedEpisodes.has(episode.episodeId);
    const isActive = currentEpisodeId === episode.episodeId;
    const episodePages: Page[] = (episode.pageOrder ?? [])
      .map((id) => pages[id])
      .filter(Boolean);

    return (
      <div key={episode.episodeId}>
        <button
          className={`sidebar-tree-row${isActive ? " sidebar-tree-row--active" : ""}`}
          style={{ paddingLeft: depth * INDENT }}
          onClick={() => handleEpisodeClick(projectId, episode)}
        >
          <img
            src={isExpanded ? arrowDownIcon : arrowRightIcon}
            className="sidebar-tree-item-icon"
            alt=""
          />
          <img src={articleIcon} className="sidebar-tree-item-icon" alt="" />
          <span className="sidebar-tree-item-label">{episode.title}</span>
        </button>
        {isExpanded &&
          episodePages.map((page, index) => (
            <button
              key={page.pageId}
              className={`sidebar-tree-page${currentPageId === page.pageId ? " sidebar-tree-page--active" : ""}`}
              style={{ paddingLeft: (depth + 2) * INDENT }}
              onClick={() => handlePageClick(page.pageId)}
            >
              <img
                src={noteStackIcon}
                className="sidebar-tree-item-icon"
                alt=""
              />
              <span className="sidebar-tree-item-label">페이지 {index + 1}</span>
            </button>
          ))}
      </div>
    );
  };

  const renderProjectItem = (project: Project, depth: number) => {
    const isExpanded = expandedProjects.has(project.projectId);
    const isActive = currentProjectId === project.projectId;
    const projectEpisodes: Episode[] = (project.episodeOrder ?? [])
      .map((id) => episodes[id])
      .filter(Boolean);

    return (
      <div key={project.projectId}>
        <button
          className={`sidebar-tree-row${isActive ? " sidebar-tree-row--active" : ""}`}
          style={{ paddingLeft: depth * INDENT }}
          onClick={() => handleProjectClick(project)}
        >
          <img
            src={isExpanded ? arrowDownIcon : arrowRightIcon}
            className="sidebar-tree-item-icon"
            alt=""
          />
          <img src={folderIcon} className="sidebar-tree-item-icon" alt="" />
          <span className="sidebar-tree-item-label">{project.title}</span>
        </button>
        {isExpanded &&
          projectEpisodes.map((episode) =>
            renderEpisodeItem(project.projectId, episode, depth + 1),
          )}
      </div>
    );
  };

  // ── 닫힌 사이드바 breadcrumb
  const breadcrumbs = [
    {
      icon: libraryBooksIcon,
      label: "책장",
      isActive: location.pathname.startsWith("/bookshelf"),
      enabled: true,
      onClick: () => navigate("/bookshelf"),
    },
    {
      icon: folderIcon,
      label: "프로젝트",
      isActive: location.pathname === "/project",
      enabled: !!currentProjectId,
      onClick: () => currentProjectId && navigate("/project"),
    },
    {
      icon: articleIcon,
      label: "에피소드",
      isActive:
        location.pathname.includes("/episode") &&
        !location.pathname.includes("/page"),
      enabled: !!currentProjectId,
      onClick: () =>
        currentProjectId &&
        navigate(`/project/${currentProjectId}/episode`),
    },
    {
      icon: noteStackIcon,
      label: "페이지",
      isActive: location.pathname.includes("/page"),
      enabled: !!currentProjectId && !!currentEpisodeId,
      onClick: () =>
        currentProjectId &&
        currentEpisodeId &&
        navigate(
          `/project/${currentProjectId}/episode/${currentEpisodeId}/page`,
        ),
    },
  ];

  return (
    <>
      <div
        className="sidebar"
        style={{ width: isOpen ? `${sidebarWidth}px` : "56px" }}
      >
        {/* 헤더 */}
        <div className="sidebar-header">
          {isOpen ? (
            <>
              <span className="sidebar-avatar">😊</span>
              <span className="sidebar-username">베베</span>
              <button className="sidebar-toggle" onClick={toggleSidebar}>
                ✕
              </button>
            </>
          ) : (
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              <span className="sidebar-avatar">😊</span>
            </button>
          )}
        </div>

        {isOpen ? (
          /* 열린 상태: 트리 네비게이션 */
          <nav className="sidebar-nav">
            <div className="sidebar-tree">
              {/* 즐겨찾기 */}
              <div className="sidebar-tree-section">
                <button
                  className="sidebar-tree-section-title"
                  onClick={() => handleSectionClick("favorites")}
                >
                  <img
                    src={favoriteIcon}
                    className="sidebar-tree-item-icon"
                    alt=""
                  />
                  즐겨찾기
                  <img
                    src={
                      expandedSections.favorites ? arrowDownIcon : arrowRightIcon
                    }
                    className="sidebar-tree-item-icon"
                    alt=""
                    style={{ marginLeft: "auto" }}
                  />
                </button>
                {expandedSections.favorites &&
                  favoritedProjects.map((p) => renderProjectItem(p, 1))}
              </div>

              {/* 내 책장 */}
              <div className="sidebar-tree-section">
                <button
                  className="sidebar-tree-section-title"
                  onClick={() => handleSectionClick("myBookshelves")}
                >
                  <img
                    src={libraryBooksIcon}
                    className="sidebar-tree-item-icon"
                    alt=""
                  />
                  내 책장
                  <img
                    src={
                      expandedSections.myBookshelves
                        ? arrowDownIcon
                        : arrowRightIcon
                    }
                    className="sidebar-tree-item-icon"
                    alt=""
                    style={{ marginLeft: "auto" }}
                  />
                </button>
                {expandedSections.myBookshelves &&
                  ownedProjects.map((p) => renderProjectItem(p, 1))}
              </div>

              {/* 공유책장 */}
              {sharedProjects.length > 0 && (
                <div className="sidebar-tree-section">
                  <button
                    className="sidebar-tree-section-title"
                    onClick={() => handleSectionClick("sharedBookshelves")}
                  >
                    공유책장
                    <img
                      src={
                        expandedSections.sharedBookshelves
                          ? arrowDownIcon
                          : arrowRightIcon
                      }
                      className="sidebar-tree-item-icon"
                      alt=""
                      style={{ marginLeft: "auto" }}
                    />
                  </button>
                  {expandedSections.sharedBookshelves &&
                    sharedProjects.map((p) => renderProjectItem(p, 1))}
                </div>
              )}
            </div>
          </nav>
        ) : (
          /* 닫힌 상태: breadcrumb 아이콘 */
          <nav className="sidebar-breadcrumb">
            {breadcrumbs.map((crumb) => (
              <button
                key={crumb.label}
                className={`sidebar-breadcrumb-btn${crumb.isActive ? " sidebar-breadcrumb-btn--active" : ""}${!crumb.enabled ? " sidebar-breadcrumb-btn--disabled" : ""}`}
                onClick={crumb.onClick as () => void}
                disabled={!crumb.enabled}
                title={crumb.label}
              >
                <img
                  src={crumb.icon}
                  className="sidebar-breadcrumb-icon"
                  alt={crumb.label}
                />
              </button>
            ))}
          </nav>
        )}

        {/* 하단 설정 */}
        <div className="sidebar-footer">
          <button className="sidebar-nav-item" title="설정">
            <img
              src={settingsIcon}
              alt="설정"
              style={{ width: 20, height: 20, flexShrink: 0 }}
            />
            {isOpen && <span className="sidebar-nav-label">설정</span>}
          </button>
        </div>
      </div>

      <ResizeHandle isResizing={isResizing} onMouseDown={useResizeHandle} />
    </>
  );
}
