"use client";

type Props = {
  productType: string;
  onProductTypeChange: (v: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
};

export function ProductsFilters({
  productType,
  onProductTypeChange,
  search,
  onSearchChange,
}: Props) {
  return (
    <section
      className="w-full rounded-lg border bg-card text-card-foreground p-4 md:p-6"
      role="region"
      aria-label="Product filters"
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="productType" className="text-sm font-medium">
            Product Type
          </label>
          <select
            id="productType"
            value={productType}
            onChange={(e) => onProductTypeChange(e.target.value)}
            className="border rounded-md bg-background text-foreground px-3 py-2"
            aria-label="Select product type"
          >
            <option value="all">All</option>
            <option value="product">Product</option>
            <option value="kit">Kit</option>
          </select>
        </div>

        <div className="flex-1 flex items-center">
          <label htmlFor="search" className="sr-only">
            Search products by name
          </label>
          <input
            id="search"
            type="search"
            placeholder="Search by product name"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border rounded-md bg-background text-foreground px-3 py-2"
          />
        </div>
      </div>
    </section>
  );
}
