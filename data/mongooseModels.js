import mongoose from 'mongoose';
import chalk from 'chalk';
mongoose.connect('mongodb://localhost:27017/content');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Mongoose schemas
const categorySchema = new Schema({
	_id: ObjectId,
	name: String,
	ico: String
});

const productSchema = new Schema({
	_id: ObjectId,
	vendor_id: ObjectId,
	category_id: ObjectId,
	model: String,
	features: Array,
	description: Schema.Types.Mixed,
	specifications: Array,
	images: Array
});

export const vendorSchema = new Schema({
	_id: ObjectId,
	name: String,
	logotype: String
});

const unitSchema = new Schema({
	_id: ObjectId,
	name: String,
	abbreviation: String,
	measure_id: ObjectId
});

const propertySchema = new Schema({
	_id: ObjectId,
	name: String,
	group_id: ObjectId,
	type: String,
	default_values: Array
});

const eventSchema = new Schema({
	locale: String,
	images: Array
});

// Mongoose models
export const categoryModel = mongoose.model('Category', categorySchema, 'category');
export const productModel = mongoose.model('Product', productSchema, 'product');
export const vendorModel = mongoose.model('Vendor', vendorSchema, 'vendor');
export const unitModel = mongoose.model('Unit', unitSchema, 'unit');
export const propertyModel = mongoose.model('Property', propertySchema, 'property');
export const eventModel = mongoose.model('Event', eventSchema, 'event');













