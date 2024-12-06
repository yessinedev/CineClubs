import ClubCard from '../Club/ClubCard/ClubCard';



export default function UserClubs({clubs}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clubs.length > 0 && clubs.map((club) => (
        <ClubCard key={club.id} club={club} />
      ))}
    </div>
  );
}