import React, {Component} from 'react';
import {Container, ListGroup} from 'reactstrap';
import {TransitionGroup} from 'react-transition-group';
//import uuid from 'uuid';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import { Redirect } from 'react-router-dom';

  const columns = [{
    Header: 'Status',
    accessor: 'Status'
      }, {
    Header: 'Title',
    accessor: 'Title',
  filterable:true
 //   Cell: props => <span className='number'>qwer</span> // Custom cell components!
  }, {
    Header: 'Price',
    accessor: 'Listed_Price' 
    }, {
    Header: 'Category',
    accessor: 'Category',
  filterable:true
    },{
    Header: 'SKU',
    accessor: 'SKU',
  filterable:true
    }];

class ShoppingList extends Component {
state = { selected: null,
          selectedId:"" }
	componentDidMount(){
		this.props.getItems();
	}
	onDeleteClick= (id) => {
	this.props.deleteItem(id);
	}




render(){
  const {items} =	this.props.item;

    if (this.state.selected !== null) {
      return  <Redirect to={'/product/'+this.state.selectedId} />;
    }

	return(
		<Container>
{/*<Button color="dark" style={{marginBottom:'2rem'}} onClick={() => {
	const name = prompt('enter item');
	if(name){
		this.setState(state=>({
			items:[...state.items, {id:uuid(),name}]
		}))	}}}>Add Item</Button>
*/}
<ListGroup>

<TransitionGroup className="shopping-list">
{console.log(this.props,"what is the prop?????")}
<ReactTable  
  getTrProps={(state, rowInfo) => {
  if (rowInfo && rowInfo.row) {
    return {
      onClick: (e) => {
        this.setState({
          selected: rowInfo.index,
          selectedId: rowInfo.original._id
        })
      }
    }
  }else{
    return {}
  }
}}
    data={items}
    columns={columns}>
</ReactTable>
</TransitionGroup>

</ListGroup>
		</Container>
		);
}
}

ShoppingList.propTypes={
	getItems:PropTypes.func.isRequired,
	item:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
	item: state.item
});
export default connect(mapStateToProps, { getItems,deleteItem })(ShoppingList);