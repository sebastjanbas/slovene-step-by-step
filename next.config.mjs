import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
  output: "export", // Ensures static HTML export
  trailingSlash: true, // Adds trailing slashes for better GitHub Pages compatibility
  basePath: "https://generalseba.github.io/slovene-step-by-step/",
};
// const nextConfig = {
// };

export default withNextIntl(nextConfig);
