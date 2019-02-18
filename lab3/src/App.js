import React, {Component, Fragment} from 'react';
import './App.css';
import ComposeSalad from './components/ComposeSalad';
import ViewOrder from './components/ViewOrder';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      order: [],
      inventory: {}
    }
  }

  async componentDidMount() {
    let urls = ['http://localhost:8080/foundations/', 'http://localhost:8080/proteins/', 'http://localhost:8080/extras/', 'http://localhost:8080/dressings/'];
    let inv_arr = {};

    var promises = urls.map(url => fetch(url).then(y => y.json()));

    Promise.all(promises).then(res => {
      res.map(re => {
        re.map(r => {
          let type = ['foundations', 'proteins', 'extras', 'dressings']; //Inte så snygg lösning...
          let path = type[res.indexOf(re)] + "/" + r;
          let url = new URL(path, "http://localhost:8080/"); //Build path to ingredient
          let val = fetch(url).then(y => y.json());
          Promise.resolve(val).then(v => {
            inv_arr[r] = v;
          });
        });
      });
    });
    this.setState({loading: false, inventory: inv_arr});
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
    console.log(this.state);
    const composeSaladElem = (params) => <ComposeSalad {...params} inventory={this.state.inventory} newOrder={this.newOrder.bind(this)}/>;
    const viewOrderElem = (params) => <ViewOrder {...params} inventory={this.state.inventory} order={this.state.order} newOrder={this.newOrder.bind(this)}/>;
    const notFound = () => (<div>404 Sidan finns inte</div>);

    if (this.state.loading) {
      return (<div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>)
    }

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
