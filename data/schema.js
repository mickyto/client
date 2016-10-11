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
    vendorSchema,
    categoryModel,
    productModel,
    unitModel,
    propertyModel,
    eventModel,
    mapReduceObject
} from './mongooseModels';


const {nodeInterface, nodeField} = nodeDefinitions(
    globalId => {
        const {type, id} = fromGlobalId(globalId);
        console.log(id);
        console.log(type);
        if (type === 'Vendor') {

                vendorModel.findById(id, (err, vendor) => {
                    if (err) reject(err);
                    return vendor;
                })
            
        } else if (type === 'Category') {
            return new Promise((resolve, reject) => {
                categoryModel.findById(id, (err, category) => {
                    if (err) reject(err);
                    else resolve(category);
                });
            })
        } else if (type === 'ProductType') {
            return new Promise((resolve, reject) => {
                productModel.findById(id, (err, product) => {
                    if (err) reject(err);
                    else resolve(product);
                });
            })
        } else {
            return null;
        }
    },
    obj => {
        if (obj instanceof vendorSchema) {
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
    },
    interfaces: [nodeInterface]
});

const getVendors = new GraphQLObjectType({
    name: 'Vendors',
    fields: {
        id: globalIdField('Vendors'),
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

const UnitType = new GraphQLObjectType({
    name: 'Unit',
    fields: {
        id: globalIdField('Unit'),
        unitId: {
            type: GraphQLString,
            resolve: (unit) => {
                return unit._id
            }
        },
        abbreviation: {
            type: GraphQLString
        }
    },
    interfaces: [nodeInterface],
});

const DefaultValueType = new GraphQLObjectType({
    name: 'DefaultValue',
    fields: {
        id: globalIdField('DefaultValue'),
        defaultValueId: {
            type: GraphQLString,
            resolve: (df) => {
                return df._id
            }
        },
        name: {
            type: GraphQLString
        }
    },
    interfaces: [nodeInterface],
});

const PropertyType = new GraphQLObjectType({
    name: 'Property',
    fields: {
        id: globalIdField('Property'),
        propertyId: {
            type: GraphQLString,
            resolve: (property) => {
                return property._id
            }
        },
        type: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        default_values: {
            type: new GraphQLList(DefaultValueType),
            resolve({ default_values }) {
                return default_values;
            }
        }
    },
    interfaces: [nodeInterface],
});

const SpecificationType = new GraphQLObjectType({
    name: 'Specification',
    fields: {
        id: globalIdField('Specification'),
        specificationId: {
            type: GraphQLString,
            resolve: (spec) => {
                return spec._id
            }
        },
        value: {
            type: GraphQLString
        },
        unit: {
            type: UnitType,
            resolve({ unit_id }) {
                return new Promise((resolve, reject) => {
                    unitModel.findById(unit_id, (err, unit) => {
                        if (err) reject(err);
                        else resolve(unit);
                    });
                });
            }
        },
        property: {
            type: PropertyType,
            resolve({ property_id }) {
                return new Promise((resolve, reject) => {
                    propertyModel.findById(property_id, (err, property) => {
                        if (err) reject(err);
                        else resolve(property);
                    });
                });
            }
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
        },
        specifications: {
            type: new GraphQLList(SpecificationType),
            resolve({specifications}) {
                
                return specifications;
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



const getCategories = new GraphQLObjectType({
    name: 'Categories',
    fields: () => ({
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
        node: nodeField
    })
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        vendorViewer: {
            type: getVendors,
            resolve: () => {
                return ''
            }
        },
        categoryViewer: {
            type: getCategories,
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

                            //console.log(chalk.red(result));
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
    })
});

export const schema = new GraphQLSchema({
    query: queryType
});
