import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} from 'graphql';

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
    categoryModel,
    productModel,
    eventModel,
    mapReduceObject
} from './mongooseModels';

const {nodeInterface, nodeField} = nodeDefinitions(
    globalId => {
        const {type, id} = fromGlobalId(globalId);
        if (type === 'Vendor') {
            return new Promise((resolve, reject) => {
                vendorModel.findById(id, (err, vendor) => {
                    if (err) reject(err);
                    else resolve(vendor);
                });
            })
        }
        else {
            return null;
        }
    },
    obj => {

        if (obj.logotype) {
            return VendorType;
        }
        else {
            return null;
        }
    }
);

const VendorType = new GraphQLObjectType({
    name: 'Vendor',
    fields: {
        id: globalIdField('Vendor'),
        vendorId: {
            type: GraphQLString,
            resolve: vendor => vendor._id
        },
        name: {
            type: GraphQLString
        },
        logotype: {
            type: GraphQLString
        }
    },
    interfaces: [nodeInterface]
});

const FrontImageType = new GraphQLObjectType({
    name: 'FrontImage',
    fields: {
        id: globalIdField('FrontImage'),
        src: {
            type: GraphQLString
        }
    },
    interfaces: [nodeInterface],
});

const ProductType = new GraphQLObjectType({
    name: 'ProductType',
    fields: {
        id: globalIdField('Product'),
        productId: {
            type: GraphQLString,
            resolve: (product) => {
                return product._id
            }
        },
        model: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString,
            resolve({ description }) {
                return description
            }
        },
        front_image: {
            type: FrontImageType,
            resolve({ images }) {
                function findFrontImage(image) {
                    return image.front_image === 'yes';
                }
                return images.find(findFrontImage);
            }
        },
        images: {
            type: new GraphQLList(FrontImageType),
            resolve({ images }) {
                return images;
            }
        },
        vendor: {
            type: VendorType,
            resolve({ vendor_id }) {
                return new Promise((resolve, reject) => {
                    vendorModel.findById(vendor_id, (err, vendor) => {
                        if (err) reject(err);
                        else resolve(vendor);
                    });
                });
            }
        }
    },
    interfaces: [nodeInterface],
});

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: {
        id: globalIdField('Category'),
        categoryId: {
            type: GraphQLID,
            resolve: (category) => {
                return category._id
            }
        },
        name: {
            type: GraphQLString
        },
        ico: {
            type: GraphQLString
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(category) {
                return new Promise((resolve, reject) => {
                    productModel.find({ category_id: category._id }, (err, products) => {
                        
                        if (err) reject(err);

                        if (products.length < 1) {
                            resolve(products);
                        }

                        for (var t in products) {

                            eventModel.mapReduce(mapReduceObject(products[t]._id), (err, result) => {

                                if (err) reject(err);

                                for (var i in result) {
                                    products[t][result[i]._id] = result[i].value[result[i]._id];
                                }
                                resolve(products);
                            });
                        }
                    });
                });
            }
        }
    },
    interfaces: [nodeInterface]
});

const Viewer = new GraphQLObjectType({
    name: 'Viewer',
    fields: {
        id: globalIdField('Viewer'),
        categories: {
            type: new GraphQLList(CategoryType),
            resolve() {
                return new Promise((resolve, reject) => {
                    categoryModel.find((err, categories) => {
                        if (err) reject(err);
                        else resolve(categories);
                    });
                });
            }
        },
        vendors: {
            type: new GraphQLList(VendorType),
            resolve: () => {
                return new Promise((resolve, reject) => {
                    vendorModel.find((err, vendors) => {
                        if (err) reject(err);
                        else resolve(vendors);
                    });
                });
            }
        }
    },
    interfaces: [nodeInterface]
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        viewer: {
            type: Viewer,
            resolve: () => {
                return ''
            }
        },
        category: {
            type: CategoryType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, { id }) {
                return new Promise((resolve, reject) => {
                    categoryModel.findById(id, (err, category) => {
                        if (err) reject(err);
                        else resolve(category);
                    });
                });
            }
        },
        vendor: {
            type: VendorType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, { id }) {
                return new Promise((resolve, reject) => {
                    vendorModel.findById(id, (err, vendor) => {
                        if (err) reject(err);
                        else resolve(vendor);
                    });
                });
            }
        },
        product: {
            type: ProductType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, { id }) {
                return new Promise((resolve, reject) => {
                    productModel.findById(id, (err, product) => {
                        if (err) reject(err);

                        eventModel.mapReduce(mapReduceObject(product._id), (err, result) => {

                            if (err) reject(err);

                            for (var i in result) {
                                product[result[i]._id] = result[i].value[result[i]._id];
                            }

                            resolve(product);
                        });
                    });
                });
            }
        },
        node: nodeField
    }
});

export const schema = new GraphQLSchema({
    query: queryType
});
