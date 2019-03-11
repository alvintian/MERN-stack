const express = require('express');
const router = express.Router();


//item model
const Item = require('../../models/Product');

//@route GET api/items
//@desc Get all items
//@access public
//Item.insert({SKU:000000,sequence_value:0})
// function getNextSequenceValue(){
// // Item.findOneAndUpdate({ _id: "" }, { $inc: { SKU: 1 } }, {new: true },
// counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} },
//     function(err,doc) {
//        if (err) { throw err; }
//        else { 
//        	doc.SKU = counter.seq;
//      console.log("Updated",doc); }  
// 	})
// }

router.get('/',(req,res)=>{
	Item.find()
//	.sort({date:-1})
	.then(items =>res.json(items))
});

router.get('/:id', (req, res) => {
	Item.findById(req.params.id)
	.then(items =>res.json(items))
});


router.post('/',(req,res)=>{
const newItem = new Item({
	Status: req.body.status,
	Title:req.body.title,
	Listed_Price:req.body.price,
	Category:req.body.category
});
newItem.save().then(item=>res.json(item));
});

router.delete('/:id',(req,res)=>{
	Item.findById(req.params.id)
	.then(item=>item.remove().then(()=>res.json({success:true})))
	.catch(err=>res.status(404).json({success:false}));
});

module.exports=router;