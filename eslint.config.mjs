import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  {
  rules: {
    "no-unused-vars": "off", // Disable default JS rule to avoid conflict
    "@typescript-eslint/no-unused-vars":"off",
    "react-hooks/rules-of-hooks": "off", 
    "react/no-unescaped-entities":"off",
    "@typescript-eslint/no-explicit-any":"off",
    "react-hooks/exhaustive-deps":"off",
    "prefer-const": "off", // Disables the "prefer-const" rule
      "@typescript-eslint/prefer-const": "off", // Disables it for TypeScript
      "react/jsx-key": "off", // Disables missing key warnings
      "@next/next/no-img-element": "off", // Disables Next.js <img> warnings
      "jsx-a11y/alt-text": "off", // Disables alt text warnings
      "no-unused-vars": "off", // Disables unused variables warnings
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",
  }}
];

export default eslintConfig;
