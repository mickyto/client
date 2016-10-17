#!/usr/bin/env babel-node
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { graphql } from 'graphql';
import { buildClientSchema, introspectionQuery, printSchema } from 'graphql/utilities';
import config from '../config';

const SERVER = config.graphqlServer;

// Save JSON of full schema introspection for Babel Relay Plugin to use
fetch(`${SERVER}`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({'query': introspectionQuery}),
}).then(res => res.json()).then(schemaJSON => {
    fs.writeFileSync(
        path.join(__dirname, '../data/schema.json'),
        JSON.stringify(schemaJSON, null, 2)
    );

    // Save user readable type system shorthand of schema
    const graphQLSchema = buildClientSchema(schemaJSON.data);
    fs.writeFileSync(
        path.join(__dirname, '../data/schema.graphql'),
        printSchema(graphQLSchema)
    );
});