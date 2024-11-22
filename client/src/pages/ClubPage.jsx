import ClubDiscussions from '../components/Discussions/ClubDiscussions';
import ClubBanner from '../components/Club/ClubBanner';
import ClubDetails from '../components/Club/ClubDetails';

export default function ClubPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <ClubBanner />
      <div className="relative z-10 px-4 mx-auto -mt-52 max-w-7xl sm:px-6 lg:px-8">
        <ClubDetails />
        <ClubDiscussions />
      </div>
    </div>
  );
}