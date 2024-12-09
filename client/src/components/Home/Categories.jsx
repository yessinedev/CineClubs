import { fetchCategories } from '@/services/categoryService';
import { useQuery } from '@tanstack/react-query';
import { Code2, Palette, Dumbbell, Microscope, BookOpen, Camera, Music, Globe } from 'lucide-react';
import { Link } from "react-router-dom";

const iconMapping = {
  "IT & Technologies": <Code2 className="w-6 h-6" />,
  "Arts & Design": <Palette className="w-6 h-6" />,
  "Health & Fitness": <Dumbbell className="w-6 h-6" />,
  Science: <Microscope className="w-6 h-6" />,
  Education: <BookOpen className="w-6 h-6" />,
  "Fun & Diversity": <Globe className="w-6 h-6" />,
  Music: <Music className="w-6 h-6" />,
  Culture: <Globe className="w-6 h-6" />,
};

export default function Categories() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading categories...
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

  const transformedCategories = categories?.map((category) => ({
    id: category.id,
    icon: iconMapping[category.name] || <Globe className="w-6 h-6" />, // Default icon if no match
    name: category.name,
    count: category.clubsCount,
  }));

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Discover Your Interest</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore diverse categories and find communities that match your passions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {transformedCategories.map((category) => (
            <Link to={`/clubs/category/${category.id}`}
              key={category.name}
              className="group p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 mb-4 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-400">{category.count} communities</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}