Skukit client
=============
Skukit UI based on Relay and React components. It also requires remote [GraphQL server](https://github.com/skukit/graphql).

# Installation

```
git clone https://github.com/skukit/client.git
cd client
docker build -t client .
docker run --rm -v "$PWD":/usr/src/app/ client npm install

```
# Configuration

Before running you need configure environment. Create `config.js` file and make it like instance of `config,example.js`


# Running

Running in production mode
```
docker run -d -p 3000:3000 -v "$PWD":/usr/src/app/  --name client client NODE_ENV=production npm start
```

Running in development mode
```
docker run -d -p 3000:3000 -v "$PWD":/usr/src/app/ --name client client npm start
```

# Developing

Any changes you make to files in the js/ directory will cause the server to automatically rebuild the app and refresh your browser.
