import React, {Component} from 'react';
import './App.css';
import inventory from './components/inventory.ES6';
import ComposeSalad from './components/ComposeSalad';
import ViewOrder from './components/ViewOrder';
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
    salad = {...salad, "price": salad.price()};
    this.setState(prevState => ({
      order: [
        ...prevState.order,
        salad
      ]
    }));
    console.log(salad);
  }

  render() {
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
