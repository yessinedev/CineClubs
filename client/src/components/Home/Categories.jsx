import { Code2, Palette, Dumbbell, Microscope, BookOpen, Camera, Music, Globe } from 'lucide-react';

const categories = [
  { icon: <Code2 className="w-6 h-6" />, name: 'Technology', count: 245 },
  { icon: <Palette className="w-6 h-6" />, name: 'Arts & Design', count: 189 },
  { icon: <Dumbbell className="w-6 h-6" />, name: 'Health & Fitness', count: 167 },
  { icon: <Microscope className="w-6 h-6" />, name: 'Science', count: 142 },
  { icon: <BookOpen className="w-6 h-6" />, name: 'Education', count: 156 },
  { icon: <Camera className="w-6 h-6" />, name: 'Photography', count: 134 },
  { icon: <Music className="w-6 h-6" />, name: 'Music', count: 178 },
  { icon: <Globe className="w-6 h-6" />, name: 'Culture', count: 123 },
];

export default function Categories() {
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
          {categories.map((category) => (
            <button
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
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}