import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Required for static export
    basePath: 'https://generalseba.github.io/slovene-step-by-step/',
    trailingSlash: true, // Ensure static export works properly
};

 
export default withNextIntl(nextConfig);