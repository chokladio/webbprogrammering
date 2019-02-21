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

  // async componentDidMount() {
  //   let type = ['foundations', 'proteins', 'extras', 'dressings'];
  //   let urls = type.map(link => new URL(link + "/", " http://localhost:8080/"));
  //
  //   let details = [];
  //   let names = [];
  //   let inv_arr = {};
  //   let promises = urls.map(url => fetch(url).then(y => y.json()));
  //
  //   Promise.all(promises).then(res => {
  //     res.forEach(re => {
  //       re.forEach(r => {
  //         let path = type[res.indexOf(re)] + "/" + r;
  //         let url = new URL(path, "http://localhost:8080/");
  //         let val = fetch(url).then(y => y.json());
  //         details.push(val);
  //         names.push(r);
  //       })
  //     })
  //   }).then(() => {
  //     Promise.all(details).then(items => {
  //       Object.values(items).forEach(c => {
  //         names.forEach(k => {
  //           inv_arr[k] = c;
  //         })
  //       })
  //     })
  //   }).then(() => {
  //     this.setState({loading: false, inventory: inv_arr});
  //   })
  // }

  async componentDidMount() {
    let type = ['foundations', 'proteins', 'extras', 'dressings'];
    let urls = type.map(link => new URL(link + "/", " http://localhost:8080/")); //array of the four base URLs
    var promises = urls.map(url => fetch(url).then(y => y.json()));
    let inv_arr = {};

    Promise.all(promises).then(res => {
      res.forEach(re => {
        re.forEach(r => {
          let path = type[res.indexOf(re)] + "/" + r;
          let url = new URL(path, "http://localhost:8080/");
          let val = fetch(url).then(y => y.json());
          Promise.resolve(val).then(v => {
            inv_arr[r] = v;
          });
        });
      });
    }).then(this.setState({inventory: inv_arr}))
    .then(this.setState({loading: false}))
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
    const notFound = () => (<div>404 Sidan finns inte</div>);

    if (this.state.loading) {
      return (<div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>)
    } else {
      console.log(this.state.inventory);
      const composeSaladElem = (params) => <ComposeSalad inventory={this.state.inventory} newOrder={this.newOrder.bind(this)}/>;
      const viewOrderElem = (params) => <ViewOrder inventory={this.state.inventory} order={this.state.order} newOrder={this.newOrder.bind(this)}/>;

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
          <button onClick={this.serverRequest.bind(this)}>test xmlhttp POST req</button>
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
              <Route path="/" exact="exact" component={composeSaladElem}/>
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
}

const Footer = props => (<footer className="page-footer font-small gray mt-5 pt-5 font-small">
  <div className="footer-copyright text-center pt-3">
    <p>EDAF90 - Web Programming 2019
      <br/>
      Claudio Gandra</p>
  </div>
</footer>);

export default App;
