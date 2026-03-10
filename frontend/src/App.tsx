import "assets/styles/index.scss";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { StoreProvider } from "./contexts/StoreContext";
import { Navigate, Route, Routes } from "react-router-dom";
import BookshelfManagement from "./components/screens/Bookshelf";
import ProjectManagement from "./components/screens/Project";
import EpisodeManagement from "./components/screens/Episode";
import PageManagement from "./components/screens/Page";
import CutManagement from "./components/screens/Cut";
import MainLayout from "./components/layout/MainLayout";
import DbErrorToast from "./components/common/DbErrorToast/DbErrorToast";

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/bookshelf" replace />} />
              <Route path="bookshelf" element={<BookshelfManagement />} />
              <Route path="project/:projectId" element={<ProjectManagement />} />
              <Route path="project/:projectId/episode/:episodeId" element={<EpisodeManagement />} />
              <Route path="project/:projectId/episode/:episodeId/page" element={<PageManagement />} />
              <Route path="project/:projectId/episode/:episodeId/page/:pageId" element={<CutManagement />} />
            </Route>
          </Routes>
        </DataProvider>
        <DbErrorToast />
      </StoreProvider>
    </AuthProvider>
  );
}
export default App;
