const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BiggerThanZero = function(value) {
          return value > 0}
var Listed_PriceValidators = [
    { validator: BiggerThanZero, msg: 'Listed Price needs to be > 0' },
    { validator: Number.isInteger, msg: 'Listed price needs to be int' }
];
var Selling_priceValidators = [
    { validator: BiggerThanZero, msg: 'selling Price needs to be > 0' },
    { validator: Number.isInteger, msg: 'selling price needs to be int' }
];
var ReserveValidators = [
    { validator: BiggerThanZero, msg: 'reserve needs to be > 0' },
    { validator: Number.isInteger, msg: 'reserve needs to be int' }
];


//create schema
const ProductSchema = new Schema({
	Status: {
		type: String,
//		required: true,
		enum: ["Pending List", "Item Available", "Item Sold", "Pending Payment", "Seller Payout Completed"]
	},
	SKU:{
		type:Number,
		default: 0
//		required: true,
	},
	Condition:{
		type:String,
//		required: true,
		enum: ["Used","New"]
	},
	Client_Code:{
		type:String
//		required: true
	},
	Brand:{
		type:String,
//		required: true
	},
	Model_Number:{
		type:String,
//		required: true
	},
	Dimensions: {
		type:String,
//		required:true
	},
	Weight:{
		type: Number,
	    validate : {
      	  validator: function(value) {
          return value > 0},
          message: 'weight needs to be > 0'
  		}
	},
	Quantity:{
		type: Number,
	    validate : {
      	  validator: function(value) {
          return value > 0},
          message: 'quantity needs to be > 0'
  		}
	},
	Title:{
		type:String,
		maxlength: 64,
		minlength: 10,
//		required: true
	},
	Category:{
		type: String,
//		required: true
	},
	Description:{
		type: String,
		minlength: 10,
	//	required: true
	},
	Images:{
	 data: Buffer, 
	 contentType: String 
	},
	Listed_Price:{
		type: Number,
	    validate: Listed_PriceValidators
	},
	Selling_price: {
		type: Number,
	    validate :Selling_priceValidators
	},
	Reserve: {
		type: Number,
	    validate : ReserveValidators	
	},
	Location:{
		type: String
	},
	Payment_Method:{
//		required: true,
		type: String,
		enum: ["Wiretransfer" , "Cash", "Paypal", "Cheque", "Credit Card"]
	},
	Transaction_details:{
		type: String,
//		required: true	
	},
	Amount_Received:{
		type: String,
//		required: true	
	}
});

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);



//  var dummy = counter({_id:"entityId"});
// dummy.save(function(error) {
// console.log("Your dummy has been saved!");
// if (error) {
// console.error(error);
// }
// });

// 	var dummy = counter({_id:"entityId"});
// dummy.save(function(error) {
// console.log("Your dummy has been saved!");
// if (error) {
// console.error(error);
// }
// });
ProductSchema.pre('save', function(next) {
    var doc = this;
    // counter.updateOne({_id: 'entityId'},{},{upsert:true}, function(error, counter)   {
    //     if(error)
    //         return error;
    //     next();
    // });
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return error;
        doc.SKU = counter.seq;
    console.log(doc.SKU,"what is doc.sku???????????",counter.seq,"???????",doc);
        next();
    });
});

counter.findOneAndUpdate({_id: 'entityId'}, {}, { upsert: true, new: true, setDefaultsOnInsert: true }, function(error, result) {
    if (error) return;
    // do something with the document
});

//ProductSchema.plugin(autoIncrement.plugin, { model: 'Product', field: 'SKU' });
module.exports = Product = mongoose.model('product',ProductSchema);

