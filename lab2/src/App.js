import React, {Component, Fragment} from 'react';
import './App.css';
import inventory from './components/inventory.ES6';
import ComposeSalad from './components/ComposeSalad';
import ViewOrder from './components/ViewOrder';
import {BrowserRouter as Router, Route, Redirect, Link, Switch} from "react-router-dom";
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
    const viewOrderElem = (params) => <ViewOrder {...params} inventory={inventory} order={this.state.order} newOrder={this.newOrder}/>;
    const notFound = () => (<div>404 Sidan finns inte</div>);
    const NotFoundRedirect = () => <Redirect to='/not-found'/>
    return (<Fragment>
      <div className="jumbotron jumbotron-fluid mb-1">
        <div className="row justify-content-center">
          <h1 className="display-4"><img src={logo} style={{
        width: 90 + 'px'
      }} className="App-logo align-top" alt="logo"/>Sallad? Sallad!</h1>
        </div>
        <div className="row justify-content-center">
          <p className="lead mt-3">"Man säger ju aldrig nej till lite sallad"</p>
        </div>
      </div>
      <Router>
        <div className="container">
          <ul className="nav nav-pills nav-justified justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" to="compose-salad">Mixa din sallad</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="view-order">Visa beställning</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/" exact component={composeSaladElem}/>
            <Route path="/compose-salad" render={composeSaladElem}/>
            <Route path="/view-order" render={viewOrderElem}/>
            <Route component={notFound}/>
          </Switch>
        </div>
      </Router>
      <Footer/>
    </Fragment>);
  }
}

const Footer = props => (<footer className="page-footer font-small gray mt-5 pt-5 font-small">
  <div className="footer-copyright text-center pt-3">
    <p>EDAF90 - Web Programming 2019
      <br/>
      Claudio Gandra</p>
  </div>
</footer>);

export default App;
