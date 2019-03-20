import React, {Component, Fragment} from 'react';
import './App.css';
import ComposeSalad from './components/ComposeSalad';
import ViewOrder from './components/ViewOrder';
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom";
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      order: [],
      inventory: {}
    }
    this.checkStorageOrder();
  }

  async componentDidMount() {
    let type = ['foundations', 'proteins', 'extras', 'dressings'];
    let urls = type.map(link => new URL(link + "/", " http://localhost:8080/")); //array of the four base URLs
    var promises = urls.map(url => fetch(url).then(y => y.json()));
    let inv_arr = {};

    Promise.all(promises).then(res => {
      let p = res.map(re => {
        let q = re.map(r => {
          let path = type[res.indexOf(re)] + "/" + r;
          let url = new URL(path, "http://localhost:8080/");
          return fetch(url).then(y => y.json()).then(v => {
            inv_arr[r] = v;
          })
        })
        return Promise.all(q);
      })
      return Promise.all(p);
    }).then(() => {
      this.setState({inventory: inv_arr, loading: false})
    })
  }

  newOrder = salad => {
    salad = {
      ...salad,
      "price": salad.price() //add price to salad object
    };
    this.setState({ //add salad to state.order
      order: [
        ...this.state.order,
        salad
      ]
    }, () => localStorage.setItem("orders", JSON.stringify(this.state.order))) //add state.order to localstorage.order
  }

  checkStorageOrder = () => {
    if (!localStorage.orders) {
      return;
    } else {
      this.state.order = JSON.parse(localStorage.getItem('orders'));
      alert("Du har en pågående beställning");
    }
  }

  serverRequest() {
    let xhttp = new XMLHttpRequest();
    let url = "http://localhost:8080/orders/";
    const data = this.state.order;
    const params = {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(...data)
    };

    xhttp.open("POST", url, true);
    xhttp.onreadystatechange = function() { //Call a function when the state changes.
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        alert(xhttp.responseText);
      }
    }
    xhttp.send(params);
  }

  render() {
    const composeSaladElem = (props) => <ComposeSalad {...props} inventory={this.state.inventory} newOrder={this.newOrder.bind(this)}/>;
    const viewOrderElem = (props) => <ViewOrder {...props} inventory={this.state.inventory} serverReq={this.serverRequest.bind(this)} order={this.state.order} storage={localStorage}/>;
    const routing = (<Switch>
      <Route path="/compose-salad" component={composeSaladElem}/>
      <Route path="/view-order" component={viewOrderElem}/>
      <Route path="/" exact="exact" component={composeSaladElem}/>
      <Redirect from='*' to='/'/>
    </Switch>);

    if (this.state.loading) {
      return (<div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>)
    } else {

      return (<Fragment>
        <Header/>
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
            {routing}
          </div>
        </Router>
        <Footer/>
      </Fragment>);
    }
  }
}

const Header = () => (<div className="jumbotron jumbotron-fluid mb-1">
  <div className="row justify-content-center">
    <h1 className="display-4"><img src={logo} style={{
    width: 90 + 'px'
  }} className="App-logo align-top" alt="logo"/>Sallad? Sallad!</h1>
  </div>
  <div className="row justify-content-center">
    <p className="lead mt-3">"Man säger ju aldrig nej till lite sallad"</p>
  </div>
</div>);

const Footer = () => (<footer className="page-footer font-small gray mt-5 pt-5 font-small">
  <div className="footer-copyright text-center pt-3">
    <p>EDAF90 - Web Programming 2019
      <br/>
      Claudio Gandra</p>
  </div>
</footer>);

export default App;
