const Skeleton = ({ className = "", count = 1 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton ${className}`} />
      ))}
    </div>
  );
};

export const CardSkeleton = () => (
  <div className="card p-6">
    <Skeleton className="h-48 w-full rounded-lg" />
    <Skeleton className="h-6 w-3/4 mt-4" />
    <Skeleton className="h-4 w-full mt-2" />
    <Skeleton className="h-4 w-2/3 mt-2" />
  </div>
);

export const SkillSkeleton = () => (
  <div className="card p-6">
    <Skeleton className="h-12 w-12 rounded-lg" />
    <Skeleton className="h-5 w-24 mt-3" />
    <Skeleton className="h-3 w-full mt-3" />
  </div>
);

export const ProfileSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-32 w-32 rounded-full" />
    <Skeleton className="h-6 w-48" />
    <Skeleton className="h-4 w-32" />
  </div>
);

export default Skeleton;
