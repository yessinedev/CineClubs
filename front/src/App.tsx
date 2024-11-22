import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedClubs from './components/FeaturedClubs';
import ClubDiscussions from './components/Discussions/ClubDiscussions';

function App() {
  return (
    <div className="min-h-screen text-white bg-gray-950">
      <Navbar />
      <main>
        <Hero />
        <FeaturedClubs />
        <ClubDiscussions />
      </main>
    </div>
  );
}

export default App;