/**
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 80,
  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  singleAttributePerLine: true,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/ui/styles/globals.css",
}

export default config
