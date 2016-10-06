import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} from 'graphql';

import chalk from 'chalk';
import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    cursorForObjectInConnection,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
} from 'graphql-relay';

import {
    vendorModel,
    Vendor
} from './mongooseModels';


const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        const {type, id} = fromGlobalId(globalId);
        if (type === 'Vendor') {
            return new Promise((resolve, reject) => {
                vendorModel.findById(id, (err, vendor) => {
                    if (err) reject(err);
                    else resolve(vendor);
                });
            });
        } else {
            return null;
        }
    },
    (obj) => {
        if (obj instanceof Vendor) {
            return VendorType;
        }
        else {
            return null;
        }
    }
);


const VendorType = new GraphQLObjectType({
    name: 'Vendor',
    fields: () => ({
        id: globalIdField('Vendor'),
        vendorId: {
            type: GraphQLString,
            resolve: (vendor) => {
                return vendor._id
            }
        },
        name: {
            type: GraphQLString
        },
        logotype: {
            type: GraphQLString
        }
    }),
    interfaces: [nodeInterface]
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        vendors: {
            type: new GraphQLList(VendorType),
            args: {
                names: {
                    type: new GraphQLList(GraphQLString),
                }
            },
            resolve: (root, {name}) => {
                return new Promise((resolve, reject) => {

                    vendorModel.find({name: name}, (err, vendors) => {
                        if (err) reject(err);
                        else resolve(vendors);
                    });
                });
            }
        },
        node: nodeField
    })
});

export const schema = new GraphQLSchema({
    query: queryType
});
