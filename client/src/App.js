import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import ItemModal from './components/ItemModal';
//import AddProduct from './components/AddProduct'
import {Container} from 'reactstrap';
import ProductDesc from './components/ProductDesc';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
             <Router>
      <div className="App">
	<AppNavbar/> 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/newProduct'} className="nav-link">Add new Product</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/product'} className="nav-link">Show Products</Link>
                </li>
              </ul>
          </nav>
	<Container>
          <Switch>
              <Route exact path={"/product"}
                  render={() => (
              <ShoppingList />
                )}/>              
              <Route exact path={"/product/:id"}
                  render={({match}) => (
              <ProductDesc id={match.params.id}/>
                )}/>
              <Route exact path={"/newProduct"} 
                  render={() => (
              <ItemModal />
                )} />
          </Switch>

</Container>
 </div>

</Router>
 </Provider>
    );
  }
}

export default App;
