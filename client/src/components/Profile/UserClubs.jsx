import { Users, Star } from 'lucide-react';
import { ClubCard } from '../Club/ClubCard';

const JOINED_CLUBS = [
  {
    id: 1,
    name: "Classic Cinema Club",
    members: 2.4,
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=500",
    joinedDate: "2 months ago"
  },
  {
    id: 2,
    name: "Sci-Fi Enthusiasts",
    members: 1.8,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=500",
    joinedDate: "1 month ago"
  },
  {
    id: 3,
    name: "Horror Movie Fans",
    members: 3.2,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&q=80&w=500",
    joinedDate: "3 weeks ago"
  }
];

export default function UserClubs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {JOINED_CLUBS.map((club) => (
        <ClubCard key={club.id} club={club} />
      ))}
    </div>
  );
}