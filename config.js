const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    graphql: {
        port: 8000
    },
    imageServer: 'http://im.skukit-st.com/'
};

export default config


