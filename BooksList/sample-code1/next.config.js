const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript({
  webpack: (config, options) => {
  // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    // Do not run type checking twice:
    //if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin());

  
  
    // push the rules for the shared library
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      //include: includePaths,
      use: options.defaultLoaders.babel
    });

    return config;
  }});
