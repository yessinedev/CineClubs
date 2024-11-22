import { useUserSync } from "./hooks/useUserSync";
import { useWebSocket } from "./hooks/useWebSocket";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClubPage from "./pages/ClubPage";
import HomePage from "./pages/HomePage";
import ClubList from "./pages/ClubList";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
