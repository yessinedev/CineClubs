import { useUserSync } from "./hooks/useUserSync";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClubPage from "./pages/ClubPage";
import HomePage from "./pages/HomePage";
import ClubList from "./pages/ClubList";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import ErrorPage from "./components/ErrorPage";
import { Toaster } from "sonner";
import ClubChatPage from "./pages/ClubChatPage";
import CategoryClubs from "./pages/CategoryClubs";

function App() {
  useUserSync();

  return (
    <div className="min-h-screen text-white bg-gray-950">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clubs" element={<ClubList />} />
          <Route path="/clubs/category/:categoryId" element={<CategoryClubs />} />
          <Route path="/clubs/:slug" element={<ClubPage />} />
          <Route path="/clubs/:slug/chat" element={<ClubChatPage />} />
          <Route path="/leaderboard" element={<LeaderBoardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
