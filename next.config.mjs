import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {};
// const nextConfig = {
//     basePath: 'https://generalseba.github.io/slovene-step-by-step/',
// };
 
export default withNextIntl(nextConfig);