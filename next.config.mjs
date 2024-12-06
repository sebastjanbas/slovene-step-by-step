import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"]
  };
 
export default withNextIntl(nextConfig);