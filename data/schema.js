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
    propertyModel

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

const getVendors = new GraphQLObjectType({
    name: 'Vendors',
    fields: () => ({
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
        },
        node: nodeField
    })
});

const UnitType = new GraphQLObjectType({
    name: 'UnitType',
    fields: {
        id: {
            type: GraphQLString
        },
        abbreviation: {
            type: GraphQLString
        }
    }
});

const DefaultValueType = new GraphQLObjectType({
    name: 'DefaultValueType',
    fields: {
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        }
    }
});

const PropertyType = new GraphQLObjectType({
    name: 'PropertyType',
    fields: {
        id: {
            type: GraphQLString
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
    }
});

const SpecificationType = new GraphQLObjectType({
    name: 'SpecificationType',
    fields: {
        id: {
            type: GraphQLString
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
    }
});

const FrontImageType = new GraphQLObjectType({
    name: 'FrontImageType',
    fields: {
        src: {
            type: GraphQLString
        }
    }
});

const ProductType = new GraphQLObjectType({
    name: 'ProductType',
    fields: {
        id: {
            type: GraphQLString
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
    }
});

const CategoryType = new GraphQLObjectType({
    name: 'CategoryType',
    fields: {
        id: {
            type: GraphQLID
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

                        resolve(products);

                    });
                });
            }
        }
    }
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
        node: nodeField
    })
});

export const schema = new GraphQLSchema({
    query: queryType
});
