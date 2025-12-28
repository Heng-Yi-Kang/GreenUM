export function RankingsDivider() {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t-2 border-dashed border-border"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-background px-4 text-sm text-muted-foreground font-medium">
          Rest of Top 15
        </span>
      </div>
    </div>
  );
}
