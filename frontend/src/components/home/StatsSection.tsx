export function StatsSection() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            Making a real impact together
          </h2>
          <p className="text-muted-foreground">
            Our community's achievements this semester
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              15,240 kg
            </div>
            <div className="text-sm text-muted-foreground">Total Recycled</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              2,847
            </div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              30%
            </div>
            <div className="text-sm text-muted-foreground">Waste Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              12
            </div>
            <div className="text-sm text-muted-foreground">
              Partner Locations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
