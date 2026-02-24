import "assets/styles/index.scss";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardManagement from "components/screens/Dashboard";
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
            <Route index element={<Navigate to="/bookshelf" />} />
            <Route path="bookshelf" element={<BookshelfManagement />} />
            <Route path="dashboard" element={<DashboardManagement />} />
            <Route path="project" element={<ProjectManagement />} />
            <Route
              path="project/:projectId/episode"
              element={<EpisodeManagement />}
            />
            <Route
              path="project/:projectId/episode/:episodeId/page"
              element={<PageManagement />}
            />
            <Route path="/pages" element={<PageManagement />} />
            <Route path="/pages/:pageId" element={<CutManagement />} />
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
}
export default App;
