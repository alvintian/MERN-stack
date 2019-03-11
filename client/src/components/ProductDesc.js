import React, { Component } from 'react';
import { getItem } from '../actions/itemActions';
import { connect } from 'react-redux';


class ProductDesc extends Component {


	componentDidMount() {
		this.props.getItem(this.props.id)
		this.setState({isloading:true})
	}


	render() {
		let product = this.props.item.items[0];
		let loading =this.props.item.loading
		console.log(this.props,"what are the props??",this.state,"state??");
        if(loading===false){
        	return <p>Loading ...</p>
        }else{
		return (
			<div className="leftdiv">
					<div>
					<h1 style={{ fontWeight: 'bold' }}>{product.Title}</h1>
					<h2 style={{ fontWeight: 'bold' }}>{product.Category}</h2>
				</div>
				<div className="rightdiv" style={{ margin: '10px' }}>
					<h2 >{product.Listed_Price}</h2>
					<h2 >{product.Status}</h2>
				</div>
				<h2 style={{fontWeight: 'bold' }}>{product.SKU}</h2>
			</div>
		);
	}
	}
}
const mapStateToProps = state => ({
	item: state.item
});
export default connect(mapStateToProps, { getItem })(ProductDesc);