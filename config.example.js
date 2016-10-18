const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    graphqlServer: 'http://localhost:8000/graphql',
    imageServer: 'http://im.skukit-st.com/'
};

export default config


