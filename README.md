Skukit client
=============
Skukit UI based on GraphQL server, Relay and React components

# Installation

First set up and run database from this [link](https://github.com/skukit/summary/wiki/Start-and-provision-mongoDB)

Then run following commands

```
git clone https://github.com/skukit/client.git
cd client
docker build -t client .
docker run --rm -v "$PWD":/usr/src/app/ client npm install

```
Running in production mode
```
docker run -d -p 3000:3000 -v "$PWD":/usr/src/app/ --link mongo --name client client NODE_ENV=production npm start
```

Running in development mode
```
docker run -d -p 3000:3000 -v "$PWD":/usr/src/app/ --link mongo --name client client npm start
```


# Developing

Any changes you make to files in the js/ directory will cause the server to automatically rebuild the app and refresh your browser.

If at any time you make changes to data/schema.js, stop the server, regenerate data/schema.json, and restart the server:

```
npm run update-schema
npm start
```
