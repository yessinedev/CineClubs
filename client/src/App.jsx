import { useUserSync } from "./hooks/useUserSync";
import { useWebSocket } from "./hooks/useWebSocket";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClubPage from "./pages/ClubPage";
import HomePage from "./pages/HomePage";
import ClubList from "./pages/ClubList";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import { Toaster } from "sonner";

function App() {
  useUserSync();
  useWebSocket();

  return (
    <div className="min-h-screen text-white bg-gray-950">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clubs" element={<ClubList />} />
          <Route path="/clubs/:id" element={<ClubPage />} />
          <Route path="/leaderboard" element={<LeaderBoardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
