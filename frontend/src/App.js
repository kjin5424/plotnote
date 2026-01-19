import "assets/css/variables.css"; // 전역 변수 로드
import "assets/css/global.css"; // 전역 스타일 로드
import "assets/css/common/layout.css"; // 공통 레이아웃
import "assets/css/common/button.css"; // 공통 컴포넌트
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { Navigate, Route, Routes } from "react-router-dom";
import BookshelfManagement from "./components/screens/Bookshelf";
import ProjectManagement from "./components/screens/Project";
import EpisodeManagement from "./components/screens/Episode";
import PageManagement from "./components/screens/Page";
import CutManagement from "./components/screens/Cut";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/pages" />} />
            {/* 페이지 관리로 이동, 차후 대시보드..프로젝트선텍화면..어디든... */}
            <Route path="dashboard" element={<BookshelfManagement />} />
            <Route path="project" element={<ProjectManagement />} />
            <Route
              path="project/:projectId/episode"
              element={<EpisodeManagement />}
            />
            <Route
              path="project/:projectId/episode/:episodeId/page"
              element={<PageManagement />}
            />
            {/* 임시 */}
            <Route path="/pages" element={<PageManagement />} />
            <Route
              path="project/:projectId/episode/:episodeId/page/:pageId/cut"
              element={<CutManagement />}
            />
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
}
export default App;
