Skukit client
=============
Skukit UI based on Relay and React components. It also requires remote [GraphQL server](https://github.com/skukit/graphql).

## Installation

```bash
    git clone https://github.com/skukit/client.git
    cd client
    docker build -t client .
    docker run --rm -v $PWD:/usr/src/app/ client yarn install
```
## Configuration

Before running you need configure environment. Create `config.js` file and make it like instance of `config.example.js`

## Running

Running in production mode

```bash
    docker run -d -p 8007:3000 -v $PWD:/usr/src/app/ --name client -e NODE_ENV=production client npm start
```

Running in development mode

```bash
    docker run -d -p 8007:3000 -v $PWD:/usr/src/app/ --name client client npm start
```

## Deploy

For deployment we use [shipit](https://github.com/shipitjs/shipit).

### Hard deploy

If you deploy first time or you want to rebuild image on server after deploy:

```bash
    docker run -t --rm -v $PWD/shipitfile.js:/usr/src/app/shipitfile.js -v ~/.ssh:/root/.ssh mickyto/shipit shipit develop deploy build
```


### Soft deploy

If you need only deploy and restart container:

```bash
    docker run -t --rm -v $PWD/shipitfile.js:/usr/src/app/shipitfile.js -v ~/.ssh:/root/.ssh mickyto/shipit shipit develop deploy restart
```

### Shipit file customization

1. Create and customize `shipitfile.dev.js`
2. Run:

```bash
    docker run -t --rm -v $PWD/shipitfile.dev.js:/usr/src/app/shipitfile.js -v ~/.ssh:/root/.ssh mickyto/shipit shipit develop deploy restart
```


## Developing

Any changes you make to files in the js/ directory will cause the server to automatically rebuild the app and refresh your browser.

If at any time you make changes in `schema.js` on remote graphql server, regenerate data/schema.json, and restart the container:

```bash
    docker run --rm -v $PWD:/usr/src/app/ --network=host client npm run update-schema
    docker restart client
```

## Useful for read

[relay examples](https://github.com/relayjs/relay-examples)
[relay-fullstack example](https://github.com/lvarayut/relay-fullstack)
