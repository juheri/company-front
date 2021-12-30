
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require('@zeit/next-css');
const path = require('path');

module.exports = withPlugins([withImages, withCSS, withSass], {
  webpack5: false,
  trailingSlash: true,
  cssLoaderOptions: {
    importLoaders: 1,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    base_url: "https://company-api.unknown008.repl.co",
    secret_key: "d8dc2c5c7580a72f716e1f05aa354d9c136bcd404f85db",
    bearer_token: "Bearer 3949b1c47a538ac303a5e06d8dc2c5c7580a72f716e1f05aa354d9c136bcd404f85dbb811fe6efbbea1dc09d0c8d36dc7e42fc5eb7960a60425ed93cf280108a86b254a83246e06631140c4f0412b52c83bfa8f4"
  },
  webpack: (config, { isServer }) => {
  if (isServer) {
    const origExternals = [...config.externals];
    config.externals = [
      (context, request, callback) => {
        if (typeof origExternals[0] === "function") {
          origExternals[0](context, request, callback);
        } else {
          callback();
        }
      },
      ...(typeof origExternals[0] === "function" ? [] : origExternals),
    ];
  }
  return config;
},
  exportPathMap: async function ( defaultPathMap, { dev, dir, outDir, distDir, buildId } ) {
    return {
      '/': { page: '/' },
      '/about': { page: "/about"}
    }
  }
})
