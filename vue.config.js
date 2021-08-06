module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/integration-configuration-viz/'
        : '/',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Integration API Visualiser";
                return args;
            })
    }
}
