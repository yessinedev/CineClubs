import ClubCard  from "@/components/Club/ClubCard/ClubCard";
import CreateCommunityModal from "@/components/Club/CreateCommunityModal";
import { fetchClubs } from "@/services/clubService";
import { useQuery } from "@tanstack/react-query";

const ClubList = () => {
  const {
    data: clubs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clubs"],
    queryFn: fetchClubs,
  });
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading clubs...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-red-500 bg-red-100 rounded-lg shadow">
          Error: {error.message}
        </div>
      </div>
    );
  return (
    <section className="py-28">
      
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <CreateCommunityModal />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {clubs?.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubList;
