import { Skeleton } from "@/components/ui/skeleton";

export default function PostSkeleton() {
  return (
    <div className="p-6 space-y-4 bg-gray-900 border border-gray-800 rounded-xl">
      {/* Author section */}
      <div className="flex items-start">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-10 h-10 rounded-full bg-gray-800/50" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-full bg-gray-800/50" />
            <Skeleton className="h-3 w-16 rounded-full bg-gray-800/50" />
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4 rounded-full bg-gray-800/50" />{" "}
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-full bg-gray-800/50" />
          <Skeleton className="h-4 w-5/6 rounded-full bg-gray-800/50" />
        </div>
      </div>

      {/* Actions section */}
      <div className="flex items-center pt-4 border-t border-gray-800">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-16 rounded-full bg-gray-800/50" />
          <Skeleton className="h-8 w-16 rounded-full bg-gray-800/50" />
        </div>
      </div>
    </div>
  );
}
