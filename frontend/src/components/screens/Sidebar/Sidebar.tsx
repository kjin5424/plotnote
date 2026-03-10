import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ResizeHandle } from "./ResizeHandle";
import { useStore, useUI } from "contexts/StoreContext";
import type { Project, Episode, Page } from "types/entities";

import LibraryIcon_house from "assets/images/house_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import ProjectIcon_bookClose from "assets/images/book_close_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import ProjectIcon_bookOpen from "assets/images/book_open_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import EpisodeIcon_folder from "assets/images/folder_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import EpisodeIcon_folderOpen from "assets/images/folder_open_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import PageIcon_article from "assets/images/article_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import SidebarCloseIcon_doubleArrow from "assets/images/keyboard_double_arrow_left_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import settingsIcon from "assets/images/setting-5-svgrepo-com.svg";
import favoriteIcon from "assets/images/favorite_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import arrowDownIcon from "assets/images/keyboard_arrow_down_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import arrowRightIcon from "assets/images/keyboard_arrow_right_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import SidebarLogoIconClose_calm from "assets/images/sentiment_calm_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import SidebarLogoIconOpen_happy from "assets/images/sentiment_very_satisfied_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg";

interface SidebarProps {
  isOpen: boolean;
  sidebarWidth: number;
  isResizing: boolean;
  onResizeMouseDown: (e: React.MouseEvent) => void;
  toggleSidebar: () => void;
}

const INDENT = 16;

export default function Sidebar({
  isOpen,
  sidebarWidth,
  isResizing,
  onResizeMouseDown,
  toggleSidebar,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();
  const { ui, navigateToProject, navigateToEpisode, navigateToPage } = useUI();
  const { currentProjectId, currentEpisodeId, currentPageId } = ui;

  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [expandedEpisodes, setExpandedEpisodes] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState({
    favorites: false,
    myBookshelves: true,
  });

  useEffect(() => {
    if (!currentProjectId) return;
    setExpandedProjects((prev) => new Set([...prev, currentProjectId]));
  }, [currentProjectId]);

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
  const allProjects: Project[] = Object.values(store.bookshelves).flatMap((shelf) =>
    shelf.projectOrder.map((pid) => store.projects[pid]).filter(Boolean),
  );

  const favoritedProjects = allProjects.filter((p) => p.isFavorited);

  const allProjectsRef = useRef(allProjects);
  allProjectsRef.current = allProjects;

  // ── 클릭 핸들러

  const handleSectionClick = (key: keyof typeof expandedSections) => {
    navigate("/bookshelf");
    toggleSection(key);
  };

  const handleProjectClick = (project: Project) => {
    if (currentProjectId === project.id) {
      toggleProject(project.id);
    } else {
      navigateToProject(project.id);
      setExpandedProjects((prev) => new Set([...prev, project.id]));
      navigate(`/project/${project.id}`);
    }
  };

  const handleEpisodeClick = (projectId: string, episode: Episode) => {
    if (currentEpisodeId === episode.id) {
      toggleEpisode(episode.id);
    } else {
      navigateToEpisode(episode.id);
      setExpandedEpisodes((prev) => new Set([...prev, episode.id]));
      navigate(`/project/${projectId}/episode/${episode.id}`);
    }
  };

  const handlePageClick = (projectId: string, episodeId: string, pageId: string) => {
    navigateToPage(pageId);
    navigate(`/project/${projectId}/episode/${episodeId}/page/${pageId}`);
  };

  // ── 트리 렌더링

  const renderEpisodeItem = (projectId: string, episode: Episode, depth: number) => {
    const isExpanded = expandedEpisodes.has(episode.id);
    const isActive = currentEpisodeId === episode.id;
    const episodePages: Page[] = (episode.pageOrder ?? [])
      .map((id) => store.pages[id])
      .filter(Boolean);

    return (
      <div key={episode.id}>
        <button
          className={`sidebar-tree-row${isActive ? " sidebar-tree-row--active" : ""}`}
          style={{ paddingLeft: depth * INDENT }}
          onClick={() => handleEpisodeClick(projectId, episode)}
        >
          <img src={isExpanded ? arrowDownIcon : arrowRightIcon} className="sidebar-tree-item-icon" alt="" />
          <img src={isExpanded ? EpisodeIcon_folderOpen : EpisodeIcon_folder} className="sidebar-tree-item-icon" alt="" />
          <span className="sidebar-tree-item-label">{episode.title}</span>
        </button>
        {isExpanded &&
          episodePages.map((page, index) => (
            <button
              key={page.id}
              className={`sidebar-tree-page${currentPageId === page.id ? " sidebar-tree-page--active" : ""}`}
              style={{ paddingLeft: (depth + 2) * INDENT }}
              onClick={() => handlePageClick(projectId, episode.id, page.id)}
            >
              <img src={PageIcon_article} className="sidebar-tree-item-icon" alt="" />
              <span className="sidebar-tree-item-label">페이지 {index + 1}</span>
            </button>
          ))}
      </div>
    );
  };

  const renderProjectItem = (project: Project, depth: number) => {
    const isExpanded = expandedProjects.has(project.id);
    const isActive = currentProjectId === project.id;
    const projectEpisodes: Episode[] = (project.episodeOrder ?? [])
      .map((id) => store.episodes[id])
      .filter(Boolean);

    return (
      <div key={project.id}>
        <button
          className={`sidebar-tree-row${isActive ? " sidebar-tree-row--active" : ""}`}
          style={{ paddingLeft: depth * INDENT }}
          onClick={() => handleProjectClick(project)}
        >
          <img src={isExpanded ? arrowDownIcon : arrowRightIcon} className="sidebar-tree-item-icon" alt="" />
          <img src={isExpanded ? ProjectIcon_bookOpen : ProjectIcon_bookClose} className="sidebar-tree-item-icon" alt="" />
          <span className="sidebar-tree-item-label">{project.title}</span>
        </button>
        {isExpanded &&
          projectEpisodes.map((episode) =>
            renderEpisodeItem(project.id, episode, depth + 1),
          )}
      </div>
    );
  };

  // ── 닫힌 사이드바 breadcrumb
  const breadcrumbs = [
    {
      icon: LibraryIcon_house,
      label: "책장",
      isActive: location.pathname.startsWith("/bookshelf"),
      enabled: true,
      onClick: () => navigate("/bookshelf"),
    },
    {
      icon: ProjectIcon_bookClose,
      iconActive: ProjectIcon_bookOpen,
      label: "프로젝트",
      isActive: currentProjectId != null && location.pathname.startsWith(`/project/${currentProjectId}`) && !location.pathname.includes("/episode"),
      enabled: !!currentProjectId,
      onClick: () => currentProjectId && navigate(`/project/${currentProjectId}`),
    },
    {
      icon: EpisodeIcon_folder,
      iconActive: EpisodeIcon_folderOpen,
      label: "에피소드",
      isActive: location.pathname.includes("/episode") && !location.pathname.includes("/page"),
      enabled: !!currentProjectId && !!currentEpisodeId,
      onClick: () =>
        currentProjectId && currentEpisodeId &&
        navigate(`/project/${currentProjectId}/episode/${currentEpisodeId}`),
    },
    {
      icon: PageIcon_article,
      label: "페이지",
      isActive: location.pathname.includes("/page"),
      enabled: !!currentProjectId && !!currentEpisodeId,
      onClick: () =>
        currentProjectId && currentEpisodeId &&
        navigate(`/project/${currentProjectId}/episode/${currentEpisodeId}/page`),
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
              <img src={SidebarLogoIconOpen_happy} className="sidebar-logo-icon" alt="" />
              <span className="sidebar-logo-text">PlotNote</span>
              <button className="sidebar-toggle" onClick={toggleSidebar}>
                <img src={SidebarCloseIcon_doubleArrow} className="sidebar-toggle-icon" alt="사이드바 닫기" />
              </button>
            </>
          ) : (
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              <img src={SidebarLogoIconClose_calm} className="sidebar-logo-icon" alt="PlotNote" />
            </button>
          )}
        </div>

        {isOpen ? (
          <nav className="sidebar-nav">
            <div className="sidebar-tree">
              {/* 즐겨찾기 */}
              <div className="sidebar-tree-section">
                <button
                  className="sidebar-tree-section-title"
                  onClick={() => handleSectionClick("favorites")}
                >
                  <img src={favoriteIcon} className="sidebar-tree-item-icon" alt="" />
                  즐겨찾기
                  <img
                    src={expandedSections.favorites ? arrowDownIcon : arrowRightIcon}
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
                  <img src={LibraryIcon_house} className="sidebar-tree-item-icon" alt="" />
                  내 책장
                  <img
                    src={expandedSections.myBookshelves ? arrowDownIcon : arrowRightIcon}
                    className="sidebar-tree-item-icon"
                    alt=""
                    style={{ marginLeft: "auto" }}
                  />
                </button>
                {expandedSections.myBookshelves &&
                  allProjects.map((p) => renderProjectItem(p, 1))}
              </div>
            </div>
          </nav>
        ) : (
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
                  src={crumb.isActive && crumb.iconActive ? crumb.iconActive : crumb.icon}
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
            <img src={settingsIcon} alt="설정" style={{ width: 20, height: 20, flexShrink: 0 }} />
            {isOpen && <span className="sidebar-nav-label">설정</span>}
          </button>
        </div>
      </div>

      <ResizeHandle isResizing={isResizing} onMouseDown={onResizeMouseDown} />
    </>
  );
}
