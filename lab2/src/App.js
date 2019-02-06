import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';

class App extends Component {
  render() {
    return (<div>
      <div className="jumbotron jumbotron-fluid">
        <div class="container">
          <div class="row">
            <h1 class="display-4">My Own Salad Bar</h1>
            <p class="lead">Here you can order custom-made salads!</p>
          </div>
        </div>
      </div>

      <ComposeSalad inventory={inventory}/>

      <div class="container">
        <div class="row">
          <div class="col-sm">
            ett
          </div>
          <div class="col-sm">
            två
          </div>
          <div class="col-sm">
            tre
          </div>
          <div class="col-sm">
            fyra
          </div>
        </div>
      </div>

    </div>);
  }
}

export default App;
