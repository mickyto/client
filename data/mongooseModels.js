import mongoose from 'mongoose';
mongoose.connect('mongodb://mongo:27017/content');
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

const eventSchema = new Schema({
	locale: String,
	images: Array
});

// Mongoose models
export const categoryModel = mongoose.model('Category', categorySchema, 'category');
export const productModel = mongoose.model('Product', productSchema, 'product');
export const vendorModel = mongoose.model('Vendor', vendorSchema, 'vendor');
export const eventModel = mongoose.model('Event', eventSchema, 'event');

export let mapReduceObject = id => {

	let o = {};

	o.map = function () {

		if (this.resolve.approved === true) {

			let o = {
				data: this.data,
				action: this.action
			};
			emit(this.element.field, o);
		}
	};

	o.reduce = function (field, elements) {


		let o = {};

		if (["specifications", "images", "features"].indexOf(field) != -1) {
			o.data = [];
		} else {
			o.data = '';
		}

		for (let i in elements) {

			let data = elements[i].data;

			if (field == "description") {

				if (elements[i].action == "update") {

					o.data = data.description;

				} else if (elements[i].action == "remove") {

				}
			}

			if (field == "specifications") {

				if (elements[i].action == "update") {
					o.data.push(data);
				} else if (elements[i].action == "remove") {

				}
			}

			if (field == "features") {

				if (elements[i].action == "update") {
					o.data.push(data);
				} else if (elements[i].action == "remove") {

				}
			}

			if (field == 'images') {

				if (elements[i].action == 'update') {
					o.data.push(data);
				} else if (elements[i].action == 'remove') {

				}
			}
		}
		return o;
	};

	o.query = {

		$and: [{
			"element._id": new mongoose.Types.ObjectId(id)
		}, {
			"element.type": "product"
		}]
	};

	o.finalize = function(key, reducedVal) {

		reducedVal[key] = reducedVal.data;
		delete reducedVal.data;
		return reducedVal;
	};

	return o;
};











