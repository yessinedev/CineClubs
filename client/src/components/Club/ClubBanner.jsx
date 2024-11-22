import { Bell, Share2 } from "lucide-react";

export default function ClubBanner({imageUrl}) {
  return (
    <div className="relative h-96">
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt="Classic Cinema Club Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-gray-950" />
      </div>

      <div className="absolute flex space-x-2 top-4 right-4">
        <button className="p-2 text-white transition-colors rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-sm">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-white transition-colors rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-sm">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}