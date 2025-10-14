type Props = {
  title: string;
  items: string[];
  image: string;
};

export function DiseaseCard({ title, items, image }: Props) {
  const imgUrl = image || "/ayurveda-category.jpg";

  return (
    <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-gray-300">
      <div className="aspect-[16/9] w-full overflow-hidden bg-gray-50">
        <img
          src={imgUrl || "/placeholder.svg"}
          alt={`${title} illustration`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((chip) => (
            <a
              key={chip}
              href={`/shop-by-disease?subcategory=${encodeURIComponent(chip)}`}
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700 transition-colors duration-200 hover:border-gray-300 hover:bg-gray-100"
              aria-label={chip}
            >
              {chip}
            </a>
          ))}
        </div>
      </div>
      <a
        href={`/shop-by-disease?category=${encodeURIComponent(title)}`}
        className="sr-only"
        aria-label={`Open ${title}`}
        tabIndex={-1}
      >
        {/* Focus-within target */}
      </a>
    </article>
  );
}
