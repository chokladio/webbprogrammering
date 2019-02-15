import React, {Component} from 'react';
import './App.css';
import inventory from './components/inventory.ES6';
import ComposeSalad from './components/ComposeSalad';
import ViewOrder from './components/ViewOrder';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: []
    }
    this.newOrder = this.newOrder.bind(this);
  }

  newOrder(salad) {
    salad = {
      ...salad,
      "price": salad.price()
    };
    this.setState(prevState => ({
      order: [
        ...prevState.order,
        salad
      ]
    }));
    console.log(salad);
  }

  render() {
    const composeSaladElem = (params) => <ComposeSalad {...params} inventory={inventory} newOrder={this.newOrder}/>;
    const viewOrderElem = (params) => <ViewOrder {...params} inventory={inventory} newOrder={this.newOrder}/>;
    return (<div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="row justify-content-center">
            <img src={logo} style={{
                width: 150 + 'px'
              }} className="App-logo" alt="logo"/>
            <div className="w-100"></div>
            <h1 className="display-4">Sallad? Sallad!</h1>
          </div>
          <div className="row justify-content-center">
            <p className="lead">"Man säger ju aldrig nej till lite sallad"</p>
          </div>
        </div>
      </div>
      <Router>
          <div>
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link className="nav-link" to="’compose-salad’">Komponera din egen sallad</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="’view-order’">Visa beställning</Link>
              </li>

              <Route path="’/compose-salad’" render={composeSaladElem}/>
              <Route path="’/view-order’" render={viewOrderElem}/>
            </ul>
          </div>
      </Router>

      <div className="container">
        <ViewOrder order={this.state.order}/>
      </div>
      <div className="container">
        <ComposeSalad inventory={inventory} newOrder={this.newOrder}/>
      </div>

      <footer className="page-footer font-small gray mt-5 pt-5 font-small">
        <div className="footer-copyright text-center py-3">
          <p>EDAF90 - Web Programming 2019</p>
        </div>
      </footer>

    </div>);
  }
}

export default App;
