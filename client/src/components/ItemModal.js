import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
// import uuid from 'uuid';
class ItemModal extends Component{
state = {
	modal:false,
	status:'',
	title:'',
	price:'',
	category:'',
}

toggle = () => {
	this.setState({
		modal: !this.state.modal
	});
}
onChange = (e) => {
	this.setState({[e.target.name]: e.target.value});
}

onSubmit = e =>{
	console.log(this.state,"what's the state on submit?/")
	e.preventDefault();
	const newItem = {
//		id: uuid(),
		status: this.state.status,
		title:this.state.title,
		price:Number(this.state.price),
		category:this.state.category	}
	//Add item via addItem action
	this.props.addItem(newItem);
	//Close modal
	this.toggle();
}


render(){
	return(
<div>
{console.log("itemModal page!",this.props)}
<Button color="dark" style={{marginBottom: '2rem'}} onClick={this.toggle}>Add Item</Button>
<Modal isOpen={this.state.modal} toggle={this.toggle}>
<ModalHeader toggle={this.toggle}>Add to shopping list</ModalHeader>
<ModalBody>
<Form onSubmit={this.onSubmit}>
<FormGroup><Label for="item">Item</Label>
<Input type="text" name ="name" id="item" placeholder ="Add shopping item"
onChange={this.onChange}/>
<Input type="text" name ="status" id="status" placeholder ="Add status"
onChange={this.onChange}/>
<Input type="text" name ="title" id="title" placeholder ="Add title"
onChange={this.onChange}/>
<Input type="text" name ="price" id="price" placeholder ="Add price"
onChange={this.onChange}/>
<Input type="text" name ="category" id="category" placeholder ="Add category"
onChange={this.onChange}/>
<Button color ="dark" style={{marginTop:'2rem'}} block>Add Item</Button>
</FormGroup>
</Form>
</ModalBody>
</Modal>
</div>
		)
}
}
const mapStateToProps = state=> ({
	item:state.item
})
export default connect(mapStateToProps,{addItem})(ItemModal);