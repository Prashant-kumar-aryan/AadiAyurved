import Header from "@/components/Navbar";
import { DISEASE_CATEGORIES } from "@/data/disease-categories";
import { DiseaseCard } from "@/components/disease-card";

export default function ShopByDiseasePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-7xl px-4 py-8">
        <header className="flex flex-col gap-2 pb-6">
          <h1 className="text-pretty text-2xl font-semibold tracking-tight text-gray-900">
            Shop by Disease
          </h1>
          <p className="text-sm text-gray-600">
            Explore our curated categories and discover remedies tailored to
            your needs.
          </p>
        </header>

        <section aria-label="Disease Categories">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {DISEASE_CATEGORIES.map((cat) => (
              <DiseaseCard
                key={cat.title}
                title={cat.title}
                items={cat.items}
                image={cat.image}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
