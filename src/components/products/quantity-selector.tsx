"use client";

type Props = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  ariaLabel?: string;
};

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 999,
  ariaLabel,
}: Props) {
  return (
    <div className="inline-flex items-center rounded-md border bg-background">
      <button
        type="button"
        className="px-3 py-1.5 disabled:opacity-50"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={ariaLabel ? `${ariaLabel} decrease` : "Decrease quantity"}
      >
        −
      </button>
      <input
        aria-label={ariaLabel || "Quantity"}
        className="w-12 text-center bg-transparent outline-none"
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value.replace(/\D/g, "")) || min;
          onChange(Math.min(max, Math.max(min, n)));
        }}
        inputMode="numeric"
      />
      <button
        type="button"
        className="px-3 py-1.5"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label={ariaLabel ? `${ariaLabel} increase` : "Increase quantity"}
      >
        +
      </button>
    </div>
  );
}
