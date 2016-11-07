const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    graphqlServer: 'http://graphql.skukit-st.com',
    imageServer: 'http://im.skukit-st.com/'
};

export default config;


