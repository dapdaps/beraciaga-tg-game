/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      optimizePackageImports: ['@/components/BearDressup'],
      largePageDataBytes: 128 * 1000,
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    webpack: (config, { isServer, dev }) => {
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg')
      );
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/ // *.svg?url
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
          use: ['@svgr/webpack']
        }
      );
      fileLoaderRule.exclude = /\.svg$/i;
      
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          bearDressup: {
            test: /[\\/]components[\\/]BearDressup[\\/]/,
            name: 'bear-dressup',
            chunks: 'all',
            enforce: true,
            priority: 30, // 高优先级
            maxSize: 200000, // 将大文件分割成200KB的小块
          },
          // 通用代码分块
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 10,
          }
        }
      };
      
      return config;
    }
  }

export default nextConfig;
