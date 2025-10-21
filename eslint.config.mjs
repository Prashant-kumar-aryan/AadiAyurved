import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // Node.js v20.11+ required for import.meta.dirname
  baseDirectory: import.meta.dirname,
});

export default [
  // Use Next.js recommended rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom rules
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
    },
  },
];
