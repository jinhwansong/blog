const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
        }],
    },
    compress: true,
    webpack(config, {
        webpack
    }) {
        const prod = process.env.NODE_ENV === 'production';
        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval',
            // 웹팩 플러그인
            plugins: [
                ...config.plugins,
                new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
            ],
        };
    },
});